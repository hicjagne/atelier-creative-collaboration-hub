import { useParams, useNavigate, Link } from "react-router-dom";
import { useProjects } from "@/lib/projects-context";
import { useUser } from "@/lib/user-context";
import { mockUsers, currentUser } from "@/lib/mock-data";
import AtelierLogo from "@/components/AtelierLogo";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

const Invite = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { getInvitationByToken, getProject, claimInvitation, declineInvitation, collaborators } = useProjects();
  const { accountType } = useUser();
  const [signedIn, setSignedIn] = useState(false); // mock auth state for this flow

  const invitation = token ? getInvitationByToken(token) : undefined;
  const project = invitation ? getProject(invitation.project_id) : undefined;
  const collab = invitation ? collaborators.find((c) => c.id === invitation.collaborator_id) : undefined;
  const owner = project ? mockUsers.find((u) => u.id === project.creator_id) : undefined;

  if (!invitation || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <AtelierLogo className="mb-8 mx-auto" />
          <p className="text-muted-foreground">This invitation is invalid or has expired.</p>
          <Link to="/" className="text-sm underline underline-offset-4 mt-4 inline-block">Go home</Link>
        </div>
      </div>
    );
  }

  const isAccepted = invitation.status === "accepted";
  const isDeclined = invitation.status === "declined";

  const handleAccept = () => {
    if (!signedIn) {
      toast("Sign up first", { description: "Create an account to claim this credit." });
      return;
    }
    claimInvitation(invitation.token, currentUser.id);
    toast.success("Welcome aboard", { description: `You're on ${project.title}` });
    setTimeout(() => navigate(`/projects/${project.id}`), 600);
  };

  const handleDecline = () => {
    declineInvitation(invitation.token);
    toast("Invitation declined");
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:block relative">
        <img src={project.cover_image} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16">
        <AtelierLogo className="mb-12" />

        <p className="text-xs font-mono tracking-wider uppercase text-muted-foreground mb-3">
          You've been invited
        </p>
        <h1 className="font-display text-3xl md:text-5xl italic tracking-tight leading-tight">
          {project.title}
        </h1>

        <div className="mt-4 space-y-2 text-sm text-muted-foreground">
          <p>
            <span className="text-foreground">{owner?.name}</span> invited{" "}
            <span className="text-foreground">{collab?.external?.external_name ?? "you"}</span> to join as{" "}
            <span className="text-accent font-mono text-xs uppercase tracking-wider">{invitation.role_name}</span>
          </p>
          <div className="flex items-center gap-4 pt-2">
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{project.location}</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(project.shoot_date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>
        </div>

        <p className="text-sm mt-6 leading-relaxed max-w-md">{project.description}</p>

        {isAccepted ? (
          <div className="mt-10 border border-accent p-6">
            <p className="text-sm">You've already accepted this invitation.</p>
            <Link to={`/projects/${project.id}`} className="inline-flex items-center gap-2 text-sm mt-3 underline underline-offset-4">
              View project <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : isDeclined ? (
          <p className="text-sm text-muted-foreground mt-10">This invitation was declined.</p>
        ) : (
          <div className="mt-10 space-y-4 max-w-md">
            {!signedIn && (
              <div className="border border-border p-4 space-y-3">
                <p className="text-xs font-mono tracking-wider uppercase text-muted-foreground">
                  Step 1 — Join Atelier
                </p>
                <p className="text-sm">Create an account to claim this role and credit.</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setSignedIn(true); toast.success("Account created (demo)"); }}
                    className="flex-1 bg-primary text-primary-foreground py-2.5 text-sm tracking-wider uppercase"
                  >
                    Sign up
                  </button>
                  <button
                    onClick={() => { setSignedIn(true); toast.success("Signed in (demo)"); }}
                    className="flex-1 border border-border py-2.5 text-sm tracking-wider uppercase"
                  >
                    Log in
                  </button>
                </div>
              </div>
            )}

            <div className={`border p-4 space-y-3 transition-opacity ${signedIn ? "border-accent" : "border-border opacity-60"}`}>
              <p className="text-xs font-mono tracking-wider uppercase text-muted-foreground">
                Step 2 — Respond
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleDecline}
                  className="flex-1 border border-border py-2.5 text-sm tracking-wider uppercase hover:border-foreground/40 transition-colors"
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  disabled={!signedIn}
                  className="flex-1 bg-primary text-primary-foreground py-2.5 text-sm tracking-wider uppercase disabled:opacity-50"
                >
                  Accept role
                </button>
              </div>
              {accountType === "consumer" && signedIn && (
                <p className="text-xs text-atelier-busy">
                  Your account is set to Consumer — switch to Creative to be added as a collaborator.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Invite;
