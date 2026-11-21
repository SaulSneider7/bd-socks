import { useContent } from '../content/ContentContext';

export default function CampaignBanner() {
  const banner = useContent().images['banner.1'];
  if (!banner?.src) return null;

  return (
    <section className="w-full pt-20" aria-label="Campaña especial">
      <img
        src={banner.src}
        alt={banner.alt || 'Promoción BD SOCKS'}
        className="block h-auto w-full"
        fetchPriority="high"
        decoding="async"
      />
    </section>
  );
}
