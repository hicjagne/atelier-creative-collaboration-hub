import { Link } from "react-router-dom";
import type { Project } from "@/lib/mock-data";
import { mockUsers } from "@/lib/mock-data";
import { MapPin } from "lucide-react";

const statusLabel: Record<string, string> = {
  draft: "Draft",
  seeking_collaborators: "Seeking Collabs",
  active: "Active",
  completed: "Completed",
};

const statusStyle: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  seeking_collaborators: "bg-accent text-accent-foreground",
  active: "bg-primary text-primary-foreground",
  completed: "bg-primary/80 text-primary-foreground",
};

const ProjectCard = ({ project }: { project: Project }) => {
  const creator = mockUsers.find((u) => u.id === project.creator_id);
  const acceptedCount = project.collaborators.filter((c) => c.invite_status === "accepted").length;
  const totalRoles = project.collaborators.length;

  return (
    <Link
      to={`/projects/${project.id}`}
      className="group block overflow-hidden transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted border border-border">
        <img
          src={project.cover_image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className={`${statusStyle[project.status]} text-[10px] font-mono tracking-wider uppercase px-2.5 py-1`}>
            {statusLabel[project.status]}
          </span>
        </div>
      </div>

      <div className="pt-3 pb-2">
        <h3 className="font-display text-xl tracking-tight italic">{project.title}</h3>
        <p className="text-xs font-mono text-muted-foreground mt-1">
          {creator?.name} · {project.project_type}
        </p>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1.5">
          <MapPin className="w-3 h-3" />
          {project.location}
        </div>
        <p className="text-[10px] font-mono text-accent mt-1.5">
          {acceptedCount}/{totalRoles} roles filled
        </p>
      </div>
    </Link>
  );
};

export default ProjectCard;
