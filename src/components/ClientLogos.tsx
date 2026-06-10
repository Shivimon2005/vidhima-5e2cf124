const clients = [
  "HPPWD",
  "Rural Dev. Dept, HP",
  "HP Jal Shakti Vibhag",
  "Kangra Municipal Council",
  "HP Education Dept",
  "HP Forest Corporation",
  "DRDA Kangra",
  "HP Tourism Dev. Corp",
  "PWD Himachal Pradesh",
  "Panchayati Raj Dept, HP",
];

interface ClientLogosProps {
  className?: string;
}

const ClientLogos = ({ className = "" }: ClientLogosProps) => {
  const doubled = [...clients, ...clients];

  return (
    <div className={`py-12 ${className}`}>
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">
        Trusted by Government Departments &amp; Institutions
      </p>
      <div className="overflow-hidden">
        <div
          className="flex gap-4 w-max"
          style={{ animation: "marquee 28s linear infinite" }}
        >
          {doubled.map((name, i) => (
            <span
              key={i}
              className="shrink-0 px-5 py-2.5 rounded-full border border-border bg-card text-sm font-medium text-muted-foreground whitespace-nowrap hover:border-primary/30 hover:text-foreground transition-colors"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientLogos;
