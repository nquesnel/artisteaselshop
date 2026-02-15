type SeparatorProps = {
  className?: string;
};

function Separator({ className = "" }: SeparatorProps) {
  return (
    <hr
      className={`border-t border-stone-200 ${className}`}
      role="separator"
    />
  );
}

export { Separator };
export type { SeparatorProps };
