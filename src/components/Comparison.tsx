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
    <section className="py-32 px-6 bg-gradient-stone">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl lg:text-5xl font-medium mb-8 leading-tight">
            Lumina vs. 
            <span className="text-muted-foreground"> Traditional Quartz</span>
          </h2>
          <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            See why forward-thinking architects and designers are choosing Lumina for their most important projects.
          </p>
        </div>

        <div className="bg-secondary rounded-2xl border border-border shadow-premium overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-3 border-b border-border bg-muted/50">
            <div className="p-8">
              <h3 className="font-display text-xl font-medium text-foreground">Features</h3>
            </div>
            <div className="p-8 text-center border-l border-border bg-primary/10">
              <h3 className="font-display text-xl font-medium text-primary">Lumina</h3>
              <p className="font-body text-sm text-muted-foreground mt-2">Next Generation</p>
            </div>
            <div className="p-8 text-center border-l border-border">
              <h3 className="font-display text-xl font-medium text-muted-foreground">Traditional Quartz</h3>
              <p className="font-body text-sm text-muted-foreground mt-2">Legacy Material</p>
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
                  <span className="font-body text-foreground font-medium">{feature.name}</span>
                </div>
                <div className="p-6 text-center border-l border-border">
                  {feature.lumina ? (
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/20 rounded-full">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : (
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-destructive/20 rounded-full">
                      <svg className="w-5 h-5 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-6 text-center border-l border-border">
                  {feature.traditional ? (
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-accent/20 rounded-full">
                      <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : (
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-muted rounded-full">
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