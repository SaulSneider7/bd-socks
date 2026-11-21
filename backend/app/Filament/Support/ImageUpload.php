<?php

namespace App\Filament\Support;

use Filament\Forms\Components\FileUpload;

class ImageUpload
{
    public static function make(string $name): FileUpload
    {
        return FileUpload::make($name)
            ->disk('public')->directory('uploads')->visibility('public')
            ->image()->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
            ->maxSize(5120)->previewable()->imagePreviewHeight('200')->preventFilePathTampering()
            ->helperText('JPG, PNG o WebP. Máximo 5 MB por imagen.');
    }
}
