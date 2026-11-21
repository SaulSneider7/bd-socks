<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name', 'price', 'description', 'image', 'images', 'sizes', 'is_featured', 'is_active'];

    protected function casts(): array
    {
        return ['price' => 'decimal:2', 'images' => 'array', 'sizes' => 'array', 'is_featured' => 'boolean', 'is_active' => 'boolean'];
    }
}
