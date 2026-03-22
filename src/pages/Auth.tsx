import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AtelierLogo from "@/components/AtelierLogo";
import heroImage from "@/assets/hero-editorial.jpg";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(searchParams.get("mode") === "signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock auth — navigate to onboarding for signup, projects for login
    if (isSignUp) {
      navigate("/onboarding");
    } else {
      navigate("/projects");
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Image side */}
      <div className="hidden md:block relative">
        <img src={heroImage} alt="Fashion editorial" className="w-full h-full object-cover" />
      </div>

      {/* Form side */}
      <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16">
        <AtelierLogo className="mb-16" />
        <h1 className="font-serif text-3xl md:text-4xl tracking-tight leading-tight mb-2">
          {isSignUp ? "Join the atelier" : "Welcome back"}
        </h1>
        <p className="text-muted-foreground text-sm mb-10">
          {isSignUp
            ? "Create your account and start collaborating."
            : "Sign in to your account."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 max-w-sm">
          {isSignUp && (
            <div>
              <label className="text-xs tracking-wider uppercase text-muted-foreground block mb-2">Full name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-shadow"
                placeholder="Elena Vasquez"
                required
              />
            </div>
          )}
          <div>
            <label className="text-xs tracking-wider uppercase text-muted-foreground block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-shadow"
              placeholder="you@email.com"
              required
            />
          </div>
          <div>
            <label className="text-xs tracking-wider uppercase text-muted-foreground block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-shadow"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-3 text-sm tracking-wider uppercase transition-transform active:scale-[0.97]"
          >
            {isSignUp ? "Create account" : "Sign in"}
          </button>
        </form>

        <p className="text-sm text-muted-foreground mt-8">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-foreground underline underline-offset-4"
          >
            {isSignUp ? "Sign in" : "Join Atelier"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
