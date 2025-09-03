import stonesamples from "@/assets/stone-samples.jpg";

const DesignShowcase = () => {
  const designs = [
    { name: "Crystallo", pattern: "Soft silver layering" },
    { name: "Cashmere Taj", pattern: "Creamy layered veins" },
    { name: "Lumina", pattern: "Warm golden movement" },
    { name: "Calcutta Sienna", pattern: "Defined flowing veining" },
    { name: "Terra Beige", pattern: "Natural earth tones" },
    { name: "Mont Blanc", pattern: "Cool marble striations" }
  ];

  return (
    <section className="py-24 px-6 bg-background-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-6 text-foreground-dark">
            Inspired by Nature.<br />
            <span className="text-primary">
              Perfected by Technology.
            </span>
          </h2>
          
          <p className="font-sans text-lg text-foreground-dark/70 max-w-3xl mx-auto leading-relaxed">
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
            <h3 className="font-serif text-2xl font-semibold text-white mb-2">
              Premium Collection
            </h3>
            <p className="text-white/80">Six signature patterns crafted for discerning architects</p>
          </div>
        </div>

        {/* Design grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {designs.map((design, index) => (
            <div 
              key={design.name}
              className="group bg-white p-6 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow cursor-pointer"
            >
              <div className="h-48 bg-gradient-to-br from-muted to-muted/50 rounded-lg mb-4 relative overflow-hidden">
                {design.name === "Crystallo" ? (
                  <img 
                    src="/lovable-uploads/fe2704b4-db2c-440f-8442-395a1f9f7e84.png" 
                    alt="Crystallo stone surface" 
                    className="w-full h-full object-cover"
                  />
                ) : design.name === "Cashmere Taj" ? (
                  <img 
                    src="/lovable-uploads/ffbbb8e7-46b2-4942-930d-c253317e9e67.png" 
                    alt="Cashmere Taj stone surface" 
                    className="w-full h-full object-cover"
                  />
                ) : design.name === "Lumina" ? (
                  <img 
                    src="/lovable-uploads/4762d9ed-200e-4b28-86d9-8d1cd2c426df.png" 
                    alt="Lumina stone surface" 
                    className="w-full h-full object-cover"
                  />
                ) : design.name === "Calcutta Sienna" ? (
                  <img 
                    src="/lovable-uploads/1c983e16-ba6b-40ac-9021-c9951c32d332.png" 
                    alt="Calcutta Sienna stone surface" 
                    className="w-full h-full object-cover"
                  />
                ) : design.name === "Terra Beige" ? (
                  <img 
                    src="/lovable-uploads/2b5d0ca5-fed7-40c4-a3db-cecd1c8697f0.png" 
                    alt="Terra Beige stone surface" 
                    className="w-full h-full object-cover"
                  />
                ) : design.name === "Mont Blanc" ? (
                  <img 
                    src="/lovable-uploads/7bd69178-6a3a-44ca-b099-d6eb06ecc52f.png" 
                    alt="Mont Blanc stone surface" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                       style={{
                         backgroundImage: `radial-gradient(circle at ${(index % 3) * 50}% ${Math.floor(index / 3) * 50}%, hsl(var(--primary)) 0%, transparent 50%)`
                       }}
                  ></div>
                )}
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground-dark mb-2">{design.name}</h3>
              <p className="font-sans text-sm text-foreground-dark/70">{design.pattern}</p>
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