import neosImage from "@/assets/PHI_Neos01-removebg-preview.png";

const Comparison = () => {
  return (
    <section className="py-24 px-6 bg-gradient-stone">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-6">
            Lumina vs. 
            <span className="text-muted-foreground"> Traditional Quartz</span>
          </h2>
          <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
            See why forward-thinking architects and designers are choosing Lumina for their most important projects.
          </p>
        </div>

        <div className="flex justify-center">
          <img 
            src={neosImage} 
            alt="PHI Neos Technology Visualization" 
            className="max-w-full h-auto rounded-2xl shadow-premium"
          />
        </div>
      </div>
    </section>
  );
};

export default Comparison;