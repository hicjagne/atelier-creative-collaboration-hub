import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import ProjectCard from "@/components/ProjectCard";
import { currentUser, mockProjects } from "@/lib/mock-data";
import { MapPin, Settings, Camera } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = currentUser;
  const userProjects = mockProjects.filter(
    (p) => p.collaborators.some((c) => c.user_id === user.id && c.invite_status === "accepted")
  );
  const completedProjects = userProjects.filter((p) => p.status === "completed");

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Header */}
          <ScrollReveal>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-28 h-28 bg-muted flex items-center justify-center text-3xl font-serif text-muted-foreground shrink-0">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="font-serif text-3xl md:text-4xl tracking-tight">{user.name}</h1>
                    <p className="text-sm text-muted-foreground mt-1">{user.role}</p>
                  </div>
                  <Link
                    to="/profile/edit"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground border border-border px-4 py-2 hover:border-foreground/40 transition-colors"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    Edit
                  </Link>
                </div>
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <AvailabilityBadge status={user.availability_status} />
                  {user.open_to_collaborations && (
                    <span className="text-xs tracking-wide text-muted-foreground">Open to collaborations</span>
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

          {/* Portfolio */}
          <div className="mt-20">
            <ScrollReveal>
              <h2 className="font-serif text-2xl mb-8 tracking-tight">
                Portfolio
                <span className="text-muted-foreground text-lg ml-2">({completedProjects.length})</span>
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
                  <Link to="/projects/create" className="text-sm underline underline-offset-4 mt-2 inline-block">
                    Create your first project
                  </Link>
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* All projects */}
          <div className="mt-20">
            <ScrollReveal>
              <h2 className="font-serif text-2xl mb-8 tracking-tight">
                All Projects
                <span className="text-muted-foreground text-lg ml-2">({userProjects.length})</span>
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
