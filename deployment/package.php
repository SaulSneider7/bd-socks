<?php

if (PHP_SAPI !== 'cli') { http_response_code(404); exit; }
$root = dirname(__DIR__);
$release = trim(file_get_contents($root.'/.tools/hosting-release.txt'));
if (! is_file($release.'/bd-socks-app/vendor/autoload.php')) throw new RuntimeException('Instala primero las dependencias de producción.');
if (! is_file($release.'/bd-socks-app/bootstrap/cache/packages.php')) throw new RuntimeException('Ejecuta package:discover en el backend preparado.');
foreach (['backend-privado.zip' => ['bd-socks-app', 'bd-socks-app/'], 'web-publica.zip' => ['public_html', '']] as $name => [$directory, $prefix]) {
    $zip = new ZipArchive;
    if ($zip->open($release.'/'.$name, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== true) throw new RuntimeException('No se pudo crear '.$name);
    $source = $release.'/'.$directory;
    $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($source, FilesystemIterator::SKIP_DOTS), RecursiveIteratorIterator::SELF_FIRST);
    foreach ($files as $file) {
        if ($file->isLink()) throw new RuntimeException('El paquete no debe contener enlaces: '.$file->getPathname());
        $relative = $prefix.str_replace('\\', '/', substr($file->getPathname(), strlen($source) + 1));
        // Keep writable directories, never package local logs, sessions or compiled views.
        if ($file->isFile() && str_starts_with($relative, 'bd-socks-app/storage/')) continue;
        if ($file->isDir()) $zip->addEmptyDir($relative);
        else $zip->addFile($file->getPathname(), $relative);
    }
    if (! $zip->close()) throw new RuntimeException('Error cerrando '.$name);
    echo $name.': '.round(filesize($release.'/'.$name) / 1048576, 2)." MB\n";
}
copy($root.'/deployment/PRODUCCION-CPANEL.md', $release.'/LEEME-PRODUCCION.md');
$checksums = [];
foreach (['backend-privado.zip', 'web-publica.zip', 'bd-socks-instalacion.sql'] as $file) $checksums[] = hash_file('sha256', $release.'/'.$file).'  '.$file;
file_put_contents($release.'/SHA256SUMS.txt', implode("\n", $checksums)."\n");
