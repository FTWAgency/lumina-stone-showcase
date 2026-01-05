import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, FileText, ExternalLink, ChefHat, Bath, Flame, Building2, Sparkles, X, Filter, Search } from "lucide-react";
import collectionHeroBg from "@/assets/collection-hero-bg.png";
import crystalloSlab from "@/assets/crystallo-slab.jpg";
import crystalloCloseup from "@/assets/crystallo-closeup.jpg";
import crystalloBookmatch from "@/assets/crystallo-bookmatch.png";
import crystalloKitchen from "@/assets/crystallo-kitchen.jpg";
import { Button } from "@/components/ui/button";
import ImageCarousel from "@/components/ImageCarousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Slab {
  id: string;
  name: string;
  description: string;
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

// Color swatches for visual filter preview
const colorSwatches: Record<string, string> = {
  White: "bg-gradient-to-br from-gray-100 to-gray-200",
  Gray: "bg-gradient-to-br from-gray-400 to-gray-500",
  "Earth Tones": "bg-gradient-to-br from-amber-200 to-amber-400",
};

export const slabs: Slab[] = [
  {
    id: "crystallo",
    name: "Crystallo",
    description: "Soft silver layering",
    image: crystalloSlab,
    images: [
      crystalloSlab,
      crystalloCloseup,
      crystalloBookmatch,
      crystalloKitchen,
    ],
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
    images: [
      "/lovable-uploads/ffbbb8e7-46b2-4942-930d-c253317e9e67.png",
      "/lovable-uploads/88c7e25f-db71-4819-849d-39379394915f.png",
      "/lovable-uploads/4ad1487a-76f8-4980-943a-748decc450bd.png",
    ],
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
    images: [
      "/lovable-uploads/4762d9ed-200e-4b28-86d9-8d1cd2c426df.png",
      "/lovable-uploads/eb5c4701-7737-4d3a-bd3b-63ee0504195d.png",
      "/lovable-uploads/b75b6f32-1d96-4d5a-a927-e74ec66d4c40.png",
    ],
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
    images: [
      "/lovable-uploads/1c983e16-ba6b-40ac-9021-c9951c32d332.png",
      "/lovable-uploads/0bfcd651-df72-4c9d-a913-0c4fda295440.png",
      "/lovable-uploads/15a58520-bd5d-4630-8a78-c33ff14e8248.png",
    ],
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
    images: [
      "/lovable-uploads/2b5d0ca5-fed7-40c4-a3db-cecd1c8697f0.png",
      "/lovable-uploads/095c3664-5f34-4792-b481-458b17ff08f7.png",
      "/lovable-uploads/d51d4bbf-97fc-4ca3-b718-cc87dd34de31.png",
    ],
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
    images: [
      "/lovable-uploads/7bd69178-6a3a-44ca-b099-d6eb06ecc52f.png",
      "/lovable-uploads/4e5fd5b8-af7d-47e5-9f93-360d3e4d50aa.png",
      "/lovable-uploads/287c93a8-a3a8-4fdd-9836-c34efa2a13c5.png",
    ],
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

// Filter Sidebar Component
const FilterSidebar = ({
  selectedColorFamily,
  setSelectedColorFamily,
  selectedStyle,
  setSelectedStyle,
  searchQuery,
  setSearchQuery,
  filteredCount,
  totalCount,
}: {
  selectedColorFamily: string;
  setSelectedColorFamily: (value: string) => void;
  selectedStyle: string;
  setSelectedStyle: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  filteredCount: number;
  totalCount: number;
}) => {
  const hasActiveFilters = selectedColorFamily !== "All" || selectedStyle !== "All" || searchQuery !== "";
  
  const clearAllFilters = () => {
    setSelectedColorFamily("All");
    setSelectedStyle("All");
    setSearchQuery("");
  };

  return (
    <div className="space-y-8">
      {/* Search */}
      <div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
          <input
            type="text"
            placeholder="Search slabs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-secondary/20 border border-border/30 rounded-xl font-body text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent/50 focus:bg-secondary/30 transition-all"
          />
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="font-body text-sm text-foreground/60">
          Showing <span className="text-accent font-medium">{filteredCount}</span> of {totalCount} slabs
        </p>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="font-body text-xs text-accent hover:text-accent/80 transition-colors underline underline-offset-2"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-accent/20" />

      {/* Color Family */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-xs uppercase tracking-widest text-accent/70">
            Color Family
          </h3>
          {selectedColorFamily !== "All" && (
            <button
              onClick={() => setSelectedColorFamily("All")}
              className="font-body text-xs text-foreground/50 hover:text-foreground transition-colors"
            >
              Clear
            </button>
          )}
        </div>
        <div className="space-y-2">
          {colorFamilies.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColorFamily(color)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm transition-all duration-300
                ${selectedColorFamily === color 
                  ? "bg-accent/20 text-accent border border-accent/40 shadow-[0_0_15px_hsl(var(--accent)/0.2)]" 
                  : "bg-transparent text-foreground/70 border border-transparent hover:bg-secondary/30 hover:text-foreground"
                }
              `}
            >
              {color !== "All" && (
                <span className={`w-4 h-4 rounded-full ${colorSwatches[color]} shadow-inner`} />
              )}
              <span>{color}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-accent/20" />

      {/* Style */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-xs uppercase tracking-widest text-accent/70">
            Style
          </h3>
          {selectedStyle !== "All" && (
            <button
              onClick={() => setSelectedStyle("All")}
              className="font-body text-xs text-foreground/50 hover:text-foreground transition-colors"
            >
              Clear
            </button>
          )}
        </div>
        <div className="space-y-2">
          {styles.map((style) => (
            <button
              key={style}
              onClick={() => setSelectedStyle(style)}
              className={`
                w-full text-left px-4 py-3 rounded-xl font-body text-sm transition-all duration-300
                ${selectedStyle === style 
                  ? "bg-accent/20 text-accent border border-accent/40 shadow-[0_0_15px_hsl(var(--accent)/0.2)]" 
                  : "bg-transparent text-foreground/70 border border-transparent hover:bg-secondary/30 hover:text-foreground"
                }
              `}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

const Collection = () => {
  const [selectedColorFamily, setSelectedColorFamily] = useState("All");
  const [selectedStyle, setSelectedStyle] = useState("All");
  const [selectedSlab, setSelectedSlab] = useState<Slab | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filteredSlabs = slabs.filter(slab => {
    const matchesColor = selectedColorFamily === "All" || slab.colorFamily === selectedColorFamily;
    const matchesStyle = selectedStyle === "All" || slab.style === selectedStyle;
    const matchesSearch = searchQuery === "" || 
      slab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      slab.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesColor && matchesStyle && matchesSearch;
  });

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

      {/* Hero Section with Mountain Background */}
      <section className="relative py-24 lg:py-32 px-6 text-center overflow-hidden">
        {/* Mountain background image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={collectionHeroBg} 
            alt="Mountain landscape" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--deep-alpine))]/80 via-[hsl(var(--deep-alpine))]/40 to-[hsl(var(--deep-alpine))]/90 z-10" />
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

      {/* Main Content: Sidebar + Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-24 bg-[hsl(var(--deep-alpine))]/80 backdrop-blur-lg border border-border/20 rounded-2xl p-6 border-r-accent/20 max-h-[calc(100vh-120px)] overflow-y-auto">
                <FilterSidebar
                  selectedColorFamily={selectedColorFamily}
                  setSelectedColorFamily={setSelectedColorFamily}
                  selectedStyle={selectedStyle}
                  setSelectedStyle={setSelectedStyle}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  filteredCount={filteredSlabs.length}
                  totalCount={slabs.length}
                />
              </div>
            </aside>

            {/* Grid */}
            <div className="flex-1">
              {filteredSlabs.length === 0 ? (
                <div className="text-center py-20">
                  <p className="font-body text-xl text-foreground/50">
                    No slabs match your selected filters. Try adjusting your criteria.
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
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
          </div>
        </div>
      </section>

      {/* Mobile Filter Button */}
      <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
        <SheetTrigger asChild>
          <button className="lg:hidden fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3 bg-accent text-accent-foreground rounded-full shadow-lg shadow-accent/30 font-body text-sm font-medium hover:bg-accent/90 transition-all">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 bg-[hsl(var(--deep-alpine))] border-r border-accent/20 p-0">
          <SheetHeader className="p-6 pb-4 border-b border-border/20">
            <SheetTitle className="font-display text-xl text-foreground">Filter Collection</SheetTitle>
          </SheetHeader>
          <div className="p-6 overflow-y-auto max-h-[calc(100vh-100px)]">
            <FilterSidebar
              selectedColorFamily={selectedColorFamily}
              setSelectedColorFamily={setSelectedColorFamily}
              selectedStyle={selectedStyle}
              setSelectedStyle={setSelectedStyle}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filteredCount={filteredSlabs.length}
              totalCount={slabs.length}
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-[hsl(var(--deep-alpine))] border-t border-border/20">
            <Button 
              variant="premium" 
              className="w-full"
              onClick={() => setMobileFilterOpen(false)}
            >
              Show {filteredSlabs.length} Results
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Modal */}
      <Dialog open={!!selectedSlab} onOpenChange={() => setSelectedSlab(null)}>
        <DialogContent className="max-w-5xl bg-[hsl(var(--deep-alpine))] border-border/30 p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
          {selectedSlab && (
            <div className="grid lg:grid-cols-2">
              {/* Image side with carousel */}
              <div className="aspect-square lg:aspect-auto lg:min-h-[600px] relative">
                <ImageCarousel
                  images={selectedSlab.images}
                  alt={selectedSlab.name}
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[hsl(var(--deep-alpine))]/30 lg:block hidden pointer-events-none" />
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
