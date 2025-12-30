import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, FileText, ExternalLink, ChefHat, Bath, Flame, Building2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Slab {
  id: string;
  name: string;
  description: string;
  image: string;
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

export const slabs: Slab[] = [
  {
    id: "crystallo",
    name: "Crystallo",
    description: "Soft silver layering",
    image: "/lovable-uploads/fe2704b4-db2c-440f-8442-395a1f9f7e84.png",
    colorFamily: "White",
    style: "Minimal",
    details: "Crystallo captures the ethereal beauty of crystalline formations, with soft silver tones dancing across the surface. Its delicate layering creates depth and dimension, perfect for spaces that demand quiet sophistication. The subtle interplay of light and shadow within each slab brings a sense of calm elegance to any environment.",
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
    description: "Creamy layered veins",
    image: "/lovable-uploads/ffbbb8e7-46b2-4942-930d-c253317e9e67.png",
    colorFamily: "White",
    style: "Veined",
    details: "Inspired by the opulent marble of the Taj Mahal, Cashmere Taj features creamy ivory tones with subtle golden veining. Each slab tells a story of timeless elegance and architectural grandeur. The warm undertones create an inviting atmosphere while maintaining a sense of refined luxury.",
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
    description: "Warm golden movement",
    image: "/lovable-uploads/4762d9ed-200e-4b28-86d9-8d1cd2c426df.png",
    colorFamily: "Earth Tones",
    style: "Veined",
    details: "Lumina embodies our brand essence — where light transforms stillness into form. Warm golden undertones flow through this signature design, creating movement and life in every application. This flagship design represents the pinnacle of engineered stone artistry, where natural beauty meets precision craftsmanship.",
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
    description: "Defined flowing veining",
    image: "/lovable-uploads/1c983e16-ba6b-40ac-9021-c9951c32d332.png",
    colorFamily: "Earth Tones",
    style: "Bold",
    details: "Calcutta Sienna makes a bold statement with its dramatic veining patterns. The defined, flowing lines create visual intrigue, making it the centerpiece of any design scheme. Rich sienna tones warm the space while the striking patterns add artistic dimension.",
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
    description: "Natural earth tones",
    image: "/lovable-uploads/2b5d0ca5-fed7-40c4-a3db-cecd1c8697f0.png",
    colorFamily: "Earth Tones",
    style: "Minimal",
    details: "Terra Beige draws from the warm palette of sun-baked earth, offering neutral tones that complement any design aesthetic. Its organic warmth creates inviting, grounded spaces. The subtle texture and gentle color variations evoke the tranquility of natural landscapes.",
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
    description: "Cool marble striations",
    image: "/lovable-uploads/7bd69178-6a3a-44ca-b099-d6eb06ecc52f.png",
    colorFamily: "Gray",
    style: "Veined",
    details: "Named after Europe's highest peak, Mont Blanc features crisp white surfaces with elegant grey striations. The cool tones evoke alpine majesty and pristine natural beauty. This design brings a sense of clarity and sophistication to modern and contemporary spaces.",
    applications: [
      { name: "Modern Kitchens", icon: "kitchen" },
      { name: "Minimalist Bathrooms", icon: "bath" },
      { name: "Feature Walls", icon: "accent" },
      { name: "Corporate Offices", icon: "commercial" },
    ],
  },
];

const colorFamilies = ["All", "White", "Gray", "Earth Tones"];
const styles = ["All", "Veined", "Minimal", "Bold"];
const applicationTypes = ["All", "Kitchen", "Bath", "Commercial"];

const Collection = () => {
  const [selectedColorFamily, setSelectedColorFamily] = useState("All");
  const [selectedStyle, setSelectedStyle] = useState("All");
  const [selectedApplication, setSelectedApplication] = useState("All");
  const [selectedSlab, setSelectedSlab] = useState<Slab | null>(null);

  const filteredSlabs = slabs.filter(slab => {
    const matchesColor = selectedColorFamily === "All" || slab.colorFamily === selectedColorFamily;
    const matchesStyle = selectedStyle === "All" || slab.style === selectedStyle;
    const matchesApp = selectedApplication === "All" || 
      slab.applications.some(app => app.icon === selectedApplication.toLowerCase());
    return matchesColor && matchesStyle && matchesApp;
  });

  const FilterPill = ({ 
    label, 
    active, 
    onClick 
  }: { 
    label: string; 
    active: boolean; 
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`
        px-5 py-2.5 rounded-full font-body text-sm transition-all duration-300
        border-2 hover:border-accent
        ${active 
          ? "bg-accent/20 text-accent border-accent shadow-[0_0_20px_hsl(var(--accent)/0.3)]" 
          : "bg-transparent text-foreground/70 border-accent/40 hover:text-foreground hover:bg-accent/10"
        }
      `}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-[hsl(var(--deep-alpine))]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[hsl(var(--deep-alpine))]/95 backdrop-blur-md border-b border-border/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors font-body"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <Link to="/" className="font-display text-xl font-medium tracking-wide text-foreground">
            LUMINA
          </Link>
        </div>
      </header>

      {/* Hero Section with Layered Slab Background */}
      <section className="relative py-32 px-6 text-center overflow-hidden">
        {/* Layered slab background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--deep-alpine))] via-transparent to-[hsl(var(--deep-alpine))] z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--deep-alpine))] via-transparent to-[hsl(var(--deep-alpine))] z-10" />
          
          {/* Angled slab overlays like mountain layers */}
          <div 
            className="absolute -left-20 top-0 w-[60%] h-full opacity-30 transform -skew-x-12"
            style={{
              backgroundImage: `url(${slabs[0].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div 
            className="absolute left-1/4 top-10 w-[50%] h-full opacity-25 transform skew-x-6"
            style={{
              backgroundImage: `url(${slabs[2].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div 
            className="absolute right-0 -top-10 w-[55%] h-full opacity-20 transform -skew-x-6"
            style={{
              backgroundImage: `url(${slabs[3].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div 
            className="absolute -right-20 top-20 w-[45%] h-full opacity-15 transform skew-x-12"
            style={{
              backgroundImage: `url(${slabs[5].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>

        <div className="relative z-20">
          <h1 className="font-display text-5xl lg:text-7xl font-medium text-foreground mb-6 tracking-tight">
            Explore the Collection
          </h1>
          <p className="font-body text-xl lg:text-2xl text-foreground/70 max-w-2xl mx-auto leading-relaxed italic">
            Surfaces shaped by light. Engineered for life.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="px-6 pb-16 pt-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-secondary/10 rounded-3xl border border-border/20 p-8 backdrop-blur-sm">
            {/* Color Family */}
            <div className="mb-8">
              <h3 className="font-display text-sm uppercase tracking-widest text-foreground/50 mb-4">
                Color Family
              </h3>
              <div className="flex flex-wrap gap-3">
                {colorFamilies.map((color) => (
                  <FilterPill
                    key={color}
                    label={color}
                    active={selectedColorFamily === color}
                    onClick={() => setSelectedColorFamily(color)}
                  />
                ))}
              </div>
            </div>

            {/* Style */}
            <div className="mb-8">
              <h3 className="font-display text-sm uppercase tracking-widest text-foreground/50 mb-4">
                Style
              </h3>
              <div className="flex flex-wrap gap-3">
                {styles.map((style) => (
                  <FilterPill
                    key={style}
                    label={style}
                    active={selectedStyle === style}
                    onClick={() => setSelectedStyle(style)}
                  />
                ))}
              </div>
            </div>

            {/* Application Type */}
            <div>
              <h3 className="font-display text-sm uppercase tracking-widest text-foreground/50 mb-4">
                Application
              </h3>
              <div className="flex flex-wrap gap-3">
                {applicationTypes.map((app) => (
                  <FilterPill
                    key={app}
                    label={app}
                    active={selectedApplication === app}
                    onClick={() => setSelectedApplication(app)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slab Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          {filteredSlabs.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-body text-xl text-foreground/50">
                No slabs match your selected filters. Try adjusting your criteria.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSlabs.map((slab, index) => (
                <div
                  key={slab.id}
                  className="group cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedSlab(slab)}
                >
                  <div className="relative overflow-hidden rounded-2xl bg-secondary/20 border border-border/20 hover:border-accent/40 transition-all duration-500 hover:shadow-[0_20px_60px_-20px_hsl(var(--accent)/0.3)]">
                    {/* Image */}
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={slab.image}
                        alt={slab.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--deep-alpine))] via-[hsl(var(--deep-alpine))]/50 to-transparent" />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-display text-2xl font-medium text-foreground mb-1">
                        {slab.name}
                      </h3>
                      <p className="font-body text-base text-accent italic mb-4">
                        {slab.description}
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-accent/50 text-accent hover:bg-accent/20 hover:border-accent group-hover:translate-y-0 translate-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <Dialog open={!!selectedSlab} onOpenChange={() => setSelectedSlab(null)}>
        <DialogContent className="max-w-5xl bg-[hsl(var(--deep-alpine))] border-border/30 p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
          {selectedSlab && (
            <div className="grid lg:grid-cols-2">
              {/* Image side */}
              <div className="aspect-square lg:aspect-auto lg:min-h-[600px] relative">
                <img
                  src={selectedSlab.image}
                  alt={selectedSlab.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[hsl(var(--deep-alpine))]/30 lg:block hidden" />
              </div>
              
              {/* Content side */}
              <div className="p-8 lg:p-10 flex flex-col">
                <DialogHeader className="mb-6">
                  <div className="flex gap-2 mb-3">
                    <span className="text-xs font-body text-accent/80 uppercase tracking-wider px-3 py-1 bg-accent/10 rounded-full border border-accent/30">
                      {selectedSlab.colorFamily}
                    </span>
                    <span className="text-xs font-body text-foreground/60 uppercase tracking-wider px-3 py-1 bg-secondary/30 rounded-full">
                      {selectedSlab.style}
                    </span>
                  </div>
                  <DialogTitle className="font-display text-4xl font-medium text-foreground">
                    {selectedSlab.name}
                  </DialogTitle>
                  <p className="font-body text-lg text-accent italic mt-1">
                    {selectedSlab.description}
                  </p>
                </DialogHeader>

                <div className="flex-1 space-y-8">
                  <div>
                    <h4 className="font-display text-sm uppercase tracking-wider text-foreground/60 mb-3">
                      About This Design
                    </h4>
                    <p className="font-body text-foreground/80 leading-relaxed">
                      {selectedSlab.details}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-display text-sm uppercase tracking-wider text-foreground/60 mb-4">
                      Ideal Applications
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedSlab.applications.map((app) => {
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
                        setSelectedSlab(null);
                        window.location.href = '/#dealer';
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
                    to={`/collection/${selectedSlab.id}`}
                    className="block"
                    onClick={() => setSelectedSlab(null)}
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

      {/* Bottom CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--deep-alpine))] via-secondary/10 to-[hsl(var(--deep-alpine))]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/lovable-uploads/4762d9ed-200e-4b28-86d9-8d1cd2c426df.png')] bg-cover bg-center blur-2xl" />
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl lg:text-5xl font-medium text-foreground mb-6">
            Found your favorite?
          </h2>
          <p className="font-body text-xl text-foreground/70 mb-10 leading-relaxed">
            See it in person at a Lumina showroom near you.
          </p>
          <Link to="/#dealer">
            <Button variant="premium" size="hero" className="gap-2">
              <MapPin className="w-5 h-5" />
              Find a Dealer
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/20 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-body text-sm text-muted-foreground">
            © 2024 Lumina Surfaces. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Collection;
