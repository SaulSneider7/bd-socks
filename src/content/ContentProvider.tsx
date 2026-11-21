import { useEffect, useState, type ReactNode } from 'react';
import { ContentContext, type SiteContent } from './ContentContext';

export default function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    let mounted = true;
    const endpoint = import.meta.env.VITE_CONTENT_API_URL || '/api/content';

    fetch(endpoint, { signal: controller.signal, headers: { Accept: 'application/json' }, cache: 'no-store' })
      .then(async (response) => {
        if (!response.ok) throw new Error('No se pudo cargar el contenido');
        const data = await response.json();
        if (!Array.isArray(data.products) || !Array.isArray(data.heroSlides) || !Array.isArray(data.locations) || !data.images) {
          throw new Error('Respuesta de contenido inválida');
        }
        if (mounted) setContent(data);
      })
      .catch(() => { if (mounted) setError(true); })
      .finally(() => window.clearTimeout(timeout));

    return () => { mounted = false; window.clearTimeout(timeout); controller.abort(); };
  }, [attempt]);

  if (content) return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;

  return (
    <main className="min-h-screen bg-[#F9F7F2] flex items-center justify-center p-8 text-center">
      <div role={error ? 'alert' : 'status'}>
        <p className="font-serif text-3xl mb-4">BD SOCKS</p>
        <p>{error ? 'No pudimos cargar la página. Inténtalo de nuevo en un momento.' : 'Cargando colección…'}</p>
        {error && <button type="button" className="mt-6 bg-[#4A5D4E] text-white rounded-full px-6 py-3" onClick={() => { setError(false); setAttempt((value) => value + 1); }}>Volver a intentar</button>}
      </div>
    </main>
  );
}
