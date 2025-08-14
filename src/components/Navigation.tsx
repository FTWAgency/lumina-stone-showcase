import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full border-b backdrop-blur transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/80 supports-[backdrop-filter]:bg-background/40' 
        : 'bg-background/95 supports-[backdrop-filter]:bg-background/60'
    }`}>
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/57391c22-1049-4f7e-a9b5-8dbe023b18c8.png" 
            alt="Lumina Surfaces Logo" 
            className="h-8"
          />
        </div>

        {/* Navigation Menu */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/20 hover:text-accent-foreground focus:bg-accent/20 focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                Products
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/20 hover:text-accent-foreground focus:bg-accent/20 focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                Technology
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/20 hover:text-accent-foreground focus:bg-accent/20 focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                Why Silica-Free?
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/20 hover:text-accent-foreground focus:bg-accent/20 focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                Find a Dealer
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/20 hover:text-accent-foreground focus:bg-accent/20 focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                About
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/20 hover:text-accent-foreground focus:bg-accent/20 focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                Contact
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* CTA Button */}
        <Button variant="premium" size="default" className="hidden md:inline-flex">
          Explore Collection
        </Button>

        {/* Mobile Menu Trigger */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>
      </div>
    </header>
  );
};

export default Navigation;