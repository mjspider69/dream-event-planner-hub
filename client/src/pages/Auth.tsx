
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowLeft } from "lucide-react";
import AuthForm from "@/components/AuthForm";

const Auth = () => {
  const [mode, setMode] = useState<'login' | 'signup' | 'vendor'>('login');
  const navigate = useNavigate();

  const handleSuccess = async () => {
    // Small delay to ensure auth state is updated
    setTimeout(() => {
      if (mode === 'vendor') {
        navigate('/vendor-dashboard', { replace: true });
      } else {
        navigate('/customer-dashboard', { replace: true });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-tan via-white to-brand-tan">
      {/* Header */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-brand-tan to-brand-tan rounded-full flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-brand-cream" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-tan to-brand-tan bg-clip-text text-transparent">
                Aaroham
              </h1>
              <p className="text-xs text-gray-500 -mt-1">AI Event Planning</p>
            </div>
          </Link>
          
          <Link to="/">
            <Button variant="ghost" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Marketing Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-brand-tan to-brand-tan bg-clip-text text-transparent">
                    Join India's Premier
                  </span>
                  <br />
                  <span className="text-gray-900">Event Platform</span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Connect with verified vendors, plan with Aarohi AI assistance, and create unforgettable celebrations across India.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-brand-tan/20 rounded-full flex items-center justify-center">
                    <span className="text-brand-cream text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Aarohi AI-powered event planning</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-brand-tan/20 rounded-full flex items-center justify-center">
                    <span className="text-brand-cream text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">1000+ verified vendors</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-brand-tan/20 rounded-full flex items-center justify-center">
                    <span className="text-brand-cream text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Secure Razorpay payment processing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-brand-tan/20 rounded-full flex items-center justify-center">
                    <span className="text-brand-cream text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">OTP-based secure authentication</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-brand-tan/20 rounded-full flex items-center justify-center">
                    <span className="text-brand-cream text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">24/7 customer support</span>
                </div>
              </div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="space-y-6">
              <AuthForm mode={mode} onSuccess={handleSuccess} />
              
              {/* Mode Switcher */}
              <div className="text-center space-y-4">
                <div className="flex justify-center space-x-4">
                  <Button
                    variant={mode === 'login' ? 'default' : 'ghost'}
                    onClick={() => setMode('login')}
                    size="sm"
                    className={mode === 'login' ? 'bg-gradient-to-r from-brand-tan to-brand-tan text-brand-cream' : ''}
                  >
                    Customer Login
                  </Button>
                  <Button
                    variant={mode === 'signup' ? 'default' : 'ghost'}
                    onClick={() => setMode('signup')}
                    size="sm"
                    className={mode === 'signup' ? 'bg-gradient-to-r from-brand-tan to-brand-tan text-brand-cream' : ''}
                  >
                    Customer Sign Up
                  </Button>
                  <Button
                    variant={mode === 'vendor' ? 'default' : 'ghost'}
                    onClick={() => setMode('vendor')}
                    size="sm"
                    className={mode === 'vendor' ? 'bg-gradient-to-r from-brand-tan to-brand-tan text-brand-cream' : ''}
                  >
                    Vendor Registration
                  </Button>
                </div>
                
                <p className="text-sm text-gray-500">
                  {mode === 'login' && "Don't have an account? Switch to Sign Up"}
                  {mode === 'signup' && "Already have an account? Switch to Login"}
                  {mode === 'vendor' && "Want to join as a service provider? Perfect!"}
                </p>

                {mode === 'login' && (
                  <p className="text-sm text-brand-dark font-medium">
                    Are you a vendor? 
                    <button 
                      onClick={() => setMode('vendor')}
                      className="ml-1 underline hover:no-underline"
                    >
                      Click here to access vendor portal
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
