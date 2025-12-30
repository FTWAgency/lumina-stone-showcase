import { Shield, Recycle, RotateCcw, Handshake } from "lucide-react";

const Sustainability = () => {
  return (
    <section className="py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
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
          <div className="bg-secondary p-10 rounded-2xl border border-border text-center group hover:shadow-premium transition-all duration-300">
            <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
              <Shield className="w-10 h-10 text-accent" />
            </div>
            <h3 className="font-display text-xl font-medium text-foreground mb-4">
              Reduce
            </h3>
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              Leading with nearly zero silica for a smarter, more advanced surface.
            </p>
          </div>

          {/* Recycle */}
          <div className="bg-secondary p-10 rounded-2xl border border-border text-center group hover:shadow-premium transition-all duration-300">
            <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
              <Recycle className="w-10 h-10 text-accent" />
            </div>
            <h3 className="font-display text-xl font-medium text-foreground mb-4">
              Recycle
            </h3>
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              80% recycled material, reducing waste and carbon footprint.
            </p>
          </div>

          {/* Reuse */}
          <div className="bg-secondary p-10 rounded-2xl border border-border text-center group hover:shadow-premium transition-all duration-300">
            <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
              <RotateCcw className="w-10 h-10 text-accent" />
            </div>
            <h3 className="font-display text-xl font-medium text-foreground mb-4">
              Reuse
            </h3>
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              100% water reused, zero waste, and biodiversity protected.
            </p>
          </div>

          {/* Respect */}
          <div className="bg-secondary p-10 rounded-2xl border border-border text-center group hover:shadow-premium transition-all duration-300">
            <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
              <Handshake className="w-10 h-10 text-accent" />
            </div>
            <h3 className="font-display text-xl font-medium text-foreground mb-4">
              Respect
            </h3>
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              Low-impact surfaces for a greener, more sustainable future.
            </p>
          </div>
        </div>

        {/* Closing Statement */}
        <div className="text-center">
          <blockquote className="max-w-4xl mx-auto">
            <p className="font-body text-xl text-muted-foreground leading-relaxed italic mb-6">
              "We're not just creating better surfaces — we're rethinking what responsible manufacturing looks like. The 4R framework reflects our commitment to protecting people, preserving resources, and leading this industry toward a safer, smarter future."
            </p>
            <cite className="font-display text-base text-accent font-medium not-italic">
              — Rick Paiz, Chief Executive Officer
            </cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default Sustainability;