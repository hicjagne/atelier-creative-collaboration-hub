import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import AtelierLogo from "@/components/AtelierLogo";
import { useUser } from "@/lib/user-context";
import { Sparkles, Eye, BarChart3, Layout, Search, Star, ArrowRight, Check } from "lucide-react";
import { useState } from "react";

const features = [
  { icon: Star, title: "Featured profile", desc: "Stand out in discovery — your profile gets priority placement." },
  { icon: Search, title: "Priority visibility", desc: "Appear first when collaborators or consumers search for your role." },
  { icon: Layout, title: "Enhanced portfolio", desc: "Custom public portfolio page with expanded layout options." },
  { icon: BarChart3, title: "Profile analytics", desc: "See who's viewing your profile and saving your projects." },
  { icon: Eye, title: "Featured projects", desc: "Your projects get premium placement in the feed." },
  { icon: Sparkles, title: "Pro badge", desc: "A subtle mark of commitment to your craft." },
];

const Pro = () => {
  const { isPro } = useUser();
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setJoined(true);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-14 md:pt-16 pb-tab-bar md:pb-0">
        {/* Hero */}
        <section className="py-16 md:py-24 px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 border border-accent/40 text-accent px-4 py-1.5 text-xs font-mono tracking-wider uppercase mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Coming soon
              </div>
            </ScrollReveal>
            <ScrollReveal delay={60}>
              <h1 className="font-display text-5xl md:text-7xl tracking-tight italic leading-[0.95] mb-4">
                Atelier Pro
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto leading-relaxed">
                Everything you need to take your creative practice further. Premium tools for serious emerging talent.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Features */}
        <section className="px-4 md:px-6 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <ScrollReveal key={f.title} delay={i * 50}>
                    <div className="border border-border p-6 group hover:border-accent/40 transition-colors">
                      <Icon className="w-5 h-5 text-accent mb-3" />
                      <h3 className="font-display text-lg italic mb-1">{f.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Waitlist CTA */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-primary text-primary-foreground">
          <div className="max-w-xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="font-display text-3xl md:text-5xl tracking-tight italic mb-4">
                Get early access
              </h2>
              <p className="text-sm opacity-70 mb-8">
                Join the waitlist. We'll let you know when Pro launches.
              </p>
            </ScrollReveal>

            {joined ? (
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4" />
                  You're on the list. We'll be in touch.
                </div>
              </ScrollReveal>
            ) : (
              <ScrollReveal delay={80}>
                <form onSubmit={handleJoin} className="flex gap-2 max-w-sm mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 bg-transparent border border-primary-foreground/30 px-4 py-3 text-sm placeholder:text-primary-foreground/40 focus:outline-none focus:border-primary-foreground transition-colors"
                  />
                  <button
                    type="submit"
                    className="border border-primary-foreground px-6 py-3 text-sm font-mono tracking-wider uppercase hover:bg-primary-foreground hover:text-primary transition-colors active:scale-[0.97]"
                  >
                    Join
                  </button>
                </form>
              </ScrollReveal>
            )}
          </div>
        </section>

        {/* Free vs Pro */}
        <section className="py-16 px-4 md:px-6">
          <div className="max-w-2xl mx-auto">
            <ScrollReveal>
              <h2 className="font-display text-2xl tracking-tight italic mb-8 text-center">What stays free</h2>
            </ScrollReveal>
            <ScrollReveal delay={60}>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-3">
                  <p className="text-xs font-mono tracking-wider uppercase text-muted-foreground mb-4">Free forever</p>
                  {["Create projects", "Invite collaborators", "Build portfolio", "Moodboards", "Events browsing", "Public profile"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-muted-foreground">
                      <Check className="w-3.5 h-3.5 text-accent" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-mono tracking-wider uppercase text-accent mb-4">Pro</p>
                  {["Featured profile", "Priority search", "Enhanced portfolio", "Profile analytics", "Featured projects", "Pro badge"].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-accent" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Pro;
