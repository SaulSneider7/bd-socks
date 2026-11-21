<?php

namespace App\Http\Controllers;

use App\Models\MediaImage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\ValidationException;

class CampaignBannerController extends Controller
{
    public function __invoke(Request $request): RedirectResponse
    {
        if (! $request->user()) return redirect('/admin/login');
        Gate::authorize('create', MediaImage::class);
        $banner = MediaImage::where('section', 'banner')->where('slot', 1)->first();
        $data = $request->validate([
            'banner_image' => [$banner ? 'nullable' : 'required', 'image', 'mimetypes:image/jpeg,image/png,image/webp', 'max:5120'],
            'alt' => ['nullable', 'string', 'max:255'],
            'is_active' => ['required', 'boolean'],
        ], [
            'banner_image.required' => 'Selecciona una imagen antes de guardar.',
            'banner_image.image' => 'El archivo debe ser una imagen válida.',
            'banner_image.mimetypes' => 'Selecciona una imagen JPG, PNG o WebP.',
            'banner_image.max' => 'La imagen no puede superar los 5 MB.',
            'banner_image.uploaded' => 'No se pudo recibir la imagen. Selecciónala nuevamente.',
        ]);
        $values = ['alt' => ($data['alt'] ?? null) ?: 'Promoción BD SOCKS', 'is_active' => $request->boolean('is_active')];
        if ($request->hasFile('banner_image')) {
            $path = $request->file('banner_image')->storePublicly('uploads', 'public');
            if (! $path) throw ValidationException::withMessages(['banner_image' => 'No se pudo guardar la imagen. Revisa los permisos de la carpeta de imágenes.']);
            $values['path'] = $path;
        }
        MediaImage::updateOrCreate(['section' => 'banner', 'slot' => 1], $values);
        return redirect('/admin/campaign-banner')->with('banner_saved', 'Banner guardado correctamente.');
    }
}
