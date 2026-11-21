<?php

namespace Tests\Feature;

use App\Filament\Auth\EditProfile;
use App\Models\User;
use Filament\Facades\Filament;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Livewire\Livewire;
use Tests\TestCase;

class ProfileTest extends TestCase
{
    use RefreshDatabase;

    private function administrator(): User
    {
        $user = User::factory()->create(['password' => 'Original-password-123']);
        $user->forceFill(['is_admin' => true])->save();
        $this->actingAs($user);
        Filament::setCurrentPanel(Filament::getPanel('admin'));
        return $user;
    }

    public function test_password_change_requires_correct_current_password(): void
    {
        $user = $this->administrator();
        $this->get('/admin/profile')->assertOk()->assertSee('Mi cuenta');
        Livewire::test(EditProfile::class)->fillForm([
            'password' => 'New-password-456', 'passwordConfirmation' => 'New-password-456',
            'currentPassword' => 'incorrect-password',
        ])->call('save')->assertHasFormErrors(['currentPassword']);
        $this->assertTrue(Hash::check('Original-password-123', $user->fresh()->password));
        Livewire::test(EditProfile::class)->fillForm([
            'password' => 'New-password-456', 'passwordConfirmation' => 'New-password-456',
            'currentPassword' => 'Original-password-123',
        ])->call('save')->assertHasNoFormErrors();
        $this->assertTrue(Hash::check('New-password-456', $user->fresh()->password));
        $this->assertFalse(Hash::check('Original-password-123', $user->fresh()->password));
    }

    public function test_short_and_mismatched_passwords_are_rejected(): void
    {
        $user = $this->administrator();
        Livewire::test(EditProfile::class)->fillForm([
            'password' => 'short', 'passwordConfirmation' => 'short', 'currentPassword' => 'Original-password-123',
        ])->call('save')->assertHasFormErrors(['password']);
        Livewire::test(EditProfile::class)->fillForm([
            'password' => 'New-password-456', 'passwordConfirmation' => 'Different-password-789', 'currentPassword' => 'Original-password-123',
        ])->call('save')->assertHasFormErrors(['password']);
        $this->assertTrue(Hash::check('Original-password-123', $user->fresh()->password));
    }

    public function test_profile_is_not_public(): void
    {
        $this->get('/admin/profile')->assertRedirect('/admin/login');
        $this->actingAs(User::factory()->create());
        $this->get('/admin/profile')->assertForbidden();
    }
}
