import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { mockProjects, mockUsers, type Project, type User, type InviteStatus } from "./mock-data";

// ----- Types -----
export type RoleSlotStatus = "open" | "filled";

export interface ProjectRoleSlot {
  id: string;
  project_id: string;
  role_name: string;
  status: RoleSlotStatus;
  // when filled, references a collaborator
  collaborator_id?: string;
}

export type ApplicationStatus = "submitted" | "shortlisted" | "accepted" | "declined";

export interface ProjectApplication {
  id: string;
  project_id: string;
  role_slot_id: string;
  role_name: string;
  applicant_user_id: string;
  message?: string;
  status: ApplicationStatus;
  created_at: string;
}

export type CollaboratorState =
  | "accepted"
  | "pending"
  | "declined"
  | "invited"
  | "pending_claim";

export interface ExternalCollaboratorRef {
  external_name: string;
  external_email: string;
  external_link?: string;
}

export interface ExtendedCollaborator {
  id: string;
  project_id: string;
  role_name: string;
  user_id?: string;
  user?: User;
  external?: ExternalCollaboratorRef;
  invite_status: CollaboratorState;
}

export interface Invitation {
  id: string;
  token: string;
  project_id: string;
  role_name: string;
  collaborator_id: string;
  external_email?: string;
  status: "pending" | "accepted" | "declined" | "expired";
  created_at: string;
}

interface ProjectsContextType {
  projects: Project[];
  roleSlots: ProjectRoleSlot[];
  applications: ProjectApplication[];
  collaborators: ExtendedCollaborator[];
  invitations: Invitation[];

  // selectors
  getProject: (id: string) => Project | undefined;
  getRoleSlots: (projectId: string) => ProjectRoleSlot[];
  getCollaborators: (projectId: string) => ExtendedCollaborator[];
  getApplicationsForRole: (roleSlotId: string) => ProjectApplication[];
  getInvitationByToken: (token: string) => Invitation | undefined;
  hasUserApplied: (roleSlotId: string, userId: string) => boolean;

  // actions
  addRoleSlot: (projectId: string, roleName: string) => ProjectRoleSlot;
  applyToRole: (input: {
    project_id: string;
    role_slot_id: string;
    role_name: string;
    applicant_user_id: string;
    message?: string;
  }) => ProjectApplication;
  setApplicationStatus: (id: string, status: ApplicationStatus) => void;
  acceptApplication: (applicationId: string) => void;
  declineApplication: (applicationId: string) => void;
  addExternalCollaborator: (input: {
    project_id: string;
    role_slot_id: string;
    role_name: string;
    external: ExternalCollaboratorRef;
  }) => { collaborator: ExtendedCollaborator; invitation: Invitation };
  claimInvitation: (token: string, userId: string) => void;
  declineInvitation: (token: string) => void;
}

const ProjectsContext = createContext<ProjectsContextType | null>(null);

// ----- Seed: derive role slots & extended collaborators from existing mockProjects -----
const seedRoleSlots: ProjectRoleSlot[] = [];
const seedCollaborators: ExtendedCollaborator[] = [];

mockProjects.forEach((p) => {
  p.collaborators.forEach((c) => {
    const slotId = `slot-${c.id}`;
    seedRoleSlots.push({
      id: slotId,
      project_id: p.id,
      role_name: c.role,
      status: "filled",
      collaborator_id: c.id,
    });
    seedCollaborators.push({
      id: c.id,
      project_id: p.id,
      role_name: c.role,
      user_id: c.user_id,
      user: c.user,
      invite_status: c.invite_status as CollaboratorState,
    });
  });
});

// Add an open role to project 2 ("Soft Structure" — seeking_collaborators)
seedRoleSlots.push(
  {
    id: "slot-open-2-photo",
    project_id: "2",
    role_name: "Photographer",
    status: "open",
  },
  {
    id: "slot-open-2-model",
    project_id: "2",
    role_name: "Model",
    status: "open",
  },
);

// And one open role on project 3
seedRoleSlots.push({
  id: "slot-open-3-stylist",
  project_id: "3",
  role_name: "Stylist",
  status: "open",
});

// Pre-seed one application so reviewers can see something
const seedApplications: ProjectApplication[] = [
  {
    id: "app-seed-1",
    project_id: "2",
    role_slot_id: "slot-open-2-photo",
    role_name: "Photographer",
    applicant_user_id: "2",
    message: "Love the brutalist references — would shoot this on medium format.",
    status: "submitted",
    created_at: new Date().toISOString(),
  },
];

let _id = 1000;
const nextId = (prefix: string) => `${prefix}-${++_id}`;

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const [projects] = useState<Project[]>(mockProjects);
  const [roleSlots, setRoleSlots] = useState<ProjectRoleSlot[]>(seedRoleSlots);
  const [applications, setApplications] = useState<ProjectApplication[]>(seedApplications);
  const [collaborators, setCollaborators] = useState<ExtendedCollaborator[]>(seedCollaborators);
  const [invitations, setInvitations] = useState<Invitation[]>([]);

  const value = useMemo<ProjectsContextType>(() => {
    const getProject = (id: string) => projects.find((p) => p.id === id);
    const getRoleSlots = (pid: string) => roleSlots.filter((r) => r.project_id === pid);
    const getCollaborators = (pid: string) => collaborators.filter((c) => c.project_id === pid);
    const getApplicationsForRole = (slotId: string) =>
      applications.filter((a) => a.role_slot_id === slotId);
    const getInvitationByToken = (token: string) => invitations.find((i) => i.token === token);
    const hasUserApplied = (slotId: string, userId: string) =>
      applications.some((a) => a.role_slot_id === slotId && a.applicant_user_id === userId);

    const addRoleSlot = (projectId: string, roleName: string) => {
      const slot: ProjectRoleSlot = {
        id: nextId("slot"),
        project_id: projectId,
        role_name: roleName,
        status: "open",
      };
      setRoleSlots((prev) => [...prev, slot]);
      return slot;
    };

    const applyToRole: ProjectsContextType["applyToRole"] = (input) => {
      const app: ProjectApplication = {
        id: nextId("app"),
        project_id: input.project_id,
        role_slot_id: input.role_slot_id,
        role_name: input.role_name,
        applicant_user_id: input.applicant_user_id,
        message: input.message,
        status: "submitted",
        created_at: new Date().toISOString(),
      };
      setApplications((prev) => [app, ...prev]);
      return app;
    };

    const setApplicationStatus = (id: string, status: ApplicationStatus) =>
      setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));

    const acceptApplication = (applicationId: string) => {
      const app = applications.find((a) => a.id === applicationId);
      if (!app) return;
      const user = mockUsers.find((u) => u.id === app.applicant_user_id);
      const collabId = nextId("collab");
      const newCollab: ExtendedCollaborator = {
        id: collabId,
        project_id: app.project_id,
        role_name: app.role_name,
        user_id: app.applicant_user_id,
        user,
        invite_status: "accepted",
      };
      setCollaborators((prev) => [...prev, newCollab]);
      setRoleSlots((prev) =>
        prev.map((r) =>
          r.id === app.role_slot_id ? { ...r, status: "filled", collaborator_id: collabId } : r,
        ),
      );
      // accept this app, decline siblings
      setApplications((prev) =>
        prev.map((a) =>
          a.id === applicationId
            ? { ...a, status: "accepted" }
            : a.role_slot_id === app.role_slot_id && a.status !== "declined"
              ? { ...a, status: "declined" }
              : a,
        ),
      );
    };

    const declineApplication = (applicationId: string) =>
      setApplicationStatus(applicationId, "declined");

    const addExternalCollaborator: ProjectsContextType["addExternalCollaborator"] = (input) => {
      const collabId = nextId("collab");
      const collaborator: ExtendedCollaborator = {
        id: collabId,
        project_id: input.project_id,
        role_name: input.role_name,
        external: input.external,
        invite_status: "pending_claim",
      };
      const token = `inv_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
      const invitation: Invitation = {
        id: nextId("inv"),
        token,
        project_id: input.project_id,
        role_name: input.role_name,
        collaborator_id: collabId,
        external_email: input.external.external_email,
        status: "pending",
        created_at: new Date().toISOString(),
      };
      setCollaborators((prev) => [...prev, collaborator]);
      setInvitations((prev) => [...prev, invitation]);
      setRoleSlots((prev) =>
        prev.map((r) =>
          r.id === input.role_slot_id ? { ...r, status: "filled", collaborator_id: collabId } : r,
        ),
      );
      return { collaborator, invitation };
    };

    const claimInvitation = (token: string, userId: string) => {
      const inv = invitations.find((i) => i.token === token);
      if (!inv) return;
      const user = mockUsers.find((u) => u.id === userId);
      setCollaborators((prev) =>
        prev.map((c) =>
          c.id === inv.collaborator_id
            ? { ...c, user_id: userId, user, invite_status: "accepted" }
            : c,
        ),
      );
      setInvitations((prev) =>
        prev.map((i) => (i.token === token ? { ...i, status: "accepted" } : i)),
      );
    };

    const declineInvitation = (token: string) => {
      const inv = invitations.find((i) => i.token === token);
      if (!inv) return;
      setCollaborators((prev) =>
        prev.map((c) =>
          c.id === inv.collaborator_id ? { ...c, invite_status: "declined" } : c,
        ),
      );
      setInvitations((prev) =>
        prev.map((i) => (i.token === token ? { ...i, status: "declined" } : i)),
      );
      // re-open the role slot
      setRoleSlots((prev) =>
        prev.map((r) =>
          r.collaborator_id === inv.collaborator_id
            ? { ...r, status: "open", collaborator_id: undefined }
            : r,
        ),
      );
    };

    return {
      projects,
      roleSlots,
      applications,
      collaborators,
      invitations,
      getProject,
      getRoleSlots,
      getCollaborators,
      getApplicationsForRole,
      getInvitationByToken,
      hasUserApplied,
      addRoleSlot,
      applyToRole,
      setApplicationStatus,
      acceptApplication,
      declineApplication,
      addExternalCollaborator,
      claimInvitation,
      declineInvitation,
    };
  }, [projects, roleSlots, applications, collaborators, invitations]);

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>;
};

export const useProjects = () => {
  const ctx = useContext(ProjectsContext);
  if (!ctx) throw new Error("useProjects must be used within ProjectsProvider");
  return ctx;
};
