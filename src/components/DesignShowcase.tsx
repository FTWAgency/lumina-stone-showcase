import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChefHat, Bath, Flame, Building2, Sparkles, MapPin, FileText, ExternalLink } from "lucide-react";
import stonesamples from "@/assets/stone-collection-showcase.png";
import designShowcaseBg from "@/assets/design-showcase-bg.png";
import crystalloKitchen from "@/assets/crystallo-kitchen.jpg";
import crystalloSlab from "@/assets/crystallo-slab.jpg";
import crystalloBookmatch from "@/assets/crystallo-bookmatch.png";
import cashmereTajKitchen from "@/assets/cashmere-taj-kitchen.jpg";
import cashmereTajSlab from "@/assets/cashmere-taj-slab.jpg";
import cashmereTajBookmatch from "@/assets/cashmere-taj-bookmatch.png";
import luminaKitchen from "@/assets/lumina-kitchen.jpg";
import luminaSlab from "@/assets/lumina-slab.jpg";
import luminaBookmatch from "@/assets/lumina-bookmatch.png";
import luminaCloseup from "@/assets/lumina-closeup.jpg";
import calacattaSiennaKitchen from "@/assets/calacatta-sienna-kitchen.jpg";
import calacattaSiennaSlab from "@/assets/calacatta-sienna-slab.jpg";
import calacattaSiennaCloseup from "@/assets/calacatta-sienna-closeup.jpg";
import calacattaSiennaBookmatch from "@/assets/calacatta-sienna-bookmatch.png";
import { Button } from "@/components/ui/button";
import ImageCarousel from "@/components/ImageCarousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Design {
  id: string;
  name: string;
  pattern: string;
  image: string;
  images: string[];
  colorFamily: string;
  style: string;
  details: string;
  applications: { name: string; icon: string }[];
}

const applicationIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  kitchen: ChefHat,
  bath: Bath,
  fireplace: Flame,
  commercial: Building2,
  accent: Sparkles,
};

const designs: Design[] = [
  { 
    id: "crystallo",
    name: "Crystallo", 
    pattern: "Soft silver layering",
    image: crystalloKitchen,
    images: [
      crystalloKitchen,
      crystalloSlab,
      crystalloBookmatch,
    ],
    colorFamily: "White",
    style: "Minimal",
    details: "Crystallo captures the ethereal beauty of crystalline formations, with soft silver tones dancing across the surface. Its delicate layering creates depth and dimension, perfect for spaces that demand quiet sophistication.",
    applications: [
      { name: "Kitchen Countertops", icon: "kitchen" },
      { name: "Bathroom Vanities", icon: "bath" },
      { name: "Accent Walls", icon: "accent" },
      { name: "Commercial Spaces", icon: "commercial" },
    ],
  },
  { 
    id: "taj-mahal",
    name: "Taj Mahal", 
    pattern: "Creamy layered veins",
    image: cashmereTajKitchen,
    images: [
      cashmereTajKitchen,
      cashmereTajSlab,
      cashmereTajBookmatch,
    ],
    colorFamily: "White",
    style: "Veined",
    details: "Inspired by the opulent marble of the Taj Mahal, this design features creamy ivory tones with subtle golden veining. Each slab tells a story of timeless elegance and architectural grandeur.",
    applications: [
      { name: "Kitchen Islands", icon: "kitchen" },
      { name: "Fireplace Surrounds", icon: "fireplace" },
      { name: "Bathroom Vanities", icon: "bath" },
      { name: "Commercial Lobbies", icon: "commercial" },
    ],
  },
  { 
    id: "lumina",
    name: "Lumina", 
    pattern: "Warm golden movement",
    image: luminaKitchen,
    images: [
      luminaKitchen,
      luminaSlab,
      luminaCloseup,
      luminaBookmatch,
    ],
    colorFamily: "Earth Tones",
    style: "Veined",
    details: "Lumina embodies our brand essence — where light transforms stillness into form. Warm golden undertones flow through this signature design, creating movement and life in every application.",
    applications: [
      { name: "Statement Countertops", icon: "kitchen" },
      { name: "Spa Environments", icon: "bath" },
      { name: "Fireplace Features", icon: "fireplace" },
      { name: "Boutique Retail", icon: "commercial" },
    ],
  },
  { 
    id: "calacatta-sienna",
    name: "Calacatta Sienna", 
    pattern: "Defined flowing veining",
    image: calacattaSiennaKitchen,
    images: [
      calacattaSiennaKitchen,
      calacattaSiennaSlab,
      calacattaSiennaCloseup,
      calacattaSiennaBookmatch,
    ],
    colorFamily: "White",
    style: "Bold",
    details: "Calacatta Sienna makes a bold statement with its dramatic veining patterns. The defined, flowing lines create visual intrigue, making it the centerpiece of any design scheme.",
    applications: [
      { name: "Accent Walls", icon: "accent" },
      { name: "Kitchen Backsplashes", icon: "kitchen" },
      { name: "Shower Surrounds", icon: "bath" },
      { name: "Commercial Features", icon: "commercial" },
    ],
  },
  { 
    id: "terra-beige",
    name: "Terra Beige", 
    pattern: "Natural earth tones",
    image: "/lovable-uploads/2b5d0ca5-fed7-40c4-a3db-cecd1c8697f0.png",
    images: [
      "/lovable-uploads/2b5d0ca5-fed7-40c4-a3db-cecd1c8697f0.png",
      "/lovable-uploads/095c3664-5f34-4792-b481-458b17ff08f7.png",
      "/lovable-uploads/d51d4bbf-97fc-4ca3-b718-cc87dd34de31.png",
    ],
    colorFamily: "Earth Tones",
    style: "Minimal",
    details: "Terra Beige draws from the warm palette of sun-baked earth, offering neutral tones that complement any design aesthetic. Its organic warmth creates inviting, grounded spaces.",
    applications: [
      { name: "Open Kitchens", icon: "kitchen" },
      { name: "Master Bathrooms", icon: "bath" },
      { name: "Fireplace Hearths", icon: "fireplace" },
      { name: "Hospitality Spaces", icon: "commercial" },
    ],
  },
  { 
    id: "mont-blanc",
    name: "Mont Blanc", 
    pattern: "Cool marble striations",
    image: "/lovable-uploads/7bd69178-6a3a-44ca-b099-d6eb06ecc52f.png",
    images: [
      "/lovable-uploads/7bd69178-6a3a-44ca-b099-d6eb06ecc52f.png",
      "/lovable-uploads/4e5fd5b8-af7d-47e5-9f93-360d3e4d50aa.png",
      "/lovable-uploads/287c93a8-a3a8-4fdd-9836-c34efa2a13c5.png",
    ],
    colorFamily: "Gray",
    style: "Veined",
    details: "Named after Europe's highest peak, Mont Blanc features crisp white surfaces with elegant grey striations. The cool tones evoke alpine majesty and pristine natural beauty.",
    applications: [
      { name: "Modern Kitchens", icon: "kitchen" },
      { name: "Minimalist Bathrooms", icon: "bath" },
      { name: "Feature Walls", icon: "accent" },
      { name: "Corporate Offices", icon: "commercial" },
    ],
  }
];

const DesignShowcase = () => {
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  const navigate = useNavigate();

  return (
    <>
      {/* Top section with background image */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={designShowcaseBg} 
            alt="" 
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-[hsl(var(--deep-alpine))]/80" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[hsl(var(--deep-alpine))] to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <h2 className="font-display text-4xl lg:text-5xl font-medium mb-8 leading-tight">
              Inspired by Nature.<br />
              <span className="bg-gradient-accent bg-clip-text text-transparent">
                Perfected by Technology.
              </span>
            </h2>
            
            <p className="font-body text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We replicate the elegance of natural stone using precision print technology. 
              Each slab is unique, durable, and stunning — crafted for discerning spaces.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom section with solid background */}
      <section className="pb-32 px-6 bg-[hsl(var(--deep-alpine))]">
        <div className="max-w-7xl mx-auto">

        {/* Featured showcase image */}
        <div className="mb-20 relative rounded-2xl overflow-hidden shadow-premium">
          <img 
            src={stonesamples} 
            alt="Stone sample collection" 
            className="w-full h-[28rem] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
          <div className="absolute bottom-8 left-8 right-8">
            <h3 className="font-display text-3xl font-medium text-foreground mb-3">
              Premium Collection
            </h3>
            <p className="font-body text-lg text-muted-foreground">Six signature patterns crafted for discerning architects</p>
          </div>
        </div>

        {/* Design grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {designs.map((design) => (
            <div 
              key={design.name}
              onClick={() => setSelectedDesign(design)}
              className="group bg-secondary p-8 rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow cursor-pointer"
            >
              <div className="h-52 rounded-xl mb-6 relative overflow-hidden">
                <img 
                  src={design.image} 
                  alt={`${design.name} stone surface`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="font-display text-xl font-medium text-foreground mb-2">{design.name}</h3>
              <p className="font-body text-base text-muted-foreground">{design.pattern}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            to="/collection"
            className="inline-flex items-center gap-3 font-display text-primary hover:text-accent transition-colors duration-300 text-lg"
          >
            Explore All Designs
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Slab Detail Modal - matches Collection page */}
      <Dialog open={!!selectedDesign} onOpenChange={(open) => !open && setSelectedDesign(null)}>
        <DialogContent className="max-w-5xl bg-[hsl(var(--deep-alpine))] border-border/30 p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
          {selectedDesign && (
            <div className="grid lg:grid-cols-2">
              {/* Image side with carousel */}
              <div className="aspect-square lg:aspect-auto lg:min-h-[600px] relative">
                <ImageCarousel
                  images={selectedDesign.images}
                  alt={selectedDesign.name}
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[hsl(var(--deep-alpine))]/30 lg:block hidden pointer-events-none" />
              </div>
              
              {/* Content side */}
              <div className="p-8 lg:p-10 flex flex-col">
                <DialogHeader className="mb-6">
                  <div className="flex gap-2 mb-3">
                    <span className="text-xs font-body text-accent/80 uppercase tracking-wider px-3 py-1 bg-accent/10 rounded-full border border-accent/30">
                      {selectedDesign.colorFamily}
                    </span>
                    <span className="text-xs font-body text-foreground/60 uppercase tracking-wider px-3 py-1 bg-secondary/30 rounded-full">
                      {selectedDesign.style}
                    </span>
                  </div>
                  <DialogTitle className="font-display text-4xl font-medium text-foreground">
                    {selectedDesign.name}
                  </DialogTitle>
                  <p className="font-body text-lg text-accent italic mt-1">
                    {selectedDesign.pattern}
                  </p>
                </DialogHeader>

                <div className="flex-1 space-y-8">
                  <div>
                    <h4 className="font-display text-sm uppercase tracking-wider text-foreground/60 mb-3">
                      About This Design
                    </h4>
                    <p className="font-body text-foreground/80 leading-relaxed">
                      {selectedDesign.details}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-display text-sm uppercase tracking-wider text-foreground/60 mb-4">
                      Ideal Applications
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedDesign.applications.map((app) => {
                        const IconComponent = applicationIcons[app.icon] || Sparkles;
                        return (
                          <div
                            key={app.name}
                            className="flex items-center gap-3 px-4 py-3 bg-secondary/20 rounded-xl border border-border/20 hover:border-accent/30 transition-colors"
                          >
                            <IconComponent className="w-5 h-5 text-accent" />
                            <span className="font-body text-sm text-foreground/80">
                              {app.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      variant="premium" 
                      size="lg" 
                      className="flex-1 gap-2"
                      onClick={() => {
                        setSelectedDesign(null);
                        navigate('/find-a-dealer');
                        window.scrollTo(0, 0);
                      }}
                    >
                      <MapPin className="w-4 h-4" />
                      Find a Dealer
                    </Button>
                    <Button 
                      variant="lumina-secondary" 
                      size="lg" 
                      className="flex-1 gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      Request a Sample
                    </Button>
                  </div>
                  <Link 
                    to={`/collection/${selectedDesign.id}`}
                    className="block"
                    onClick={() => setSelectedDesign(null)}
                  >
                    <Button 
                      variant="ghost" 
                      size="lg" 
                      className="w-full gap-2 text-foreground/60 hover:text-foreground"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Full Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      </section>
    </>
  );
};

export default DesignShowcase;
