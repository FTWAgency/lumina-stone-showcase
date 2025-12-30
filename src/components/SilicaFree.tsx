import { Heart, AlertTriangle, Shield, Quote } from "lucide-react";

const SilicaFree = () => {
  return (
    <section className="py-32 px-6 bg-secondary">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl lg:text-5xl font-medium mb-8 text-foreground leading-tight">
            Why Crystalline Silica Is 
            <span className="block text-destructive">Dangerous</span>
          </h2>
          <p className="font-body text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Traditional engineered stone contains up to 95% crystalline silica — a hidden hazard responsible for 
            long-term health risks. Lumina eliminates this threat with a safer, silica-free alternative.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid lg:grid-cols-3 gap-10 items-stretch">
          
          {/* Column 1 - Visual Illustration */}
          <div className="flex flex-col items-center justify-center text-center p-10 bg-background rounded-2xl border border-border">
            <div className="relative mb-6 w-80 h-80 flex items-center justify-center">
              <img 
                src="/lovable-uploads/0bfcd651-df72-4c9d-a913-0c4fda295440.png" 
                alt="Lungs affected by crystalline silica particles"
                className="w-full h-full object-contain"
              />
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-destructive rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-foreground" />
              </div>
            </div>
            <h3 className="font-display text-xl font-medium text-foreground mb-3">
              Health Hazard Alert
            </h3>
            <p className="font-body text-base text-muted-foreground">
              Crystalline silica dust poses serious respiratory risks to workers
            </p>
          </div>

          {/* Column 2 - Fast Facts */}
          <div className="space-y-6 flex flex-col justify-center">
            <div className="bg-background p-8 rounded-2xl border border-border">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-destructive/10 rounded-xl flex items-center justify-center">
                  <span className="text-destructive font-display font-medium text-sm">#1</span>
                </div>
                <h4 className="font-display font-medium text-foreground">Workplace Health Risk</h4>
              </div>
              <p className="font-body text-base text-muted-foreground">In Stone Fabrication</p>
            </div>

            <div className="bg-background p-8 rounded-2xl border border-border">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-destructive/10 rounded-xl flex items-center justify-center">
                  <span className="text-destructive font-display font-medium text-sm">95%</span>
                </div>
                <h4 className="font-display font-medium text-foreground">Quartz Surfaces Contain</h4>
              </div>
              <p className="font-body text-base text-muted-foreground">Crystalline Silica</p>
            </div>

            <div className="bg-background p-8 rounded-2xl border border-border">
              <div className="flex items-center gap-4 mb-4">
                <Shield className="w-10 h-10 text-destructive" />
                <h4 className="font-display font-medium text-foreground">Linked to Health Issues</h4>
              </div>
              <p className="font-body text-base text-muted-foreground">
                Silicosis, Lung Cancer & Chronic Respiratory Illness
              </p>
            </div>
          </div>

          {/* Column 3 - Fabricator Quote */}
          <div className="bg-primary/10 p-10 rounded-2xl border border-primary/20 relative flex flex-col justify-center">
            <div className="mb-8">
              <img 
                src="/lovable-uploads/d51d4bbf-97fc-4ca3-b718-cc87dd34de31.png" 
                alt="Fabricator working with protective equipment on stone surface"
                className="w-full h-52 object-cover rounded-xl"
              />
            </div>
            <Quote className="w-10 h-10 text-accent mb-6" />
            <blockquote className="font-body text-xl text-foreground leading-relaxed mb-8 italic">
              "Working with Lumina gives us peace of mind — no dust, no danger. It's the future of our trade."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-accent/20 rounded-full flex items-center justify-center">
                <span className="text-accent font-display font-medium text-lg">JM</span>
              </div>
              <div>
                <div className="font-display font-medium text-foreground">Javier M.</div>
                <div className="font-body text-sm text-muted-foreground">Fabricator, San Diego</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-3 bg-primary/10 px-8 py-4 rounded-full border border-primary/30">
            <Shield className="w-6 h-6 text-primary" />
            <span className="text-primary font-display font-medium text-lg">100% Silica-Free Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SilicaFree;