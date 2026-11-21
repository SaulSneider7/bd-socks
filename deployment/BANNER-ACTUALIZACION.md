# Banner de campaña

En el panel, abre **Banner de campaña**. Sube una imagen horizontal y pulsa **Guardar banner**. Se muestra en el inicio, debajo del menú y encima del hero, a todo el ancho de la página. Es una sola imagen, sin carrusel. Una carga nueva reemplaza la selección anterior.

- Formatos: JPG, PNG o WebP, hasta 5 MB.
- Tamaño sugerido: 1920 × 480 px. No es obligatorio: se respeta la proporción original y no se recorta la imagen en móviles.
- La descripción es opcional y sirve como texto alternativo accesible.
- Desactiva **Mostrar banner en la página** para ocultarlo al terminar una campaña.
- Sin imagen o con el banner desactivado, la sección no ocupa espacio.
- La vista previa aparece al seleccionar el archivo, antes de subirlo. Pulsa **Guardar banner** para enviar la imagen. La página se recarga y confirma **Banner guardado correctamente**. Si hay un error, se muestra en el formulario; vuelve a seleccionar el archivo antes de reintentar.

## Actualizar el hosting sin terminal

La actualización está en `deployment/updates/banner-campana.zip`. Haz primero una copia de los archivos actuales.

1. Sube el ZIP a la carpeta principal de la cuenta de cPanel, donde están **bd-socks-app** y **public_html**.
2. Extráelo allí y permite reemplazar los archivos incluidos. Contiene ambas carpetas, con únicamente el código modificado y los nuevos archivos compilados de React.
3. No cambia `.env`, contraseñas, base de datos, dependencias ni imágenes subidas. **No hay que importar SQL ni ejecutar migraciones**: el banner utiliza la tabla `media_images` existente y crea su registro cuando guardas la primera imagen.
4. Abre `/admin/campaign-banner`, sube la imagen, guarda y recarga la página de inicio. Si el navegador conserva la página anterior, recarga con Ctrl+F5.
5. Si el dominio usa otra carpeta pública, extrae primero en una carpeta temporal privada y copia el contenido de `public_html` a la raíz pública real; copia también los archivos de `bd-socks-app` a la carpeta privada correspondiente.

Este ZIP actualiza la entrega inicial preparada en esta conversación. Si todavía no publicaste la web, instala primero los paquetes completos y luego aplica esta actualización. No reemplaces una carpeta completa borrando su contenido: combina los archivos incluidos para conservar `.env`, `vendor` e imágenes.
