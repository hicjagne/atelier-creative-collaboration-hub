import { useState } from "react";
import { mockProjects, type ProjectStatus, type UserRole, ROLES } from "@/lib/mock-data";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import ScrollReveal from "@/components/ScrollReveal";

type FilterStatus = "all" | ProjectStatus;

const statusFilters: { value: FilterStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "seeking_collaborators", label: "Seeking Collaborators" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

const Projects = () => {
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");

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
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <ScrollReveal>
            <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-4">Projects</h1>
            <p className="text-muted-foreground max-w-lg mb-12">
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
                  className={`px-4 py-2 text-xs tracking-wider uppercase border transition-colors duration-200 active:scale-[0.97] ${
                    statusFilter === f.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-12">
              <button
                onClick={() => setRoleFilter("all")}
                className={`px-3 py-1.5 text-xs tracking-wide border transition-colors ${
                  roleFilter === "all" ? "border-foreground text-foreground" : "border-border text-muted-foreground"
                }`}
              >
                All roles
              </button>
              {ROLES.map((role) => (
                <button
                  key={role}
                  onClick={() => setRoleFilter(role)}
                  className={`px-3 py-1.5 text-xs tracking-wide border transition-colors ${
                    roleFilter === role ? "border-foreground text-foreground" : "border-border text-muted-foreground"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((project, i) => (
                <ScrollReveal key={project.id} delay={i * 60}>
                  <ProjectCard project={project} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No projects match your filters.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Projects;
