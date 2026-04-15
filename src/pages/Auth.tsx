import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AtelierLogo from "@/components/AtelierLogo";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useUser, type AccountType } from "@/lib/user-context";
import heroImage from "@/assets/hero-editorial.jpg";
import { Palette, Eye } from "lucide-react";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(searchParams.get("mode") === "signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [accountType, setAccountType] = useState<AccountType>("creative");
  const navigate = useNavigate();
  const { setAccountType: setGlobalAccountType } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock auth — navigate to onboarding for signup, projects for login
    if (isSignUp) {
      setGlobalAccountType(accountType);
      if (accountType === "consumer") {
        navigate("/discover");
      } else {
        navigate("/onboarding");
      }
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
            <>
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

              <div>
                <label className="text-xs tracking-wider uppercase text-muted-foreground block mb-4">Account Type</label>
                <RadioGroup value={accountType} onValueChange={(v) => setAccountType(v as AccountType)} className="gap-3">
                  <div className="border border-border p-4 hover:border-accent transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                      <RadioGroupItem value="creative" id="creative" className="mt-1" />
                      <Label htmlFor="creative" className="cursor-pointer flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Palette className="w-4 h-4 text-accent" />
                          <span className="font-mono text-xs tracking-wide">Create & collaborate</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          For designers, photographers, stylists. Create projects, build portfolio, find collaborators.
                        </p>
                      </Label>
                    </div>
                  </div>

                  <div className="border border-border p-4 hover:border-accent transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                      <RadioGroupItem value="consumer" id="consumer" className="mt-1" />
                      <Label htmlFor="consumer" className="cursor-pointer flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Eye className="w-4 h-4 text-accent" />
                          <span className="font-mono text-xs tracking-wide">Discover creatives & events</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Explore London's emerging fashion scene. Browse portfolios, discover talent, find events.
                        </p>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </>
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
