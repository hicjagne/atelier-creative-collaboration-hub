import { useState } from "react";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import { useUser } from "@/lib/user-context";
import { mockUsers, mockProjects, mockEvents } from "@/lib/mock-data";
import ProjectCard from "@/components/ProjectCard";
import { Heart, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

type Tab = "creatives" | "projects" | "events";

const Saved = () => {
  const [tab, setTab] = useState<Tab>("creatives");
  const { savedCreatives, savedProjects, savedEvents, toggleSaveCreative, toggleSaveProject, toggleSaveEvent } = useUser();

  const sCreatives = mockUsers.filter((u) => savedCreatives.includes(u.id));
  const sProjects = mockProjects.filter((p) => savedProjects.includes(p.id));
  const sEvents = mockEvents.filter((e) => savedEvents.includes(e.id));

  const tabs: { value: Tab; label: string; count: number }[] = [
    { value: "creatives", label: "Creatives", count: sCreatives.length },
    { value: "projects", label: "Projects", count: sProjects.length },
    { value: "events", label: "Events", count: sEvents.length },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-14 md:pt-16 pb-tab-bar md:pb-0">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
          <ScrollReveal>
            <h1 className="font-display text-4xl md:text-5xl tracking-tight italic mb-8">Saved</h1>
          </ScrollReveal>

          <ScrollReveal delay={60}>
            <div className="flex gap-2 mb-10">
              {tabs.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTab(t.value)}
                  className={`px-4 py-2 text-xs font-mono tracking-wider uppercase border transition-colors ${tab === t.value ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground"}`}
                >
                  {t.label} ({t.count})
                </button>
              ))}
            </div>
          </ScrollReveal>

          {tab === "creatives" && (
            sCreatives.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sCreatives.map((user) => (
                  <div key={user.id} className="border border-border p-5 relative">
                    <button onClick={() => toggleSaveCreative(user.id)} className="absolute top-4 right-4">
                      <Heart className="w-4 h-4 fill-accent text-accent" />
                    </button>
                    <Link to={`/profile/${user.id}`}>
                      <h3 className="font-display text-lg italic hover:text-accent transition-colors">{user.name}</h3>
                    </Link>
                    <p className="text-xs font-mono text-muted-foreground mt-1">{user.custom_roles.join(" · ")}</p>
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-2">
                      <MapPin className="w-3 h-3" /> {user.location}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState text="Save creatives to find them here later." />
            )
          )}

          {tab === "projects" && (
            sProjects.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {sProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <EmptyState text="Save projects you love to revisit them." />
            )
          )}

          {tab === "events" && (
            sEvents.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {sEvents.map((event) => (
                  <div key={event.id} className="border border-border p-5 relative">
                    <button onClick={() => toggleSaveEvent(event.id)} className="absolute top-4 right-4">
                      <Heart className="w-4 h-4 fill-accent text-accent" />
                    </button>
                    <p className="text-[10px] font-mono text-accent tracking-wider uppercase mb-1">{event.event_type}</p>
                    <h3 className="font-display text-xl italic">{event.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{event.date} · {event.location}</p>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState text="Save events to keep track of what's happening." />
            )
          )}
        </div>
      </main>
    </div>
  );
};

const EmptyState = ({ text }: { text: string }) => (
  <div className="text-center py-20 border border-dashed border-border">
    <Heart className="w-8 h-8 mx-auto text-muted-foreground mb-3" />
    <p className="text-muted-foreground text-sm">{text}</p>
  </div>
);

export default Saved;
