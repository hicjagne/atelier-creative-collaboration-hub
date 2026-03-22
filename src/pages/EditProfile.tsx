import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import { currentUser, ROLES, type UserRole, type AvailabilityStatus } from "@/lib/mock-data";

const EditProfile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState(currentUser.name);
  const [bio, setBio] = useState(currentUser.bio);
  const [location, setLocation] = useState(currentUser.location);
  const [role, setRole] = useState<UserRole>(currentUser.role);
  const [availability, setAvailability] = useState<AvailabilityStatus>(currentUser.availability_status);
  const [openToCollab, setOpenToCollab] = useState(currentUser.open_to_collaborations);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/profile");
  };

  const inputClass = "w-full border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-shadow";
  const labelClass = "text-xs tracking-wider uppercase text-muted-foreground block mb-2";

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-xl mx-auto px-6 py-16">
          <ScrollReveal>
            <h1 className="font-serif text-3xl tracking-tight mb-2">Edit Profile</h1>
            <p className="text-muted-foreground text-sm mb-12">Update your professional details.</p>
          </ScrollReveal>

          <form onSubmit={handleSubmit} className="space-y-8">
            <ScrollReveal delay={50}>
              <div>
                <label className={labelClass}>Profile image</label>
                <div className="w-28 h-28 bg-muted flex items-center justify-center text-3xl font-serif text-muted-foreground cursor-pointer hover:bg-muted/80 transition-colors">
                  {name.charAt(0)}
                </div>
                <p className="text-xs text-muted-foreground mt-2">Click to upload</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div>
                <label className={labelClass}>Full name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} required />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <div>
                <label className={labelClass}>Role</label>
                <div className="flex flex-wrap gap-2">
                  {ROLES.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`px-4 py-2 text-xs tracking-wide border transition-colors active:scale-[0.97] ${
                        role === r ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-foreground/40"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={140}>
              <div>
                <label className={labelClass}>Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className={`${inputClass} min-h-[100px] resize-none`}
                />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={160}>
              <div>
                <label className={labelClass}>Location</label>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className={inputClass} />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={180}>
              <div>
                <label className={labelClass}>Availability</label>
                <div className="flex gap-2">
                  {(["available", "limited", "busy"] as AvailabilityStatus[]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setAvailability(s)}
                      className={`px-4 py-2 text-xs tracking-wide capitalize border transition-colors active:scale-[0.97] ${
                        availability === s ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setOpenToCollab(!openToCollab)}
                  className={`w-10 h-6 rounded-full transition-colors ${openToCollab ? "bg-primary" : "bg-muted"}`}
                >
                  <span className={`block w-4 h-4 rounded-full bg-white shadow transition-transform ${openToCollab ? "translate-x-5" : "translate-x-1"}`} />
                </button>
                <span className="text-sm">Open to collaborations</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={220}>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="bg-primary text-primary-foreground px-8 py-3 text-sm tracking-wider uppercase transition-transform active:scale-[0.97]">
                  Save profile
                </button>
                <button type="button" onClick={() => navigate("/profile")} className="px-8 py-3 text-sm text-muted-foreground border border-border hover:border-foreground/40 transition-colors">
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

export default EditProfile;
