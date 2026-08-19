import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

const defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const Sparkles = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

export const Cake = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
    <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" />
    <path d="M2 21h20" />
    <path d="M7 8v2" />
    <path d="M12 8v2" />
    <path d="M17 8v2" />
    <path d="M7 4h.01" />
    <path d="M12 4h.01" />
    <path d="M17 4h.01" />
  </svg>
);

export const ShoppingBag = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

export const Search = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export const MessageCircle = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
  </svg>
);

export const Star = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export const Check = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const CheckCircle2 = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const AlertCircle = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </svg>
);

export const Info = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

export const X = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export const Plus = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

export const Minus = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="M5 12h14" />
  </svg>
);

export const Trash2 = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" x2="10" y1="11" y2="17" />
    <line x1="14" x2="14" y1="11" y2="17" />
  </svg>
);

export const ArrowRight = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export const ArrowLeft = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

export const Clock = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export const Truck = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
    <path d="M15 18H9" />
    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14v10Z" />
    <circle cx="17" cy="18.5" r="2.5" />
    <circle cx="7" cy="18.5" r="2.5" />
  </svg>
);

export const ShieldCheck = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const Heart = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

export const Award = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

export const MapPin = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const Phone = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const PhoneCall = Phone;

export const Mail = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export const Instagram = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const Facebook = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const Youtube = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

export const Send = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);

export const Menu = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

export const Layers = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

export const Home = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

export const Loader2 = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={`animate-spin ${className}`} {...props}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export const Flame = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

export const ChevronDown = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const ChevronRight = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export const HelpCircle = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </svg>
);

export const Quote = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
  </svg>
);

export const Upload = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" x2="12" y1="3" y2="15" />
  </svg>
);

export const Palette = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
  </svg>
);

export const User = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const Calendar = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
  </svg>
);

export const Copy = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

export const Tag = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
    <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
  </svg>
);

export const Filter = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

export const SlidersHorizontal = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <line x1="21" x2="14" y1="4" y2="4" />
    <line x1="10" x2="3" y1="4" y2="4" />
    <line x1="21" x2="12" y1="12" y2="12" />
    <line x1="8" x2="3" y1="12" y2="12" />
    <line x1="21" x2="16" y1="20" y2="20" />
    <line x1="12" x2="3" y1="20" y2="20" />
    <line x1="14" x2="14" y1="2" y2="6" />
    <line x1="8" x2="8" y1="10" y2="14" />
    <line x1="16" x2="16" y1="18" y2="22" />
  </svg>
);

export const Share2 = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
  </svg>
);

export const PackageCheck = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="m16 16 2 2 4-4" />
    <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
    <path d="m7.5 4.27 9 5.15" />
    <polyline points="3.29 7 12 12 20.71 7" />
    <line x1="12" x2="12" y1="22" y2="12" />
  </svg>
);

export const RefreshCw = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M8 16H3v5" />
  </svg>
);

export const Printer = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect width="12" height="8" x="6" y="14" />
  </svg>
);

export const CreditCard = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
);

export const Banknote = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <rect width="20" height="12" x="2" y="6" rx="2" />
    <circle cx="12" cy="12" r="2" />
    <path d="M6 12h.01M18 12h.01" />
  </svg>
);

export const Lock = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export const LayoutDashboard = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <rect width="7" height="9" x="3" y="3" rx="1" />
    <rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7" height="9" x="14" y="12" rx="1" />
    <rect width="7" height="5" x="3" y="16" rx="1" />
  </svg>
);

export const Store = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
    <path d="M2 7h20" />
    <path d="M22 7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2" />
    <path d="M17 7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2" />
    <path d="M12 7a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2" />
    <path d="M7 7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2" />
  </svg>
);

export const TrendingUp = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

export const DollarSign = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <line x1="12" x2="12" y1="2" y2="22" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

export const BookOpen = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

export const Edit3 = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);

export const Eye = ({ size = 24, className = "", ...props }: IconProps) => (
  <svg {...defaultProps} width={size} height={size} className={className} {...props}>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
