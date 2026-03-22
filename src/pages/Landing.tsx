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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <AtelierLogo />
          <div className="flex items-center gap-6">
            <Link to="/auth" className="text-sm tracking-wide text-foreground/70 hover:text-foreground transition-colors">
              Sign In
            </Link>
            <Link
              to="/auth?mode=signup"
              className="bg-primary text-primary-foreground px-5 py-2 text-sm tracking-wide transition-transform active:scale-[0.97]"
            >
              Join Atelier
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-screen flex items-end">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Fashion editorial" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full">
          <h1
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[0.95] tracking-tight"
            style={{ opacity: 0, animation: "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s forwards" }}
          >
            Create together.
            <br />
            Build your portfolio.
          </h1>
          <p
            className="text-white/70 text-lg md:text-xl mt-6 max-w-xl leading-relaxed"
            style={{ opacity: 0, animation: "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s forwards" }}
          >
            The platform for London's emerging fashion creatives to collaborate on projects, not just post on feeds.
          </p>
          <div
            style={{ opacity: 0, animation: "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.7s forwards" }}
          >
            <Link
              to="/auth?mode=signup"
              className="inline-flex items-center gap-2 mt-8 bg-white text-black px-8 py-3.5 text-sm tracking-wider uppercase transition-transform active:scale-[0.97] hover:bg-white/90"
            >
              Start creating
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mission statement */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <p className="font-serif text-3xl md:text-4xl leading-snug tracking-tight">
              Fashion is collaborative. Your platform should be too.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-muted-foreground mt-8 max-w-2xl mx-auto leading-relaxed">
              Atelier replaces the scattered tools — Instagram for networking, WhatsApp for coordination, separate portfolio sites — with one space where projects come to life and portfolios build themselves.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl mb-20 tracking-tight">How Atelier works</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              {[
                { num: "01", title: "Create a project", desc: "Define your vision — editorial, lookbook, collection, or shoot. Upload moodboard images and set the details." },
                { num: "02", title: "Build your team", desc: "Invite photographers, stylists, models, and makeup artists. They join, you collaborate." },
                { num: "03", title: "Complete the work", desc: "Upload final images when the project wraps. It automatically becomes portfolio work for everyone involved." },
              ].map((step, i) => (
                <ScrollReveal key={step.num} delay={i * 80}>
                  <div className="flex gap-6">
                    <span className="text-sm text-muted-foreground font-mono mt-1">{step.num}</span>
                    <div>
                      <h3 className="font-serif text-xl mb-2">{step.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal delay={200}>
              <div className="aspect-[4/5] overflow-hidden">
                <img src={collabImage} alt="Creative team collaborating" className="w-full h-full object-cover" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-12">
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight">Recent projects</h2>
              <Link to="/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {featured.map((project, i) => (
              <ScrollReveal key={project.id} delay={i * 80}>
                <ProjectCard project={project} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-tight">
              Your work deserves more than a feed.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="mt-6 text-primary-foreground/70 max-w-lg mx-auto">
              Join London's creative community on Atelier and start building your portfolio through real projects.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <Link
              to="/auth?mode=signup"
              className="inline-flex items-center gap-2 mt-10 bg-primary-foreground text-primary px-8 py-3.5 text-sm tracking-wider uppercase transition-transform active:scale-[0.97]"
            >
              Join Atelier
              <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <AtelierLogo />
          <p className="text-xs text-muted-foreground">London · For fashion creatives, by fashion creatives</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
