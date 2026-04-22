import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-editorial.jpg";
import collabImage from "@/assets/collab-shoot.jpg";
import { mockProjects } from "@/lib/mock-data";
import ProjectCard from "@/components/ProjectCard";
import ScrollReveal from "@/components/ScrollReveal";
import AtelierLogo from "@/components/AtelierLogo";
import { ArrowRight } from "lucide-react";

const Landing = () => {
  const featured = mockProjects.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Minimal landing nav */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between text-foreground">
          <AtelierLogo />
          <div className="flex items-center gap-6">
            <Link to="/auth" className="text-sm tracking-wide opacity-70 hover:opacity-100 transition-opacity">
              Sign In
            </Link>
            <Link
              to="/auth?mode=signup"
              className="border border-current px-5 py-2 text-sm tracking-wide transition-transform active:scale-[0.97] hover:bg-primary-foreground hover:text-primary"
            >
              Join
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-screen flex items-end">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Fashion editorial" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 md:pb-24 w-full">
          <h1
            className="font-display text-5xl md:text-7xl lg:text-[6rem] text-primary-foreground leading-[0.95] tracking-tight italic"
            style={{ opacity: 0, animation: "fade-up 1s cubic-bezier(0.16,1,0.3,1) 0.2s forwards" }}
          >
            Create together.
            <br />
            <span className="not-italic font-sans font-light text-3xl md:text-4xl lg:text-5xl tracking-wide opacity-70">
              Build your portfolio.
            </span>
          </h1>
          <div
            style={{ opacity: 0, animation: "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.7s forwards" }}
          >
            <Link
              to="/auth?mode=signup"
              className="inline-flex items-center gap-3 mt-8 border border-primary-foreground text-primary-foreground px-8 py-3.5 text-sm font-mono tracking-wider uppercase transition-all active:scale-[0.97] hover:bg-primary-foreground hover:text-primary"
            >
              Start creating
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <p className="font-display text-3xl md:text-5xl leading-snug tracking-tight italic">
              Your Instagram grid isn't a portfolio.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-muted-foreground mt-8 max-w-xl leading-relaxed text-sm md:text-base">
              Atelier is where London's emerging creatives collaborate on real projects — and build a portfolio that actually means something. No likes. No followers. Just work.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* How it works — stripped back */}
      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl mb-16 tracking-tight italic">How it works</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="space-y-10">
              {[
                { num: "01", title: "Create a project", desc: "Define your vision. Upload moodboards. Set the vibe." },
                { num: "02", title: "Build your team", desc: "Find photographers, stylists, models — or anyone your project needs. Roles are open-ended." },
                { num: "03", title: "Ship it", desc: "Upload finals. The project becomes portfolio work for everyone involved. Credits build over time." },
              ].map((step, i) => (
                <ScrollReveal key={step.num} delay={i * 80}>
                  <div className="flex gap-6">
                    <span className="text-xs font-mono text-accent mt-1">{step.num}</span>
                    <div>
                      <h3 className="font-display text-xl italic mb-1">{step.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal delay={200}>
              <div className="aspect-[3/4] overflow-hidden border border-border">
                <img src={collabImage} alt="Creative team collaborating" className="w-full h-full object-cover" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-10">
              <h2 className="font-display text-3xl md:text-4xl tracking-tight italic">Recent work</h2>
              <Link to="/projects" className="text-xs font-mono text-muted-foreground hover:text-accent transition-colors flex items-center gap-1 tracking-wide uppercase">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((project, i) => (
              <ScrollReveal key={project.id} delay={i * 80}>
                <ProjectCard project={project} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight leading-tight italic">
              Your work deserves<br />more than a feed.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <Link
              to="/auth?mode=signup"
              className="inline-flex items-center gap-3 mt-10 border border-primary-foreground text-primary-foreground px-8 py-3.5 text-sm font-mono tracking-wider uppercase transition-all active:scale-[0.97] hover:bg-primary-foreground hover:text-primary"
            >
              Join Atelier
              <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <AtelierLogo />
          <p className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase">London · For creatives who make things</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
