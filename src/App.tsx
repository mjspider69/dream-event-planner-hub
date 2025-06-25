
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import CustomerCare from "./pages/CustomerCare";
import PlanMyEvent from "./pages/PlanMyEvent";
import AIChatbot from "./pages/AIChatbot";
import Auth from "./pages/Auth";
import CustomerLogin from "./pages/CustomerLogin";
import CustomerDashboard from "./pages/CustomerDashboard";
import VendorListing from "./pages/VendorListing";
import VendorView from "./pages/VendorView";
import CustomInput from "./pages/CustomInput";
import Quotation from "./pages/Quotation";
import Booking from "./pages/Booking";
import TalkToVendor from "./pages/TalkToVendor";
import DealDone from "./pages/DealDone";
import VendorDashboard from "./pages/VendorDashboard";
import VendorOnboarding from "./pages/VendorOnboarding";
import AdminPanel from "./pages/AdminPanel";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import NotFound from "./pages/NotFound";
import Packages from "./pages/Packages";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import RefundPolicy from "./pages/RefundPolicy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/customer-care" element={<CustomerCare />} />
          <Route path="/plan-event" element={<PlanMyEvent />} />
          <Route path="/ai-chatbot" element={<AIChatbot />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/login" element={<CustomerLogin />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/vendors" element={<VendorListing />} />
          <Route path="/vendor/:id" element={<VendorView />} />
          <Route path="/custom-input" element={<CustomInput />} />
          <Route path="/quotation" element={<Quotation />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/talk-to-vendor/:id" element={<TalkToVendor />} />
          <Route path="/deal-done" element={<DealDone />} />
          <Route path="/vendor-dashboard" element={<VendorDashboard />} />
          <Route path="/vendor-onboarding" element={<VendorOnboarding />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin" element={
            <AdminProtectedRoute>
              <AdminPanel />
            </AdminProtectedRoute>
          } />
          <Route path="/packages" element={<Packages />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/refund" element={<RefundPolicy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
