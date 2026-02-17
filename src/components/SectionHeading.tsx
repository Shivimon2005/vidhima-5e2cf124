interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  center?: boolean;
}

const SectionHeading = ({ label, title, description, center = true }: SectionHeadingProps) => (
  <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""} mb-12`}>
    {label && (
      <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-3">
        {label}
      </span>
    )}
    <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">{title}</h2>
    {description && <p className="text-muted-foreground leading-relaxed">{description}</p>}
  </div>
);

export default SectionHeading;
