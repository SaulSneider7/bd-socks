<?php

if (PHP_SAPI !== 'cli') { http_response_code(404); exit; }
$root = dirname(__DIR__);
$release = trim(file_get_contents($root.'/.tools/hosting-release.txt'));
require $root.'/backend/vendor/autoload.php';
$app = require $root.'/backend/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
$config = config('database.connections.mysql');
$database = 'bd_socks_verify_'.gmdate('Ymd_His');
$pdo = Illuminate\Support\Facades\DB::connection()->getPdo();
$pdo->exec('CREATE DATABASE `'.$database.'` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
$test = new PDO('mysql:host='.$config['host'].';port='.$config['port'].';dbname='.$database.';charset=utf8mb4', $config['username'], $config['password'], [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
$test->exec(file_get_contents($release.'/bd-socks-instalacion.sql'));
$manifest = json_decode(file_get_contents($release.'/manifest.json'), true, flags: JSON_THROW_ON_ERROR);
foreach ($manifest['rows'] as $table => $count) {
    $actual = (int) $test->query('SELECT COUNT(*) FROM `'.$table.'`')->fetchColumn();
    if ($count !== $actual) throw new RuntimeException("Diferencia de registros en $table");
}
$paths = [];
foreach ($test->query('SELECT image, images FROM products')->fetchAll(PDO::FETCH_ASSOC) as $product) {
    $paths[] = $product['image'];
    array_push($paths, ...(json_decode($product['images'] ?: '[]', true)));
}
array_push($paths, ...$test->query('SELECT path FROM media_images')->fetchAll(PDO::FETCH_COLUMN));
array_push($paths, ...$test->query('SELECT logo FROM locations WHERE logo IS NOT NULL')->fetchAll(PDO::FETCH_COLUMN));
foreach (array_unique($paths) as $path) {
    if (! is_file($release.'/public_html/storage/'.$path)) throw new RuntimeException('Falta imagen: '.$path);
}
preg_match('/Contraseña inicial: (.+)/u', file_get_contents($release.'/ACCESO-PRODUCCION.txt'), $matches);
$hash = $test->query('SELECT password FROM users WHERE id = 1')->fetchColumn();
if (! password_verify(trim($matches[1]), $hash)) throw new RuntimeException('Credenciales de producción inconsistentes');
$manifest['verification'] = ['database' => $database, 'sql_import' => 'passed', 'image_files' => count(array_unique($paths)), 'admin_password_hash' => 'passed'];
file_put_contents($release.'/manifest.json', json_encode($manifest, JSON_PRETTY_PRINT));
echo 'Importación verificada en '.$database.'. Imágenes comprobadas: '.count(array_unique($paths))."\n";
