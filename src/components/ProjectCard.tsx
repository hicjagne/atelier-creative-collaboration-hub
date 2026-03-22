import { Link } from "react-router-dom";
import type { Project } from "@/lib/mock-data";
import { mockUsers } from "@/lib/mock-data";
import AvailabilityBadge from "./AvailabilityBadge";
import { MapPin } from "lucide-react";

const statusLabel: Record<string, string> = {
  draft: "Draft",
  seeking_collaborators: "Seeking Collaborators",
  active: "Active",
  completed: "Completed",
};

const ProjectCard = ({ project }: { project: Project }) => {
  const creator = mockUsers.find((u) => u.id === project.creator_id);
  const acceptedCount = project.collaborators.filter((c) => c.invite_status === "accepted").length;
  const totalRoles = project.collaborators.length;

  return (
    <Link
      to={`/projects/${project.id}`}
      className="group block overflow-hidden transition-shadow duration-300 hover:shadow-lg"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={project.cover_image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-background/90 backdrop-blur-sm text-foreground text-xs tracking-wider uppercase px-3 py-1.5">
            {statusLabel[project.status]}
          </span>
        </div>
      </div>

      <div className="pt-4 pb-2">
        <h3 className="font-serif text-xl tracking-tight">{project.title}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {creator?.name} · {project.project_type}
        </p>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-2">
          <MapPin className="w-3.5 h-3.5" />
          {project.location}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {acceptedCount}/{totalRoles} roles filled
        </p>
      </div>
    </Link>
  );
};

export default ProjectCard;
