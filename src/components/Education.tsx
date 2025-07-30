const Education = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-8 text-foreground">
              Designed for a<br />
              <span className="bg-gradient-accent bg-clip-text text-transparent">
                Healthier Future
              </span>
            </h2>
            
            <p className="font-sans text-lg text-muted-foreground leading-relaxed mb-8">
              Over 95% of engineered stone contains harmful Silica. Lumina changes the standard with a 
              <span className="text-primary font-semibold"> 0% Silica solution</span>, reducing risk for 
              fabricators while delivering natural beauty.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-destructive mb-2">95%+</div>
                <div className="text-sm text-muted-foreground">Traditional stone contains harmful Silica</div>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border shadow-glow">
                <div className="text-3xl font-bold text-primary mb-2">0%</div>
                <div className="text-sm text-foreground">Silica in Lumina products</div>
              </div>
            </div>
          </div>
          
          {/* Right visual comparison */}
          <div className="relative">
            <div className="bg-card rounded-2xl p-8 border border-border shadow-premium">
              <h3 className="font-serif text-2xl font-semibold mb-6 text-center">Traditional vs. Lumina</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                  <span className="font-sans text-sm">Silica Content</span>
                  <div className="flex items-center gap-3">
                    <div className="text-destructive font-semibold">95%+</div>
                    <div className="w-4 h-4 rounded-full bg-destructive"></div>
                    <span className="text-xs text-muted-foreground">vs</span>
                    <div className="w-4 h-4 rounded-full bg-primary"></div>
                    <div className="text-primary font-semibold">0%</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <span className="font-sans text-sm">Fabricator Safety</span>
                  <div className="flex items-center gap-3">
                    <div className="text-destructive font-semibold">❌</div>
                    <span className="text-xs text-muted-foreground">vs</span>
                    <div className="text-primary font-semibold">✅</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <span className="font-sans text-sm">Natural Beauty</span>
                  <div className="flex items-center gap-3">
                    <div className="text-accent font-semibold">✅</div>
                    <span className="text-xs text-muted-foreground">and</span>
                    <div className="text-primary font-semibold">✅</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;