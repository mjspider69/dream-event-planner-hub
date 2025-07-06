
-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT,
  phone TEXT,
  city TEXT,
  user_type TEXT DEFAULT 'customer',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create vendors table
CREATE TABLE public.vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  contact_person TEXT,
  email TEXT,
  phone TEXT,
  category TEXT NOT NULL,
  city TEXT NOT NULL,
  description TEXT,
  price_range TEXT,
  portfolio_images TEXT[] DEFAULT '{}',
  is_approved BOOLEAN DEFAULT false,
  rating DECIMAL(2,1) DEFAULT 0.0,
  total_bookings INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  vendor_id UUID REFERENCES public.vendors(id) ON DELETE CASCADE NOT NULL,
  event_type TEXT NOT NULL,
  event_date DATE NOT NULL,
  event_location TEXT NOT NULL,
  guest_count INTEGER NOT NULL,
  budget DECIMAL(10,2) NOT NULL,
  requirements TEXT,
  status TEXT DEFAULT 'pending',
  total_amount DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create payments table
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE NOT NULL,
  customer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  payment_status TEXT DEFAULT 'pending',
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  payment_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create OTPs table
CREATE TABLE public.otps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT,
  phone TEXT,
  otp_code TEXT NOT NULL,
  purpose TEXT NOT NULL DEFAULT 'signup',
  is_verified BOOLEAN DEFAULT false,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.otps ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for vendors
CREATE POLICY "Anyone can view approved vendors" ON public.vendors
  FOR SELECT USING (is_approved = true OR auth.uid() = user_id);

CREATE POLICY "Vendors can update their own listing" ON public.vendors
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can create vendor listings" ON public.vendors
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for bookings
CREATE POLICY "Users can view their own bookings" ON public.bookings
  FOR SELECT USING (auth.uid() = customer_id);

CREATE POLICY "Users can create bookings" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Users can update their own bookings" ON public.bookings
  FOR UPDATE USING (auth.uid() = customer_id);

-- Create RLS policies for payments
CREATE POLICY "Users can view their own payments" ON public.payments
  FOR SELECT USING (auth.uid() = customer_id);

CREATE POLICY "Users can create payments" ON public.payments
  FOR INSERT WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Users can update their own payments" ON public.payments
  FOR UPDATE USING (auth.uid() = customer_id);

-- Create RLS policies for OTPs (allow access for verification)
CREATE POLICY "Anyone can create OTPs" ON public.otps
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can read OTPs for verification" ON public.otps
  FOR SELECT USING (true);

CREATE POLICY "Anyone can update OTPs for verification" ON public.otps
  FOR UPDATE USING (true);

-- Insert some sample vendors
INSERT INTO public.vendors (business_name, contact_person, email, phone, category, city, description, price_range, is_approved, rating, total_bookings) VALUES
('Elite Event Decorators', 'Rajesh Kumar', 'rajesh@eliteevents.com', '+91-9876543210', 'Decoration', 'Mumbai', 'Premium wedding and event decoration services with 10+ years experience', '₹50,000 - ₹2,00,000', true, 4.8, 156),
('Royal Caterers', 'Priya Sharma', 'priya@royalcaterers.com', '+91-9876543211', 'Catering', 'Delhi', 'Authentic Indian cuisine for all occasions', '₹800 - ₹2,000 per plate', true, 4.6, 203),
('Melody Music Band', 'Arjun Singh', 'arjun@melodyband.com', '+91-9876543212', 'Entertainment', 'Bangalore', 'Live music performances for weddings and corporate events', '₹25,000 - ₹75,000', true, 4.7, 89),
('Dream Photography', 'Sneha Patel', 'sneha@dreamphotography.com', '+91-9876543213', 'Photography', 'Pune', 'Professional wedding and event photography', '₹40,000 - ₹1,50,000', true, 4.9, 134),
('Floral Paradise', 'Vikram Mehta', 'vikram@floralparadise.com', '+91-9876543214', 'Decoration', 'Hyderabad', 'Beautiful floral arrangements and decorations', '₹15,000 - ₹80,000', true, 4.5, 78);
