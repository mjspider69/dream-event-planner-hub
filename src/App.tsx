
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import CustomerAuth from "./pages/CustomerAuth";
import VendorAuth from "./pages/VendorAuth";
import AdminLogin from "./pages/AdminLogin";
import CustomerDashboard from "./pages/CustomerDashboard";
import VendorDashboard from "./pages/VendorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import VendorListing from "./pages/VendorListing";
import VendorView from "./pages/VendorView";
import AIChatbot from "./pages/AIChatbot";
import About from "./pages/About";
import Packages from "./pages/Packages";
import PlanMyEvent from "./pages/PlanMyEvent";
import Booking from "./pages/Booking";
import Quotation from "./pages/Quotation";
import DealDone from "./pages/DealDone";
import CustomerCare from "./pages/CustomerCare";
import TalkToVendor from "./pages/TalkToVendor";
import VendorOnboarding from "./pages/VendorOnboarding";
import AdminPanel from "./pages/AdminPanel";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import RefundPolicy from "./pages/RefundPolicy";
import NotFound from "./pages/NotFound";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/customer-auth" element={<CustomerAuth />} />
              <Route path="/vendor-auth" element={<VendorAuth />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/vendors" element={<VendorListing />} />
              <Route path="/vendor/:id" element={<VendorView />} />
              <Route path="/ai-chatbot" element={<AIChatbot />} />
              <Route path="/about" element={<About />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />

              {/* Protected Customer Routes */}
              <Route
                path="/customer-dashboard"
                element={
                  <ProtectedRoute requiredUserType="customer">
                    <CustomerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/plan-my-event"
                element={
                  <ProtectedRoute requiredUserType="customer">
                    <PlanMyEvent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/booking"
                element={
                  <ProtectedRoute requiredUserType="customer">
                    <Booking />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/quotation"
                element={
                  <ProtectedRoute requiredUserType="customer">
                    <Quotation />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/deal-done"
                element={
                  <ProtectedRoute requiredUserType="customer">
                    <DealDone />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer-care"
                element={
                  <ProtectedRoute requiredUserType="customer">
                    <CustomerCare />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/talk-to-vendor"
                element={
                  <ProtectedRoute requiredUserType="customer">
                    <TalkToVendor />
                  </ProtectedRoute>
                }
              />

              {/* Protected Vendor Routes */}
              <Route
                path="/vendor-dashboard"
                element={
                  <ProtectedRoute requiredUserType="vendor">
                    <VendorDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/vendor-onboarding"
                element={
                  <ProtectedRoute requiredUserType="vendor">
                    <VendorOnboarding />
                  </ProtectedRoute>
                }
              />

              {/* Protected Admin Routes */}
              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedRoute requiredUserType="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin-panel"
                element={
                  <ProtectedRoute requiredUserType="admin">
                    <AdminPanel />
                  </ProtectedRoute>
                }
              />

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
