import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DealerLogin from "./pages/DealerLogin";
import DealerDashboard from "./pages/DealerDashboard";
import DealersList from "./pages/DealersList";
import Inventory from "./pages/Inventory";
import Consignments from "./pages/Consignments";
import DealerSales from "./pages/DealerSales";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dealer/login" element={<DealerLogin />} />
          <Route path="/dealer/dashboard" element={<DealerDashboard />} />
          <Route path="/dealer/dealers" element={<DealersList />} />
          <Route path="/dealer/inventory" element={<Inventory />} />
          <Route path="/dealer/consignments" element={<Consignments />} />
          <Route path="/dealer/sales" element={<DealerSales />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
