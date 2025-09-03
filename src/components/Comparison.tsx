const Comparison = () => {
  const features = [
    { name: "Silica-Free", lumina: true, traditional: false },
    { name: "Safer for Fabricators", lumina: true, traditional: false },
    { name: "Stain Resistant", lumina: true, traditional: true },
    { name: "UV Resistant", lumina: true, traditional: false },
    { name: "Recycled Content", lumina: true, traditional: false },
    { name: "15-Year Warranty", lumina: true, traditional: false },
    { name: "Nano-Ink Technology", lumina: true, traditional: false },
    { name: "Lightweight Design", lumina: true, traditional: false }
  ];

  return (
    <section className="py-24 px-6 bg-background-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-6 text-foreground-dark">
            Lumina vs. 
            <span className="text-foreground-dark/70"> Traditional Quartz</span>
          </h2>
          <p className="font-sans text-lg text-foreground-dark/70 max-w-2xl mx-auto">
            See why forward-thinking architects and designers are choosing Lumina for their most important projects.
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-premium overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-3 border-b border-border bg-muted/50">
            <div className="p-6">
              <h3 className="font-serif text-xl font-semibold text-foreground">Features</h3>
            </div>
            <div className="p-6 text-center border-l border-border bg-primary/5">
              <h3 className="font-serif text-xl font-semibold text-primary">Lumina</h3>
              <p className="text-sm text-muted-foreground mt-1">Next Generation</p>
            </div>
            <div className="p-6 text-center border-l border-border">
              <h3 className="font-serif text-xl font-semibold text-muted-foreground">Traditional Quartz</h3>
              <p className="text-sm text-muted-foreground mt-1">Legacy Material</p>
            </div>
          </div>

          {/* Feature rows */}
          <div className="divide-y divide-border">
            {features.map((feature, index) => (
              <div 
                key={feature.name}
                className={`grid grid-cols-3 hover:bg-muted/20 transition-colors duration-200 ${
                  index % 2 === 0 ? 'bg-background' : 'bg-muted/10'
                }`}
              >
                <div className="p-6">
                  <span className="font-sans text-foreground font-medium">{feature.name}</span>
                </div>
                <div className="p-6 text-center border-l border-border">
                  {feature.lumina ? (
                    <div className="inline-flex items-center justify-center w-8 h-8 bg-primary/20 rounded-full">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : (
                    <div className="inline-flex items-center justify-center w-8 h-8 bg-destructive/20 rounded-full">
                      <svg className="w-5 h-5 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-6 text-center border-l border-border">
                  {feature.traditional ? (
                    <div className="inline-flex items-center justify-center w-8 h-8 bg-accent/20 rounded-full">
                      <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : (
                    <div className="inline-flex items-center justify-center w-8 h-8 bg-muted rounded-full">
                      <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;