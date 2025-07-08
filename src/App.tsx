
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import About from "./pages/About";
import Auth from "./pages/Auth";
import CustomerAuth from "./pages/CustomerAuth";
import VendorAuth from "./pages/VendorAuth";
import VendorOnboarding from "./pages/VendorOnboarding";
import VendorListing from "./pages/VendorListing";
import VendorView from "./pages/VendorView";
import CustomerDashboard from "./pages/CustomerDashboard";
import VendorDashboard from "./pages/VendorDashboard";
import Booking from "./pages/Booking";
import Quotation from "./pages/Quotation";
import DealDone from "./pages/DealDone";
import PlanMyEvent from "./pages/PlanMyEvent";
import Packages from "./pages/Packages";
import TalkToVendor from "./pages/TalkToVendor";
import CustomInput from "./pages/CustomInput";
import AIChatbot from "./pages/AIChatbot";
import CustomerCare from "./pages/CustomerCare";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import RefundPolicy from "./pages/RefundPolicy";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/customer-auth" element={<CustomerAuth />} />
            <Route path="/vendor-auth" element={<VendorAuth />} />
            <Route path="/vendor-onboarding" element={<VendorOnboarding />} />
            <Route path="/vendors" element={<VendorListing />} />
            <Route path="/vendor/:id" element={<VendorView />} />
            <Route
              path="/customer-dashboard"
              element={
                <ProtectedRoute requiredUserType="customer">
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/vendor-dashboard"
              element={
                <ProtectedRoute requiredUserType="vendor">
                  <VendorDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/booking" element={<Booking />} />
            <Route path="/quotation" element={<Quotation />} />
            <Route path="/deal-done" element={<DealDone />} />
            <Route path="/plan-my-event" element={<PlanMyEvent />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/talk-to-vendor" element={<TalkToVendor />} />
            <Route path="/talk-to-vendor/:id" element={<TalkToVendor />} />
            <Route path="/custom-input" element={<CustomInput />} />
            <Route path="/ai-chatbot" element={<AIChatbot />} />
            <Route path="/customer-care" element={<CustomerCare />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route 
              path="/admin-dashboard" 
              element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              } 
            />
            <Route 
              path="/admin-panel" 
              element={
                <AdminProtectedRoute>
                  <AdminPanel />
                </AdminProtectedRoute>
              } 
            />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
