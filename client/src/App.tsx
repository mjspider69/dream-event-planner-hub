import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";

// Pages
import Index from "./pages/Index";
import About from "./pages/About";
import Packages from "./pages/Packages";
import VendorListing from "./pages/VendorListing";
import VendorView from "./pages/VendorView";
import Auth from "./pages/Auth";
import CustomerAuth from "./pages/CustomerAuth";
import CustomerLogin from "./pages/CustomerLogin";
import VendorAuth from "./pages/VendorAuth";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import RefundPolicy from "./pages/RefundPolicy";
import CustomerCare from "./pages/CustomerCare";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import CustomerDashboard from "./pages/CustomerDashboard";
import VendorDashboard from "./pages/VendorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import Booking from "./pages/Booking";
import Quotation from "./pages/Quotation";
import DealDone from "./pages/DealDone";
import PlanMyEvent from "./pages/PlanMyEvent";
import TalkToVendor from "./pages/TalkToVendor";
import CustomInput from "./pages/CustomInput";
import AIChatbot from "./pages/AIChatbot";
import AdminSetup from "./components/AdminSetup";
import Settings from "./pages/Settings";
import UPIConfiguration from "./components/UPIConfiguration";

// Components
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
          <Routes>
            {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/vendor-listing" element={<VendorListing />} />
          <Route path="/vendor/:id" element={<VendorView />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/customer-auth" element={<CustomerAuth />} />
          <Route path="/customer-login" element={<CustomerLogin />} />
          <Route path="/vendor-auth" element={<VendorAuth />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/customer-care" element={<CustomerCare />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
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
            <Route path="/talk-to-vendor" element={<TalkToVendor />} />
            <Route path="/talk-to-vendor/:id" element={<TalkToVendor />} />
            <Route path="/custom-input" element={<CustomInput />} />
            <Route path="/ai-chatbot" element={<AIChatbot />} />
            <Route path="/admin/setup" element={<AdminSetup />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/upi-config" element={<UPIConfiguration />} />

            {/* Admin Routes */}
            <Route 
              path="/admin-dashboard" 
              element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              } 
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;