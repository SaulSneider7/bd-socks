<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $fillable = ['title', 'logo', 'items', 'sort_order', 'is_active'];

    protected function casts(): array
    {
        return ['items' => 'array', 'is_active' => 'boolean', 'is_primary' => 'boolean', 'sort_order' => 'integer'];
    }
}
