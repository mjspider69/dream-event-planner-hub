
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Vendor {
  id: string;
  business_name: string;
  contact_person: string | null;
  email: string | null;
  phone: string | null;
  city: string | null;
  category: string;
  speciality: string[] | null;
  description: string | null;
  price_range: string | null;
  portfolio_images: string[] | null;
  is_approved: boolean;
  is_online: boolean;
  is_featured: boolean;
  rating: number;
  total_bookings: number;
  created_at: string;
  updated_at: string;
}

interface UseVendorsParams {
  speciality?: string;
  city?: string;
  rating?: string;
  priceRange?: string;
}

export const useVendors = (params: UseVendorsParams = {}) => {
  return useQuery({
    queryKey: ['vendors', params],
    queryFn: async () => {
      console.log('Fetching vendors with params:', params);
      
      let query = supabase
        .from('vendors')
        .select('*')
        .eq('status', 'approved');

      // Apply filters based on available fields
      if (params.speciality && params.speciality !== 'all') {
        // Filter by category since speciality might not be available
        query = query.ilike('category', `%${params.speciality}%`);
      }

      if (params.city && params.city !== 'all cities') {
        query = query.ilike('location', `%${params.city}%`);
      }

      if (params.rating) {
        const minRating = parseFloat(params.rating.replace('+', ''));
        query = query.gte('rating', minRating);
      }

      const { data, error } = await query.order('rating', { ascending: false });

      if (error) {
        console.error('Error fetching vendors:', error);
        throw error;
      }

      console.log('Fetched vendors:', data);
      
      // Transform the data to match our Vendor interface
      const transformedData = data?.map(vendor => ({
        id: vendor.id,
        business_name: vendor.business_name,
        contact_person: null, // Will be available after schema update
        email: null, // Will be available after schema update
        phone: null, // Will be available after schema update
        city: vendor.location, // Map location to city
        category: vendor.category,
        speciality: [vendor.category], // Use category as speciality for now
        description: vendor.description,
        price_range: vendor.price_range,
        portfolio_images: vendor.portfolio_images || [],
        is_approved: vendor.status === 'approved',
        is_online: true, // Default to true for now
        is_featured: false, // Default to false for now
        rating: Number(vendor.rating) || 0,
        total_bookings: 0, // Default to 0 for now
        created_at: vendor.created_at,
        updated_at: vendor.updated_at,
      })) || [];

      return transformedData as Vendor[];
    },
  });
};

export const useVendorById = (id: string) => {
  return useQuery({
    queryKey: ['vendor', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw error;
      }

      // Transform the data to match our Vendor interface
      const transformedData = {
        id: data.id,
        business_name: data.business_name,
        contact_person: null, // Will be available after schema update
        email: null, // Will be available after schema update
        phone: null, // Will be available after schema update
        city: data.location, // Map location to city
        category: data.category,
        speciality: [data.category], // Use category as speciality for now
        description: data.description,
        price_range: data.price_range,
        portfolio_images: data.portfolio_images || [],
        is_approved: data.status === 'approved',
        is_online: true, // Default to true for now
        is_featured: false, // Default to false for now
        rating: Number(data.rating) || 0,
        total_bookings: 0, // Default to 0 for now
        created_at: data.created_at,
        updated_at: data.updated_at,
      };

      return transformedData as Vendor;
    },
    enabled: !!id,
  });
};
