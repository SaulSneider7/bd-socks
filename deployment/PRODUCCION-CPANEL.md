# Publicar BD SOCKS en cPanel sin terminal

Este paquete sirve React y Laravel en **el mismo dominio**: la web en `/`, el catálogo en `/catalogo`, el panel en `/admin` y los datos en `/api/content`. Todos los pasos del hosting se hacen con cPanel, el Administrador de archivos y phpMyAdmin. No necesitas ejecutar Composer, npm, Artisan ni `storage:link` en el servidor.

## 1. Archivos que vas a usar

En la carpeta de entrega `deployment/releases/FECHA-HORA/` encontrarás:

| Archivo | Uso |
| --- | --- |
| `bd-socks-instalacion.sql` | Importar en una base de datos **nueva y vacía** mediante phpMyAdmin. |
| `backend-privado.zip` | Extraer en la carpeta principal de tu cuenta, **fuera de public_html**. Incluye Laravel, sus dependencias de producción y `.env`. |
| `web-publica.zip` | Extraer **dentro de public_html**. Incluye React compilado, el acceso a Laravel, los estilos del panel y las imágenes. |
| `ACCESO-PRODUCCION.txt` | Correo y contraseña iniciales del administrador. Conservar en tu computadora. |

El SQL contiene la estructura, el contenido actual y un administrador nuevo. No contiene las sesiones, la caché ni las contraseñas de los administradores locales. **Es para la primera instalación**, no para actualizar una tienda que ya tiene datos. No incluye `DROP TABLE` ni `CREATE DATABASE`: la base la creas en cPanel.

## 2. Preparar el hosting

1. En cPanel, confirma que el dominio usa **PHP 8.4**. Esta entrega y su archivo `composer.lock` fueron preparados con PHP 8.4; no basta con seleccionar PHP 8.2 o 8.3.
2. Confirma las extensiones `intl`, `mbstring`, `pdo_mysql`, `fileinfo`, `openssl`, `curl`, `dom`, `xml`, `xmlreader`, `xmlwriter`, `simplexml`, `zip`, `iconv`, `ctype`, `tokenizer` y `session`. `gd` permite el procesamiento de imágenes. Para cargas de hasta 5 MB por imagen, usa `upload_max_filesize` de al menos `8M` y `post_max_size` de al menos `16M`; si no puedes cambiarlos en cPanel, solicita esos valores al soporte.
3. Activa el certificado SSL del dominio. La configuración de esta entrega requiere **HTTPS** para iniciar sesión.
4. Guarda una copia de la web y base de datos anteriores antes de reemplazar archivos. Haz el cambio en un horario de poco tráfico: no es un despliegue sin interrupciones.

## 3. Crear e importar la base de datos

1. Abre **Bases de datos MySQL** o **Administrar mis bases de datos** en cPanel.
2. Crea una base nueva, por ejemplo `bdsocks`. cPanel puede añadir un prefijo: `micuenta_bdsocks`.
3. Crea un usuario MySQL con contraseña fuerte y asígnalo a esa base con **todos los privilegios sobre esa base**. Anota los nombres completos con sus prefijos.
4. Abre **phpMyAdmin**, selecciona esa base vacía y pulsa **Importar**.
5. Selecciona `bd-socks-instalacion.sql`, conserva el formato SQL y la codificación UTF-8, y ejecuta la importación.
6. Verifica que aparezcan 12 tablas. Consulta `manifest.json` de tu entrega para los recuentos exactos: la entrega del 21 de noviembre de 2026 contiene 24 registros en `products`, 23 en `media_images`, 11 en `locations` y 1 en `users`. La API pública puede mostrar menos registros porque filtra los desactivados.

Si aparece “Table already exists”, no continúes importando encima: revisa que seleccionaste una base vacía. El importador no borra tus tablas anteriores y una importación SQL puede quedar parcial si falla.

## 4. Subir los archivos privados

1. Abre **Administrador de archivos → Configuración → Mostrar archivos ocultos**.
2. Ve a la carpeta principal de tu cuenta. Habitualmente es `/home/TU_USUARIO/`; allí está `public_html`.
3. Sube `backend-privado.zip` **a esa carpeta principal**, no a `public_html`.
4. Extráelo. Debe quedar `/home/TU_USUARIO/bd-socks-app/`, con `app`, `bootstrap`, `config`, `vendor`, `storage` y `.env` en su interior.

La estructura final será:

```text
/home/TU_USUARIO/
├── bd-socks-app/              ← privado
│   ├── .env
│   ├── app/
│   ├── bootstrap/cache/
│   ├── config/
│   ├── resources/
│   ├── routes/
│   ├── storage/
│   └── vendor/
└── public_html/               ← raíz del dominio
    ├── .htaccess
    ├── index.php
    ├── index.html
    ├── assets/
    ├── css/
    ├── js/
    ├── fonts/
    └── storage/              ← imágenes públicas, carpeta normal
```

No subas `.tools`, `node_modules`, archivos SQL, contraseñas ni la carpeta completa del repositorio dentro de `public_html`.

## 5. Configurar `.env` con el editor de cPanel

Dentro de `bd-socks-app`, selecciona `.env` y pulsa **Editar**. Cambia estos valores:

```dotenv
APP_URL=https://tudominio.com
FRONTEND_URL=https://tudominio.com
DB_HOST=localhost
DB_DATABASE=micuenta_bdsocks
DB_USERNAME=micuenta_usuario
DB_PASSWORD="TU_CONTRASEÑA_MYSQL"
```

Usa el dominio exacto con el que accederás: con `www` si esa es tu dirección principal, sin barra al final. Si HostGator te indica otro servidor de base de datos, usa ese valor en `DB_HOST`. No confundas la contraseña MySQL con la del panel administrativo.

Conserva el resto de la configuración, especialmente:

```dotenv
APP_ENV=production
APP_DEBUG=false
SESSION_SECURE_COOKIE=true
PUBLIC_UPLOADS_IN_WEBROOT=true
QUEUE_CONNECTION=sync
```

**`APP_KEY` ya contiene una clave nueva de producción. No la borres ni la reemplaces con la clave local.** Consérvala también en futuras actualizaciones. No se incluyen cachés de configuración ni rutas de Windows, por lo que los cambios de `.env` se leen sin comandos de terminal.

## 6. Subir la web pública

1. Después de respaldar la web anterior, abre `public_html`.
2. Sube `web-publica.zip` y extráelo **dentro de esa carpeta**. Debes ver `public_html/index.php`, no `public_html/public_html/index.php`.
3. Revisa que se hayan extraído `.htaccess` y `storage/.htaccess`, además de las carpetas `css`, `js`, `fonts`, `assets` y `storage`.
4. Retira el ZIP después de extraerlo para que no quede disponible para descarga desde la web.

El `index.php` de esta entrega busca Laravel en la carpeta hermana `bd-socks-app`. No lo sustituyas por el `backend/public/index.php` del desarrollo local.

Si tu dominio apunta a una carpeta distinta a `public_html` o es un dominio adicional, conserva `bd-socks-app` fuera de cualquier raíz pública y ajusta en el `index.php` público esta línea a su ruta absoluta real:

```php
$basePath = '/home/TU_USUARIO/bd-socks-app';
```

La carpeta pública de imágenes se resuelve automáticamente desde la ubicación de `index.php`; **no debes crear un enlace simbólico**. Las imágenes ya existentes y las nuevas cargas estarán en esa misma carpeta `storage`.

## 7. Permisos

Usa normalmente `755` en carpetas y `644` en archivos. Laravel necesita poder escribir en `bd-socks-app/storage`, `bd-socks-app/bootstrap/cache` y `public_html/storage`. Si aparece un error de permisos, pide al soporte que confirme propietario y permisos de escritura para el proceso PHP; no cambies todo a `777`.

## 8. Comprobar la publicación

1. Abre `https://tudominio.com/`: deben aparecer la portada y los productos.
2. Abre directamente `https://tudominio.com/catalogo` y recarga la página. Debe cargar el catálogo, sin error 404.
3. Abre `https://tudominio.com/api/content`: debe devolver JSON con productos e imágenes cuyas direcciones correspondan a tu dominio.
4. Abre `https://tudominio.com/admin`. Inicia sesión con los datos de **ACCESO-PRODUCCION.txt**, no con el archivo de acceso local.
5. En **Mi cuenta**, cambia el correo inicial por tu correo real y define tu contraseña. No hay envío de correos de recuperación configurado en esta entrega.
6. Comprueba que se ven las miniaturas. Cambia una selección de destacados, guarda y recarga el inicio para verificarla.
7. Sube una imagen de prueba y comprueba su previsualización y publicación. Si luego la reemplazas, conserva las imágenes originales para poder restaurarla.

## Errores frecuentes

| Problema | Qué revisar en cPanel |
| --- | --- |
| Error 500 | PHP 8.4, extensiones, `vendor`, permisos y `bd-socks-app/storage/logs/laravel.log`. Mantén `APP_DEBUG=false`. |
| “Failed opening required … autoload.php” | La carpeta `bd-socks-app` no está donde la busca `public_html/index.php` o falta `vendor`. |
| “Access denied” / conexión MySQL | Nombre completo de base y usuario, contraseña, `DB_HOST` y usuario asignado a la base. |
| Error 419 al entrar | Usa HTTPS, verifica `APP_URL`, borra las cookies del sitio e intenta de nuevo. |
| Imágenes no visibles | `PUBLIC_UPLOADS_IN_WEBROOT=true`, `APP_URL` correcto y carpeta pública `storage/imported` presente. |
| Cargas rechazadas | Formato JPG/PNG/WebP, máximo 5 MB, límites PHP y permisos en `storage`. |
| `/catalogo` o `/admin` devuelve 404 | `.htaccess` extraído en la raíz pública correcta y reescritura Apache habilitada. |
| El panel no tiene estilos | Subida completa de `css`, `js` y `fonts`; comprobar que sus URLs abren sin error. |

## Actualizaciones posteriores

Esta entrega es una foto del contenido local al prepararla. No vuelvas a importar este SQL sobre una base que ya editaste en producción. Conserva siempre el `.env` de producción, su `APP_KEY`, la base de datos y las imágenes de `public_html/storage`. Para futuras modificaciones del esquema habrá que preparar un SQL de actualización específico. Las actualizaciones de contenido desde el panel no requieren subir nuevos ZIP ni recompilar React.

## Referencias oficiales

- [cPanel: cambiar la versión de PHP del dominio](https://support.cpanel.net/hc/en-us/articles/4891132637079-How-to-change-PHP-version-for-a-domain).
- [cPanel: Administrador de archivos](https://docs.cpanel.net/cpanel/files/file-manager/110/).
- [HostGator: importar una base con phpMyAdmin](https://soporte.hostgator.mx/hc/es-419/articles/28438738143891-C%C3%B3mo-importar-una-base-de-datos-a-trav%C3%A9s-de-phpMyAdmin).
- [HostGator: Administrador de archivos y extracción de ZIP](https://soporte.hostgator.mx/hc/es-419/articles/28443083438099--Cu%C3%A1les-son-las-funcionalidades-del-Administrador-de-archivos-de-cPanel).
- [Laravel: despliegue y separación del directorio público](https://laravel.com/framework/docs/13.x/deployment).

## Regenerar la entrega en la computadora de desarrollo

Los scripts `deployment/prepare.php` y `deployment/package.php` se ejecutan **solo en tu computadora**, nunca desde una URL. `prepare.php` requiere compilar antes React con `VITE_CONTENT_API_URL=/api/content`; exporta la base MySQL local y prepara una carpeta nueva en `deployment/releases`. Allí se instalan las dependencias con Composer `install --no-dev --no-scripts --optimize-autoloader` y se ejecuta `artisan package:discover`. Finalmente `package.php` genera ambos ZIP. Cada entrega inicial genera una contraseña y una `APP_KEY` nuevas: no utilizarlas para reemplazar las de un sitio ya instalado.
