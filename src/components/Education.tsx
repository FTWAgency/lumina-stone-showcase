
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
          
          {/* Right visual */}
          <div className="relative">
            <div className="bg-card rounded-2xl p-8 border border-border shadow-premium overflow-hidden">
              <div className="relative">
                <img 
                  src="/lovable-uploads/dafaf34d-6f49-4c3e-bdeb-180c1199dbb5.png" 
                  alt="3D printing technology creating Lumina surfaces" 
                  className="w-full h-80 object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent rounded-xl"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-serif text-2xl font-semibold text-white mb-2">
                    Crystalline Silica-Free Composition
                  </h3>
                  <p className="text-white/80 text-sm">
                    Made from 90% recycled glass and engineered without crystalline silica eliminating the risk of airborne particles during fabrication and protecting fabricators' health.
                  </p>
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
