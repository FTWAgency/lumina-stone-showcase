import stonesamples from "@/assets/stone-samples.jpg";

const DesignShowcase = () => {
  const designs = [
    { name: "Carrara Elegance", pattern: "Classic marble veining" },
    { name: "Midnight Granite", pattern: "Deep charcoal speckles" },
    { name: "Golden Quartzite", pattern: "Warm gold threading" },
    { name: "Arctic White", pattern: "Pure minimalist surface" },
    { name: "Volcanic Slate", pattern: "Dramatic dark textures" },
    { name: "Rose Quartz", pattern: "Subtle pink undertones" }
  ];

  return (
    <section className="py-24 px-6 bg-gradient-stone">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-6">
            Inspired by Nature.<br />
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Perfected by Technology.
            </span>
          </h2>
          
          <p className="font-sans text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We replicate the elegance of natural stone using precision print tech. 
            Each slab is unique, durable, and stunning.
          </p>
        </div>

        {/* Featured showcase image */}
        <div className="mb-16 relative rounded-2xl overflow-hidden shadow-premium">
          <img 
            src={stonesamples} 
            alt="Stone sample collection" 
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
              Premium Collection
            </h3>
            <p className="text-muted-foreground">Six signature patterns crafted for discerning architects</p>
          </div>
        </div>

        {/* Design grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {designs.map((design, index) => (
            <div 
              key={design.name}
              className="group bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow cursor-pointer"
            >
              <div className="h-32 bg-gradient-to-br from-muted to-muted/50 rounded-lg mb-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                     style={{
                       backgroundImage: `radial-gradient(circle at ${(index % 3) * 50}% ${Math.floor(index / 3) * 50}%, hsl(var(--primary)) 0%, transparent 50%)`
                     }}
                ></div>
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">{design.name}</h3>
              <p className="font-sans text-sm text-muted-foreground">{design.pattern}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="inline-flex items-center gap-2 font-sans text-primary hover:text-accent transition-colors duration-300">
            Explore All Designs
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default DesignShowcase;