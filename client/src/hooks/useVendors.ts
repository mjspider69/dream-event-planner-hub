import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { toast } from 'sonner';

export interface Vendor {
  id: string;
  userId?: string;
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  city?: string;
  category: string;
  speciality: string[];
  description?: string;
  priceRange?: string;
  portfolioImages: string[];
  isApproved: boolean;
  isOnline: boolean;
  isFeatured: boolean;
  rating: number;
  totalBookings: number;
  createdAt: string;
  updatedAt: string;
}

export interface UseVendorsParams {
  speciality?: string;
  city?: string;
  rating?: string;
  featured?: boolean;
}

export const useVendors = (params: UseVendorsParams = {}) => {
  return useQuery({
    queryKey: ['vendors', params],
    queryFn: async () => {
      console.log('Fetching vendors with params:', params);
      
      const filters: { category?: string; city?: string; featured?: boolean } = {};
      
      if (params.speciality && params.speciality !== 'all') {
        filters.category = params.speciality;
      }
      
      if (params.city && params.city !== 'all cities') {
        filters.city = params.city;
      }
      
      if (params.featured) {
        filters.featured = true;
      }
      
      const vendors = await apiClient.getVendors(filters);
      
      // Filter by rating if specified
      if (params.rating) {
        const minRating = parseFloat(params.rating.replace('+', ''));
        return vendors.filter((vendor: Vendor) => vendor.rating >= minRating);
      }
      
      return vendors;
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useVendor = (id: string) => {
  return useQuery({
    queryKey: ['vendor', id],
    queryFn: async () => {
      return await apiClient.getVendor(id);
    },
    enabled: !!id,
    retry: 1,
  });
};

// Alias for backward compatibility
export const useVendorById = useVendor;

export const useCreateVendor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (vendorData: any) => {
      return await apiClient.createVendor(vendorData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
      toast.success('Vendor profile created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create vendor profile');
    },
  });
};

export const useUpdateVendor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
      return await apiClient.updateVendor(id, updates);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
      queryClient.invalidateQueries({ queryKey: ['vendor', variables.id] });
      toast.success('Vendor profile updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update vendor profile');
    },
  });
};

export const useApproveVendor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (vendorId: string) => {
      return await apiClient.approveVendor(vendorId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
      toast.success('Vendor approved successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to approve vendor');
    },
  });
};

// Saved vendors functionality
export const useSavedVendors = (userId: string) => {
  return useQuery({
    queryKey: ['saved-vendors', userId],
    queryFn: async () => {
      return await apiClient.getSavedVendors(userId);
    },
    enabled: !!userId,
  });
};

export const useSaveVendor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ userId, vendorId }: { userId: string; vendorId: string }) => {
      return await apiClient.saveVendor(userId, vendorId);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['saved-vendors', variables.userId] });
      toast.success('Vendor saved successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to save vendor');
    },
  });
};

export const useUnsaveVendor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ userId, vendorId }: { userId: string; vendorId: string }) => {
      return await apiClient.unsaveVendor(userId, vendorId);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['saved-vendors', variables.userId] });
      toast.success('Vendor removed from saved list');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to remove vendor');
    },
  });
};