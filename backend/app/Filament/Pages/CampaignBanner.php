<?php

namespace App\Filament\Pages;

use App\Models\MediaImage;
use Filament\Pages\Page;

class CampaignBanner extends Page
{
    protected static ?string $title = 'Banner de campaña';
    protected static ?int $navigationSort = 3;
    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-megaphone';
    protected string $view = 'filament.pages.campaign-banner';

    public static function canAccess(): bool { return (bool) auth()->user()?->is_admin; }

    protected function getViewData(): array
    {
        return ['banner' => MediaImage::where('section', 'banner')->where('slot', 1)->first()];
    }
}
