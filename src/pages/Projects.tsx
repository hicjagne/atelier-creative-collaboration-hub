import { useState } from "react";
import { mockProjects, type ProjectStatus, PRESET_ROLES } from "@/lib/mock-data";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import ScrollReveal from "@/components/ScrollReveal";

type FilterStatus = "all" | ProjectStatus;

const statusFilters: { value: FilterStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "seeking_collaborators", label: "Seeking Collabs" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

const Projects = () => {
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  const filtered = mockProjects.filter((p) => {
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    if (roleFilter !== "all") {
      const hasRole = p.collaborators.some((c) => c.role === roleFilter);
      if (!hasRole) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-14 md:pt-16 pb-tab-bar md:pb-0">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
          <ScrollReveal>
            <h1 className="font-display text-4xl md:text-5xl tracking-tight italic mb-2">Projects</h1>
            <p className="text-muted-foreground text-sm max-w-lg mb-10">
              Discover projects, find collaborators, or showcase your completed work.
            </p>
          </ScrollReveal>

          {/* Filters */}
          <ScrollReveal delay={100}>
            <div className="flex flex-wrap gap-2 mb-4">
              {statusFilters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setStatusFilter(f.value)}
                  className={`px-4 py-2 text-xs font-mono tracking-wider uppercase border transition-colors duration-200 active:scale-[0.97] ${
                    statusFilter === f.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-10">
              <button
                onClick={() => setRoleFilter("all")}
                className={`px-3 py-1.5 text-xs font-mono tracking-wide border transition-colors ${
                  roleFilter === "all" ? "border-accent text-accent" : "border-border text-muted-foreground"
                }`}
              >
                All roles
              </button>
              {PRESET_ROLES.slice(0, 5).map((role) => (
                <button
                  key={role}
                  onClick={() => setRoleFilter(role)}
                  className={`px-3 py-1.5 text-xs font-mono tracking-wide border transition-colors ${
                    roleFilter === role ? "border-accent text-accent" : "border-border text-muted-foreground"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((project, i) => (
                <ScrollReveal key={project.id} delay={i * 60}>
                  <ProjectCard project={project} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground font-mono text-sm">No projects match your filters.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Projects;
