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
import DealerProfile from "./pages/DealerProfile";
import Inventory from "./pages/Inventory";
import Consignments from "./pages/Consignments";
import DealerSales from "./pages/DealerSales";
import Invoices from "./pages/Invoices";
import InvoiceDetail from "./pages/InvoiceDetail";
import CreateInvoice from "./pages/CreateInvoice";

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
          <Route path="/dealer/dealers/:id" element={<DealerProfile />} />
          <Route path="/dealer/inventory" element={<Inventory />} />
          <Route path="/dealer/consignments" element={<Consignments />} />
          <Route path="/dealer/sales" element={<DealerSales />} />
          <Route path="/dealer/invoices" element={<Invoices />} />
          <Route path="/dealer/invoices/create" element={<CreateInvoice />} />
          <Route path="/dealer/invoices/:id" element={<InvoiceDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
