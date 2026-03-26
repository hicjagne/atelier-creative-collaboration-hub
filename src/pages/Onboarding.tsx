import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PRESET_ROLES } from "@/lib/mock-data";
import AtelierLogo from "@/components/AtelierLogo";
import { Plus, X } from "lucide-react";

const Onboarding = () => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [customRole, setCustomRole] = useState("");
  const navigate = useNavigate();

  const toggleRole = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const addCustomRole = () => {
    const trimmed = customRole.trim();
    if (trimmed && !selectedRoles.includes(trimmed)) {
      setSelectedRoles([...selectedRoles, trimmed]);
      setCustomRole("");
    }
  };

  const handleContinue = () => {
    if (selectedRoles.length > 0) {
      navigate("/profile/edit");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <AtelierLogo className="mb-12" />

      <h1 className="font-display text-4xl md:text-5xl tracking-tight text-center mb-3 italic">
        What do you do?
      </h1>
      <p className="text-muted-foreground text-sm text-center mb-10 max-w-md">
        Pick as many as you like, or add your own. Your creative identity is yours to define.
      </p>

      {/* Selected roles */}
      {selectedRoles.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6 max-w-md justify-center">
          {selectedRoles.map((role) => (
            <span
              key={role}
              className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-3 py-1.5 text-xs tracking-wide"
            >
              {role}
              <button onClick={() => toggleRole(role)} className="hover:opacity-70">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Preset roles */}
      <div className="flex flex-wrap gap-2 w-full max-w-md justify-center mb-6">
        {PRESET_ROLES.filter((r) => !selectedRoles.includes(r)).map((role) => (
          <button
            key={role}
            onClick={() => toggleRole(role)}
            className="px-4 py-2.5 border border-border text-sm tracking-wide transition-all duration-200 active:scale-[0.97] hover:border-foreground/40 hover:bg-secondary"
          >
            {role}
          </button>
        ))}
      </div>

      {/* Custom role input */}
      <div className="flex gap-2 w-full max-w-sm mb-10">
        <input
          type="text"
          value={customRole}
          onChange={(e) => setCustomRole(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustomRole())}
          className="flex-1 border border-border bg-transparent px-4 py-2.5 text-sm focus:outline-none focus:border-accent placeholder:text-muted-foreground/60 transition-colors"
          placeholder="Or type your own role..."
        />
        <button
          type="button"
          onClick={addCustomRole}
          className="px-3 border border-border hover:border-foreground/40 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <button
        onClick={handleContinue}
        disabled={selectedRoles.length === 0}
        className="bg-primary text-primary-foreground px-10 py-3 text-sm tracking-wider uppercase transition-all active:scale-[0.97] disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
};

export default Onboarding;
