<?php

namespace App\Filament\Resources;

use App\Filament\Resources\HeroSlideResource\Pages\ManageHeroSlides;
use App\Filament\Support\ImageUpload;
use App\Models\MediaImage;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class HeroSlideResource extends Resource
{
    protected static ?string $model = MediaImage::class;
    protected static ?string $slug = 'hero';
    protected static ?string $modelLabel = 'imagen del carrusel';
    protected static ?string $pluralModelLabel = 'Carrusel del inicio';
    protected static ?int $navigationSort = 3;
    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-photo';

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->where('section', 'hero');
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            ImageUpload::make('path')->label('Imagen')->required(),
            TextInput::make('alt')->label('Descripción de la imagen')->required()->maxLength(255),
            TextInput::make('sort_order')->label('Orden')->integer()->minValue(0)->maxValue(9999)->default(0)->required(),
            Toggle::make('is_active')->label('Mostrar en el carrusel')->default(true),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            ImageColumn::make('path')->label('Imagen')->disk('public')->imageHeight(56)->imageWidth(80),
            TextColumn::make('sort_order')->label('Orden')->sortable(),
            TextColumn::make('alt')->label('Descripción')->searchable(),
            IconColumn::make('is_active')->label('Visible')->boolean(),
        ])->defaultSort('sort_order')->reorderable('sort_order')
            ->recordActions([EditAction::make(), DeleteAction::make()]);
    }

    public static function getPages(): array { return ['index' => ManageHeroSlides::route('/')]; }
}
