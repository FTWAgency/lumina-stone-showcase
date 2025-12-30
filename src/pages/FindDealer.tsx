import { useState } from "react";
import { MapPin, Phone, Mail, Navigation as NavigationIcon, ExternalLink, Search, LocateFixed, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Demo dealer data
const dealers = [
  {
    id: 1,
    name: "Seattle Design Center",
    address: "1420 5th Avenue, Suite 200",
    city: "Seattle",
    state: "WA",
    zip: "98101",
    phone: "(206) 555-0142",
    email: "seattle@luminasurfaces.com",
    distance: 2.4,
    lat: 47.6097,
    lng: -122.3331,
  },
  {
    id: 2,
    name: "Portland Kitchen Studio",
    address: "815 SW Park Avenue",
    city: "Portland",
    state: "OR",
    zip: "97205",
    phone: "(503) 555-0198",
    email: "portland@luminasurfaces.com",
    distance: 5.8,
    lat: 45.5152,
    lng: -122.6784,
  },
  {
    id: 3,
    name: "San Francisco Stone Gallery",
    address: "580 California Street",
    city: "San Francisco",
    state: "CA",
    zip: "94104",
    phone: "(415) 555-0167",
    email: "sf@luminasurfaces.com",
    distance: 12.3,
    lat: 37.7749,
    lng: -122.4194,
  },
  {
    id: 4,
    name: "Los Angeles Surfaces",
    address: "453 S Spring Street",
    city: "Los Angeles",
    state: "CA",
    zip: "90013",
    phone: "(213) 555-0189",
    email: "la@luminasurfaces.com",
    distance: 18.7,
    lat: 34.0522,
    lng: -118.2437,
  },
  {
    id: 5,
    name: "Denver Mountain Stone",
    address: "1600 California Street",
    city: "Denver",
    state: "CO",
    zip: "80202",
    phone: "(303) 555-0134",
    email: "denver@luminasurfaces.com",
    distance: 24.1,
    lat: 39.7392,
    lng: -104.9903,
  },
];

const radiusOptions = [
  { value: 10, label: "10 miles" },
  { value: 25, label: "25 miles" },
  { value: 50, label: "50 miles" },
];

const FindDealer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [radius, setRadius] = useState(25);
  const [selectedDealer, setSelectedDealer] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showRadiusDropdown, setShowRadiusDropdown] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate search
    setTimeout(() => setIsSearching(false), 800);
  };

  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSearchQuery("Current Location");
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  };

  const handleGetDirections = (dealer: typeof dealers[0]) => {
    const address = encodeURIComponent(`${dealer.address}, ${dealer.city}, ${dealer.state} ${dealer.zip}`);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--deep-alpine))]">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-5xl lg:text-6xl font-medium mb-6 leading-tight">
            See it. Touch it.
            <span className="bg-gradient-accent bg-clip-text text-transparent block mt-2">
              Fall In Love With It.
            </span>
          </h1>
          <p className="font-body text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Find a Lumina showroom near you and experience our surfaces in person.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="pb-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-secondary/30 backdrop-blur-sm rounded-2xl p-6 border border-border/20">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <Input
                  type="text"
                  placeholder="Search by city or zip code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 bg-background/50 border-border/30 font-body text-lg rounded-xl"
                />
              </div>

              {/* Use Location Button */}
              <Button
                variant="outline"
                onClick={handleUseLocation}
                className="h-14 px-5 gap-2 border-border/30 hover:bg-accent/10 hover:border-accent/50 font-body rounded-xl"
              >
                <LocateFixed className="w-5 h-5" />
                <span className="hidden sm:inline">Use My Location</span>
              </Button>

              {/* Radius Dropdown */}
              <div className="relative">
                <Button
                  variant="outline"
                  onClick={() => setShowRadiusDropdown(!showRadiusDropdown)}
                  className="h-14 px-5 gap-2 border-border/30 hover:bg-secondary/50 font-body rounded-xl min-w-[130px] justify-between"
                >
                  {radius} miles
                  <ChevronDown className={`w-4 h-4 transition-transform ${showRadiusDropdown ? "rotate-180" : ""}`} />
                </Button>
                {showRadiusDropdown && (
                  <div className="absolute top-full mt-2 right-0 bg-secondary border border-border/30 rounded-xl overflow-hidden z-50 shadow-xl">
                    {radiusOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setRadius(option.value);
                          setShowRadiusDropdown(false);
                        }}
                        className={`w-full px-5 py-3 text-left font-body hover:bg-accent/10 transition-colors ${
                          radius === option.value ? "bg-accent/20 text-accent" : "text-foreground/80"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Button */}
              <Button
                variant="premium"
                onClick={handleSearch}
                className="h-14 px-8 font-display text-base rounded-xl"
                disabled={isSearching}
              >
                {isSearching ? "Searching..." : "Search Dealers"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Map Placeholder */}
            <div className="order-2 lg:order-1">
              <div className="sticky top-28 bg-secondary/20 rounded-2xl border border-border/20 overflow-hidden h-[500px] lg:h-[calc(100vh-220px)]">
                {/* Map visualization placeholder */}
                <div className="w-full h-full relative bg-[hsl(var(--slate-blue))]/30">
                  {/* Grid pattern overlay */}
                  <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: "40px 40px",
                    }}
                  />
                  
                  {/* Dealer pins */}
                  {dealers.map((dealer, index) => (
                    <button
                      key={dealer.id}
                      onClick={() => setSelectedDealer(dealer.id)}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                        selectedDealer === dealer.id ? "scale-125 z-10" : "hover:scale-110"
                      }`}
                      style={{
                        left: `${20 + (index * 15)}%`,
                        top: `${25 + (index * 12)}%`,
                      }}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                        selectedDealer === dealer.id 
                          ? "bg-accent text-background" 
                          : "bg-[hsl(var(--warm-gold))] text-background"
                      }`}>
                        <MapPin className="w-5 h-5" />
                      </div>
                      {selectedDealer === dealer.id && (
                        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-background/95 backdrop-blur-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-xl border border-border/20">
                          <p className="font-display text-sm text-foreground">{dealer.name}</p>
                        </div>
                      )}
                    </button>
                  ))}

                  {/* Map attribution placeholder */}
                  <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <p className="font-body text-xs text-foreground/50">Interactive map • West Coast Region</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dealer Cards */}
            <div className="order-1 lg:order-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl text-foreground">
                  {dealers.length} Dealers Found
                </h2>
                <p className="font-body text-sm text-foreground/50">
                  Within {radius} miles
                </p>
              </div>

              <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto pr-2 scrollbar-thin">
                {dealers.map((dealer) => (
                  <div
                    key={dealer.id}
                    onClick={() => setSelectedDealer(dealer.id)}
                    className={`bg-secondary/30 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 cursor-pointer ${
                      selectedDealer === dealer.id
                        ? "border-accent/50 bg-accent/5 shadow-lg shadow-accent/10"
                        : "border-border/20 hover:border-border/40 hover:bg-secondary/50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-display text-xl text-foreground mb-1">{dealer.name}</h3>
                        <p className="font-body text-foreground/60">
                          {dealer.address}<br />
                          {dealer.city}, {dealer.state} {dealer.zip}
                        </p>
                      </div>
                      <span className="font-body text-sm text-accent bg-accent/10 px-3 py-1 rounded-full">
                        {dealer.distance} mi
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-5">
                      <a
                        href={`tel:${dealer.phone}`}
                        className="flex items-center gap-2 font-body text-sm text-foreground/70 hover:text-accent transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        {dealer.phone}
                      </a>
                      <a
                        href={`mailto:${dealer.email}`}
                        className="flex items-center gap-2 font-body text-sm text-foreground/70 hover:text-accent transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        {dealer.email}
                      </a>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button
                        variant="premium"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGetDirections(dealer);
                        }}
                        className="gap-2 font-display rounded-xl"
                      >
                        <NavigationIcon className="w-4 h-4" />
                        Get Directions
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => e.stopPropagation()}
                        className="gap-2 font-body border-border/30 hover:bg-accent/10 hover:border-accent/50 rounded-xl"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Request a Sample
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* No Results Fallback */}
              {dealers.length === 0 && (
                <div className="text-center py-16 bg-secondary/20 rounded-2xl border border-border/20">
                  <MapPin className="w-12 h-12 text-foreground/30 mx-auto mb-4" />
                  <h3 className="font-display text-xl text-foreground mb-2">No Dealers Found</h3>
                  <p className="font-body text-foreground/60 mb-6 max-w-md mx-auto">
                    We couldn't find any dealers in your area. Try expanding your search radius or contact us directly.
                  </p>
                  <Button variant="premium" className="font-display rounded-xl">
                    Contact Lumina
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-secondary/20 border-t border-border/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-medium mb-6">
            Don't See a Dealer Near You?
          </h2>
          <p className="font-body text-lg text-foreground/70 mb-8 max-w-xl mx-auto">
            We're expanding our network. Contact us to learn about becoming a dealer or to find alternative options in your region.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="premium" size="lg" className="font-display rounded-xl">
              Contact Lumina Sales
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="font-display border-border/30 hover:bg-accent/10 hover:border-accent/50 rounded-xl"
            >
              Become a Dealer
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FindDealer;
