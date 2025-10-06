import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DealerAuth from "./pages/DealerAuth";
import DealerDashboard from "./pages/DealerDashboard";
import DealerInventory from "./pages/DealerInventory";
import DealerConsignments from "./pages/DealerConsignments";
import DealerSales from "./pages/DealerSales";
import DealerList from "./pages/DealerList";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dealer/auth" element={<DealerAuth />} />
          <Route path="/dealer/dashboard" element={<DealerDashboard />} />
          <Route path="/dealer/inventory" element={<DealerInventory />} />
          <Route path="/dealer/consignments" element={<DealerConsignments />} />
          <Route path="/dealer/sales" element={<DealerSales />} />
          <Route path="/dealer/dealers" element={<DealerList />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
