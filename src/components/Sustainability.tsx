import { Shield, Recycle, RotateCcw, Handshake, Quote } from "lucide-react";

const Sustainability = () => {
  return (
    <section className="py-32 px-6 bg-background texture-marble relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl lg:text-5xl font-medium mb-6 text-foreground leading-tight">
            4R Technology
            <span className="block text-accent text-3xl lg:text-4xl font-normal mt-2">
              Sustainability Built In
            </span>
          </h2>
          <p className="font-body text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mt-8">
            Engineered with intention — every Lumina surface is created to protect people, resources, and the planet. Our sustainability promise goes beyond the product — it's embedded in every step of how we build, design, and deliver.
          </p>
        </div>

        {/* 4R Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
          
          {/* Reduce */}
          <div className="bg-secondary p-10 rounded-2xl border border-border text-center group hover-card-lift">
            <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 hover-icon-glow">
              <Shield className="w-10 h-10 text-accent transition-all duration-300 group-hover:drop-shadow-[0_0_12px_hsl(var(--accent)/0.7)]" />
            </div>
            <h3 className="font-display text-xl font-medium text-foreground mb-4">
              Reduce
            </h3>
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              Leading with nearly zero silica for a smarter, more advanced surface.
            </p>
          </div>

          {/* Recycle */}
          <div className="bg-secondary p-10 rounded-2xl border border-border text-center group hover-card-lift">
            <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 hover-icon-glow">
              <Recycle className="w-10 h-10 text-accent transition-all duration-300 group-hover:drop-shadow-[0_0_12px_hsl(var(--accent)/0.7)]" />
            </div>
            <h3 className="font-display text-xl font-medium text-foreground mb-4">
              Recycle
            </h3>
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              80% recycled material, reducing waste and carbon footprint.
            </p>
          </div>

          {/* Reuse */}
          <div className="bg-secondary p-10 rounded-2xl border border-border text-center group hover-card-lift">
            <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 hover-icon-glow">
              <RotateCcw className="w-10 h-10 text-accent transition-all duration-300 group-hover:drop-shadow-[0_0_12px_hsl(var(--accent)/0.7)]" />
            </div>
            <h3 className="font-display text-xl font-medium text-foreground mb-4">
              Reuse
            </h3>
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              100% water reused, zero waste, and biodiversity protected.
            </p>
          </div>

          {/* Respect */}
          <div className="bg-secondary p-10 rounded-2xl border border-border text-center group hover-card-lift">
            <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 hover-icon-glow">
              <Handshake className="w-10 h-10 text-accent transition-all duration-300 group-hover:drop-shadow-[0_0_12px_hsl(var(--accent)/0.7)]" />
            </div>
            <h3 className="font-display text-xl font-medium text-foreground mb-4">
              Respect
            </h3>
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              Low-impact surfaces for a greener, more sustainable future.
            </p>
          </div>
        </div>

        {/* CEO Quote */}
        <div className="text-center">
          <div className="max-w-4xl mx-auto bg-secondary/50 p-12 rounded-3xl border border-accent/20 relative">
            <Quote className="w-12 h-12 text-accent/40 absolute top-8 left-8" />
            <blockquote className="relative z-10">
              <p className="font-body text-2xl text-foreground leading-relaxed italic mb-8">
                "Sustainability isn't a feature — it's a responsibility. Every slab we make reflects our commitment to healthier homes and a healthier planet."
              </p>
              <cite className="font-display text-lg text-accent font-medium not-italic flex items-center justify-center gap-3">
                <span className="w-12 h-px bg-accent/40"></span>
                Rick Piaz, Chief Executive Officer
                <span className="w-12 h-px bg-accent/40"></span>
              </cite>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sustainability;