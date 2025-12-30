import { useState } from "react";
import { Link } from "react-router-dom";
import { ChefHat, Bath, Flame, Building2, Sparkles, MapPin, FileText } from "lucide-react";
import stonesamples from "@/assets/stone-samples.jpg";
import { Button } from "@/components/ui/button";
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
    image: "/lovable-uploads/fe2704b4-db2c-440f-8442-395a1f9f7e84.png",
    details: "Crystallo captures the ethereal beauty of crystalline formations, with soft silver tones dancing across the surface. Its delicate layering creates depth and dimension, perfect for spaces that demand quiet sophistication.",
    applications: [
      { name: "Kitchen Countertops", icon: "kitchen" },
      { name: "Bathroom Vanities", icon: "bath" },
      { name: "Accent Walls", icon: "accent" },
      { name: "Commercial Spaces", icon: "commercial" },
    ],
  },
  { 
    id: "cashmere-taj",
    name: "Cashmere Taj", 
    pattern: "Creamy layered veins",
    image: "/lovable-uploads/ffbbb8e7-46b2-4942-930d-c253317e9e67.png",
    details: "Inspired by the opulent marble of the Taj Mahal, Cashmere Taj features creamy ivory tones with subtle golden veining. Each slab tells a story of timeless elegance and architectural grandeur.",
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
    image: "/lovable-uploads/4762d9ed-200e-4b28-86d9-8d1cd2c426df.png",
    details: "Lumina embodies our brand essence — where light transforms stillness into form. Warm golden undertones flow through this signature design, creating movement and life in every application.",
    applications: [
      { name: "Statement Countertops", icon: "kitchen" },
      { name: "Spa Environments", icon: "bath" },
      { name: "Fireplace Features", icon: "fireplace" },
      { name: "Boutique Retail", icon: "commercial" },
    ],
  },
  { 
    id: "calcutta-sienna",
    name: "Calcutta Sienna", 
    pattern: "Defined flowing veining",
    image: "/lovable-uploads/1c983e16-ba6b-40ac-9021-c9951c32d332.png",
    details: "Calcutta Sienna makes a bold statement with its dramatic veining patterns. The defined, flowing lines create visual intrigue, making it the centerpiece of any design scheme.",
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

  return (
    <section className="py-32 px-6 bg-gradient-stone">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
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

      {/* Slab Detail Modal */}
      <Dialog open={!!selectedDesign} onOpenChange={(open) => !open && setSelectedDesign(null)}>
        <DialogContent className="max-w-4xl bg-[hsl(var(--deep-alpine))] border-border/30 p-0 overflow-hidden">
          <DialogHeader className="sr-only">
            <DialogTitle>{selectedDesign?.name}</DialogTitle>
          </DialogHeader>
          
          {selectedDesign && (
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Side */}
              <div className="relative aspect-square md:aspect-auto">
                <img
                  src={selectedDesign.image}
                  alt={selectedDesign.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--deep-alpine))] via-transparent to-transparent md:bg-gradient-to-r" />
              </div>

              {/* Content Side */}
              <div className="p-8 flex flex-col justify-center">
                <h2 className="font-display text-3xl lg:text-4xl font-medium text-foreground mb-2">
                  {selectedDesign.name}
                </h2>
                <p className="font-body text-lg text-accent italic mb-6">
                  {selectedDesign.pattern}
                </p>
                
                <p className="font-body text-foreground/70 leading-relaxed mb-8">
                  {selectedDesign.details}
                </p>

                {/* Applications */}
                <div className="mb-8">
                  <h4 className="font-display text-xs uppercase tracking-widest text-accent/70 mb-4">
                    Ideal Applications
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedDesign.applications.map((app) => {
                      const IconComponent = applicationIcons[app.icon];
                      return (
                        <div
                          key={app.name}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 border border-border/30 text-foreground/80"
                        >
                          {IconComponent && <IconComponent className="w-4 h-4 text-accent" />}
                          <span className="font-body text-sm">{app.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild className="flex-1 bg-accent hover:bg-accent/90 text-background font-display">
                    <Link to="/find-dealer">
                      <MapPin className="w-4 h-4 mr-2" />
                      Find a Dealer
                    </Link>
                  </Button>
                  <Button variant="outline" className="flex-1 border-accent/30 text-foreground hover:bg-accent/10 font-display">
                    <FileText className="w-4 h-4 mr-2" />
                    Request Sample
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default DesignShowcase;
