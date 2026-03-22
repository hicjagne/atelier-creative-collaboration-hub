import { Link } from "react-router-dom";

const AtelierLogo = ({ className = "" }: { className?: string }) => (
  <Link to="/" className={`inline-block ${className}`}>
    <svg viewBox="0 0 120 32" className="h-7" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* Stylised A with T crossbar and subtle hanger hook */}
      <path d="M16.5 2 L8 28 L11 28 L13 22 L20 22 L22 28 L25 28 L16.5 2Z M14 19 L16.5 10 L19 19 Z" />
      {/* T crossbar through A */}
      <rect x="6" y="14" width="21" height="1.8" rx="0.9" />
      {/* Hanger hook at top of A */}
      <path d="M16.5 2 Q19 0, 20 2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Text: TELIER */}
      <text x="32" y="24" fontFamily="'Playfair Display', Georgia, serif" fontSize="16" fontWeight="500" letterSpacing="4">
        TELIER
      </text>
    </svg>
  </Link>
);

export default AtelierLogo;
