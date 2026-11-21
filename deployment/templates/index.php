<?php

use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// public_html and bd-socks-app must be siblings in the cPanel account home.
$basePath = dirname(__DIR__).'/bd-socks-app';
if (file_exists($maintenance = $basePath.'/storage/framework/maintenance.php')) {
    require $maintenance;
}
require $basePath.'/vendor/autoload.php';
$app = require $basePath.'/bootstrap/app.php';
$app->usePublicPath(__DIR__);
$app->handleRequest(Request::capture());
