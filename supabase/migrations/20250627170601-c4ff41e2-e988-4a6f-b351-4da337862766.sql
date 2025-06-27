
-- Create user_sessions table for JWT session management
CREATE TABLE public.user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_token TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_accessed TIMESTAMPTZ DEFAULT now()
);

-- Create otps table for OTP verification
CREATE TABLE public.otps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  phone TEXT,
  otp_code TEXT NOT NULL,
  purpose TEXT NOT NULL, -- 'signup', 'login', 'password_reset'
  is_verified BOOLEAN DEFAULT false,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create vendor_reviews table
CREATE TABLE public.vendor_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID NOT NULL,
  customer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  booking_id UUID,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create chat_history table for AI chatbot
CREATE TABLE public.chat_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT,
  message TEXT NOT NULL,
  sender_type TEXT NOT NULL, -- 'user' or 'ai'
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  metadata JSONB
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL, -- 'booking', 'payment', 'approval', 'system'
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create commission_settings table
CREATE TABLE public.commission_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_category TEXT NOT NULL,
  commission_percentage DECIMAL(5,2) NOT NULL DEFAULT 10.00,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS on all tables
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.otps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendor_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commission_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_sessions
CREATE POLICY "Users can view their own sessions" ON public.user_sessions
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can manage their own sessions" ON public.user_sessions
FOR ALL USING (user_id = auth.uid());

-- Create RLS policies for otps
CREATE POLICY "OTPs are managed by system" ON public.otps
FOR ALL USING (true);

-- Create RLS policies for vendor_reviews
CREATE POLICY "Anyone can view verified reviews" ON public.vendor_reviews
FOR SELECT USING (is_verified = true);

CREATE POLICY "Users can create reviews" ON public.vendor_reviews
FOR INSERT WITH CHECK (customer_id = auth.uid());

CREATE POLICY "Users can update their own reviews" ON public.vendor_reviews
FOR UPDATE USING (customer_id = auth.uid());

-- Create RLS policies for chat_history
CREATE POLICY "Users can view their own chat history" ON public.chat_history
FOR SELECT USING (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Users can create chat history" ON public.chat_history
FOR INSERT WITH CHECK (user_id = auth.uid() OR user_id IS NULL);

-- Create RLS policies for notifications
CREATE POLICY "Users can view their own notifications" ON public.notifications
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications" ON public.notifications
FOR UPDATE USING (user_id = auth.uid());

-- Create RLS policies for commission_settings (admin only)
CREATE POLICY "Anyone can view commission settings" ON public.commission_settings
FOR SELECT USING (true);

CREATE POLICY "Only system can manage commission settings" ON public.commission_settings
FOR ALL USING (true);

-- Insert default commission settings
INSERT INTO public.commission_settings (vendor_category, commission_percentage) VALUES
('Photography', 10.00),
('Catering', 8.00),
('Decoration', 12.00),
('DJ & Music', 15.00),
('Priest', 5.00),
('Transport', 10.00);

-- Update existing tables with missing fields
ALTER TABLE public.vendors ADD COLUMN IF NOT EXISTS total_bookings INTEGER DEFAULT 0;
ALTER TABLE public.vendors ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE public.vendors ADD COLUMN IF NOT EXISTS speciality TEXT[];
ALTER TABLE public.vendors ADD COLUMN IF NOT EXISTS city TEXT;

-- Update profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS rating DECIMAL(3,2) DEFAULT 0.00;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS total_bookings INTEGER DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_approved BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_online BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- Update bookings table
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending';
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS booking_expires_at TIMESTAMPTZ;

-- Update payments table
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'INR';
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS razorpay_order_id TEXT;
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS razorpay_payment_id TEXT;
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS razorpay_signature TEXT;
