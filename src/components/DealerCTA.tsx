import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DealerCTA = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-display text-4xl lg:text-5xl font-medium mb-8 leading-tight">
          See It. Touch It.
          <span className="bg-gradient-accent bg-clip-text text-transparent block">
            Fall In Love With It.
          </span>
        </h2>
        
        <p className="font-body text-xl text-muted-foreground mb-16 max-w-2xl mx-auto leading-relaxed">
          Visit one of our trusted dealer showrooms across the West Coast and experience 
          Lumina in person. Feel the difference quality makes.
        </p>
        
        <div className="bg-secondary p-10 rounded-2xl border border-border shadow-premium max-w-lg mx-auto">
          <h3 className="font-display text-xl font-medium text-foreground mb-8">Find Your Nearest Showroom</h3>
          
          <div className="space-y-5">
            <Input 
              type="text" 
              placeholder="Enter your zip code" 
              className="text-center font-body text-lg h-14 rounded-xl"
            />
            <Button variant="premium" size="lg" className="w-full font-display h-14 text-base">
              Find Dealers Near Me
            </Button>
          </div>
          
          <div className="mt-10 pt-8 border-t border-border">
            <p className="font-body text-sm text-muted-foreground mb-5">Featured Showroom Partners:</p>
            <div className="grid grid-cols-2 gap-4 font-body text-base">
              <div className="text-foreground">Seattle Design Center</div>
              <div className="text-foreground">San Francisco Stone</div>
              <div className="text-foreground">Portland Kitchen Studio</div>
              <div className="text-foreground">Los Angeles Surfaces</div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div>
            <div className="w-20 h-20 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-display text-lg font-medium text-foreground mb-3">Expert Consultation</h3>
            <p className="font-body text-base text-muted-foreground">Professional design guidance for your project</p>
          </div>
          
          <div>
            <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
              </svg>
            </div>
            <h3 className="font-display text-lg font-medium text-foreground mb-3">Sample Library</h3>
            <p className="font-body text-base text-muted-foreground">Take home samples to test in your space</p>
          </div>
          
          <div>
            <div className="w-20 h-20 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="font-display text-lg font-medium text-foreground mb-3">Custom Quotes</h3>
            <p className="font-body text-base text-muted-foreground">Competitive pricing for your specific needs</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealerCTA;