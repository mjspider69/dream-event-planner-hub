
import { useAuth } from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: 'customer' | 'vendor' | 'admin';
}

const ProtectedRoute = ({ children, requiredUserType }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Check user type if required
  if (requiredUserType) {
    const userType = (user as any)?.user_metadata?.user_type;
    if (userType !== requiredUserType) {
      // Redirect vendors to vendor dashboard if they try to access customer areas
      if (userType === 'vendor' && requiredUserType === 'customer') {
        return <Navigate to="/vendor-dashboard" replace />;
      }
      // Redirect customers to customer dashboard if they try to access vendor areas  
      if (userType === 'customer' && requiredUserType === 'vendor') {
        return <Navigate to="/customer-dashboard" replace />;
      }
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
