<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CampaignBannerController;

Route::post('/admin/campaign-banner/save', CampaignBannerController::class)
    ->middleware('throttle:20,1')->name('campaign-banner.save');

Route::get('/{path?}', function () {
    $index = public_path('index.html');
    return is_file($index)
        ? response()->file($index, ['Cache-Control' => 'no-cache'])
        : redirect('/admin');
})->where('path', 'catalogo');
