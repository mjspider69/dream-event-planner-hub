
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

// Mock data for testing when database is having issues
const mockVendors: Vendor[] = [
  {
    id: "1",
    business_name: "Royal Photography Studio",
    contact_person: "Rajesh Kumar",
    email: "rajesh@royalphoto.com",
    phone: "+91 98765 43210",
    city: "Mumbai",
    category: "Photography",
    speciality: ["Wedding Photography", "Portrait Photography"],
    description: "Premium wedding and event photography with 10+ years experience",
    price_range: "₹50,000 - ₹1,50,000",
    portfolio_images: [
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=80"
    ],
    is_approved: true,
    is_online: true,
    is_featured: true,
    rating: 4.8,
    total_bookings: 156,
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z"
  },
  {
    id: "2",
    business_name: "Golden Decorators",
    contact_person: "Priya Sharma",
    email: "priya@goldendecorators.com",
    phone: "+91 87654 32109",
    city: "Delhi",
    category: "Decoration",
    speciality: ["Wedding Decoration", "Stage Setup"],
    description: "Elegant wedding and event decoration services across North India",
    price_range: "₹75,000 - ₹2,50,000",
    portfolio_images: [
      "https://images.unsplash.com/photo-1519167758481-83f29ba5fe79?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1464207687429-7505649dae38?auto=format&fit=crop&w=400&q=80"
    ],
    is_approved: true,
    is_online: true,
    is_featured: false,
    rating: 4.6,
    total_bookings: 89,
    created_at: "2024-01-10T10:00:00Z",
    updated_at: "2024-01-10T10:00:00Z"
  },
  {
    id: "3",
    business_name: "Spice Garden Catering",
    contact_person: "Amit Patel",
    email: "amit@spicegarden.com",
    phone: "+91 76543 21098",
    city: "Bangalore",
    category: "Catering",
    speciality: ["Indian Cuisine", "Multi-Cuisine"],
    description: "Authentic flavors and exceptional catering services for all occasions",
    price_range: "₹800 - ₹1,500 per plate",
    portfolio_images: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=400&q=80"
    ],
    is_approved: true,
    is_online: true,
    is_featured: true,
    rating: 4.9,
    total_bookings: 234,
    created_at: "2024-01-05T10:00:00Z",
    updated_at: "2024-01-05T10:00:00Z"
  },
  {
    id: "4",
    business_name: "Beat Box DJ Services",
    contact_person: "DJ Rohan",
    email: "rohan@beatboxdj.com",
    phone: "+91 65432 10987",
    city: "Pune",
    category: "DJ & Music",
    speciality: ["Wedding DJ", "Corporate Events"],
    description: "High-energy music and professional DJ services for unforgettable events",
    price_range: "₹25,000 - ₹75,000",
    portfolio_images: [
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80"
    ],
    is_approved: true,
    is_online: true,
    is_featured: false,
    rating: 4.7,
    total_bookings: 112,
    created_at: "2024-01-08T10:00:00Z",
    updated_at: "2024-01-08T10:00:00Z"
  },
  {
    id: "5",
    business_name: "Sacred Ceremonies",
    contact_person: "Pandit Vishnu Sharma",
    email: "vishnu@sacredceremonies.com",
    phone: "+91 54321 09876",
    city: "Jaipur",
    category: "Priest",
    speciality: ["Hindu Weddings", "Religious Ceremonies"],
    description: "Traditional wedding ceremonies conducted with authentic rituals and mantras",
    price_range: "₹15,000 - ₹50,000",
    portfolio_images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1544450329-9ee85c0bee89?auto=format&fit=crop&w=400&q=80"
    ],
    is_approved: true,
    is_online: true,
    is_featured: false,
    rating: 4.5,
    total_bookings: 78,
    created_at: "2024-01-12T10:00:00Z",
    updated_at: "2024-01-12T10:00:00Z"
  },
  {
    id: "6",
    business_name: "Luxury Travels",
    contact_person: "Suresh Singh",
    email: "suresh@luxurytravels.com",
    phone: "+91 43210 98765",
    city: "Chennai",
    category: "Transport",
    speciality: ["Wedding Cars", "Guest Transportation"],
    description: "Premium transportation services with luxury cars and professional drivers",
    price_range: "₹10,000 - ₹1,00,000",
    portfolio_images: [
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1568605117036-cfb79e57ec8a?auto=format&fit=crop&w=400&q=80"
    ],
    is_approved: true,
    is_online: true,
    is_featured: false,
    rating: 4.4,
    total_bookings: 67,
    created_at: "2024-01-18T10:00:00Z",
    updated_at: "2024-01-18T10:00:00Z"
  }
];

export const useVendors = (params: UseVendorsParams = {}) => {
  return useQuery({
    queryKey: ['vendors', params],
    queryFn: async () => {
      console.log('Fetching vendors with params:', params);
      
      try {
        let query = supabase
          .from('vendors')
          .select('*')
          .eq('status', 'approved');

        // Apply filters based on available fields
        if (params.speciality && params.speciality !== 'all') {
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
          // Return mock data if there's a database error
          console.log('Using mock data due to database error');
          return mockVendors.filter(vendor => {
            if (params.speciality && params.speciality !== 'all' && params.speciality !== '') {
              return vendor.category.toLowerCase().includes(params.speciality.toLowerCase());
            }
            if (params.city && params.city !== 'all cities' && params.city !== '') {
              return vendor.city?.toLowerCase().includes(params.city.toLowerCase());
            }
            return true;
          });
        }

        console.log('Fetched vendors:', data);
        
        // Transform the data to match our Vendor interface
        const transformedData = data?.map(vendor => ({
          id: vendor.id,
          business_name: vendor.business_name,
          contact_person: null,
          email: null,
          phone: null,
          city: vendor.location,
          category: vendor.category,
          speciality: [vendor.category],
          description: vendor.description,
          price_range: vendor.price_range,
          portfolio_images: vendor.portfolio_images || [],
          is_approved: vendor.status === 'approved',
          is_online: true,
          is_featured: false,
          rating: Number(vendor.rating) || 0,
          total_bookings: 0,
          created_at: vendor.created_at,
          updated_at: vendor.updated_at,
        })) || [];

        return transformedData as Vendor[];
      } catch (error) {
        console.error('Unexpected error fetching vendors:', error);
        // Return mock data as fallback
        return mockVendors;
      }
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useVendorById = (id: string) => {
  return useQuery({
    queryKey: ['vendor', id],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('vendors')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching vendor by ID:', error);
          // Return mock vendor if there's a database error
          const mockVendor = mockVendors.find(v => v.id === id);
          if (mockVendor) return mockVendor;
          throw new Error('Vendor not found');
        }

        // Transform the data to match our Vendor interface
        const transformedData = {
          id: data.id,
          business_name: data.business_name,
          contact_person: null,
          email: null,
          phone: null,
          city: data.location,
          category: data.category,
          speciality: [data.category],
          description: data.description,
          price_range: data.price_range,
          portfolio_images: data.portfolio_images || [],
          is_approved: data.status === 'approved',
          is_online: true,
          is_featured: false,
          rating: Number(data.rating) || 0,
          total_bookings: 0,
          created_at: data.created_at,
          updated_at: data.updated_at,
        };

        return transformedData as Vendor;
      } catch (error) {
        console.error('Unexpected error fetching vendor:', error);
        // Return mock vendor as fallback
        const mockVendor = mockVendors.find(v => v.id === id);
        if (mockVendor) return mockVendor;
        throw new Error('Vendor not found');
      }
    },
    enabled: !!id,
    retry: 1,
  });
};
