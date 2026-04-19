import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useProjects } from "@/lib/projects-context";
import { currentUser, mockProjects } from "@/lib/mock-data";
import { toast } from "sonner";
import { MapPin, Sparkles } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  projectId: string;
  projectTitle: string;
  roleSlotId: string;
  roleName: string;
}

const ExpressInterestDialog = ({ open, onOpenChange, projectId, projectTitle, roleSlotId, roleName }: Props) => {
  const { applyToRole, hasUserApplied } = useProjects();
  const [note, setNote] = useState("");
  const [showNote, setShowNote] = useState(false);

  const credits = mockProjects.filter((p) =>
    p.collaborators.some((c) => c.user_id === currentUser.id && c.invite_status === "accepted") &&
    p.status === "completed"
  );

  const alreadyApplied = hasUserApplied(roleSlotId, currentUser.id);

  const handleSubmit = () => {
    if (alreadyApplied) {
      toast("You've already expressed interest in this role.");
      return;
    }
    applyToRole({
      project_id: projectId,
      role_slot_id: roleSlotId,
      role_name: roleName,
      applicant_user_id: currentUser.id,
      message: note.trim() || undefined,
    });
    toast.success("Profile shared", { description: `Sent to ${projectTitle} for ${roleName}` });
    setNote("");
    setShowNote(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <p className="text-xs font-mono tracking-wider uppercase text-muted-foreground">
            {projectTitle} · {roleName}
          </p>
          <DialogTitle className="font-display text-2xl italic tracking-tight">
            Share your profile
          </DialogTitle>
        </DialogHeader>

        <div className="border border-border p-4 mt-2">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-accent/10 border border-accent flex items-center justify-center text-lg font-display italic text-accent shrink-0">
              {currentUser.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{currentUser.name}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                <MapPin className="w-3 h-3" />
                {currentUser.location}
              </div>
              <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{currentUser.bio}</p>
              <div className="flex items-center gap-1.5 mt-3 text-xs">
                <Sparkles className="w-3 h-3 text-accent" />
                <span className="font-mono text-muted-foreground">
                  {credits.length} credit{credits.length === 1 ? "" : "s"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {showNote ? (
          <div>
            <label className="text-xs tracking-wider uppercase text-muted-foreground block mb-2">
              Note (optional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              maxLength={280}
              className="w-full border border-border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              placeholder="A line about why this project speaks to you…"
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowNote(true)}
            className="text-xs text-muted-foreground underline underline-offset-4 self-start"
          >
            + Add a note
          </button>
        )}

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onOpenChange(false)}
            className="flex-1 border border-border py-3 text-sm tracking-wider uppercase hover:border-foreground/40 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={alreadyApplied}
            className="flex-1 bg-primary text-primary-foreground py-3 text-sm tracking-wider uppercase transition-transform active:scale-[0.97] disabled:opacity-50"
          >
            {alreadyApplied ? "Already applied" : "Share profile"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExpressInterestDialog;
