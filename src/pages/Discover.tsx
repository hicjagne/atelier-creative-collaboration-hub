import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import ProjectCard from "@/components/ProjectCard";
import { mockProjects, mockUsers, mockEvents } from "@/lib/mock-data";
import { useUser } from "@/lib/user-context";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, MapPin } from "lucide-react";

const Discover = () => {
  const { toggleSaveCreative, savedCreatives } = useUser();
  const featured = mockProjects.filter((p) => p.status === "completed").slice(0, 3);
  const topCreatives = mockUsers.filter((u) => u.open_to_collaborations).slice(0, 4);
  const upcomingEvents = mockEvents.slice(0, 2);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-14 md:pt-16 pb-tab-bar md:pb-0">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
          <ScrollReveal>
            <h1 className="font-display text-4xl md:text-5xl tracking-tight italic mb-2">Discover</h1>
            <p className="text-muted-foreground text-sm max-w-lg mb-12">
              Explore London's emerging fashion talent, their projects, and upcoming events.
            </p>
          </ScrollReveal>

          {/* Featured creatives */}
          <section className="mb-16">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-6">
                <h2 className="font-display text-2xl tracking-tight italic">Creatives</h2>
                <Link to="/creatives" className="text-xs font-mono text-muted-foreground hover:text-accent transition-colors flex items-center gap-1 tracking-wide uppercase">
                  View all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {topCreatives.map((user, i) => (
                <ScrollReveal key={user.id} delay={i * 60}>
                  <div className="border border-border p-4 group relative">
                    <button
                      onClick={() => toggleSaveCreative(user.id)}
                      className="absolute top-3 right-3 z-10"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${savedCreatives.includes(user.id) ? "fill-accent text-accent" : "text-muted-foreground hover:text-accent"}`}
                      />
                    </button>
                    <div className="w-14 h-14 bg-accent/10 border border-accent/30 flex items-center justify-center text-xl font-display italic text-accent mb-3">
                      {user.name.charAt(0)}
                    </div>
                    <Link to={`/profile/${user.id}`}>
                      <h3 className="font-display text-lg italic group-hover:text-accent transition-colors">{user.name}</h3>
                    </Link>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {user.custom_roles.slice(0, 2).map((role) => (
                        <span key={role} className="text-[10px] font-mono tracking-wide text-muted-foreground">{role}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-2">
                      <MapPin className="w-3 h-3" />
                      {user.location}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>

          {/* Featured work */}
          <section className="mb-16">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-6">
                <h2 className="font-display text-2xl tracking-tight italic">Recent work</h2>
                <Link to="/projects" className="text-xs font-mono text-muted-foreground hover:text-accent transition-colors flex items-center gap-1 tracking-wide uppercase">
                  View all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </ScrollReveal>
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {featured.map((project, i) => (
                <ScrollReveal key={project.id} delay={i * 60}>
                  <ProjectCard project={project} />
                </ScrollReveal>
              ))}
            </div>
          </section>

          {/* Upcoming events */}
          <section>
            <ScrollReveal>
              <div className="flex items-end justify-between mb-6">
                <h2 className="font-display text-2xl tracking-tight italic">Upcoming events</h2>
                <Link to="/events" className="text-xs font-mono text-muted-foreground hover:text-accent transition-colors flex items-center gap-1 tracking-wide uppercase">
                  View all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-4">
              {upcomingEvents.map((event, i) => (
                <ScrollReveal key={event.id} delay={i * 60}>
                  <a
                    href={event.external_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-border p-5 block hover:border-foreground/40 transition-colors group"
                  >
                    <p className="text-[10px] font-mono text-accent tracking-wider uppercase mb-1">{event.event_type}</p>
                    <h3 className="font-display text-xl italic group-hover:text-accent transition-colors">{event.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{event.date} · {event.location}</p>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Discover;
