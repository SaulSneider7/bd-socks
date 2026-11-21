# React + TypeScript + Vite

## Publicar en bdecostore.com

Sigue [los pasos específicos para tu hosting cPanel](deployment/PASOS-BDECOSTORE.md). La entrega actual está en `deployment/releases/20261121-194649/`, con ambos ZIP, el SQL inicial y las credenciales nuevas. La carpeta pública confirmada es `/home1/emesmaco/bdecostore.com/`; Laravel se instala en `/home1/emesmaco/bd-socks-app/`.

## Desarrollo local con XAMPP (Windows)

Inicia MySQL en XAMPP. Desde la carpeta del proyecto, abre dos terminales:

```bash
# Terminal 1: backend Laravel
npm run dev:api
```

```bash
# Terminal 2: frontend React
npm run dev
```

Abre la URL que indique Vite (normalmente `http://localhost:5173`). Mantén ambas terminales abiertas. El panel está en `http://127.0.0.1:8000/admin`.

El comando `dev:api` usa PHP de `C:/xampp/php/php.exe` y la configuración local `.tools/php.ini`. Las dependencias instaladas del backend requieren PHP 8.4.1 o superior.

Si aparece `http proxy error: /api/content`, comprueba que la terminal del backend siga activa y que `http://127.0.0.1:8000/api/content` responda. Iniciar Apache no inicia el servidor Laravel del puerto 8000.

## Imágenes de productos

Cada producto debe conservar `image` como imagen principal. Para mostrar una galería en el catálogo, agrega `images` con todas las rutas, incluida la principal:

```json
{
  "image": "/producto-principal.webp",
  "images": ["/producto-principal.webp", "/producto-detalle.webp"]
}
```

Si un producto no tiene `images`, el catálogo utiliza únicamente `image`.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
