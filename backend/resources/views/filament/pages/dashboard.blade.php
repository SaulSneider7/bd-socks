<x-filament-panels::page>
    <section class="bd-welcome">
        <div><p class="bd-eyebrow">TU MARCA, EN TUS MANOS</p><h2>Bienvenido, {{ auth()->user()->name }}</h2><p>Todo lo que necesitas para mantener tu página al día.</p></div>
        <span class="bd-welcome-mark" aria-hidden="true">BD</span>
    </section>
    <div class="bd-stats">
        @foreach ($stats as $stat)
            <div class="bd-stat"><span>{{ $stat['label'] }}</span><strong>{{ $stat['value'] }}</strong></div>
        @endforeach
    </div>
    <div class="bd-section-heading"><h2>Administra tu página</h2><p>Selecciona una sección para comenzar.</p></div>
    <div class="bd-modules">
        @foreach ($modules as $module)
            <a class="bd-module" href="{{ $module['url'] }}">
                <span class="bd-module-icon"><x-filament::icon :icon="$module['icon']" /></span>
                <h3>{{ $module['title'] }}</h3><p>{{ $module['text'] }}</p><span class="bd-module-action">Administrar <span aria-hidden="true">→</span></span>
            </a>
        @endforeach
    </div>
</x-filament-panels::page>
