import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Users, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Search,
  Filter,
  UserCheck,
  UserX,
  Star,
  MapPin,
  Phone,
  Mail
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { useVendors, useApproveVendor, useUpdateVendor } from "@/hooks/useVendors";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AdminPortal = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: vendors, isLoading, refetch } = useVendors();
  const approveVendorMutation = useApproveVendor();
  const updateVendorMutation = useUpdateVendor();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingVendor, setEditingVendor] = useState<any>(null);

  useEffect(() => {
    // Check if user is admin
    if (user && (user as any)?.user_type !== 'admin') {
      toast.error("Access denied. Admin privileges required.");
      navigate('/');
    }
  }, [user, navigate]);

  const filteredVendors = vendors?.filter((vendor: any) => {
    const matchesSearch = vendor.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "approved" && vendor.isApproved) ||
                         (statusFilter === "pending" && !vendor.isApproved) ||
                         (statusFilter === "featured" && vendor.isFeatured);
    
    return matchesSearch && matchesStatus;
  }) || [];

  const handleApproveVendor = async (vendorId: string) => {
    try {
      await approveVendorMutation.mutateAsync(vendorId);
      refetch();
    } catch (error) {
      console.error("Error approving vendor:", error);
    }
  };

  const handleUpdateVendor = async (updates: any) => {
    if (!editingVendor) return;
    
    try {
      await updateVendorMutation.mutateAsync({
        id: editingVendor.id,
        updates
      });
      setEditingVendor(null);
      refetch();
    } catch (error) {
      console.error("Error updating vendor:", error);
    }
  };

  const handleToggleFeature = async (vendor: any) => {
    try {
      await updateVendorMutation.mutateAsync({
        id: vendor.id,
        updates: { isFeatured: !vendor.isFeatured }
      });
      refetch();
    } catch (error) {
      console.error("Error updating vendor:", error);
    }
  };

  const getStatusBadge = (vendor: any) => {
    if (vendor.isFeatured) {
      return <Badge className="bg-purple-100 text-purple-800">Featured</Badge>;
    }
    if (vendor.isApproved) {
      return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
    }
    return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
  };

  if (!user || (user as any)?.user_type !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
            <p className="text-gray-600 mb-4">You need admin privileges to access this page.</p>
            <Button onClick={() => navigate('/')} variant="outline">
              Back to Home
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Portal
          </h1>
          <p className="text-gray-600">
            Manage vendors, view analytics, and control platform operations
          </p>
        </div>

        <Tabs defaultValue="vendors" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="vendors">Vendor Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="content">Content Management</TabsTrigger>
            <TabsTrigger value="settings">Platform Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="vendors" className="space-y-6">
            {/* Vendor Management Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Vendor Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <Input
                      placeholder="Search vendors by name, email, or category..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="all">All Status</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="featured">Featured</option>
                  </select>
                </div>

                {isLoading ? (
                  <div className="text-center py-8">Loading vendors...</div>
                ) : (
                  <div className="grid gap-4">
                    {filteredVendors.map((vendor: any) => (
                      <Card key={vendor.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div>
                              <h3 className="font-semibold text-lg">{vendor.businessName}</h3>
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <span>{vendor.category}</span>
                                {vendor.city && (
                                  <>
                                    <span>•</span>
                                    <div className="flex items-center">
                                      <MapPin className="h-3 w-3 mr-1" />
                                      {vendor.city}
                                    </div>
                                  </>
                                )}
                              </div>
                              <div className="flex items-center space-x-2 mt-1">
                                <Mail className="h-3 w-3" />
                                <span className="text-sm">{vendor.email}</span>
                                <Phone className="h-3 w-3 ml-2" />
                                <span className="text-sm">{vendor.phone}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {getStatusBadge(vendor)}
                            
                            {vendor.rating > 0 && (
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                <span className="text-sm">{vendor.rating}</span>
                              </div>
                            )}
                            
                            <div className="flex space-x-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => navigate(`/vendor/${vendor.id}`)}
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                              
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setEditingVendor(vendor)}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              
                              {!vendor.isApproved && (
                                <Button
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => handleApproveVendor(vendor.id)}
                                  disabled={approveVendorMutation.isPending}
                                >
                                  <CheckCircle className="h-3 w-3" />
                                </Button>
                              )}
                              
                              <Button
                                size="sm"
                                variant={vendor.isFeatured ? "default" : "outline"}
                                onClick={() => handleToggleFeature(vendor)}
                                disabled={updateVendorMutation.isPending}
                              >
                                <Star className={`h-3 w-3 ${vendor.isFeatured ? 'fill-current' : ''}`} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Platform Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{vendors?.length || 0}</div>
                    <div className="text-sm text-gray-600">Total Vendors</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {vendors?.filter((v: any) => v.isApproved).length || 0}
                    </div>
                    <div className="text-sm text-gray-600">Approved Vendors</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {vendors?.filter((v: any) => v.isFeatured).length || 0}
                    </div>
                    <div className="text-sm text-gray-600">Featured Vendors</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">
                      {vendors?.filter((v: any) => !v.isApproved).length || 0}
                    </div>
                    <div className="text-sm text-gray-600">Pending Approval</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Content management features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Platform settings coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />

      {/* Edit Vendor Modal */}
      {editingVendor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Edit Vendor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Business Name</label>
                <Input
                  defaultValue={editingVendor.businessName}
                  onChange={(e) => setEditingVendor({...editingVendor, businessName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  defaultValue={editingVendor.description}
                  onChange={(e) => setEditingVendor({...editingVendor, description: e.target.value})}
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={() => handleUpdateVendor(editingVendor)}
                  disabled={updateVendorMutation.isPending}
                >
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setEditingVendor(null)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminPortal;