# Instalar BD SOCKS en bdecostore.com

Entrega preparada el 21 de noviembre de 2026. Reemplaza el frontend existente y añade Laravel con una base de datos nueva. No requiere npm ni Composer en el hosting.

## 1. Confirma el destino y guarda una copia

La raíz del dominio confirmada es **`/home1/emesmaco/bdecostore.com/`**. En esta guía la llamamos `CARPETA_DEL_DOMINIO`. Extrae la web allí, no en `public_html`.

Descarga una copia de los archivos actuales, incluidos los ocultos, antes de reemplazarlos. Conserva cualquier configuración especial de tu `.htaccess` (por ejemplo, el bloque de PHP que genera cPanel). Mantén los respaldos fuera de la carpeta pública.

En cPanel → Software → MultiPHP Manager selecciona PHP **8.4** para este dominio. Activa SSL y comprueba que abre `https://bdecostore.com`. Consulta la guía completa `LEEME-PRODUCCION.md` para extensiones y límites de carga.

## 2. Crea la base de datos

En cPanel → Bases de datos MySQL, crea una base nueva y un usuario con contraseña. Asigna ese usuario a la base con todos los privilegios sobre ella. Guarda los nombres completos, incluido el prefijo de cPanel.

En phpMyAdmin, selecciona esa base vacía e importa `bd-socks-instalacion.sql`. Deben aparecer 12 tablas: 24 productos, 23 imágenes de secciones, 11 ubicaciones y 1 administrador. No importes este SQL en otra base con datos.

## 3. Sube Laravel fuera de la carpeta pública

En Administrador de archivos, activa **Mostrar archivos ocultos**. Ve al inicio de tu cuenta, normalmente `/home1/emesmaco`, y extrae allí `backend-privado.zip`.

Debe quedar `/home1/emesmaco/bd-socks-app/.env` y también `vendor`, `app`, `routes` y `storage`. La carpeta `bd-socks-app` debe estar fuera de `public_html` y de `CARPETA_DEL_DOMINIO`.

Edita el `.env` de esa carpeta en el hosting:

```dotenv
DB_HOST=localhost
DB_DATABASE=emesmaco_nombrebase
DB_USERNAME=emesmaco_usuariobase
DB_PASSWORD="TU_CONTRASEÑA_MYSQL"
```

El dominio ya está configurado como `https://bdecostore.com` en `APP_URL` y `FRONTEND_URL`. Conserva la clave `APP_KEY` generada, `APP_DEBUG=false`, `SESSION_SECURE_COOKIE=true` y `PUBLIC_UPLOADS_IN_WEBROOT=true`. Si tu proveedor indica otro servidor MySQL, úsalo en `DB_HOST`.

No copies el `backend/.env` de tu computadora al hosting.

## 4. Reemplaza el frontend

Sube `web-publica.zip` a `CARPETA_DEL_DOMINIO` y extráelo allí. El ZIP contiene los archivos directamente: deben quedar `CARPETA_DEL_DOMINIO/index.php`, `index.html`, `.htaccess`, `assets`, `storage`, `css`, `js` y `fonts`.

El `index.php` incluido ya funciona con tu estructura: `bdecostore.com` y `bd-socks-app` son carpetas hermanas dentro de `/home1/emesmaco`. No necesitas modificarlo. La ruta privada equivalente es:

```php
$basePath = '/home1/emesmaco/bd-socks-app';
```

Conserva `DirectoryIndex index.php` y las reglas de Laravel del nuevo `.htaccess`; no restaures encima las reglas antiguas del frontend. Si tu hosting añadía un bloque de selección de PHP, conserva también ese bloque. Elimina el ZIP público después de extraerlo.

## 5. Comprueba la instalación

Abre estas direcciones:

- https://bdecostore.com/ — portada con productos.
- https://bdecostore.com/catalogo — catálogo; debe funcionar también al recargar.
- https://bdecostore.com/api/content — datos JSON.
- https://bdecostore.com/admin — panel administrativo.

Entra al panel con `ACCESO-PRODUCCION.txt` de esta entrega. Cambia el correo y la contraseña desde **Mi cuenta**. Prueba guardar un cambio y subir una imagen.

Si hay error 500, revisa PHP, los datos MySQL, la ruta `$basePath` y `bd-socks-app/storage/logs/laravel.log`. Si hay 404 en catálogo o panel, revisa que `.htaccess` esté en la carpeta correcta. No actives `APP_DEBUG` en el sitio público.

## Conserva en tu computadora

`ACCESO-PRODUCCION.txt`, el SQL, los ZIP y los respaldos. No subas SQL, contraseñas ni el ZIP privado dentro de la carpeta del dominio.

Para futuras actualizaciones conserva el `.env` de producción, su `APP_KEY`, la base de datos y `storage`. Este SQL es solo para la primera instalación.

Referencias: [selección de PHP en cPanel](https://support.cpanel.net/hc/en-us/articles/4891132637079-How-to-change-PHP-version-for-a-domain) y [Administrador de archivos](https://docs.cpanel.net/cpanel/files/file-manager/110/).
