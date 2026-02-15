type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
};

function SectionHeader({
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={`
        ${align === "center" ? "text-center" : "text-left"}
        ${className}
      `}
    >
      <h2 className="font-heading text-3xl sm:text-4xl text-charcoal tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 font-body text-[15px] text-stone-500 max-w-2xl leading-relaxed ${align === "center" ? "mx-auto" : ""}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export { SectionHeader };
export type { SectionHeaderProps };
