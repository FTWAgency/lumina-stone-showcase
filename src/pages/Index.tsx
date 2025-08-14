import Hero from "@/components/Hero";
import Education from "@/components/Education";
import DesignShowcase from "@/components/DesignShowcase";
import NanoTech from "@/components/NanoTech";
import Comparison from "@/components/Comparison";
import TechnicalFeatures from "@/components/TechnicalFeatures";
import DealerCTA from "@/components/DealerCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Hero />
      <Education />
      <DesignShowcase />
      <NanoTech />
      <Comparison />
      <TechnicalFeatures />
      <DealerCTA />
      <Footer />
    </div>
  );
};

export default Index;
