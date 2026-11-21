<?php

namespace App\Policies;

use App\Models\Location;
use App\Models\MediaImage;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class ContentPolicy
{
    public function viewAny(User $user): bool { return (bool) $user->is_admin; }
    public function view(User $user, Model $record): bool { return (bool) $user->is_admin; }
    public function create(User $user): bool { return (bool) $user->is_admin; }
    public function update(User $user, Model $record): bool { return (bool) $user->is_admin; }
    public function delete(User $user, Model $record): bool
    {
        return $user->is_admin
            && ! ($record instanceof Location && $record->is_primary)
            && ! ($record instanceof MediaImage && $record->section !== 'hero');
    }
    public function deleteAny(User $user): bool { return false; }
    public function reorder(User $user): bool { return (bool) $user->is_admin; }
}
