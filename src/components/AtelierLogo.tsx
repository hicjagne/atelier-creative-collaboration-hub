import { Link } from "react-router-dom";

const AtelierLogo = ({ className = "" }: { className?: string }) => (
  <Link to="/" className={`inline-block ${className}`}>
    <span className="font-display text-2xl md:text-3xl tracking-tight italic">
      atelier
      <span className="inline-block w-1.5 h-1.5 bg-accent rounded-full ml-0.5 -translate-y-3" />
    </span>
  </Link>
);

export default AtelierLogo;
