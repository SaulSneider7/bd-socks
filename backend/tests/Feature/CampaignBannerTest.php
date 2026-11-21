<?php

namespace Tests\Feature;

use App\Models\MediaImage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class CampaignBannerTest extends TestCase
{
    use RefreshDatabase;

    private function administrator(): void
    {
        $user = User::factory()->create();
        $user->forceFill(['is_admin' => true])->save();
        $this->actingAs($user);
        Storage::fake('public');
    }

    public function test_multipart_upload_replacement_and_visibility(): void
    {
        $this->administrator();
        $this->get('/admin/campaign-banner')->assertOk()->assertSee('multipart/form-data')->assertSee('name="banner_image"', false);
        $this->post('/admin/campaign-banner/save', [
            'banner_image' => UploadedFile::fake()->image('navidad.jpg', 1920, 480), 'alt' => 'Navidad', 'is_active' => '1',
        ])->assertSessionHasNoErrors()->assertRedirect('/admin/campaign-banner')->assertSessionHas('banner_saved');
        $banner = MediaImage::where('section', 'banner')->sole();
        $original = $banner->path;
        Storage::disk('public')->assertExists($original);
        $this->get('/admin/campaign-banner')->assertSee('Banner guardado correctamente.')->assertSee(Storage::disk('public')->url($original), false);
        $this->assertSame('Navidad', $this->getJson('/api/content')->json('images')['banner.1']['alt']);
        $this->post('/admin/campaign-banner/save', [
            'banner_image' => UploadedFile::fake()->image('cyber.png'), 'alt' => 'Cyber', 'is_active' => '1',
        ])->assertSessionHasNoErrors();
        $this->assertSame(1, MediaImage::where('section', 'banner')->count());
        $this->assertNotSame($original, $banner->fresh()->path);
        $this->post('/admin/campaign-banner/save', ['alt' => 'Cyber', 'is_active' => '0'])->assertSessionHasNoErrors();
        $this->assertArrayNotHasKey('banner.1', $this->getJson('/api/content')->json('images'));
        Storage::disk('public')->assertExists($banner->fresh()->path);
        $this->post('/admin/campaign-banner/save', ['alt' => 'Cyber', 'is_active' => '1'])->assertSessionHasNoErrors();
        $this->assertSame('Cyber', $this->getJson('/api/content')->json('images')['banner.1']['alt']);
    }

    public function test_upload_requires_admin_and_valid_image(): void
    {
        $this->post('/admin/campaign-banner/save')->assertRedirect('/admin/login');
        $this->actingAs(User::factory()->create());
        $this->post('/admin/campaign-banner/save')->assertForbidden();
        $this->administrator();
        $this->post('/admin/campaign-banner/save', ['is_active' => '1'])->assertSessionHasErrors('banner_image');
        $this->post('/admin/campaign-banner/save', [
            'banner_image' => UploadedFile::fake()->create('document.pdf', 10, 'application/pdf'), 'is_active' => '1',
        ])->assertSessionHasErrors('banner_image');
        $this->post('/admin/campaign-banner/save', [
            'banner_image' => UploadedFile::fake()->image('large.jpg')->size(6000), 'is_active' => '1',
        ])->assertSessionHasErrors('banner_image');
        $this->assertSame(0, MediaImage::count());
    }
}
