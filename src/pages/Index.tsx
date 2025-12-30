import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Education from "@/components/Education";
import SilicaFree from "@/components/SilicaFree";
import Sustainability from "@/components/Sustainability";
import DesignShowcase from "@/components/DesignShowcase";
import NanoTech from "@/components/NanoTech";
import Comparison from "@/components/Comparison";
import TechnicalFeatures from "@/components/TechnicalFeatures";
import DealerCTA from "@/components/DealerCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      <Navigation />
      <div className="pt-16 overflow-x-hidden">
        <Hero />
        <Education />
        <div id="silica-free">
          <SilicaFree />
        </div>
        <div id="design-showcase">
          <DesignShowcase />
        </div>
        <div id="technology">
          <NanoTech />
        </div>
        <div id="sustainability">
          <Sustainability />
        </div>
        <Comparison />
        <TechnicalFeatures />
        <div id="dealer-cta">
          <DealerCTA />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Index;