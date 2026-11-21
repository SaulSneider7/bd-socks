<?php

namespace App\Http\Controllers;

use App\Models\Location;
use App\Models\MediaImage;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class ContentController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $url = fn (?string $path) => $path ? Storage::disk('public')->url($path) : null;
        $media = MediaImage::where('is_active', true)->orderBy('sort_order')->orderBy('id')->get();
        $locations = Location::where('is_active', true)->orderBy('sort_order')->orderBy('id')->get();
        $formatLocation = fn (Location $location) => [
            'id' => $location->id, 'title' => $location->title,
            'logo' => $url($location->logo), 'items' => $location->items,
        ];

        return response()->json([
            'products' => Product::where('is_active', true)->orderBy('id')->get()->map(fn (Product $product) => [
                'id' => $product->id, 'name' => $product->name,
                'price' => (float) $product->price, 'description' => $product->description ?? '',
                'image' => $url($product->image),
                'images' => collect([$product->image, ...($product->images ?? [])])->filter()->unique()->map($url)->values(),
                'sizes' => $product->sizes ?? [], 'is_featured' => $product->is_featured,
            ]),
            'heroSlides' => $media->where('section', 'hero')->map(fn ($image) => [
                'id' => $image->id, 'src' => $url($image->path), 'alt' => $image->alt,
            ])->values(),
            'images' => (object) $media->where('section', '!=', 'hero')->mapWithKeys(fn ($image) => [
                $image->section.'.'.$image->slot => ['src' => $url($image->path), 'alt' => $image->alt],
            ])->all(),
            'locations' => $locations->where('is_primary', false)->map($formatLocation)->values(),
            'mainLocation' => ($primary = $locations->firstWhere('is_primary', true)) ? $formatLocation($primary) : null,
        ])->header('Cache-Control', 'no-store');
    }
}
