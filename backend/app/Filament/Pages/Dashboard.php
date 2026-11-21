<?php

namespace App\Filament\Pages;

use App\Models\Location;
use App\Models\Product;
use App\Filament\Resources\ProductResource;
use App\Filament\Resources\HeroSlideResource;
use App\Filament\Resources\SectionImageResource;
use App\Filament\Resources\LocationResource;

class Dashboard extends \Filament\Pages\Dashboard
{
    protected static ?string $title = 'Inicio';
    protected string $view = 'filament.pages.dashboard';

    protected function getViewData(): array
    {
        return [
            'stats' => [
                ['label' => 'Productos publicados', 'value' => Product::where('is_active', true)->count()],
                ['label' => 'Destacados en el inicio', 'value' => Product::where('is_active', true)->where('is_featured', true)->count()],
                ['label' => 'Puntos de venta activos', 'value' => Location::where('is_active', true)->where('is_primary', false)->count()],
            ],
            'modules' => [
                ['title' => 'Banner de campaña', 'text' => 'Publica una imagen para Navidad, Cyber o una ocasión especial.', 'icon' => 'heroicon-o-megaphone', 'url' => CampaignBanner::getUrl()],
                ['title' => 'Productos', 'text' => 'Organiza tu catálogo, precios, tallas e imágenes.', 'icon' => 'heroicon-o-cube', 'url' => ProductResource::getUrl()],
                ['title' => 'Productos destacados', 'text' => 'Elige los productos que recibirán a tus visitantes.', 'icon' => 'heroicon-o-star', 'url' => FeaturedProducts::getUrl()],
                ['title' => 'Carrusel del inicio', 'text' => 'Renueva las portadas y define su orden.', 'icon' => 'heroicon-o-photo', 'url' => HeroSlideResource::getUrl()],
                ['title' => 'Imágenes de secciones', 'text' => 'Actualiza historia, galería, Instagram y más.', 'icon' => 'heroicon-o-squares-2x2', 'url' => SectionImageResource::getUrl()],
                ['title' => 'Puntos de venta', 'text' => 'Administra logos, direcciones y ubicaciones.', 'icon' => 'heroicon-o-map-pin', 'url' => LocationResource::getUrl()],
                ['title' => 'Mi cuenta', 'text' => 'Actualiza tus datos y cambia tu contraseña.', 'icon' => 'heroicon-o-lock-closed', 'url' => filament()->getProfileUrl()],
            ],
        ];
    }
}
