import { Shield, Recycle, RotateCcw, Handshake } from "lucide-react";

const Sustainability = () => {
  return (
    <section className="py-24 px-6 bg-background-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-4 text-foreground-dark">
            4R Technology
            <span className="block text-primary text-3xl lg:text-4xl font-medium">
              Sustainability Built In
            </span>
          </h2>
          <p className="font-sans text-lg text-foreground-dark/70 max-w-4xl mx-auto leading-relaxed mt-6">
            Engineered with intention — every Lumina surface is created to protect people, resources, and the planet. Our sustainability promise goes beyond the product - it's embedded in every step of how we build, design, and deliver.
          </p>
        </div>

        {/* 4R Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          
          {/* Reduce */}
          <div className="bg-white p-8 rounded-xl border border-border text-center group hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-foreground-dark mb-3">
              Reduce
            </h3>
            <p className="text-sm text-foreground-dark/70 leading-relaxed">
              Leading with nearly zero silica for a smarter, more advanced surface.
            </p>
          </div>

          {/* Recycle */}
          <div className="bg-white p-8 rounded-xl border border-border text-center group hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Recycle className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-foreground-dark mb-3">
              Recycle
            </h3>
            <p className="text-sm text-foreground-dark/70 leading-relaxed">
              80% recycled material, reducing waste and carbon footprint.
            </p>
          </div>

          {/* Reuse */}
          <div className="bg-white p-8 rounded-xl border border-border text-center group hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <RotateCcw className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-foreground-dark mb-3">
              Reuse
            </h3>
            <p className="text-sm text-foreground-dark/70 leading-relaxed">
              100% water reused, zero waste, and biodiversity protected.
            </p>
          </div>

          {/* Respect */}
          <div className="bg-white p-8 rounded-xl border border-border text-center group hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Handshake className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-foreground-dark mb-3">
              Respect
            </h3>
            <p className="text-sm text-foreground-dark/70 leading-relaxed">
              Low-impact surfaces for a greener, more sustainable future.
            </p>
          </div>
        </div>

        {/* Closing Statement */}
        <div className="text-center">
          <blockquote className="max-w-4xl mx-auto">
            <p className="font-sans text-lg text-foreground-dark/70 leading-relaxed italic mb-4">
              "We're not just creating better surfaces — we're rethinking what responsible manufacturing looks like. The 4R framework reflects our commitment to protecting people, preserving resources, and leading this industry toward a safer, smarter future."
            </p>
            <cite className="font-sans text-sm text-foreground-dark/70 font-medium not-italic">
              — Rick Paiz, Chief Executive Officer
            </cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default Sustainability;