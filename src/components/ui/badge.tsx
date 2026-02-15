type BadgeVariant = "default" | "terracotta" | "sage" | "sale";

type BadgeProps = {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
};

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-stone-100 text-stone-700 border border-stone-200",
  terracotta:
    "bg-terracotta/10 text-terracotta-dark border border-terracotta/20",
  sage:
    "bg-sage/10 text-sage-dark border border-sage/20",
  sale:
    "bg-error/10 text-error border border-error/20",
};

function Badge({ variant = "default", children, className = "" }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center font-body font-medium
        text-[11px] uppercase tracking-wider
        px-2.5 py-1 rounded-full
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

export { Badge };
export type { BadgeProps, BadgeVariant };
