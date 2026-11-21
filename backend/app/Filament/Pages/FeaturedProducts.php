<?php

namespace App\Filament\Pages;

use App\Models\Product;
use Filament\Forms\Components\CheckboxList;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class FeaturedProducts extends Page
{
    protected static ?string $title = 'Productos destacados';
    protected static ?int $navigationSort = 2;
    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-star';
    protected string $view = 'filament.pages.featured-products';
    public ?array $data = [];

    public static function canAccess(): bool { return (bool) auth()->user()?->is_admin; }

    public function mount(): void
    {
        $this->form->fill(['product_ids' => Product::where('is_featured', true)->pluck('id')->map(fn ($id) => (string) $id)->all()]);
    }

    public function form(Schema $schema): Schema
    {
        return $schema->components([
            CheckboxList::make('product_ids')->label('Mostrar en el inicio')
                ->options(fn () => Product::orderBy('name')->get()->mapWithKeys(fn ($product) => [
                    $product->id => $product->name.($product->is_active ? '' : ' (sin publicar)'),
                ]))->searchable()->columns(1)
                ->helperText('Marca los productos que quieras mostrar. Los productos sin publicar no aparecerán. Si desmarcas todos, la sección se oculta.')
                ->rules(['array'])->nestedRecursiveRules(['integer', 'exists:products,id']),
        ])->statePath('data');
    }

    public function save(): void
    {
        Gate::authorize('viewAny', Product::class);
        $ids = $this->form->getState()['product_ids'] ?? [];
        DB::transaction(function () use ($ids) {
            Product::query()->update(['is_featured' => false]);
            Product::whereIn('id', $ids)->update(['is_featured' => true]);
        });
        Notification::make()->title('Productos destacados guardados')->success()->send();
    }
}
