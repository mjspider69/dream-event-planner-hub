
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
        .eq('is_approved', true)
        .eq('is_online', true);

      // Apply filters
      if (params.speciality && params.speciality !== 'all') {
        query = query.contains('speciality', [params.speciality]);
      }

      if (params.city && params.city !== 'all cities') {
        query = query.ilike('city', `%${params.city}%`);
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
      return data as Vendor[];
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

      return data as Vendor;
    },
    enabled: !!id,
  });
};
