import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DashboardLayout } from "@/components/DashboardLayout";
import Index from "./pages/Index";
import Members from "./pages/Members";
import Batches from "./pages/Batches";
import Slots from "./pages/Slots";
import Revenue from "./pages/Revenue";
import Reports from "./pages/Reports";
import DocumentVerification from "./pages/DocumentVerification";
import MembershipPlans from "./pages/MembershipPlans";
import RenewalTracking from "./pages/RenewalTracking";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/members" element={<Members />} />
            <Route path="/batches" element={<Batches />} />
            <Route path="/slots" element={<Slots />} />
            <Route path="/documents" element={<DocumentVerification />} />
            <Route path="/plans" element={<MembershipPlans />} />
            <Route path="/renewals" element={<RenewalTracking />} />
            <Route path="/revenue" element={<Revenue />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
