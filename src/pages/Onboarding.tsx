import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROLES, type UserRole } from "@/lib/mock-data";
import AtelierLogo from "@/components/AtelierLogo";

const roleDescriptions: Record<UserRole, string> = {
  Designer: "You create garments, collections, or fashion concepts.",
  Photographer: "You capture fashion through editorial and commercial photography.",
  Stylist: "You curate looks, source pieces, and direct visual narratives.",
  Model: "You bring garments and concepts to life through movement and form.",
  "Makeup Artist": "You create beauty looks for editorial, runway, and commercial work.",
};

const Onboarding = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedRole) {
      navigate("/profile/edit");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <AtelierLogo className="mb-16" />
      <h1 className="font-serif text-3xl md:text-4xl tracking-tight text-center mb-3">
        What's your craft?
      </h1>
      <p className="text-muted-foreground text-sm text-center mb-12 max-w-md">
        Select your primary role. This helps collaborators find you for the right projects.
      </p>

      <div className="grid gap-3 w-full max-w-md">
        {ROLES.map((role) => (
          <button
            key={role}
            onClick={() => setSelectedRole(role)}
            className={`text-left px-6 py-5 border transition-all duration-200 active:scale-[0.98] ${
              selectedRole === role
                ? "border-foreground bg-primary text-primary-foreground"
                : "border-border hover:border-foreground/30"
            }`}
          >
            <span className="block text-sm font-medium tracking-wide">{role}</span>
            <span className={`block text-xs mt-1 ${selectedRole === role ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
              {roleDescriptions[role]}
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={handleContinue}
        disabled={!selectedRole}
        className="mt-10 bg-primary text-primary-foreground px-10 py-3 text-sm tracking-wider uppercase transition-all active:scale-[0.97] disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
};

export default Onboarding;
