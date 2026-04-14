import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import ProjectCard from "@/components/ProjectCard";
import CollaborationGraph from "@/components/CollaborationGraph";
import { currentUser, mockProjects } from "@/lib/mock-data";
import { MapPin, Settings, Camera, Share2, QrCode, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useUser } from "@/lib/user-context";

const Profile = () => {
  const user = currentUser;
  const [showQR, setShowQR] = useState(false);
  const { isPro, accountType } = useUser();
  const userProjects = mockProjects.filter(
    (p) => p.collaborators.some((c) => c.user_id === user.id && c.invite_status === "accepted")
  );
  const completedProjects = userProjects.filter((p) => p.status === "completed");

  const profileUrl = `${window.location.origin}/profile/${user.id}`;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-14 md:pt-16 pb-tab-bar md:pb-0">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
          {/* Header */}
          <ScrollReveal>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-24 h-24 md:w-28 md:h-28 bg-accent/10 border-2 border-accent flex items-center justify-center text-3xl font-display italic text-accent shrink-0">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="font-display text-3xl md:text-4xl tracking-tight italic">{user.name}</h1>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {user.custom_roles.map((role) => (
                        <span key={role} className="text-xs font-mono tracking-wide text-accent border border-accent/30 px-2 py-0.5">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowQR(!showQR)}
                      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground border border-border px-3 py-2 hover:border-foreground/40 transition-colors"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => navigator.share?.({ url: profileUrl, title: `${user.name} on Atelier` }).catch(() => navigator.clipboard.writeText(profileUrl))}
                      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground border border-border px-3 py-2 hover:border-foreground/40 transition-colors"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                    <Link
                      to="/profile/edit"
                      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground border border-border px-4 py-2 hover:border-foreground/40 transition-colors"
                    >
                      <Settings className="w-3.5 h-3.5" />
                      Edit
                    </Link>
                  </div>
                </div>

                {/* QR Code placeholder */}
                {showQR && (
                  <div className="mt-4 p-4 border border-border bg-card inline-block">
                    <div className="w-32 h-32 bg-primary flex items-center justify-center">
                      <QrCode className="w-16 h-16 text-primary-foreground" />
                    </div>
                    <p className="text-[10px] font-mono text-muted-foreground mt-2 text-center">Scan to view profile</p>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <AvailabilityBadge status={user.availability_status} />
                  {user.open_to_collaborations && (
                    <span className="text-xs tracking-wide text-accent font-mono">Open to collabs</span>
                  )}
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5" />
                    {user.location}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4 max-w-xl leading-relaxed">{user.bio}</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Collaboration Graph / Credits */}
          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl mb-6 tracking-tight italic">
                Credits & Collaborations
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={60}>
              <CollaborationGraph userId={user.id} />
            </ScrollReveal>
          </div>

          {/* Portfolio */}
          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl mb-8 tracking-tight italic">
                Portfolio
                <span className="text-muted-foreground text-lg ml-2 not-italic font-mono">({completedProjects.length})</span>
              </h2>
            </ScrollReveal>
            {completedProjects.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {completedProjects.map((project, i) => (
                  <ScrollReveal key={project.id} delay={i * 60}>
                    <ProjectCard project={project} />
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              <ScrollReveal>
                <div className="text-center py-16 border border-dashed border-border">
                  <Camera className="w-8 h-8 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground text-sm">Complete projects to build your portfolio.</p>
                  <Link to="/projects/create" className="text-sm text-accent underline underline-offset-4 mt-2 inline-block">
                    Create your first project
                  </Link>
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* All projects */}
          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl mb-8 tracking-tight italic">
                All Projects
                <span className="text-muted-foreground text-lg ml-2 not-italic font-mono">({userProjects.length})</span>
              </h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userProjects.map((project, i) => (
                <ScrollReveal key={project.id} delay={i * 60}>
                  <ProjectCard project={project} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
