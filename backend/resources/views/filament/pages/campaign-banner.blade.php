<x-filament-panels::page>
    <x-filament::section heading="Una imagen para cada ocasión" description="Selecciona la imagen, revisa la vista previa y guarda para publicarla.">
        @if (session('banner_saved'))
            <p role="status" style="padding:12px;background:#e8eee5;border-radius:10px;margin-bottom:20px">{{ session('banner_saved') }}</p>
        @endif
        <form method="POST" action="{{ route('campaign-banner.save', absolute: false) }}" enctype="multipart/form-data"
            class="space-y-6"
            x-data="{
                preview: null,
                error: '',
                choose(event) {
                    if (this.preview) URL.revokeObjectURL(this.preview);
                    this.preview = null;
                    this.error = '';
                    const file = event.target.files[0];
                    if (!file) return;
                    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
                        this.error = 'Selecciona una imagen JPG, PNG o WebP.';
                    } else if (file.size > 5 * 1024 * 1024) {
                        this.error = 'La imagen no puede superar los 5 MB.';
                    } else {
                        this.preview = URL.createObjectURL(file);
                    }
                    if (this.error) event.target.value = '';
                },
                destroy() { if (this.preview) URL.revokeObjectURL(this.preview); }
            }">
            @csrf
            <div class="space-y-3">
                <label for="campaign-banner-upload" class="fi-fo-field-label-content">Imagen de portada del banner</label>
                <input id="campaign-banner-upload" name="banner_image" type="file"
                    accept="image/jpeg,image/png,image/webp" x-on:change="choose($event)"
                    aria-describedby="banner-help banner-error" class="block w-full"
                    style="display:block;width:100%;padding:14px;border:1px solid #cbd5c6;border-radius:10px;background:#f5f6f2" />
                <p id="banner-help">JPG, PNG o WebP, máximo 5 MB. Recomendado: 1920 × 480 px.</p>
                <p role="alert" x-show="error" x-text="error" x-cloak></p>
                @error('banner_image') <p id="banner-error" role="alert">{{ $message }} Vuelve a seleccionar el archivo.</p> @enderror
                <template x-if="preview">
                    <div><img x-bind:src="preview" alt="Vista previa de la imagen seleccionada" style="max-height:240px;max-width:100%;object-fit:contain;border-radius:12px" /><p>Imagen seleccionada. Pulsa Guardar banner para publicarla.</p></div>
                </template>
                @if ($banner?->path)
                    <img x-show="!preview" src="{{ \Illuminate\Support\Facades\Storage::disk('public')->url($banner->path) }}" alt="Banner guardado actualmente" style="max-height:240px;max-width:100%;object-fit:contain;border-radius:12px" />
                @endif
            </div>
            <div class="space-y-3">
                <label for="banner-alt">Descripción de la imagen (opcional)</label>
                <input id="banner-alt" name="alt" type="text" maxlength="255" value="{{ old('alt', $banner?->alt ?? 'Promoción BD SOCKS') }}" style="display:block;width:100%;padding:12px;border:1px solid #cbd5c6;border-radius:10px" />
                @error('alt') <p role="alert">{{ $message }}</p> @enderror
            </div>
            <input type="hidden" name="is_active" value="0" />
            <label style="display:flex;gap:10px;align-items:center">
                <input name="is_active" type="checkbox" value="1" @checked(old('is_active', $banner?->is_active ?? true)) />
                Mostrar banner en la página
            </label>
            @error('is_active') <p role="alert">{{ $message }}</p> @enderror
            <x-filament::button type="submit" :loading-indicator="false" x-bind:disabled="Boolean(error)">Guardar banner</x-filament::button>
        </form>
    </x-filament::section>
</x-filament-panels::page>
