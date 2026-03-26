import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import { mockEvents } from "@/lib/mock-data";
import { MapPin, Calendar, ExternalLink, Instagram, Music2, Link2 } from "lucide-react";

const sourceIcon = {
  instagram: Instagram,
  tiktok: Music2,
  manual: Link2,
};

const Events = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-14 md:pt-16 pb-tab-bar md:pb-0">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
          <ScrollReveal>
            <h1 className="font-display text-4xl md:text-5xl tracking-tight italic mb-2">Events</h1>
            <p className="text-muted-foreground text-sm max-w-lg mb-4">
              London fashion events, shows, and networking opportunities — pulled from across the internet.
            </p>
            <div className="flex items-center gap-3 mb-12">
              <span className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase">Sources:</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-muted-foreground border border-border px-2 py-0.5">
                <Instagram className="w-3 h-3" /> IG
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-muted-foreground border border-border px-2 py-0.5">
                <Music2 className="w-3 h-3" /> TikTok
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-muted-foreground border border-border px-2 py-0.5">
                <Link2 className="w-3 h-3" /> Manual
              </span>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {mockEvents.map((event, i) => {
              const SourceIcon = sourceIcon[event.source ?? "manual"];
              return (
                <ScrollReveal key={event.id} delay={i * 80}>
                  <a
                    href={event.external_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block overflow-hidden border border-border transition-all duration-300 hover:border-accent/50 hover:-translate-y-1"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                      <img
                        src={event.cover_image}
                        alt={event.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="bg-primary/80 backdrop-blur-sm text-primary-foreground text-[10px] font-mono tracking-wider uppercase px-2.5 py-1">
                          {event.event_type}
                        </span>
                        <span className="bg-background/80 backdrop-blur-sm text-foreground text-[10px] font-mono px-2 py-1 flex items-center gap-1">
                          <SourceIcon className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-display text-xl italic tracking-tight flex items-center gap-2">
                        {event.name}
                        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <div className="flex flex-wrap gap-4 mt-2 text-xs font-mono text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          {new Date(event.date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                  </a>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Events;
