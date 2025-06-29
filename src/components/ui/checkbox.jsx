export function Checkbox({ className = "", checked, onCheckedChange, ...props }) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
      className={`w-4 h-4 rounded border-slate-600 bg-slate-700 text-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-slate-800 ${className}`}
      {...props}
    />
  );
} 