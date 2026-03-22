import { useParams, Link } from "react-router-dom";
import { mockProjects, mockUsers } from "@/lib/mock-data";
import Navbar from "@/components/Navbar";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import ScrollReveal from "@/components/ScrollReveal";
import { MapPin, Calendar, ArrowLeft, UserPlus } from "lucide-react";

const statusLabel: Record<string, string> = {
  draft: "Draft",
  seeking_collaborators: "Seeking Collaborators",
  active: "Active",
  completed: "Completed",
};

const ProjectDetail = () => {
  const { id } = useParams();
  const project = mockProjects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 text-center">
          <p className="text-muted-foreground">Project not found.</p>
          <Link to="/projects" className="text-sm underline mt-4 inline-block">Back to projects</Link>
        </div>
      </div>
    );
  }

  const creator = mockUsers.find((u) => u.id === project.creator_id);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-14 md:pt-16 pb-tab-bar md:pb-0">
        {/* Hero image */}
        <div className="relative h-[50vh] md:h-[70vh]">
          <img src={project.cover_image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
              <Link to="/projects" className="inline-flex items-center gap-1.5 text-white/70 text-sm mb-6 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" />
                All projects
              </Link>
              <span className="block mb-3">
                <span className="bg-white/90 text-black text-xs tracking-wider uppercase px-3 py-1.5">
                  {statusLabel[project.status]}
                </span>
              </span>
              <h1 className="font-serif text-4xl md:text-6xl text-white tracking-tight">{project.title}</h1>
              <p className="text-white/70 mt-3 text-sm">
                {project.project_type} · by {creator?.name}
              </p>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-16">
            {/* Left: description */}
            <div className="md:col-span-2">
              <ScrollReveal>
                <h2 className="font-serif text-2xl mb-4">About</h2>
                <p className="text-muted-foreground leading-relaxed max-w-2xl">{project.description}</p>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <div className="flex flex-wrap gap-6 mt-8 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(project.shoot_date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </ScrollReveal>

              {project.status === "seeking_collaborators" && (
                <ScrollReveal delay={200}>
                  <button className="mt-10 inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm tracking-wider uppercase transition-transform active:scale-[0.97]">
                    <UserPlus className="w-4 h-4" />
                    Request to join
                  </button>
                </ScrollReveal>
              )}
            </div>

            {/* Right: team */}
            <div>
              <ScrollReveal delay={150}>
                <h2 className="font-serif text-2xl mb-6">Team</h2>
                <div className="space-y-4">
                  {project.collaborators.map((collab) => (
                    <div key={collab.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <div>
                        <p className="text-sm font-medium">{collab.user?.name || "Invited"}</p>
                        <p className="text-xs text-muted-foreground">{collab.role}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 ${
                        collab.invite_status === "accepted"
                          ? "text-atelier-available"
                          : collab.invite_status === "pending"
                          ? "text-atelier-limited"
                          : "text-atelier-busy"
                      }`}>
                        {collab.invite_status}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;
