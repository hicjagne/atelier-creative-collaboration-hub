import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import { mockEvents } from "@/lib/mock-data";
import { MapPin, Calendar, ExternalLink } from "lucide-react";

const Events = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <ScrollReveal>
            <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-4">Events</h1>
            <p className="text-muted-foreground max-w-lg mb-16">
              London fashion events, shows, and networking opportunities.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {mockEvents.map((event, i) => (
              <ScrollReveal key={event.id} delay={i * 80}>
                <a
                  href={event.external_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden transition-shadow duration-300 hover:shadow-lg"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                    <img
                      src={event.cover_image}
                      alt={event.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-background/90 backdrop-blur-sm text-foreground text-xs tracking-wider uppercase px-3 py-1.5">
                        {event.event_type}
                      </span>
                    </div>
                  </div>
                  <div className="pt-4 pb-2">
                    <h3 className="font-serif text-xl tracking-tight flex items-center gap-2">
                      {event.name}
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(event.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Events;
