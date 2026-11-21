<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ProductionRoutingTest extends TestCase
{
    public function test_compiled_frontend_is_served_without_intercepting_other_routes(): void
    {
        Storage::fake('deployment-test');
        $disk = Storage::disk('deployment-test');
        $disk->put('index.html', '<html><body>BD SOCKS production</body></html>');
        $this->app->usePublicPath($disk->path(''));
        $this->get('/')->assertOk()->assertHeader('Content-Type', 'text/html; charset=utf-8');
        $this->get('/catalogo')->assertOk();
        $this->get('/missing-page')->assertNotFound();
        $this->get('/api/missing')->assertNotFound();
        // Laravel's private local-disk route rejects unsigned storage requests.
        $this->get('/storage/missing.jpg')->assertForbidden();
    }
}
