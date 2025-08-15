import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Education from "@/components/Education";
import SilicaFree from "@/components/SilicaFree";
import DesignShowcase from "@/components/DesignShowcase";
import NanoTech from "@/components/NanoTech";
import Comparison from "@/components/Comparison";
import TechnicalFeatures from "@/components/TechnicalFeatures";
import DealerCTA from "@/components/DealerCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="pt-16 overflow-x-hidden">
        <Hero />
        <Education />
        <SilicaFree />
        <DesignShowcase />
        <NanoTech />
        <Comparison />
        <TechnicalFeatures />
        <DealerCTA />
        <Footer />
      </div>
    </div>
  );
};

export default Index;