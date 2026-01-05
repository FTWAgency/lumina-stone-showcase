import { Link } from "react-router-dom";
import luminaInitialLogo from "@/assets/lumina-initial-logo.svg";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-8">
              {/* Lumina Logo */}
              <div className="w-14 h-14 flex items-center justify-center group hover:scale-105 transition-transform duration-300">
                <img src={luminaInitialLogo} alt="Lumina Surfaces" className="w-12 h-12" />
              </div>
              <div>
                <span className="font-display text-2xl font-medium text-foreground block">Lumina</span>
                <span className="font-body text-sm text-accent">Surfaces</span>
              </div>
            </div>
            
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-8 max-w-md">
              The next evolution in 3D-printed stone. Safer by design, stunning by nature. 
              Redefining surface materials for a healthier, more beautiful future.
            </p>
            
            {/* Social Icons - Gold outlined style */}
            <div className="flex gap-4">
              <a href="#" className="w-11 h-11 border border-accent/40 rounded-xl flex items-center justify-center hover:bg-accent/10 hover:border-accent transition-all duration-300 group">
                <svg className="w-5 h-5 text-accent group-hover:drop-shadow-[0_0_8px_hsl(var(--accent)/0.6)] transition-all duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="w-11 h-11 border border-accent/40 rounded-xl flex items-center justify-center hover:bg-accent/10 hover:border-accent transition-all duration-300 group">
                <svg className="w-5 h-5 text-accent group-hover:drop-shadow-[0_0_8px_hsl(var(--accent)/0.6)] transition-all duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="#" className="w-11 h-11 border border-accent/40 rounded-xl flex items-center justify-center hover:bg-accent/10 hover:border-accent transition-all duration-300 group">
                <svg className="w-5 h-5 text-accent group-hover:drop-shadow-[0_0_8px_hsl(var(--accent)/0.6)] transition-all duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="w-11 h-11 border border-accent/40 rounded-xl flex items-center justify-center hover:bg-accent/10 hover:border-accent transition-all duration-300 group">
                <svg className="w-5 h-5 text-accent group-hover:drop-shadow-[0_0_8px_hsl(var(--accent)/0.6)] transition-all duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Product Links */}
          <div>
            <h3 className="font-display text-lg font-medium text-foreground mb-6">Products</h3>
            <ul className="space-y-4 font-body text-muted-foreground">
              <li><a href="#" className="hover:text-accent transition-colors duration-300 inline-block hover:translate-x-1 transform transition-transform">Design Collection</a></li>
              <li><a href="#" className="hover:text-accent transition-colors duration-300 inline-block hover:translate-x-1 transform transition-transform">Technical Specs</a></li>
              <li><a href="#" className="hover:text-accent transition-colors duration-300 inline-block hover:translate-x-1 transform transition-transform">Installation Guide</a></li>
              <li><a href="#" className="hover:text-accent transition-colors duration-300 inline-block hover:translate-x-1 transform transition-transform">Care Instructions</a></li>
              <li><a href="#" className="hover:text-accent transition-colors duration-300 inline-block hover:translate-x-1 transform transition-transform">Sample Library</a></li>
            </ul>
          </div>
          
          {/* Company Links */}
          <div>
            <h3 className="font-display text-lg font-medium text-foreground mb-6">Company</h3>
            <ul className="space-y-4 font-body text-muted-foreground">
              <li><a href="#" className="hover:text-accent transition-colors duration-300 inline-block hover:translate-x-1 transform transition-transform">About the Brand</a></li>
              <li><a href="#" className="hover:text-accent transition-colors duration-300 inline-block hover:translate-x-1 transform transition-transform">About Lumina</a></li>
              <li><Link to="/find-a-dealer" className="hover:text-accent transition-colors duration-300 inline-block hover:translate-x-1 transform transition-transform">Find Dealers</Link></li>
              <li><a href="#" className="hover:text-accent transition-colors duration-300 inline-block hover:translate-x-1 transform transition-transform">Become a Partner</a></li>
              <li><a href="#" className="hover:text-accent transition-colors duration-300 inline-block hover:translate-x-1 transform transition-transform">Press & Media</a></li>
              <li><a href="/dealer/login" className="hover:text-accent transition-colors duration-300 inline-block hover:translate-x-1 transform transition-transform">Dealer Login</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          {/* LS Monogram */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border border-accent/30 rounded-lg flex items-center justify-center">
              <span className="font-display text-sm font-medium text-accent">LS</span>
            </div>
            <div className="font-body text-sm text-muted-foreground">
              © 2025 Lumina Surfaces. All Rights Reserved.
            </div>
          </div>
          
          <div className="flex gap-8 font-body text-sm text-muted-foreground">
            <a href="#" className="hover:text-accent transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors duration-300">Terms of Service</a>
            <a href="#" className="hover:text-accent transition-colors duration-300">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;