import type { AvailabilityStatus } from "@/lib/mock-data";

const config: Record<AvailabilityStatus, { label: string; className: string }> = {
  available: { label: "Available", className: "bg-atelier-available/15 text-atelier-available" },
  limited: { label: "Limited", className: "bg-atelier-limited/15 text-atelier-limited" },
  busy: { label: "Busy", className: "bg-atelier-busy/15 text-atelier-busy" },
};

const AvailabilityBadge = ({ status }: { status: AvailabilityStatus }) => {
  const { label, className } = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs tracking-wide px-2.5 py-1 rounded-full ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
};

export default AvailabilityBadge;
