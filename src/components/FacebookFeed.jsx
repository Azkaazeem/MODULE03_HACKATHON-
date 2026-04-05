import { Button } from './Button';

const fallbackUrl = 'https://www.facebook.com/SaylaniWelfareInternationalTrust';
const pageUrl = import.meta.env.VITE_SMIT_FACEBOOK_PAGE_URL || fallbackUrl;

const pluginUrl = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(pageUrl)}&tabs=timeline&width=500&height=700&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false`;

export const FacebookFeed = () => (
  <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-violet-200">Latest From Facebook</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">Stay connected with updates from the official Saylani page</h2>
      <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
        Students can follow the latest announcements, community highlights, admissions updates, and important notices shared on the official Saylani Welfare International Trust Facebook page.
      </p>
      <div className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
        <p>See recent posts without leaving the portal.</p>
        <p>Follow announcements that may be useful for admissions and student guidance.</p>
        <p>Open the full page anytime for more updates and community activity.</p>
      </div>
      <div className="mt-6">
        <a href={pageUrl} rel="noreferrer" target="_blank">
          <Button>Open Official Facebook Page</Button>
        </a>
      </div>
    </div>

    <div className="overflow-hidden border border-white/8 bg-slate-950/30 p-3 sm:p-4">
      <iframe
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        className="min-h-[700px] w-full border-0 bg-white"
        loading="lazy"
        scrolling="no"
        src={pluginUrl}
        title="Saylani Facebook Page Feed"
      />
    </div>
  </div>
);
