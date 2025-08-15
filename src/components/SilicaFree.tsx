import { Heart, AlertTriangle, Shield, Quote } from "lucide-react";

const SilicaFree = () => {
  return (
    <section className="py-24 px-6 bg-card">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Why Crystalline Silica Is 
            <span className="block text-destructive">Dangerous</span>
          </h2>
          <p className="font-sans text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Traditional engineered stone contains up to 95% crystalline silica — a hidden hazard responsible for 
            long-term health risks. Lumina eliminates this threat with a safer, silica-free alternative.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Column 1 - Visual Illustration */}
          <div className="flex flex-col items-center justify-center text-center p-8 bg-background rounded-xl border border-border">
            <div className="relative mb-4 w-80 h-80 flex items-center justify-center">
              <img 
                src="/lovable-uploads/0bfcd651-df72-4c9d-a913-0c4fda295440.png" 
                alt="Lungs affected by crystalline silica particles"
                className="w-full h-full object-contain"
              />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-destructive rounded-full flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-white" />
              </div>
            </div>
            <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
              Health Hazard Alert
            </h3>
            <p className="text-sm text-muted-foreground">
              Crystalline silica dust poses serious respiratory risks to workers
            </p>
          </div>

          {/* Column 2 - Fast Facts */}
          <div className="space-y-6 flex flex-col justify-center">
            <div className="bg-background p-6 rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-destructive/10 rounded-lg flex items-center justify-center">
                  <span className="text-destructive font-bold text-sm">#1</span>
                </div>
                <h4 className="font-semibold text-foreground">Workplace Health Risk</h4>
              </div>
              <p className="text-sm text-muted-foreground">In Stone Fabrication</p>
            </div>

            <div className="bg-background p-6 rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-destructive/10 rounded-lg flex items-center justify-center">
                  <span className="text-destructive font-bold text-sm">95%</span>
                </div>
                <h4 className="font-semibold text-foreground">Quartz Surfaces Contain</h4>
              </div>
              <p className="text-sm text-muted-foreground">Crystalline Silica</p>
            </div>

            <div className="bg-background p-6 rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-8 h-8 text-destructive" />
                <h4 className="font-semibold text-foreground">Linked to Health Issues</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Silicosis, Lung Cancer & Chronic Respiratory Illness
              </p>
            </div>
          </div>

          {/* Column 3 - Fabricator Quote */}
          <div className="bg-primary/5 p-8 rounded-xl border border-primary/20 relative flex flex-col justify-center">
            <div className="mb-6">
              <img 
                src="/lovable-uploads/d51d4bbf-97fc-4ca3-b718-cc87dd34de31.png" 
                alt="Fabricator working with protective equipment on stone surface"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <Quote className="w-8 h-8 text-primary mb-4" />
            <blockquote className="font-sans text-lg text-foreground leading-relaxed mb-6">
              "Working with Lumina gives us peace of mind — no dust, no danger. It's the future of our trade."
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-lg">JM</span>
              </div>
              <div>
                <div className="font-semibold text-foreground">Javier M.</div>
                <div className="text-sm text-muted-foreground">Fabricator, San Diego</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-3 rounded-full">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-primary font-semibold">100% Silica-Free Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SilicaFree;