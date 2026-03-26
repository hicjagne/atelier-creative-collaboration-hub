import { mockProjects, mockUsers } from "@/lib/mock-data";

interface Props {
  userId: string;
}

const CollaborationGraph = ({ userId }: Props) => {
  // Build collaboration data from projects
  const userProjects = mockProjects.filter((p) =>
    p.collaborators.some((c) => c.user_id === userId && c.invite_status === "accepted")
  );

  // Unique collaborators (excluding self)
  const collabMap = new Map<string, { name: string; role: string; count: number }>();
  userProjects.forEach((p) => {
    p.collaborators
      .filter((c) => c.user_id !== userId && c.invite_status === "accepted")
      .forEach((c) => {
        const existing = collabMap.get(c.user_id);
        if (existing) {
          existing.count++;
        } else {
          const user = mockUsers.find((u) => u.id === c.user_id);
          collabMap.set(c.user_id, {
            name: user?.name ?? "Unknown",
            role: c.role,
            count: 1,
          });
        }
      });
  });

  const collaborators = Array.from(collabMap.values());
  const roleCredits = new Map<string, number>();
  userProjects.forEach((p) => {
    const userCollab = p.collaborators.find((c) => c.user_id === userId);
    if (userCollab) {
      const prev = roleCredits.get(userCollab.role) ?? 0;
      roleCredits.set(userCollab.role, prev + 1);
    }
  });

  const totalProjects = userProjects.length;
  const completedCount = userProjects.filter((p) => p.status === "completed").length;

  return (
    <div className="border border-border p-6 md:p-8">
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div>
          <span className="block font-display text-3xl italic">{totalProjects}</span>
          <span className="text-xs font-mono text-muted-foreground tracking-wide">Projects</span>
        </div>
        <div>
          <span className="block font-display text-3xl italic">{completedCount}</span>
          <span className="text-xs font-mono text-muted-foreground tracking-wide">Completed</span>
        </div>
        <div>
          <span className="block font-display text-3xl italic">{collaborators.length}</span>
          <span className="text-xs font-mono text-muted-foreground tracking-wide">Collaborators</span>
        </div>
      </div>

      {/* Visual credits bar */}
      <div className="mb-8">
        <p className="text-xs font-mono text-muted-foreground tracking-wide mb-3 uppercase">Credited as</p>
        <div className="flex h-8 overflow-hidden">
          {Array.from(roleCredits.entries()).map(([role, count], i) => {
            const colors = [
              "bg-accent",
              "bg-primary",
              "bg-muted-foreground",
              "bg-accent/60",
              "bg-primary/60",
            ];
            const width = (count / totalProjects) * 100;
            return (
              <div
                key={role}
                className={`${colors[i % colors.length]} flex items-center justify-center transition-all`}
                style={{ width: `${width}%` }}
                title={`${role}: ${count}`}
              >
                <span className="text-[10px] text-primary-foreground font-mono truncate px-2">
                  {role}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Network */}
      <div>
        <p className="text-xs font-mono text-muted-foreground tracking-wide mb-4 uppercase">Network</p>
        <div className="flex flex-wrap gap-3">
          {collaborators.map((collab, i) => (
            <div
              key={i}
              className="flex items-center gap-2 border border-border px-3 py-2 hover:border-accent/50 transition-colors"
            >
              <div className="w-6 h-6 bg-accent/10 flex items-center justify-center text-[10px] font-display italic text-accent">
                {collab.name.charAt(0)}
              </div>
              <div>
                <span className="text-xs font-medium block leading-tight">{collab.name}</span>
                <span className="text-[10px] font-mono text-muted-foreground">
                  {collab.role} · {collab.count}×
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollaborationGraph;
