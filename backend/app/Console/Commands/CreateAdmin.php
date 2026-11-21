<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class CreateAdmin extends Command
{
    protected $signature = 'admin:create';
    protected $description = 'Crear un administrador sin contraseñas predeterminadas';

    public function handle(): int
    {
        $data = [
            'name' => $this->ask('Nombre'),
            'email' => $this->ask('Correo electrónico'),
            'password' => $this->secret('Contraseña (mínimo 12 caracteres)'),
            'password_confirmation' => $this->secret('Repite la contraseña'),
        ];
        $validator = Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'confirmed', Password::min(12)],
        ]);
        if ($validator->fails()) {
            foreach ($validator->errors()->all() as $error) $this->error($error);
            return self::FAILURE;
        }
        unset($data['password_confirmation']);
        $user = new User($data);
        $user->is_admin = true;
        $user->save();
        $this->info('Administrador creado. Accede a /admin.');
        return self::SUCCESS;
    }
}
