<?php

namespace App\Filament\Auth;

use Filament\Schemas\Components\Component;

class EditProfile extends \Filament\Auth\Pages\EditProfile
{
    protected static ?string $title = 'Mi cuenta';

    protected function getPasswordFormComponent(): Component
    {
        return parent::getPasswordFormComponent()
            ->label('Nueva contraseña')
            ->minLength(12)
            ->helperText('Usa al menos 12 caracteres. Déjala vacía para conservar tu contraseña actual.');
    }
}
