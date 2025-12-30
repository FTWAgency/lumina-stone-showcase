import { useState } from "react";
import { MapPin, Search, LocateFixed, ChevronDown, Calendar, Package, Navigation as NavigationIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

// Demo dealer data - full address, no phone/email
const dealers = [
  {
    id: 1,
    name: "Seattle Design Center",
    address: "1420 5th Avenue, Suite 200",
    city: "Seattle",
    state: "WA",
    zip: "98101",
    tagline: "Serving the Pacific Northwest",
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
    tagline: "Oregon's Premier Surface Showroom",
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
    tagline: "Serving the Bay Area",
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
    tagline: "Southern California's Design Destination",
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
    tagline: "Bringing Lumina to the Rockies",
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

const projectTypes = [
  { value: "kitchen", label: "Kitchen" },
  { value: "bath", label: "Bathroom" },
  { value: "commercial", label: "Commercial" },
  { value: "other", label: "Other" },
];

const slabOptions = [
  { value: "", label: "Select a slab (optional)" },
  { value: "lumina", label: "Lumina" },
  { value: "alpine-white", label: "Alpine White" },
  { value: "midnight-veil", label: "Midnight Veil" },
  { value: "terra-nova", label: "Terra Nova" },
  { value: "coastal-mist", label: "Coastal Mist" },
];

type FormType = "sample" | "visit";

const FindDealer = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [radius, setRadius] = useState(25);
  const [selectedDealer, setSelectedDealer] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showRadiusDropdown, setShowRadiusDropdown] = useState(false);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState<FormType>("sample");
  const [selectedDealerForForm, setSelectedDealerForForm] = useState<typeof dealers[0] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    zipCode: "",
    projectType: "",
    slabOfInterest: "",
    message: "",
  });

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 800);
  };

  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setSearchQuery("Current Location");
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  };

  const openContactModal = (dealer: typeof dealers[0], type: FormType) => {
    setSelectedDealerForForm(dealer);
    setFormType(type);
    setIsModalOpen(true);
    setIsSubmitted(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call to Lumina HQ
    // In production, this would POST to a webhook/API endpoint
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Form submitted to Lumina HQ:", {
      ...formData,
      preferredDealer: selectedDealerForForm?.name,
      requestType: formType,
      timestamp: new Date().toISOString(),
    });
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      zipCode: "",
      projectType: "",
      slabOfInterest: "",
      message: "",
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSubmitted(false);
    setSelectedDealerForForm(null);
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
      <section className="pb-8 px-6 relative z-20">
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
                  <div className="absolute top-full mt-2 right-0 bg-secondary border border-border/30 rounded-xl overflow-hidden z-[100] shadow-xl">
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
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-display text-xl text-foreground mb-1">{dealer.name}</h3>
                        <p className="font-body text-foreground/60">
                          {dealer.address}<br />
                          {dealer.city}, {dealer.state} {dealer.zip}
                        </p>
                      </div>
                      <span className="font-body text-sm text-accent bg-accent/10 px-3 py-1 rounded-full shrink-0 ml-3">
                        {dealer.distance} mi
                      </span>
                    </div>

                    <p className="font-body text-sm text-foreground/50 italic mb-5">
                      {dealer.tagline}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          const address = encodeURIComponent(`${dealer.address}, ${dealer.city}, ${dealer.state} ${dealer.zip}`);
                          window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`, "_blank");
                        }}
                        className="gap-2 font-display border-border/30 hover:bg-accent/10 hover:border-accent/50 rounded-xl"
                      >
                        <NavigationIcon className="w-4 h-4" />
                        Get Directions
                      </Button>
                      <Button
                        variant="premium"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          openContactModal(dealer, "sample");
                        }}
                        className="gap-2 font-display rounded-xl"
                      >
                        <Package className="w-4 h-4" />
                        Request a Sample
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          openContactModal(dealer, "visit");
                        }}
                        className="gap-2 font-display border-border/30 hover:bg-accent/10 hover:border-accent/50 rounded-xl"
                      >
                        <Calendar className="w-4 h-4" />
                        Schedule a Visit
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

      {/* Footer CTA */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-secondary/20 border-t border-border/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-medium mb-6">
            Want to Become a Lumina Dealer?
          </h2>
          <p className="font-body text-lg text-foreground/70 mb-8 max-w-xl mx-auto">
            Join our network of premium showrooms and bring Lumina surfaces to your region.
          </p>
          <Button variant="premium" size="lg" className="font-display rounded-xl">
            Become a Dealer
          </Button>
        </div>
      </section>

      <Footer />

      {/* Contact Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-[hsl(var(--deep-alpine))] border-border/30 max-w-lg mx-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-foreground">
              {formType === "sample" ? "Request a Sample" : "Schedule a Showroom Visit"}
            </DialogTitle>
          </DialogHeader>
          
          {!isSubmitted ? (
            <form onSubmit={handleFormSubmit} className="space-y-5 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-body text-foreground/80">Name *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-secondary/30 border-border/30 font-body rounded-xl"
                  placeholder="Your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="font-body text-foreground/80">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-secondary/30 border-border/30 font-body rounded-xl"
                  placeholder="your@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="zipCode" className="font-body text-foreground/80">ZIP Code *</Label>
                <Input
                  id="zipCode"
                  required
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  className="bg-secondary/30 border-border/30 font-body rounded-xl"
                  placeholder="Your ZIP code"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectType" className="font-body text-foreground/80">Project Type *</Label>
                <Select
                  value={formData.projectType}
                  onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                  required
                >
                  <SelectTrigger className="bg-secondary/30 border-border/30 font-body rounded-xl">
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent className="bg-secondary border-border/30">
                    {projectTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value} className="font-body">
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredDealer" className="font-body text-foreground/80">Preferred Dealer</Label>
                <Input
                  id="preferredDealer"
                  value={selectedDealerForForm?.name || ""}
                  disabled
                  className="bg-secondary/50 border-border/30 font-body rounded-xl text-foreground/70"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slabOfInterest" className="font-body text-foreground/80">Slab of Interest</Label>
                <Select
                  value={formData.slabOfInterest}
                  onValueChange={(value) => setFormData({ ...formData, slabOfInterest: value })}
                >
                  <SelectTrigger className="bg-secondary/30 border-border/30 font-body rounded-xl">
                    <SelectValue placeholder="Select a slab (optional)" />
                  </SelectTrigger>
                  <SelectContent className="bg-secondary border-border/30">
                    {slabOptions.filter(s => s.value).map((slab) => (
                      <SelectItem key={slab.value} value={slab.value} className="font-body">
                        {slab.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="font-body text-foreground/80">Message (optional)</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-secondary/30 border-border/30 font-body rounded-xl min-h-[100px]"
                  placeholder="Tell us about your project..."
                />
              </div>

              <Button
                type="submit"
                variant="premium"
                size="lg"
                className="w-full font-display rounded-xl mt-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Request to Lumina HQ"}
              </Button>

              <p className="font-body text-xs text-foreground/50 text-center">
                Your information will be handled by Lumina HQ and shared with your preferred dealer.
              </p>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-display text-xl text-foreground mb-4">Thank You!</h3>
              <p className="font-body text-foreground/70 mb-6 max-w-sm mx-auto">
                A Lumina specialist will be in touch shortly and connect you with a local showroom.
              </p>
              <Button
                variant="outline"
                onClick={closeModal}
                className="font-display border-border/30 hover:bg-accent/10 hover:border-accent/50 rounded-xl"
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FindDealer;
