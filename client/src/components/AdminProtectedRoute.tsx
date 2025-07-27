import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Crown, Loader2 } from "lucide-react";

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute = ({ children }: AdminProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      console.log('Checking admin authentication...');
      const isAdminAuth = localStorage.getItem("isAdminAuthenticated");
      console.log('Admin auth status:', isAdminAuth);

      if (isAdminAuth === "true") {
        console.log('Admin authenticated, allowing access');
        setIsAuthenticated(true);
      } else {
        console.log('Not authenticated, redirecting to admin login');
        setIsAuthenticated(false);
        setTimeout(() => {
          navigate("/admin/login");
        }, 100);
      }
    };

    checkAuth();
  }, [navigate]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-16 w-16 text-blue-600 mx-auto mb-4 animate-spin" />
          <Crown className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
          <p className="text-blue-600 font-semibold text-xl">Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <Crown className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 font-semibold text-xl">Access Denied</p>
          <p className="text-gray-600 mt-2">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;