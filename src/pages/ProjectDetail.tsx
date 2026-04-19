import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { mockUsers, currentUser, mockProjects } from "@/lib/mock-data";
import { useProjects } from "@/lib/projects-context";
import { useUser } from "@/lib/user-context";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import ExpressInterestDialog from "@/components/ExpressInterestDialog";
import AddCollaboratorDialog from "@/components/AddCollaboratorDialog";
import { MapPin, Calendar, ArrowLeft, UserPlus, Plus, Sparkles, Check, X, Star, Copy } from "lucide-react";
import { toast } from "sonner";

const statusLabel: Record<string, string> = {
  draft: "Draft",
  seeking_collaborators: "Seeking Collaborators",
  active: "Active",
  completed: "Completed",
};

const stateLabel: Record<string, string> = {
  accepted: "Accepted",
  pending: "Pending",
  declined: "Declined",
  invited: "Invited",
  pending_claim: "Pending claim",
};

const stateClass: Record<string, string> = {
  accepted: "text-atelier-available border-atelier-available/30",
  pending: "text-atelier-limited border-atelier-limited/30",
  pending_claim: "text-atelier-limited border-atelier-limited/30",
  invited: "text-atelier-limited border-atelier-limited/30",
  declined: "text-atelier-busy border-atelier-busy/30",
};

const ProjectDetail = () => {
  const { id } = useParams();
  const project = mockProjects.find((p) => p.id === id);
  const { accountType } = useUser();
  const {
    getRoleSlots,
    getCollaborators,
    getApplicationsForRole,
    acceptApplication,
    declineApplication,
    setApplicationStatus,
    invitations,
  } = useProjects();

  const [interestDialog, setInterestDialog] = useState<{ slotId: string; role: string } | null>(null);
  const [addDialog, setAddDialog] = useState<{ slotId: string; role: string } | null>(null);
  const [manageMode, setManageMode] = useState(false);

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
  const isOwner = currentUser.id === project.creator_id;
  const isCreative = accountType === "creative";
  const slots = getRoleSlots(project.id);
  const collaborators = getCollaborators(project.id);

  const copyInviteFor = (collabId: string) => {
    const inv = invitations.find((i) => i.collaborator_id === collabId);
    if (!inv) return;
    const url = `${window.location.origin}/invite/${inv.token}`;
    navigator.clipboard.writeText(url);
    toast.success("Invite link copied");
  };

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

              {/* Owner manage panel */}
              {isOwner && (
                <ScrollReveal delay={150}>
                  <div className="mt-12 border-t border-border pt-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-serif text-2xl">Manage roles</h2>
                      <button
                        onClick={() => setManageMode((v) => !v)}
                        className="text-xs font-mono tracking-wider uppercase text-muted-foreground underline underline-offset-4"
                      >
                        {manageMode ? "Done" : "Review applicants"}
                      </button>
                    </div>

                    <div className="space-y-6">
                      {slots.map((slot) => {
                        const apps = getApplicationsForRole(slot.id);
                        return (
                          <div key={slot.id} className="border border-border p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <p className="text-xs font-mono tracking-wider uppercase text-muted-foreground">
                                  {slot.role_name}
                                </p>
                                <p className="text-sm mt-0.5">
                                  {slot.status === "open" ? (
                                    <span className="text-atelier-limited">Open</span>
                                  ) : (
                                    <span className="text-atelier-available">Filled</span>
                                  )}
                                </p>
                              </div>
                              {slot.status === "open" && (
                                <button
                                  onClick={() => setAddDialog({ slotId: slot.id, role: slot.role_name })}
                                  className="inline-flex items-center gap-1.5 text-xs border border-border px-3 py-2 hover:border-foreground/40 transition-colors"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                  Invite manually
                                </button>
                              )}
                            </div>

                            {manageMode && apps.length > 0 && (
                              <div className="space-y-3 mt-4 pt-4 border-t border-border">
                                <p className="text-xs font-mono tracking-wider uppercase text-muted-foreground">
                                  {apps.length} applicant{apps.length === 1 ? "" : "s"}
                                </p>
                                {apps.map((app) => {
                                  const u = mockUsers.find((x) => x.id === app.applicant_user_id);
                                  const userCredits = mockProjects.filter((p) =>
                                    p.collaborators.some(
                                      (c) => c.user_id === app.applicant_user_id && c.invite_status === "accepted",
                                    ) && p.status === "completed"
                                  ).length;
                                  return (
                                    <div key={app.id} className="flex items-start gap-3 p-3 bg-muted/30">
                                      <div className="w-10 h-10 bg-accent/10 border border-accent flex items-center justify-center text-sm font-display italic text-accent shrink-0">
                                        {u?.name.charAt(0)}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2">
                                          <Link to={`/profile/${u?.id}`} className="text-sm font-medium hover:underline underline-offset-4">
                                            {u?.name}
                                          </Link>
                                          <span className={`text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 border ${
                                            app.status === "accepted" ? "text-atelier-available border-atelier-available/30" :
                                            app.status === "declined" ? "text-atelier-busy border-atelier-busy/30" :
                                            app.status === "shortlisted" ? "text-accent border-accent/30" :
                                            "text-muted-foreground border-border"
                                          }`}>
                                            {app.status}
                                          </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                          {u?.location} · {userCredits} credit{userCredits === 1 ? "" : "s"}
                                        </p>
                                        {app.message && (
                                          <p className="text-xs mt-2 italic text-muted-foreground border-l-2 border-border pl-2">
                                            "{app.message}"
                                          </p>
                                        )}
                                        {app.status !== "accepted" && app.status !== "declined" && (
                                          <div className="flex gap-2 mt-3">
                                            <button
                                              onClick={() => { setApplicationStatus(app.id, "shortlisted"); toast("Shortlisted"); }}
                                              className="inline-flex items-center gap-1 text-xs border border-border px-2 py-1 hover:border-accent hover:text-accent transition-colors"
                                            >
                                              <Star className="w-3 h-3" /> Shortlist
                                            </button>
                                            <button
                                              onClick={() => { acceptApplication(app.id); toast.success(`${u?.name} added to team`); }}
                                              className="inline-flex items-center gap-1 text-xs bg-primary text-primary-foreground px-2 py-1"
                                            >
                                              <Check className="w-3 h-3" /> Accept
                                            </button>
                                            <button
                                              onClick={() => { declineApplication(app.id); toast("Declined"); }}
                                              className="inline-flex items-center gap-1 text-xs border border-border px-2 py-1 hover:border-atelier-busy hover:text-atelier-busy transition-colors"
                                            >
                                              <X className="w-3 h-3" /> Decline
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}

                            {manageMode && apps.length === 0 && slot.status === "open" && (
                              <p className="text-xs text-muted-foreground mt-2">No applicants yet.</p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </ScrollReveal>
              )}
            </div>

            {/* Right: team & open roles */}
            <div>
              <ScrollReveal delay={150}>
                <h2 className="font-serif text-2xl mb-6">Team</h2>
                <div className="space-y-3">
                  {slots.map((slot) => {
                    if (slot.status === "filled") {
                      const collab = collaborators.find((c) => c.id === slot.collaborator_id);
                      if (!collab) return null;
                      const displayName =
                        collab.user?.name ?? collab.external?.external_name ?? "Invited";
                      return (
                        <div key={slot.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">{displayName}</p>
                            <p className="text-xs text-muted-foreground">{collab.role_name}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {collab.invite_status === "pending_claim" && isOwner && (
                              <button
                                onClick={() => copyInviteFor(collab.id)}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="Copy invite link"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                            )}
                            <span className={`text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 border ${stateClass[collab.invite_status] ?? ""}`}>
                              {stateLabel[collab.invite_status] ?? collab.invite_status}
                            </span>
                          </div>
                        </div>
                      );
                    }

                    // Open slot
                    const apps = getApplicationsForRole(slot.id);
                    return (
                      <div key={slot.id} className="py-3 border-b border-border last:border-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">{slot.role_name}</p>
                            <p className="text-xs text-atelier-limited">
                              Open{apps.length > 0 ? ` · ${apps.length} interested` : ""}
                            </p>
                          </div>
                          {isCreative && !isOwner && (
                            <button
                              onClick={() => setInterestDialog({ slotId: slot.id, role: slot.role_name })}
                              className="inline-flex items-center gap-1.5 text-xs bg-foreground text-background px-3 py-1.5 hover:bg-foreground/90 transition-colors"
                            >
                              <Sparkles className="w-3 h-3" />
                              Express interest
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {!isCreative && slots.some((s) => s.status === "open") && (
                  <p className="text-xs text-muted-foreground mt-4">
                    Switch to a Creative account to apply for open roles.
                  </p>
                )}
              </ScrollReveal>
            </div>
          </div>
        </div>

        {interestDialog && (
          <ExpressInterestDialog
            open={!!interestDialog}
            onOpenChange={(v) => !v && setInterestDialog(null)}
            projectId={project.id}
            projectTitle={project.title}
            roleSlotId={interestDialog.slotId}
            roleName={interestDialog.role}
          />
        )}
        {addDialog && (
          <AddCollaboratorDialog
            open={!!addDialog}
            onOpenChange={(v) => !v && setAddDialog(null)}
            projectId={project.id}
            roleSlotId={addDialog.slotId}
            roleName={addDialog.role}
          />
        )}
      </main>
    </div>
  );
};

export default ProjectDetail;
