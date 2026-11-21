<?php

namespace App\Filament\Resources;

use App\Filament\Resources\LocationResource\Pages\ManageLocations;
use App\Filament\Support\ImageUpload;
use App\Models\Location;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class LocationResource extends Resource
{
    protected static ?string $model = Location::class;
    protected static ?string $modelLabel = 'punto de venta';
    protected static ?string $pluralModelLabel = 'Puntos de venta';
    protected static ?int $navigationSort = 5;
    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-map-pin';

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('title')->label('Nombre del establecimiento')->required()->maxLength(255),
            ImageUpload::make('logo')->label('Logo')->required(fn (?Location $record) => ! $record?->is_primary)->hidden(fn (?Location $record) => (bool) $record?->is_primary),
            TextInput::make('sort_order')->label('Orden')->integer()->minValue(0)->maxValue(9999)->default(0)->required(),
            Toggle::make('is_active')->label('Mostrar en la página')->default(true),
            Repeater::make('items')->label('Ubicaciones')->schema([
                TextInput::make('label')->label('Dirección')->required()->maxLength(500),
                TextInput::make('href')->label('Enlace de Google Maps')->url()->rules(['starts_with:https://'])->required()->maxLength(2048),
            ])->minItems(1)->maxItems(50)->defaultItems(1)->addActionLabel('Agregar ubicación')->columnSpanFull(),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            ImageColumn::make('logo')->label('Logo')->disk('public')->imageHeight(48)->imageWidth(64),
            TextColumn::make('title')->label('Establecimiento')->searchable()->sortable(),
            TextColumn::make('sort_order')->label('Orden')->sortable(),
            IconColumn::make('is_primary')->label('Tienda principal')->boolean(),
            IconColumn::make('is_active')->label('Visible')->boolean(),
        ])->defaultSort('sort_order')->recordActions([EditAction::make(), DeleteAction::make()]);
    }

    public static function getPages(): array { return ['index' => ManageLocations::route('/')]; }
}
