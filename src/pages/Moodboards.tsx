import { useState } from "react";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import { mockMoodboards, currentUser } from "@/lib/mock-data";
import { Plus, Lock, Users, Image as ImageIcon, X } from "lucide-react";

const Moodboards = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);

  const userBoards = mockMoodboards.filter((b) => b.creator_id === currentUser.id);

  const inputClass =
    "w-full border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors";

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-14 md:pt-16 pb-tab-bar md:pb-0">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-12">
              <div>
                <h1 className="font-display text-4xl md:text-5xl tracking-tight italic mb-2">
                  Moodboards
                </h1>
                <p className="text-muted-foreground text-sm max-w-lg">
                  Collect inspiration, build visual narratives. Keep them private or share with your collaborators.
                </p>
              </div>
              <button
                onClick={() => setShowCreate(!showCreate)}
                className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2.5 text-sm tracking-wide transition-transform active:scale-[0.97]"
              >
                <Plus className="w-4 h-4" />
                New Board
              </button>
            </div>
          </ScrollReveal>

          {/* Create form */}
          {showCreate && (
            <ScrollReveal>
              <div className="border border-border p-6 mb-10 max-w-lg">
                <h3 className="font-display text-xl italic mb-4">Create Moodboard</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={inputClass}
                    placeholder="Board title..."
                  />
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`${inputClass} min-h-[80px] resize-none`}
                    placeholder="Describe the mood..."
                  />
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsPrivate(true)}
                      className={`flex items-center gap-2 px-4 py-2 text-xs tracking-wide border transition-colors ${
                        isPrivate ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground"
                      }`}
                    >
                      <Lock className="w-3 h-3" /> Private
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsPrivate(false)}
                      className={`flex items-center gap-2 px-4 py-2 text-xs tracking-wide border transition-colors ${
                        !isPrivate ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground"
                      }`}
                    >
                      <Users className="w-3 h-3" /> Shared
                    </button>
                  </div>
                  <div className="flex gap-3">
                    <button className="bg-primary text-primary-foreground px-6 py-2.5 text-sm tracking-wider uppercase active:scale-[0.97] transition-transform">
                      Create
                    </button>
                    <button
                      onClick={() => setShowCreate(false)}
                      className="px-6 py-2.5 text-sm text-muted-foreground border border-border"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Boards grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userBoards.map((board, i) => (
              <ScrollReveal key={board.id} delay={i * 60}>
                <div className="group border border-border overflow-hidden hover:border-accent/50 transition-colors cursor-pointer">
                  {/* Image collage */}
                  <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                    {board.images.length > 0 ? (
                      <div className="grid grid-cols-2 h-full">
                        {board.images.slice(0, 4).map((img, j) => (
                          <img
                            key={j}
                            src={img}
                            alt=""
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <ImageIcon className="w-8 h-8 text-muted-foreground" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      {board.is_private ? (
                        <span className="bg-primary/80 backdrop-blur-sm text-primary-foreground text-[10px] font-mono px-2 py-1 flex items-center gap-1">
                          <Lock className="w-2.5 h-2.5" /> Private
                        </span>
                      ) : (
                        <span className="bg-accent/80 backdrop-blur-sm text-accent-foreground text-[10px] font-mono px-2 py-1 flex items-center gap-1">
                          <Users className="w-2.5 h-2.5" /> Shared
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-lg italic">{board.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{board.description}</p>
                    <p className="text-[10px] font-mono text-muted-foreground mt-2">
                      {board.images.length} images
                      {board.shared_with.length > 0 && ` · ${board.shared_with.length} collaborators`}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}

            {/* Add new board card */}
            <ScrollReveal delay={userBoards.length * 60}>
              <button
                onClick={() => setShowCreate(true)}
                className="border border-dashed border-border aspect-[4/3] flex flex-col items-center justify-center gap-2 hover:border-accent/50 transition-colors"
              >
                <Plus className="w-6 h-6 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">New moodboard</span>
              </button>
            </ScrollReveal>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Moodboards;
