import { Link, useLocation } from "react-router-dom";
import AtelierLogo from "./AtelierLogo";
import MobileTabBar from "./MobileTabBar";
import { Plus, Sparkles } from "lucide-react";
import { useUser } from "@/lib/user-context";

const creativeLinks = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/moodboards", label: "Boards" },
  { to: "/events", label: "Events" },
  { to: "/profile", label: "Profile" },
];

const consumerLinks = [
  { to: "/discover", label: "Discover" },
  { to: "/creatives", label: "Creatives" },
  { to: "/projects", label: "Projects" },
  { to: "/events", label: "Events" },
  { to: "/saved", label: "Saved" },
];

const Navbar = () => {
  const location = useLocation();
  const { accountType, isPro } = useUser();
  const navLinks = accountType === "consumer" ? consumerLinks : creativeLinks;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
          <AtelierLogo />

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm tracking-wide transition-colors duration-200 ${
                  location.pathname === link.to
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {accountType === "creative" && (
              <Link
                to="/projects/create"
                className="inline-flex items-center gap-1.5 bg-accent text-accent-foreground px-4 py-2 text-sm tracking-wide transition-transform duration-150 hover:opacity-90 active:scale-[0.97]"
              >
                <Plus className="w-4 h-4" />
                Create
              </Link>
            )}
            {!isPro && accountType === "creative" && (
              <Link
                to="/pro"
                className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider text-accent hover:text-foreground transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Pro
              </Link>
            )}
          </div>
        </div>
      </nav>

      <div className="md:hidden">
        <MobileTabBar />
      </div>
    </>
  );
};

export default Navbar;
