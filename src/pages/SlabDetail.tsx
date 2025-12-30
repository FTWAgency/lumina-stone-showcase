import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, MapPin, FileText, Download, ChefHat, Bath, Flame, Building2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageCarousel from "@/components/ImageCarousel";
import { slabs } from "./Collection";

const applicationIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  kitchen: ChefHat,
  bath: Bath,
  fireplace: Flame,
  commercial: Building2,
  accent: Sparkles,
};

const SlabDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const currentIndex = slabs.findIndex(s => s.id === slug);
  const slab = currentIndex !== -1 ? slabs[currentIndex] : null;
  
  // Get previous and next slabs (wrap around)
  const prevSlab = currentIndex > 0 ? slabs[currentIndex - 1] : slabs[slabs.length - 1];
  const nextSlab = currentIndex < slabs.length - 1 ? slabs[currentIndex + 1] : slabs[0];

  if (!slab) {
    return (
      <div className="min-h-screen bg-[hsl(var(--deep-alpine))] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl text-foreground mb-4">Slab Not Found</h1>
          <p className="font-body text-foreground/70 mb-8">The slab you're looking for doesn't exist.</p>
          <Link to="/collection">
            <Button variant="premium">Back to Collection</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--deep-alpine))]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[hsl(var(--deep-alpine))]/95 backdrop-blur-md border-b border-border/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            to="/collection" 
            className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors font-body"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Collection
          </Link>
          <Link to="/" className="font-display text-xl font-medium tracking-wide text-foreground">
            LUMINA
          </Link>
        </div>
      </header>

      {/* Hero Image Carousel */}
      <section className="relative h-[60vh] lg:h-[70vh] overflow-hidden">
        <ImageCarousel
          images={slab.images}
          alt={slab.name}
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--deep-alpine))] via-[hsl(var(--deep-alpine))]/30 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--deep-alpine))]/50 to-transparent pointer-events-none" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
          <div className="max-w-4xl">
            <div className="flex gap-2 mb-4">
              <span className="text-xs font-body text-accent uppercase tracking-wider px-3 py-1.5 bg-accent/20 rounded-full border border-accent/40 backdrop-blur-sm">
                {slab.colorFamily}
              </span>
              <span className="text-xs font-body text-foreground/80 uppercase tracking-wider px-3 py-1.5 bg-secondary/40 rounded-full backdrop-blur-sm">
                {slab.style}
              </span>
            </div>
            <h1 className="font-display text-5xl lg:text-7xl font-medium text-foreground mb-4">
              {slab.name}
            </h1>
            <p className="font-body text-2xl text-accent italic">
              {slab.description}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Description */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="font-display text-sm uppercase tracking-widest text-foreground/50 mb-6">
                  About This Design
                </h2>
                <p className="font-body text-xl lg:text-2xl text-foreground/80 leading-relaxed">
                  {slab.details}
                </p>
              </div>

              {/* Applications */}
              <div>
                <h2 className="font-display text-sm uppercase tracking-widest text-foreground/50 mb-6">
                  Ideal Applications
                </h2>
                <p className="font-body text-foreground/70 mb-6">
                  Kitchen countertops, vanities, showers, fireplaces, accent walls.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {slab.applications.map((app) => {
                    const IconComponent = applicationIcons[app.icon] || Sparkles;
                    return (
                      <div
                        key={app.name}
                        className="flex items-center gap-4 px-6 py-5 bg-secondary/20 rounded-2xl border border-border/20 hover:border-accent/30 transition-all duration-300 hover:bg-secondary/30"
                      >
                        <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-accent" />
                        </div>
                        <span className="font-body text-lg text-foreground/90">
                          {app.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Specs placeholder */}
              <div>
                <h2 className="font-display text-sm uppercase tracking-widest text-foreground/50 mb-6">
                  Technical Specifications
                </h2>
                <div className="bg-secondary/20 rounded-2xl border border-border/20 p-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <p className="font-body text-sm text-foreground/50 mb-1">Slab Dimensions</p>
                      <p className="font-body text-foreground">126" × 63" (3200 × 1600 mm)</p>
                    </div>
                    <div>
                      <p className="font-body text-sm text-foreground/50 mb-1">Thickness Options</p>
                      <p className="font-body text-foreground">2 cm, 3 cm</p>
                    </div>
                    <div>
                      <p className="font-body text-sm text-foreground/50 mb-1">Surface Finish</p>
                      <p className="font-body text-foreground">Polished, Honed, Leathered</p>
                    </div>
                    <div>
                      <p className="font-body text-sm text-foreground/50 mb-1">Composition</p>
                      <p className="font-body text-foreground">93% Natural Quartz</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar CTAs */}
            <div className="space-y-6">
              <div className="sticky top-24 space-y-4">
                <Link to="/#dealer">
                  <Button variant="premium" size="lg" className="w-full gap-2">
                    <MapPin className="w-5 h-5" />
                    Find a Dealer
                  </Button>
                </Link>
                
                <Button variant="lumina-secondary" size="lg" className="w-full gap-2">
                  <FileText className="w-5 h-5" />
                  Request a Sample
                </Button>
                
                <Button variant="outline" size="lg" className="w-full gap-2 border-border/40 text-foreground/70 hover:text-foreground">
                  <Download className="w-5 h-5" />
                  Download Cut Sheet
                </Button>

                {/* Contact Card */}
                <div className="mt-8 p-6 bg-secondary/20 rounded-2xl border border-border/20">
                  <h3 className="font-display text-lg text-foreground mb-2">Need Help?</h3>
                  <p className="font-body text-sm text-foreground/60 mb-4">
                    Our design consultants are ready to assist with your project.
                  </p>
                  <p className="font-body text-accent">
                    1-800-LUMINA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Previous / Next Navigation */}
      <section className="py-12 px-6 border-t border-border/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Previous */}
            <Link 
              to={`/collection/${prevSlab.id}`}
              className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-secondary/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary/30 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <ArrowLeft className="w-5 h-5 text-foreground/60 group-hover:text-accent transition-colors" />
              </div>
              <div className="hidden sm:block">
                <p className="font-body text-xs uppercase tracking-wider text-foreground/50 mb-1">Previous</p>
                <p className="font-display text-lg text-foreground group-hover:text-accent transition-colors">
                  {prevSlab.name}
                </p>
              </div>
            </Link>

            {/* Divider / Grid link */}
            <Link 
              to="/collection"
              className="hidden md:flex flex-col items-center gap-2 px-6 py-3 rounded-xl hover:bg-secondary/20 transition-colors"
            >
              <div className="grid grid-cols-3 gap-1">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-sm bg-foreground/30" />
                ))}
              </div>
              <p className="font-body text-xs text-foreground/50">View All</p>
            </Link>

            {/* Next */}
            <Link 
              to={`/collection/${nextSlab.id}`}
              className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-secondary/20 transition-all duration-300"
            >
              <div className="hidden sm:block text-right">
                <p className="font-body text-xs uppercase tracking-wider text-foreground/50 mb-1">Next</p>
                <p className="font-display text-lg text-foreground group-hover:text-accent transition-colors">
                  {nextSlab.name}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-secondary/30 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <ArrowRight className="w-5 h-5 text-foreground/60 group-hover:text-accent transition-colors" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-6 bg-gradient-to-b from-[hsl(var(--deep-alpine))] to-secondary/20 border-t border-border/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl lg:text-5xl font-medium text-foreground mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="font-body text-xl text-foreground/70 mb-10 leading-relaxed">
            Experience {slab.name} in person at a showroom near you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/#dealer">
              <Button variant="premium" size="hero" className="gap-2">
                <MapPin className="w-5 h-5" />
                Find a Dealer
              </Button>
            </Link>
            <Link to="/collection">
              <Button variant="lumina-secondary" size="hero">
                Explore More Designs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/20 py-8 px-6 bg-[hsl(var(--deep-alpine))]">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-body text-sm text-muted-foreground">
            © 2024 Lumina Surfaces. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SlabDetail;
