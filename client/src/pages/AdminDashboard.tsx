
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "@/components/AdminDashboard";

const AdminDashboardPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdminAuth = localStorage.getItem("isAdminAuthenticated");
    if (isAdminAuth !== "true") {
      navigate("/admin/login");
      return;
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    localStorage.removeItem("adminEmail");
    navigate("/admin/login");
  };

  return (
    <>
      <Header />
      <AdminDashboard onLogout={handleLogout} />
      <Footer />
    </>
  );
};

export default AdminDashboardPage;
