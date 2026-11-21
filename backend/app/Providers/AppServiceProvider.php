<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\Product;
use App\Models\MediaImage;
use App\Models\Location;
use App\Policies\ContentPolicy;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        foreach ([Product::class, MediaImage::class, Location::class] as $model) {
            Gate::policy($model, ContentPolicy::class);
        }
    }
}
