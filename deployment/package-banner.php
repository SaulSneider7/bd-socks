<?php

if (PHP_SAPI !== 'cli') { http_response_code(404); exit; }
$root = dirname(__DIR__);
$destination = __DIR__.'/updates';
if (! is_dir($destination)) mkdir($destination, 0775, true);
if (! is_file($root.'/dist/index.html')) throw new RuntimeException('Compila primero React.');
$zip = new ZipArchive;
if ($zip->open($destination.'/banner-campana.zip', ZipArchive::CREATE | ZipArchive::OVERWRITE) !== true) throw new RuntimeException('No se pudo crear el ZIP.');
foreach ([
    'app/Filament/Pages/CampaignBanner.php',
    'app/Http/Controllers/CampaignBannerController.php',
    'routes/web.php',
    'app/Filament/Pages/Dashboard.php',
    'app/Filament/Resources/SectionImageResource.php',
    'app/Models/MediaImage.php',
    'resources/views/filament/pages/campaign-banner.blade.php',
] as $file) $zip->addFile($root.'/backend/'.$file, 'bd-socks-app/'.$file);
$zip->addFile($root.'/dist/index.html', 'public_html/index.html');
foreach (new RecursiveIteratorIterator(new RecursiveDirectoryIterator($root.'/dist/assets', FilesystemIterator::SKIP_DOTS)) as $file) {
    if ($file->isFile()) $zip->addFile($file->getPathname(), 'public_html/assets/'.str_replace('\\', '/', substr($file->getPathname(), strlen($root.'/dist/assets') + 1)));
}
if (! $zip->close()) throw new RuntimeException('No se pudo finalizar el ZIP.');
echo $destination.'/banner-campana.zip'."\n";
