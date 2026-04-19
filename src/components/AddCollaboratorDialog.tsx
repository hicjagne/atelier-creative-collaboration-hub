import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useProjects } from "@/lib/projects-context";
import { toast } from "sonner";
import { Copy, Check } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  projectId: string;
  roleSlotId: string;
  roleName: string;
}

const AddCollaboratorDialog = ({ open, onOpenChange, projectId, roleSlotId, roleName }: Props) => {
  const { addExternalCollaborator } = useProjects();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");
  const [inviteUrl, setInviteUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { invitation } = addExternalCollaborator({
      project_id: projectId,
      role_slot_id: roleSlotId,
      role_name: roleName,
      external: { external_name: name, external_email: email, external_link: link || undefined },
    });
    const url = `${window.location.origin}/invite/${invitation.token}`;
    setInviteUrl(url);
    toast.success("Invite created", { description: `${name} added in pending state` });
  };

  const handleCopy = () => {
    if (!inviteUrl) return;
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleClose = () => {
    setName(""); setEmail(""); setLink(""); setInviteUrl(null); setCopied(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? onOpenChange(true) : handleClose())}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <p className="text-xs font-mono tracking-wider uppercase text-muted-foreground">
            Invite to fill · {roleName}
          </p>
          <DialogTitle className="font-display text-2xl italic tracking-tight">
            Add collaborator
          </DialogTitle>
        </DialogHeader>

        {!inviteUrl ? (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div>
              <label className="text-xs tracking-wider uppercase text-muted-foreground block mb-2">Full name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-xs tracking-wider uppercase text-muted-foreground block mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-xs tracking-wider uppercase text-muted-foreground block mb-2">Instagram / portfolio (optional)</label>
              <input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="@handle or https://…"
                className="w-full border border-border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              They'll appear on the project as <em>pending claim</em> until they sign up and accept.
              Their credit is only attached after they join.
            </p>
            <div className="flex gap-2 pt-2">
              <button type="button" onClick={handleClose} className="flex-1 border border-border py-3 text-sm tracking-wider uppercase">
                Cancel
              </button>
              <button type="submit" className="flex-1 bg-primary text-primary-foreground py-3 text-sm tracking-wider uppercase">
                Create invite
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 mt-2">
            <div>
              <label className="text-xs tracking-wider uppercase text-muted-foreground block mb-2">Invite link</label>
              <div className="flex items-center gap-2 border border-border p-2">
                <span className="flex-1 text-xs font-mono truncate">{inviteUrl}</span>
                <button
                  onClick={handleCopy}
                  className="shrink-0 p-2 hover:bg-muted transition-colors"
                  aria-label="Copy invite link"
                >
                  {copied ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Share via DM, WhatsApp or email. Link works without an account — they sign up to claim.
              </p>
            </div>
            <button onClick={handleClose} className="w-full bg-primary text-primary-foreground py-3 text-sm tracking-wider uppercase">
              Done
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddCollaboratorDialog;
