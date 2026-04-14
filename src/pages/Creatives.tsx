import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import { mockUsers, PRESET_ROLES } from "@/lib/mock-data";
import { useUser } from "@/lib/user-context";
import { Heart, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import AvailabilityBadge from "@/components/AvailabilityBadge";

const Creatives = () => {
  const { toggleSaveCreative, savedCreatives } = useUser();
  const [roleFilter, setRoleFilter] = useState("all");

  const filtered = mockUsers.filter((u) => {
    if (roleFilter === "all") return true;
    return u.custom_roles.includes(roleFilter);
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-14 md:pt-16 pb-tab-bar md:pb-0">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
          <ScrollReveal>
            <h1 className="font-display text-4xl md:text-5xl tracking-tight italic mb-2">Creatives</h1>
            <p className="text-muted-foreground text-sm max-w-lg mb-10">
              London's emerging fashion talent, all in one place.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <div className="flex flex-wrap gap-2 mb-10">
              <button
                onClick={() => setRoleFilter("all")}
                className={`px-3 py-1.5 text-xs font-mono tracking-wide border transition-colors ${roleFilter === "all" ? "border-accent text-accent" : "border-border text-muted-foreground"}`}
              >
                All
              </button>
              {PRESET_ROLES.slice(0, 6).map((role) => (
                <button
                  key={role}
                  onClick={() => setRoleFilter(role)}
                  className={`px-3 py-1.5 text-xs font-mono tracking-wide border transition-colors ${roleFilter === role ? "border-accent text-accent" : "border-border text-muted-foreground"}`}
                >
                  {role}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((user, i) => (
              <ScrollReveal key={user.id} delay={i * 50}>
                <div className="border border-border p-5 relative group">
                  <button
                    onClick={() => toggleSaveCreative(user.id)}
                    className="absolute top-4 right-4"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${savedCreatives.includes(user.id) ? "fill-accent text-accent" : "text-muted-foreground hover:text-accent"}`}
                    />
                  </button>
                  <div className="flex gap-4 items-start">
                    <div className="w-14 h-14 bg-accent/10 border border-accent/30 flex items-center justify-center text-xl font-display italic text-accent shrink-0">
                      {user.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link to={`/profile/${user.id}`}>
                        <h3 className="font-display text-lg italic group-hover:text-accent transition-colors">{user.name}</h3>
                      </Link>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {user.custom_roles.map((role) => (
                          <span key={role} className="text-[10px] font-mono tracking-wide text-accent border border-accent/30 px-1.5 py-0.5">{role}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <AvailabilityBadge status={user.availability_status} />
                        <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {user.location}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{user.bio}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Creatives;
