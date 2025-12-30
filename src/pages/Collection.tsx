import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, X, MapPin, FileText } from "lucide-react";
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
  category: string;
  details: string;
  applications: string[];
}

const slabs: Slab[] = [
  {
    id: "crystallo",
    name: "Crystallo",
    description: "Soft silver layering",
    image: "/lovable-uploads/fe2704b4-db2c-440f-8442-395a1f9f7e84.png",
    category: "Light Tones",
    details: "Crystallo captures the ethereal beauty of crystalline formations, with soft silver tones dancing across the surface. Its delicate layering creates depth and dimension, perfect for spaces that demand quiet sophistication.",
    applications: ["Kitchen Countertops", "Bathroom Vanities", "Feature Walls", "Reception Desks"],
  },
  {
    id: "cashmere-taj",
    name: "Cashmere Taj",
    description: "Creamy layered veins",
    image: "/lovable-uploads/ffbbb8e7-46b2-4942-930d-c253317e9e67.png",
    category: "Warm Tones",
    details: "Inspired by the opulent marble of the Taj Mahal, Cashmere Taj features creamy ivory tones with subtle golden veining. Each slab tells a story of timeless elegance and architectural grandeur.",
    applications: ["Kitchen Islands", "Fireplace Surrounds", "Dining Tables", "Luxury Bathrooms"],
  },
  {
    id: "lumina",
    name: "Lumina",
    description: "Warm golden movement",
    image: "/lovable-uploads/4762d9ed-200e-4b28-86d9-8d1cd2c426df.png",
    category: "Warm Tones",
    details: "Lumina embodies our brand essence — where light transforms stillness into form. Warm golden undertones flow through this signature design, creating movement and life in every application.",
    applications: ["Statement Countertops", "Spa Environments", "Hotel Lobbies", "High-End Retail"],
  },
  {
    id: "calcutta-sienna",
    name: "Calcutta Sienna",
    description: "Defined flowing veining",
    image: "/lovable-uploads/1c983e16-ba6b-40ac-9021-c9951c32d332.png",
    category: "Bold Patterns",
    details: "Calcutta Sienna makes a bold statement with its dramatic veining patterns. The defined, flowing lines create visual intrigue, making it the centerpiece of any design scheme.",
    applications: ["Accent Walls", "Kitchen Backsplashes", "Commercial Spaces", "Art Installations"],
  },
  {
    id: "terra-beige",
    name: "Terra Beige",
    description: "Natural earth tones",
    image: "/lovable-uploads/2b5d0ca5-fed7-40c4-a3db-cecd1c8697f0.png",
    category: "Earth Tones",
    details: "Terra Beige draws from the warm palette of sun-baked earth, offering neutral tones that complement any design aesthetic. Its organic warmth creates inviting, grounded spaces.",
    applications: ["Open Kitchens", "Outdoor Areas", "Mediterranean Designs", "Transitional Spaces"],
  },
  {
    id: "mont-blanc",
    name: "Mont Blanc",
    description: "Cool marble striations",
    image: "/lovable-uploads/7bd69178-6a3a-44ca-b099-d6eb06ecc52f.png",
    category: "Light Tones",
    details: "Named after Europe's highest peak, Mont Blanc features crisp white surfaces with elegant grey striations. The cool tones evoke alpine majesty and pristine natural beauty.",
    applications: ["Modern Kitchens", "Minimalist Bathrooms", "Corporate Offices", "Gallery Spaces"],
  },
];

const categories = ["All", "Light Tones", "Warm Tones", "Bold Patterns", "Earth Tones"];

const Collection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSlab, setSelectedSlab] = useState<Slab | null>(null);

  const filteredSlabs = selectedCategory === "All" 
    ? slabs 
    : slabs.filter(slab => slab.category === selectedCategory);

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

      {/* Hero Section */}
      <section className="py-20 px-6 text-center">
        <h1 className="font-display text-5xl lg:text-6xl font-medium text-foreground mb-6 tracking-tight">
          Explore the Collection
        </h1>
        <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Discover our curated selection of premium engineered stone surfaces, 
          each crafted to bring timeless elegance to your space.
        </p>
      </section>

      {/* Filter UI */}
      <section className="px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-6 py-3 rounded-full font-body text-sm transition-all duration-300
                  border border-border/30 hover:border-accent/50
                  ${selectedCategory === category 
                    ? "bg-accent text-accent-foreground border-accent shadow-glow" 
                    : "bg-secondary/30 text-foreground/80 hover:bg-secondary/50"
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Slab Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSlabs.map((slab) => (
              <div
                key={slab.id}
                onClick={() => setSelectedSlab(slab)}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl bg-secondary/20 border border-border/20 hover:border-accent/40 transition-all duration-500 hover:shadow-premium">
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={slab.image}
                      alt={slab.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--deep-alpine))]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="font-display text-2xl font-medium text-foreground mb-1">
                      {slab.name}
                    </h3>
                    <p className="font-body text-base text-accent italic">
                      {slab.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <Dialog open={!!selectedSlab} onOpenChange={() => setSelectedSlab(null)}>
        <DialogContent className="max-w-4xl bg-[hsl(var(--deep-alpine))] border-border/30 p-0 overflow-hidden">
          {selectedSlab && (
            <div className="grid md:grid-cols-2">
              {/* Image side */}
              <div className="aspect-square md:aspect-auto">
                <img
                  src={selectedSlab.image}
                  alt={selectedSlab.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Content side */}
              <div className="p-8 flex flex-col">
                <DialogHeader className="mb-6">
                  <div className="text-sm font-body text-accent uppercase tracking-wider mb-2">
                    {selectedSlab.category}
                  </div>
                  <DialogTitle className="font-display text-3xl font-medium text-foreground">
                    {selectedSlab.name}
                  </DialogTitle>
                  <p className="font-body text-lg text-accent italic mt-1">
                    {selectedSlab.description}
                  </p>
                </DialogHeader>

                <div className="flex-1 space-y-6">
                  <div>
                    <h4 className="font-display text-sm uppercase tracking-wider text-foreground/60 mb-3">
                      About This Design
                    </h4>
                    <p className="font-body text-foreground/80 leading-relaxed">
                      {selectedSlab.details}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-display text-sm uppercase tracking-wider text-foreground/60 mb-3">
                      Ideal Applications
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSlab.applications.map((app) => (
                        <span
                          key={app}
                          className="px-3 py-1.5 bg-secondary/40 rounded-full font-body text-sm text-foreground/80 border border-border/20"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Button 
                    variant="premium" 
                    size="lg" 
                    className="flex-1 gap-2"
                    onClick={() => {
                      setSelectedSlab(null);
                      const dealerSection = document.getElementById('dealer');
                      dealerSection?.scrollIntoView({ behavior: 'smooth' });
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
                    Request Sample
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

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
