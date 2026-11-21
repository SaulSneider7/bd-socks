<?php

namespace Database\Seeders;

use App\Models\Location;
use App\Models\MediaImage;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use RuntimeException;

class ContentSeeder extends Seeder
{
    public function run(): void
    {
        $data = json_decode(file_get_contents(__DIR__.'/data/content.json'), true, flags: JSON_THROW_ON_ERROR);
        $source = config('content.import_path');
        $import = function (string $path) use ($source): string {
            $filename = basename($path);
            $target = 'imported/'.$filename;
            if (! Storage::disk('public')->exists($target)) {
                if (! is_file($source.'/'.$filename)) {
                    throw new RuntimeException('Falta la imagen original: '.$filename.' en '.$source);
                }
                Storage::disk('public')->put($target, file_get_contents($source.'/'.$filename));
            }
            return $target;
        };

        DB::transaction(function () use ($data, $import) {
            foreach ($data['products'] as $product) {
                $id = $product['id'];
                unset($product['id']);
                if (Product::find($id)) continue;
                $product['image'] = $import($product['image']);
                $product['images'] = array_map($import, $product['images']);
                Product::firstOrCreate(['id' => $id], $product);
            }
            foreach ($data['media'] as $image) {
                if (MediaImage::where('section', $image['section'])->where('slot', $image['slot'])->exists()) continue;
                $image['path'] = $import($image['path']);
                MediaImage::create($image);
            }
            foreach ($data['locations'] as $index => $location) {
                if (Location::find($index + 1)) continue;
                $location['logo'] = $import($location['logo']);
                Location::firstOrCreate(['id' => $index + 1], [...$location, 'sort_order' => $index]);
            }
            if (! Location::where('is_primary', true)->exists()) {
                $primary = new Location(['title' => 'Nuestra Tienda', 'items' => [
                    ['label' => 'Lima, Perú', 'href' => 'https://www.google.com/maps/search/?api=1&query=Lima%2C%20Peru'],
                ]]);
                $primary->is_primary = true;
                $primary->save();
            }
        });
    }
}
