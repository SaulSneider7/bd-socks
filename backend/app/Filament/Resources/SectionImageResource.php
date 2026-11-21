<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SectionImageResource\Pages\ManageSectionImages;
use App\Filament\Support\ImageUpload;
use App\Models\MediaImage;
use Filament\Actions\EditAction;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class SectionImageResource extends Resource
{
    protected static ?string $model = MediaImage::class;
    protected static ?string $slug = 'imagenes';
    protected static ?string $modelLabel = 'imagen';
    protected static ?string $pluralModelLabel = 'Imágenes de secciones';
    protected static ?int $navigationSort = 4;
    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-squares-2x2';

    public static function canCreate(): bool { return false; }
    public static function getEloquentQuery(): Builder { return parent::getEloquentQuery()->whereNotIn('section', ['hero', 'banner']); }

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            ImageUpload::make('path')->label('Reemplazar imagen')->required(),
            TextInput::make('alt')->label('Descripción de la imagen')->required()->maxLength(255),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            ImageColumn::make('path')->label('Imagen')->disk('public')->imageHeight(56)->imageWidth(70),
            TextColumn::make('section')->label('Sección')->formatStateUsing(fn (string $state) => MediaImage::SECTIONS[$state] ?? $state)->sortable(),
            TextColumn::make('slot')->label('Posición')->sortable(),
            TextColumn::make('alt')->label('Descripción')->searchable(),
        ])->filters([SelectFilter::make('section')->label('Sección')->options(array_diff_key(MediaImage::SECTIONS, ['hero' => true, 'banner' => true]))])
            ->defaultSort('id')->recordActions([EditAction::make()]);
    }

    public static function getPages(): array { return ['index' => ManageSectionImages::route('/')]; }
}
