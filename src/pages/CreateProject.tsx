import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import { PRESET_ROLES, type ProjectType } from "@/lib/mock-data";
import { Upload, Plus, X } from "lucide-react";

const projectTypes: { value: ProjectType; label: string }[] = [
  { value: "shoot", label: "Shoot" },
  { value: "collection", label: "Collection" },
  { value: "lookbook", label: "Lookbook" },
  { value: "editorial", label: "Editorial" },
];

const CreateProject = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectType, setProjectType] = useState<ProjectType>("editorial");
  const [customType, setCustomType] = useState("");
  const [location, setLocation] = useState("");
  const [shootDate, setShootDate] = useState("");
  const [neededRoles, setNeededRoles] = useState<string[]>([]);
  const [customRole, setCustomRole] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [invites, setInvites] = useState<{ email: string; role: string }[]>([]);

  const toggleRole = (role: string) => {
    setNeededRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const addCustomRole = () => {
    const trimmed = customRole.trim();
    if (trimmed && !neededRoles.includes(trimmed)) {
      setNeededRoles([...neededRoles, trimmed]);
      setCustomRole("");
    }
  };

  const addInvite = () => {
    if (inviteEmail && neededRoles.length > 0) {
      setInvites([...invites, { email: inviteEmail, role: neededRoles[0] }]);
      setInviteEmail("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/projects");
  };

  const inputClass = "w-full border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors";
  const labelClass = "text-[10px] font-mono tracking-wider uppercase text-muted-foreground block mb-2";

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-14 md:pt-16 pb-tab-bar md:pb-0">
        <div className="max-w-2xl mx-auto px-4 md:px-6 py-8 md:py-16">
          <ScrollReveal>
            <h1 className="font-display text-4xl tracking-tight italic mb-2">New Project</h1>
            <p className="text-muted-foreground text-sm mb-10">
              Define your vision and start building your team.
            </p>
          </ScrollReveal>

          <form onSubmit={handleSubmit} className="space-y-8">
            <ScrollReveal delay={50}>
              <div>
                <label className={labelClass}>Project title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} placeholder="e.g. Nocturne" required />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div>
                <label className={labelClass}>Project type</label>
                <div className="flex flex-wrap gap-2">
                  {projectTypes.map((pt) => (
                    <button
                      key={pt.value}
                      type="button"
                      onClick={() => { setProjectType(pt.value); setCustomType(""); }}
                      className={`px-4 py-2 text-xs font-mono tracking-wider uppercase border transition-colors active:scale-[0.97] ${
                        projectType === pt.value && !customType
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border text-muted-foreground hover:border-foreground/40"
                      }`}
                    >
                      {pt.label}
                    </button>
                  ))}
                  <input
                    type="text"
                    value={customType}
                    onChange={(e) => { setCustomType(e.target.value); }}
                    className="px-4 py-2 text-xs font-mono border border-border bg-transparent w-32 focus:outline-none focus:border-accent placeholder:text-muted-foreground/50"
                    placeholder="Or type..."
                  />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`${inputClass} min-h-[120px] resize-none`}
                  placeholder="Describe the vision, mood, and concept..."
                  required
                />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Location</label>
                  <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className={inputClass} placeholder="Shoreditch, London" />
                </div>
                <div>
                  <label className={labelClass}>Shoot date</label>
                  <input type="date" value={shootDate} onChange={(e) => setShootDate(e.target.value)} className={inputClass} />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={250}>
              <div>
                <label className={labelClass}>Moodboard</label>
                <div className="border border-dashed border-border p-8 text-center cursor-pointer hover:border-accent/50 transition-colors">
                  <Upload className="w-6 h-6 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Click or drag to upload images</p>
                  <p className="text-[10px] font-mono text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div>
                <label className={labelClass}>Roles needed</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {PRESET_ROLES.slice(0, 5).map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => toggleRole(role)}
                      className={`px-4 py-2 text-xs font-mono tracking-wide border transition-colors active:scale-[0.97] ${
                        neededRoles.includes(role)
                          ? "bg-accent text-accent-foreground border-accent"
                          : "border-border text-muted-foreground hover:border-foreground/40"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
                {/* Custom roles already added */}
                {neededRoles.filter((r) => !PRESET_ROLES.includes(r)).length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {neededRoles.filter((r) => !PRESET_ROLES.includes(r)).map((role) => (
                      <span key={role} className="inline-flex items-center gap-1.5 bg-accent text-accent-foreground px-3 py-1.5 text-xs font-mono">
                        {role}
                        <button onClick={() => toggleRole(role)}><X className="w-3 h-3" /></button>
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customRole}
                    onChange={(e) => setCustomRole(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustomRole())}
                    className="flex-1 border border-border bg-transparent px-4 py-2 text-xs font-mono focus:outline-none focus:border-accent placeholder:text-muted-foreground/50"
                    placeholder="Add custom role..."
                  />
                  <button type="button" onClick={addCustomRole} className="px-3 border border-border hover:border-accent transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={350}>
              <div>
                <label className={labelClass}>Invite collaborators</label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className={`${inputClass} flex-1`}
                    placeholder="collaborator@email.com"
                  />
                  <button type="button" onClick={addInvite} className="px-4 border border-border text-sm hover:border-accent transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {invites.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {invites.map((inv, i) => (
                      <div key={i} className="flex items-center justify-between text-xs font-mono py-2 px-3 bg-secondary">
                        <span>{inv.email} · {inv.role}</span>
                        <button type="button" onClick={() => setInvites(invites.filter((_, j) => j !== i))}>
                          <X className="w-3.5 h-3.5 text-muted-foreground" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="bg-accent text-accent-foreground px-8 py-3 text-sm font-mono tracking-wider uppercase transition-transform active:scale-[0.97]"
                >
                  Create project
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/projects")}
                  className="px-8 py-3 text-sm text-muted-foreground border border-border hover:border-foreground/40 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </ScrollReveal>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateProject;
