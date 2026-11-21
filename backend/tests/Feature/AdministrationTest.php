<?php

namespace Tests\Feature;

use App\Filament\Pages\FeaturedProducts;
use App\Filament\Resources\HeroSlideResource\Pages\ManageHeroSlides;
use App\Filament\Resources\LocationResource\Pages\ManageLocations;
use App\Filament\Resources\ProductResource\Pages\ManageProducts;
use App\Filament\Resources\SectionImageResource\Pages\ManageSectionImages;
use App\Models\Location;
use App\Models\MediaImage;
use App\Models\Product;
use App\Models\User;
use Database\Seeders\ContentSeeder;
use Filament\Actions\Testing\TestAction;
use Filament\Facades\Filament;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Livewire\Livewire;
use Tests\TestCase;

class AdministrationTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        $user = User::factory()->create();
        $user->forceFill(['is_admin' => true])->save();
        $this->actingAs($user);
        Filament::setCurrentPanel(Filament::getPanel('admin'));
        return $user;
    }

    private function product(array $attributes = []): Product
    {
        return Product::create([...[
            'name' => 'Producto de prueba', 'price' => 24, 'image' => 'imported/product.webp',
            'images' => [], 'sizes' => ['36/40'], 'is_active' => true,
        ], ...$attributes]);
    }

    public function test_admin_pages_require_an_administrator(): void
    {
        foreach (['', '/products', '/featured-products', '/hero', '/imagenes', '/locations'] as $path) {
            $this->get('/admin'.$path)->assertRedirect('/admin/login');
        }
        $this->get('/admin/login')->assertOk();
        $this->actingAs(User::factory()->create());
        $this->get('/admin/products')->assertForbidden();
        $this->assertFalse(Gate::allows('create', Product::class));
        $this->admin();
        foreach (['', '/products', '/featured-products', '/hero', '/imagenes', '/locations'] as $path) {
            $this->get('/admin'.$path)->assertOk();
        }
    }

    public function test_featured_selection_persists_and_can_be_emptied(): void
    {
        $this->admin();
        $first = $this->product(['is_featured' => true]);
        $second = $this->product(['name' => 'Segundo']);
        Livewire::test(FeaturedProducts::class)
            ->fillForm(['product_ids' => [(string) $second->id]])->call('save')->assertHasNoFormErrors();
        $this->assertFalse($first->fresh()->is_featured);
        $this->assertTrue($second->fresh()->is_featured);
        Livewire::test(FeaturedProducts::class)->fillForm(['product_ids' => []])->call('save')->assertHasNoFormErrors();
        $this->assertSame(0, Product::where('is_featured', true)->count());
    }

    public function test_invalid_featured_ids_do_not_change_existing_selection(): void
    {
        $this->admin();
        $product = $this->product(['is_featured' => true]);
        Livewire::test(FeaturedProducts::class)->fillForm(['product_ids' => ['99999']])->call('save')->assertHasFormErrors();
        $this->assertTrue($product->fresh()->is_featured);
    }

    public function test_public_api_only_exposes_published_content_and_resolves_images(): void
    {
        $product = $this->product(['is_featured' => true]);
        $this->product(['is_active' => false, 'is_featured' => true]);
        MediaImage::create(['section' => 'hero', 'path' => 'imported/later.webp', 'alt' => 'Segundo', 'sort_order' => 2]);
        MediaImage::create(['section' => 'hero', 'path' => 'imported/first.webp', 'alt' => 'Primero', 'sort_order' => 1]);
        MediaImage::create(['section' => 'hero', 'path' => 'imported/hidden.webp', 'is_active' => false]);
        MediaImage::create(['section' => 'philosophy', 'slot' => 1, 'path' => 'uploads/new.webp', 'alt' => 'Nueva imagen']);
        Location::create(['title' => 'Tienda', 'logo' => 'uploads/logo.png', 'items' => [['label' => 'Dirección', 'href' => 'https://maps.google.com/']]]);
        Location::create(['title' => 'Oculta', 'items' => [], 'is_active' => false]);

        $this->getJson('/api/content')->assertOk()->assertJsonCount(1, 'products')
            ->assertJsonPath('products.0.id', $product->id)->assertJsonPath('products.0.is_featured', true)
            ->assertJsonPath('products.0.image', Storage::disk('public')->url($product->image))
            ->assertJsonCount(2, 'heroSlides')->assertJsonPath('heroSlides.0.alt', 'Primero')
            ->assertJsonCount(1, 'locations')->assertJsonPath('mainLocation', null)
            ->assertJsonMissingPath('products.0.created_at');
        $this->assertSame(Storage::disk('public')->url('uploads/new.webp'), $this->getJson('/api/content')->json('images')['philosophy.1']['src']);
        $this->postJson('/api/content', [])->assertMethodNotAllowed();
    }

    public function test_product_create_edit_delete_and_price_validation(): void
    {
        $this->admin();
        Storage::fake('public');
        Livewire::test(ManageProducts::class)->callAction('create', data: [
            'name' => 'Nuevo', 'price' => 29.90, 'description' => 'Descripción', 'sizes' => ['36/40'],
            'image' => UploadedFile::fake()->image('product.jpg'), 'images' => [], 'is_active' => true,
        ])->assertHasNoActionErrors();
        $product = Product::where('name', 'Nuevo')->firstOrFail();
        Storage::disk('public')->assertExists($product->image);
        Livewire::test(ManageProducts::class)->callAction(TestAction::make('edit')->table($product), data: ['price' => -1])->assertHasActionErrors(['price']);
        $this->assertEquals(29.90, $product->fresh()->price);
        Livewire::test(ManageProducts::class)->callAction(TestAction::make('edit')->table($product), data: ['name' => 'Editado', 'price' => 30])->assertHasNoActionErrors();
        $this->assertSame('Editado', $product->fresh()->name);
        Livewire::test(ManageProducts::class)->callAction(TestAction::make('delete')->table($product))->assertHasNoActionErrors();
        $this->assertModelMissing($product);
    }

    public function test_upload_rejects_non_images_and_unowned_paths(): void
    {
        $this->admin();
        Storage::fake('public');
        $data = ['name' => 'Inválido', 'price' => 10, 'sizes' => [], 'is_active' => true];
        Livewire::test(ManageProducts::class)->callAction('create', data: [...$data,
            'image' => UploadedFile::fake()->create('script.php', 1, 'application/x-php'),
        ])->assertHasActionErrors(['image']);
        Storage::disk('public')->put('uploads/other.jpg', 'other file');
        Livewire::test(ManageProducts::class)->callAction('create', data: [...$data,
            'image' => ['uploads/other.jpg'],
        ])->assertHasActionErrors(['image']);
        $this->assertSame(0, Product::count());
    }

    public function test_hero_and_section_image_replacement(): void
    {
        $this->admin();
        Storage::fake('public');
        Livewire::test(ManageHeroSlides::class)->callAction('create', data: [
            'path' => UploadedFile::fake()->image('hero.png'), 'alt' => 'Portada', 'sort_order' => 2, 'is_active' => true,
        ])->assertHasNoActionErrors();
        $slide = MediaImage::where('section', 'hero')->firstOrFail();
        Livewire::test(ManageHeroSlides::class)->callAction(TestAction::make('edit')->table($slide), data: ['is_active' => false])->assertHasNoActionErrors();
        $this->getJson('/api/content')->assertJsonCount(0, 'heroSlides');
        Livewire::test(ManageHeroSlides::class)->callAction(TestAction::make('delete')->table($slide))->assertHasNoActionErrors();
        $image = MediaImage::create(['section' => 'philosophy', 'slot' => 1, 'path' => 'old.jpg', 'alt' => 'Anterior']);
        Livewire::test(ManageSectionImages::class)->callAction(TestAction::make('edit')->table($image), data: [
            'path' => UploadedFile::fake()->image('new.jpg'), 'alt' => 'Nueva',
        ])->assertHasNoActionErrors();
        $this->assertSame('Nueva', $image->fresh()->alt);
        Storage::disk('public')->assertExists($image->fresh()->path);
        $this->assertFalse(Gate::allows('delete', $image));
    }

    public function test_locations_support_multiple_addresses_and_reject_unsafe_links(): void
    {
        $this->admin();
        Storage::fake('public');
        $location = Location::create(['title' => 'Tienda', 'logo' => null, 'items' => [['label' => 'Lima', 'href' => 'https://maps.google.com/']]]);
        Livewire::test(ManageLocations::class)->callAction(TestAction::make('edit')->table($location), data: [
            'logo' => UploadedFile::fake()->image('logo.png'),
            'items' => [['label' => 'Lima', 'href' => 'https://maps.google.com/'], ['label' => 'Surco', 'href' => 'https://maps.app.goo.gl/example']],
        ])->assertHasNoActionErrors();
        $this->assertCount(2, $location->fresh()->items);
        Livewire::test(ManageLocations::class)->callAction(TestAction::make('edit')->table($location), data: [
            'items' => [['label' => 'Inválido', 'href' => 'javascript:alert(1)']],
        ])->assertHasActionErrors();
        $this->assertCount(2, $location->fresh()->items);
    }

    public function test_import_preserves_existing_content_and_images(): void
    {
        Storage::fake('public');
        $this->seed(ContentSeeder::class);
        $this->assertSame(24, Product::count());
        $this->assertSame(22, MediaImage::count());
        $this->assertSame(11, Location::count());
        $product = Product::first();
        $product->update(['name' => 'Nombre editado']);
        $this->seed(ContentSeeder::class);
        $this->assertSame('Nombre editado', $product->fresh()->name);
        $this->assertSame(24, Product::count());
        Storage::disk('public')->assertExists($product->image);
    }
}
