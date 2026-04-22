import { Link } from "react-router-dom";
import logo from "@/assets/atelier-logo.jpg";

const AtelierLogo = ({ className = "" }: { className?: string }) => (
  <Link to="/" className={`inline-block ${className}`} aria-label="Atelier home">
    <img
      src={logo}
      alt="Atelier"
      className="h-10 md:h-12 w-auto object-contain mix-blend-multiply"
    />
  </Link>
);

export default AtelierLogo;
