import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
    <header className={`fixed top-0 left-0 right-0 z-50 w-full border-b border-border/50 backdrop-blur transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/90 supports-[backdrop-filter]:bg-background/60' 
        : 'bg-background/80 supports-[backdrop-filter]:bg-background/40'
    }`}>
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/b75b6f32-1d96-4d5a-a927-e74ec66d4c40.png" 
            alt="Lumina Surfaces Logo" 
            className="h-10"
          />
        </div>

        {/* Navigation Menu */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <NavigationMenuLink 
                href="#design-showcase"
                className="group inline-flex h-10 w-max items-center justify-center rounded-lg px-5 py-2 font-display text-sm font-medium text-foreground/80 transition-colors hover:bg-accent/10 hover:text-foreground focus:bg-accent/10 focus:text-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
              >
                Products
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink 
                href="#technology"
                className="group inline-flex h-10 w-max items-center justify-center rounded-lg px-5 py-2 font-display text-sm font-medium text-foreground/80 transition-colors hover:bg-accent/10 hover:text-foreground focus:bg-accent/10 focus:text-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
              >
                Technology
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink 
                href="#silica-free"
                className="group inline-flex h-10 w-max items-center justify-center rounded-lg px-5 py-2 font-display text-sm font-medium text-foreground/80 transition-colors hover:bg-accent/10 hover:text-foreground focus:bg-accent/10 focus:text-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
              >
                Why Silica-Free?
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link 
                to="/find-a-dealer"
                className="group inline-flex h-10 w-max items-center justify-center rounded-lg px-5 py-2 font-display text-sm font-medium text-foreground/80 transition-colors hover:bg-accent/10 hover:text-foreground focus:bg-accent/10 focus:text-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
              >
                Find a Dealer
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink 
                href="#sustainability"
                className="group inline-flex h-10 w-max items-center justify-center rounded-lg px-5 py-2 font-display text-sm font-medium text-foreground/80 transition-colors hover:bg-accent/10 hover:text-foreground focus:bg-accent/10 focus:text-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
              >
                About
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* CTA Button */}
        <Button variant="premium" size="default" className="hidden md:inline-flex font-display" asChild>
          <Link to="/collection">Explore Collection</Link>
        </Button>

        {/* Mobile Menu Trigger */}
        <Button variant="ghost" size="icon" className="md:hidden text-foreground">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>
      </div>
    </header>
  );
};

export default Navigation;