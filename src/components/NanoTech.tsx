const nanoTechImage = "/lovable-uploads/095c3664-5f34-4792-b481-458b17ff08f7.png";

const NanoTech = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left visual */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-premium">
              <img 
                src={nanoTechImage} 
                alt="Nano-Ink Technology" 
                className="w-full h-[28rem] object-cover"
              />
            </div>
            
            {/* Floating tech elements */}
            <div className="absolute -top-6 -right-6 w-10 h-10 bg-primary rounded-full opacity-80 animate-pulse"></div>
            <div className="absolute top-1/2 -left-4 w-8 h-8 bg-accent rounded-full opacity-60 animate-pulse delay-700"></div>
            <div className="absolute -bottom-3 left-1/3 w-6 h-6 bg-primary rounded-full opacity-40 animate-pulse delay-1000"></div>
          </div>
          
          {/* Right content */}
          <div>
            <h2 className="font-display text-4xl lg:text-5xl font-medium mb-10 leading-tight">
              Surfaces That Always Look
              <span className="bg-gradient-accent bg-clip-text text-transparent block">
                as New
              </span>
            </h2>
            
            <p className="font-body text-xl text-muted-foreground leading-relaxed mb-12">
              Our proprietary Nano-Ink technology provides fade-resistant, stain-resistant, 
              deeply rich patterns that endure daily use without compromise — crafted from the quiet strength of innovation.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-xl font-medium text-foreground mb-3">Nano-Scale Precision</h3>
                  <p className="font-body text-base text-muted-foreground leading-relaxed">Molecular-level printing creates patterns that penetrate deep into the surface structure.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-xl font-medium text-foreground mb-3">Permanent Beauty</h3>
                  <p className="font-body text-base text-muted-foreground leading-relaxed">Colors and patterns remain vibrant for decades, resisting UV damage and daily wear.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-xl font-medium text-foreground mb-3">Eco-Conscious Process</h3>
                  <p className="font-body text-base text-muted-foreground leading-relaxed">Zero volatile organic compounds and minimal waste in our closed-loop manufacturing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NanoTech;