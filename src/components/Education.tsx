
const Education = () => {
  return (
    <section className="py-24 px-6 bg-background-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-8 text-foreground-dark">
              Designed for a<br />
              <span className="text-primary">
                Healthier Future
              </span>
            </h2>
            
            <p className="font-sans text-lg text-foreground-dark/70 leading-relaxed mb-8">
              Over 95% of engineered stone contains harmful Silica. Lumina changes the standard with a 
              <span className="text-primary font-semibold"> 0% Silica solution</span>, reducing risk for 
              fabricators while delivering natural beauty.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
                <div className="text-3xl font-bold text-destructive mb-2">95%+</div>
                <div className="text-sm text-foreground-dark/70">Traditional stone contains harmful Silica</div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-border shadow-glow">
                <div className="text-3xl font-bold text-primary mb-2">0%</div>
                <div className="text-sm text-foreground-dark">Silica in Lumina products</div>
              </div>
            </div>
          </div>
          
          {/* Right visual */}
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 border border-border shadow-premium overflow-hidden">
              <div className="relative">
                <img 
                  src="/lovable-uploads/4e5fd5b8-af7d-47e5-9f93-360d3e4d50aa.png" 
                  alt="Lumina nano-technology surface" 
                  className="w-full h-80 object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-xl"></div>
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
