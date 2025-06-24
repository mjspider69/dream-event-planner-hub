
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, Building, Calendar, DollarSign, CheckCircle, X, 
  Eye, MessageSquare, Star, TrendingUp, AlertCircle 
} from "lucide-react";
import Header from "@/components/Header";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { title: "Total Users", value: "12,456", icon: Users, color: "blue", change: "+12%" },
    { title: "Active Vendors", value: "1,234", icon: Building, color: "green", change: "+8%" },
    { title: "Events This Month", value: "456", icon: Calendar, color: "amber", change: "+23%" },
    { title: "Monthly Revenue", value: "₹45,67,890", icon: DollarSign, color: "purple", change: "+15%" }
  ];

  const pendingVendors = [
    { id: 1, name: "Golden Moments Photography", category: "Photography", location: "Mumbai", rating: 4.8, docs: "Complete" },
    { id: 2, name: "Royal Caterers", category: "Catering", location: "Delhi", rating: 4.5, docs: "Pending" },
    { id: 3, name: "Elegant Decorators", category: "Decoration", location: "Bangalore", rating: 4.7, docs: "Complete" }
  ];

  const recentBookings = [
    { id: 1, event: "Wedding - Sharma Family", vendor: "Dream Weddings", amount: "₹2,50,000", status: "Confirmed", date: "2024-01-15" },
    { id: 2, event: "Corporate Event - TechCorp", vendor: "Event Masters", amount: "₹1,80,000", status: "Pending", date: "2024-01-18" },
    { id: 3, event: "Birthday Party - Kids Zone", vendor: "Party Planners", amount: "₹45,000", status: "Completed", date: "2024-01-12" }
  ];

  const userComplaints = [
    { id: 1, user: "Priya Sharma", issue: "Vendor didn't show up", severity: "High", status: "Open", date: "2024-01-14" },
    { id: 2, user: "Rajesh Kumar", issue: "Payment issue", severity: "Medium", status: "In Progress", date: "2024-01-13" },
    { id: 3, user: "Anita Gupta", issue: "Service quality concern", severity: "Low", status: "Resolved", date: "2024-01-12" }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed': case 'resolved': case 'complete': return 'bg-green-100 text-green-800';
      case 'pending': case 'in progress': case 'open': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your platform efficiently</p>
          </div>
          <Badge className="bg-gradient-to-r from-blue-100 to-amber-100 text-blue-800 px-4 py-2">
            Super Admin
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">{stat.change}</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 bg-${stat.color}-100 rounded-full flex items-center justify-center`}>
                    <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
          {['overview', 'vendors', 'bookings', 'complaints'].map((tab) => (
            <Button
              key={tab}
              onClick={() => setActiveTab(tab)}
              variant={activeTab === tab ? 'default' : 'ghost'}
              className={`flex-1 capitalize ${
                activeTab === tab 
                  ? 'bg-white shadow-sm' 
                  : 'hover:bg-white/50'
              }`}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="h-5 w-5 mr-2 text-blue-600" />
                  Recent Vendor Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingVendors.slice(0, 3).map((vendor) => (
                    <div key={vendor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold">{vendor.name}</p>
                        <p className="text-sm text-gray-600">{vendor.category} • {vendor.location}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-amber-400 fill-current" />
                          <span className="text-sm ml-1">{vendor.rating}</span>
                        </div>
                        <Badge className={vendor.docs === 'Complete' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {vendor.docs}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
                  Recent Complaints
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userComplaints.slice(0, 3).map((complaint) => (
                    <div key={complaint.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold">{complaint.user}</p>
                        <p className="text-sm text-gray-600">{complaint.issue}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getSeverityColor(complaint.severity)}>
                          {complaint.severity}
                        </Badge>
                        <Badge className={getStatusColor(complaint.status)}>
                          {complaint.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'vendors' && (
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Vendor Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingVendors.map((vendor) => (
                  <div key={vendor.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">{vendor.name}</h3>
                      <p className="text-gray-600">{vendor.category} • {vendor.location}</p>
                      <div className="flex items-center mt-2">
                        <Star className="h-4 w-4 text-amber-400 fill-current" />
                        <span className="text-sm ml-1">{vendor.rating} rating</span>
                        <Badge className={vendor.docs === 'Complete' ? 'bg-green-100 text-green-800 ml-3' : 'bg-yellow-100 text-yellow-800 ml-3'}>
                          {vendor.docs}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive">
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'bookings' && (
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">{booking.event}</h3>
                      <p className="text-gray-600">{booking.vendor} • {booking.date}</p>
                      <p className="text-lg font-bold text-green-600 mt-1">{booking.amount}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'complaints' && (
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Customer Complaints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userComplaints.map((complaint) => (
                  <div key={complaint.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">{complaint.user}</h3>
                      <p className="text-gray-600">{complaint.issue}</p>
                      <p className="text-sm text-gray-500 mt-1">Date: {complaint.date}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getSeverityColor(complaint.severity)}>
                        {complaint.severity}
                      </Badge>
                      <Badge className={getStatusColor(complaint.status)}>
                        {complaint.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Respond
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
