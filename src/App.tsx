import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserProvider } from "@/lib/user-context";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import CreateProject from "./pages/CreateProject";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Events from "./pages/Events";
import Moodboards from "./pages/Moodboards";
import Discover from "./pages/Discover";
import Creatives from "./pages/Creatives";
import Saved from "./pages/Saved";
import Pro from "./pages/Pro";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/projects/create" element={<CreateProject />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/events" element={<Events />} />
            <Route path="/moodboards" element={<Moodboards />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/creatives" element={<Creatives />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/pro" element={<Pro />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
