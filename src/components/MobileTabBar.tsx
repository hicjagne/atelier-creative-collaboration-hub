import { Link, useLocation } from "react-router-dom";
import { Home, FolderOpen, CalendarDays, User, Plus, Palette } from "lucide-react";

const orderedTabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/projects", label: "Projects", icon: FolderOpen },
  { to: "/projects/create", label: "Create", icon: Plus, isAction: true },
  { to: "/moodboards", label: "Boards", icon: Palette },
  { to: "/profile", label: "Profile", icon: User },
];

const MobileTabBar = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border pb-safe">
      <div className="flex items-center justify-around h-16 px-2">
        {orderedTabs.map((tab) => {
          const isActive = location.pathname === tab.to;
          const Icon = tab.icon;

          if (tab.isAction) {
            return (
              <Link
                key={tab.to}
                to={tab.to}
                className="flex items-center justify-center w-11 h-11 bg-accent text-accent-foreground -mt-4 shadow-lg active:scale-[0.95] transition-transform"
              >
                <Icon className="w-5 h-5" />
              </Link>
            );
          }

          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={`flex flex-col items-center justify-center gap-0.5 min-w-[52px] py-1 transition-colors active:scale-[0.95] ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.2 : 1.5} />
              <span className="text-[10px] font-mono tracking-wide">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileTabBar;
