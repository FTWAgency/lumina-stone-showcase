
const Education = () => {
  return (
    <section className="py-32 px-6 bg-[#DFD8C6]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left content */}
          <div>
            <h2 className="font-display text-4xl lg:text-5xl font-medium mb-10 text-background leading-tight">
              Designed for a<br />
              <span className="bg-gradient-accent bg-clip-text text-transparent">
                Healthier Future
              </span>
            </h2>
            
            <p className="font-body text-xl text-background/70 leading-relaxed mb-10">
              Over 95% of engineered stone contains harmful Silica. Lumina changes the standard with a 
              <span className="text-primary font-semibold"> 0% Silica solution</span>, reducing risk for 
              fabricators while delivering natural beauty that endures.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl border border-black/10">
                <div className="text-4xl font-display font-medium text-destructive mb-3">95%+</div>
                <div className="text-sm font-body text-black/70">Traditional stone contains harmful Silica</div>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-primary/30 shadow-glow">
                <div className="text-4xl font-display font-medium text-primary mb-3">0%</div>
                <div className="text-sm font-body text-black/80">Silica in Lumina products</div>
              </div>
            </div>
          </div>
          
          {/* Right visual */}
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 border border-black/10 shadow-premium overflow-hidden">
              <div className="relative">
                <img 
                  src="/lovable-uploads/4e5fd5b8-af7d-47e5-9f93-360d3e4d50aa.png" 
                  alt="Lumina nano-technology surface" 
                  className="w-full h-80 object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-xl"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-display text-2xl font-medium text-white mb-3">
                    Crystalline Silica-Free Composition
                  </h3>
                  <p className="font-body text-white/90 text-base leading-relaxed">
                    Made from 90% recycled glass and engineered without crystalline silica — eliminating the risk of airborne particles during fabrication and protecting fabricators' health.
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