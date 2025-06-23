
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Crown } from "lucide-react";

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute = ({ children }: AdminProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const isAdminAuth = localStorage.getItem("isAdminAuthenticated");
      if (isAdminAuth === "true") {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate("/admin/login");
      }
    };

    checkAuth();
  }, [navigate]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen royal-section-pastel flex items-center justify-center">
        <div className="text-center">
          <Crown className="h-16 w-16 text-pastel-gold mx-auto mb-4 animate-pulse" />
          <p className="text-soft-burgundy font-elegant text-xl">Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
};

export default AdminProtectedRoute;
