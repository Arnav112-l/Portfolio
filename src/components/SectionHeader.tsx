type Props = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
};

export default function SectionHeader({ title, subtitle, eyebrow }: Props) {
  return (
    <header className="mb-8 border-b border-border pb-6 sm:mb-10 sm:pb-8">
      {eyebrow && (
        <p className="mb-2 font-serif text-base italic text-accent sm:text-lg">{eyebrow}</p>
      )}
      <h2 className="font-serif text-2xl tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-xl font-serif text-sm italic leading-relaxed text-muted sm:text-base">
          {subtitle}
        </p>
      )}
    </header>
  );
}
