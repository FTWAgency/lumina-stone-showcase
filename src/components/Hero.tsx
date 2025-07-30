import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-stone-surface.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Lumina stone surface" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-60"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-accent bg-clip-text text-transparent leading-tight">
          Safer by Design.<br />
          Stunning by Nature.
        </h1>
        
        <p className="font-sans text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          Introducing Lumina — the next evolution in 3D-printed stone.<br />
          Silica-free, health-forward, and artfully crafted.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button variant="premium" size="hero" className="font-sans">
            Find a Dealer
          </Button>
          <Button variant="hero" size="hero" className="font-sans">
            Explore the Collection
          </Button>
        </div>
      </div>
      
      {/* Floating accent elements */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-primary rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute bottom-1/3 right-16 w-3 h-3 bg-accent rounded-full opacity-40 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-primary rounded-full opacity-80 animate-pulse delay-500"></div>
    </section>
  );
};

export default Hero;