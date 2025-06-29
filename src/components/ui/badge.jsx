export function Badge({ children, className = "", variant = "default", ...props }) {
  let base = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ";
  
  if (variant === "outline") {
    base += "border border-slate-600 text-slate-300 bg-slate-800/50 ";
  } else {
    base += "bg-slate-700 text-slate-200 ";
  }
  
  return (
    <span className={base + className} {...props}>
      {children}
    </span>
  );
} 