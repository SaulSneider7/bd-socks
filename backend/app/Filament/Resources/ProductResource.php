<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages\ManageProducts;
use App\Filament\Support\ImageUpload;
use App\Models\Product;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;
    protected static ?string $modelLabel = 'producto';
    protected static ?string $pluralModelLabel = 'Productos';
    protected static ?int $navigationSort = 1;
    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-cube';

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('name')->label('Nombre')->required()->maxLength(255),
            TextInput::make('price')->label('Precio')->prefix('S/')->numeric()->minValue(0)->maxValue(99999999.99)->step(0.01)->required(),
            Textarea::make('description')->label('Descripción / código')->maxLength(5000)->columnSpanFull(),
            TagsInput::make('sizes')->label('Tallas')->placeholder('Ej.: 36/40')->nestedRecursiveRules(['string', 'max:40'])->helperText('Escribe una talla y presiona Enter.'),
            Toggle::make('is_active')->label('Publicado en el catálogo')->default(true),
            ImageUpload::make('image')->label('Imagen principal')->required(),
            ImageUpload::make('images')->label('Imágenes adicionales')->multiple()->reorderable()->maxFiles(12),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            ImageColumn::make('image')->label('Imagen')->disk('public')->imageHeight(56)->imageWidth(56),
            TextColumn::make('name')->label('Producto')->searchable()->sortable(),
            TextColumn::make('price')->label('Precio')->money('PEN')->sortable(),
            IconColumn::make('is_active')->label('Publicado')->boolean(),
        ])->filters([TernaryFilter::make('is_active')->label('Publicado')])
            ->recordActions([EditAction::make(), DeleteAction::make()])->defaultSort('id');
    }

    public static function getPages(): array
    {
        return ['index' => ManageProducts::route('/')];
    }
}
