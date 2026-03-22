import { Link, useLocation } from "react-router-dom";
import AtelierLogo from "./AtelierLogo";
import { Plus, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/events", label: "Events" },
  { to: "/profile", label: "Profile" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
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

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-b border-border bg-background px-6 pb-6 pt-2 animate-fade-up">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block py-3 text-sm tracking-wide ${
                location.pathname === link.to
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/projects/create"
            onClick={() => setMobileOpen(false)}
            className="inline-flex items-center gap-1.5 mt-2 bg-primary text-primary-foreground px-4 py-2 text-sm tracking-wide"
          >
            <Plus className="w-4 h-4" />
            Create Project
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
