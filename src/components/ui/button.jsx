export function Button({ children, className = "", variant, ...props }) {
  let base = "px-4 py-2 rounded font-bold transition focus:outline-none ";
  if (variant === "outline") {
    base += "border border-white bg-transparent ";
  }
  return (
    <button
      className={base + className}
      {...props}
    >
      {children}
    </button>
  );
} 