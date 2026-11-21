<?php

// Run locally only. The generated files are never served by the application.
if (PHP_SAPI !== 'cli') { http_response_code(404); exit; }

$root = dirname(__DIR__);
require $root.'/backend/vendor/autoload.php';
$app = require $root.'/backend/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

if (! is_file($root.'/dist/index.html')) throw new RuntimeException('Primero compila React localmente con npm.cmd run build.');
if (DB::getDriverName() !== 'mysql') throw new RuntimeException('La exportación requiere la conexión MySQL local.');

$release = $root.'/deployment/releases/'.date('Ymd-His');
if (file_exists($release)) throw new RuntimeException('La carpeta de salida ya existe.');
mkdir($release, 0775, true);

function copyTree(string $from, string $to): void
{
    if (! is_dir($to)) mkdir($to, 0775, true);
    foreach (new DirectoryIterator($from) as $entry) {
        if ($entry->isDot() || $entry->isLink() || in_array($entry->getFilename(), ['.gitignore', 'hot'])) continue;
        $target = $to.'/'.$entry->getFilename();
        if ($entry->isDir()) copyTree($entry->getPathname(), $target);
        elseif (! copy($entry->getPathname(), $target)) throw new RuntimeException('No se pudo copiar '.$entry->getPathname());
    }
}

$private = $release.'/bd-socks-app';
$public = $release.'/public_html';
foreach (['app', 'config', 'routes', 'resources', 'database/migrations', 'database/seeders'] as $dir) copyTree($root.'/backend/'.$dir, $private.'/'.$dir);
mkdir($private.'/bootstrap/cache', 0775, true);
copy($root.'/backend/bootstrap/app.php', $private.'/bootstrap/app.php');
copy($root.'/backend/bootstrap/providers.php', $private.'/bootstrap/providers.php');
foreach (['composer.json', 'composer.lock', 'artisan'] as $file) copy($root.'/backend/'.$file, $private.'/'.$file);
foreach (['app/private', 'framework/cache/data', 'framework/sessions', 'framework/views', 'logs'] as $dir) mkdir($private.'/storage/'.$dir, 0775, true);
copyTree($root.'/dist', $public);
foreach (['css', 'js', 'fonts'] as $dir) copyTree($root.'/backend/public/'.$dir, $public.'/'.$dir);
copyTree(Storage::disk('public')->path(''), $public.'/storage');
copy($root.'/deployment/templates/uploads.htaccess', $public.'/storage/.htaccess');
copy($root.'/deployment/templates/index.php', $public.'/index.php');
file_put_contents($public.'/.htaccess', "DirectoryIndex index.php\n".file_get_contents($root.'/backend/public/.htaccess'));

$password = bin2hex(random_bytes(16));
$email = 'admin@bdsocks.local';
$hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
$pdo = DB::connection()->getPdo();
$tables = ['migrations', 'users', 'password_reset_tokens', 'sessions', 'cache', 'cache_locks', 'jobs', 'job_batches', 'failed_jobs', 'products', 'media_images', 'locations'];
$dataTables = ['migrations', 'products', 'media_images', 'locations'];
$sql = "-- BD SOCKS: instalación inicial en una base de datos VACÍA.\n-- No contiene sesiones, contraseñas locales ni datos de prueba.\n-- No volver a importar sobre producción: no es una actualización.\nSET NAMES utf8mb4;\nSET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';\nSET time_zone = '+00:00';\n\n";
$counts = [];
DB::transaction(function () use (&$sql, &$counts, $tables, $dataTables, $pdo, $email, $hash) {
    foreach ($tables as $table) {
        $schema = (array) DB::selectOne('SHOW CREATE TABLE `'.$table.'`');
        $ddl = array_values($schema)[1];
        $sql .= $ddl.";\n\n";
        $rows = in_array($table, $dataTables) ? DB::table($table)->orderBy('id')->get()->map(fn ($row) => (array) $row)->all() : [];
        if ($table === 'users') $rows = [[
            'id' => 1, 'name' => 'Administrador BD SOCKS', 'email' => $email,
            'password' => $hash, 'is_admin' => 1, 'created_at' => gmdate('Y-m-d H:i:s'), 'updated_at' => gmdate('Y-m-d H:i:s'),
        ]];
        $counts[$table] = count($rows);
        foreach ($rows as $row) {
            $columns = implode(', ', array_map(fn ($key) => '`'.$key.'`', array_keys($row)));
            $values = implode(', ', array_map(fn ($value) => $value === null ? 'NULL' : $pdo->quote((string) $value), array_values($row)));
            $sql .= 'INSERT INTO `'.$table.'` ('.$columns.') VALUES ('.$values.");\n";
        }
        $sql .= "\n";
    }
});
file_put_contents($release.'/bd-socks-instalacion.sql', $sql);
$key = 'base64:'.base64_encode(random_bytes(32));
$env = <<<ENV
APP_NAME="BD SOCKS"
APP_ENV=production
APP_KEY=$key
APP_DEBUG=false
APP_URL=https://TU-DOMINIO.com
APP_LOCALE=es
APP_FALLBACK_LOCALE=en
LOG_CHANNEL=single
LOG_LEVEL=error
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=USUARIOCPANEL_bdsocks
DB_USERNAME=USUARIOCPANEL_usuario
DB_PASSWORD="REEMPLAZAR"
SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_SECURE_COOKIE=true
SESSION_SAME_SITE=lax
CACHE_STORE=database
QUEUE_CONNECTION=sync
FILESYSTEM_DISK=public
PUBLIC_UPLOADS_IN_WEBROOT=true
MAIL_MAILER=log
FRONTEND_URL=https://TU-DOMINIO.com

ENV;
file_put_contents($private.'/.env', $env);
file_put_contents($release.'/ACCESO-PRODUCCION.txt', "Correo inicial: $email\nContraseña inicial: $password\n\nAbre https://TU-DOMINIO.com/admin y entra en Mi cuenta para cambiar el correo y la contraseña.\nNo subas este archivo ni el SQL a public_html. Esta cuenta es nueva; no se exportaron usuarios locales.\n");
file_put_contents($release.'/manifest.json', json_encode(['created_at' => gmdate('c'), 'rows' => $counts], JSON_PRETTY_PRINT));
file_put_contents($root.'/.tools/hosting-release.txt', $release);
echo "Preparado: $release\n".json_encode($counts, JSON_UNESCAPED_SLASHES)."\n";
