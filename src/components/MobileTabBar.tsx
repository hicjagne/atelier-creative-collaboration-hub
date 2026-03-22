import { Link, useLocation } from "react-router-dom";
import { Home, FolderOpen, CalendarDays, User, Plus } from "lucide-react";

const tabs = [
  { to: "/projects", label: "Projects", icon: FolderOpen },
  { to: "/events", label: "Events", icon: CalendarDays },
  { to: "/projects/create", label: "Create", icon: Plus, isAction: true },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/", label: "Home", icon: Home },
];

// Reorder for visual layout: Home, Projects, Create (center), Events, Profile
const orderedTabs = [
  tabs[4], // Home
  tabs[0], // Projects
  tabs[2], // Create
  tabs[1], // Events
  tabs[3], // Profile
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
                className="flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full -mt-4 shadow-lg active:scale-[0.95] transition-transform"
              >
                <Icon className="w-5 h-5" />
              </Link>
            );
          }

          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] py-1 transition-colors active:scale-[0.95] ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.2 : 1.5} />
              <span className="text-[10px] tracking-wide">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileTabBar;
