import { Link, useLocation } from "react-router-dom";
import AtelierLogo from "./AtelierLogo";
import MobileTabBar from "./MobileTabBar";
import { Plus } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/events", label: "Events" },
  { to: "/profile", label: "Profile" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <>
      {/* Top bar — logo only on mobile, full nav on desktop */}
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
            <Link
              to="/projects/create"
              className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 text-sm tracking-wide transition-transform duration-150 hover:opacity-90 active:scale-[0.97]"
            >
              <Plus className="w-4 h-4" />
              Create
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile bottom tab bar */}
      <div className="md:hidden">
        <MobileTabBar />
      </div>
    </>
  );
};

export default Navbar;
