<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MediaImage extends Model
{
    public const SECTIONS = [
        'banner' => 'Banner de campaña',
        'hero' => 'Carrusel del inicio',
        'philosophy' => 'Nuestra historia',
        'gallery' => 'Galería',
        'instagram' => 'Instagram',
        'contact' => 'Fondo de contacto',
        'branding' => 'Logo de la página',
    ];

    protected $fillable = ['section', 'slot', 'path', 'alt', 'sort_order', 'is_active'];

    protected function casts(): array
    {
        return ['slot' => 'integer', 'sort_order' => 'integer', 'is_active' => 'boolean'];
    }
}
