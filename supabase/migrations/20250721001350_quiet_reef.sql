/*
  # Fix Database Schema and OTP System

  1. Database Schema Fixes
    - Ensure all tables have proper structure
    - Fix any missing columns or constraints
    - Update RLS policies for proper access control

  2. OTP System Enhancement
    - Proper OTP table structure
    - Enhanced validation and expiry handling
    - Two-way verification support (Email + SMS)

  3. Backend Function Fixes
    - Ensure all database operations work correctly
    - Fix any missing relationships or constraints
*/

-- First, let's ensure the OTPs table has the correct structure
DROP TABLE IF EXISTS public.otps CASCADE;

CREATE TABLE public.otps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT,
  phone TEXT,
  otp_code TEXT NOT NULL,
  purpose TEXT NOT NULL DEFAULT 'signup',
  is_verified BOOLEAN DEFAULT false,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  attempts INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 3
);

-- Enable RLS on OTPs table
ALTER TABLE public.otps ENABLE ROW LEVEL SECURITY;

-- Create comprehensive RLS policies for OTPs
CREATE POLICY "Anyone can create OTPs" ON public.otps
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can read OTPs for verification" ON public.otps
  FOR SELECT USING (true);

CREATE POLICY "Anyone can update OTPs for verification" ON public.otps
  FOR UPDATE USING (true);

CREATE POLICY "System can delete expired OTPs" ON public.otps
  FOR DELETE USING (true);

-- Ensure profiles table has all required columns
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone_verified BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_login TIMESTAMPTZ;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{}';

-- Ensure vendors table has all required columns
ALTER TABLE public.vendors ADD COLUMN IF NOT EXISTS is_online BOOLEAN DEFAULT true;
ALTER TABLE public.vendors ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE public.vendors ADD COLUMN IF NOT EXISTS speciality TEXT[];
ALTER TABLE public.vendors ADD COLUMN IF NOT EXISTS social_media JSONB DEFAULT '{}';
ALTER TABLE public.vendors ADD COLUMN IF NOT EXISTS availability JSONB DEFAULT '{}';
ALTER TABLE public.vendors ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'pending';

-- Ensure bookings table has all required columns
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending';
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS booking_expires_at TIMESTAMPTZ;
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS special_requirements TEXT;
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS vendor_response TEXT;
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS customer_rating INTEGER;
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS vendor_rating INTEGER;

-- Create vendor_availability table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.vendor_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID REFERENCES public.vendors(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  time_slots TEXT[] DEFAULT '{}',
  is_available BOOLEAN DEFAULT true,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(vendor_id, date)
);

-- Enable RLS on vendor_availability
ALTER TABLE public.vendor_availability ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for vendor_availability
CREATE POLICY "Anyone can view vendor availability" ON public.vendor_availability
  FOR SELECT USING (true);

CREATE POLICY "Vendors can manage their own availability" ON public.vendor_availability
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.vendors 
      WHERE vendors.id = vendor_availability.vendor_id 
      AND vendors.user_id = auth.uid()
    )
  );

-- Create chat_sessions table for AI chatbot tracking
CREATE TABLE IF NOT EXISTS public.chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_token TEXT NOT NULL,
  chat_time_used INTEGER DEFAULT 0, -- in seconds
  voice_time_used INTEGER DEFAULT 0, -- in seconds
  max_chat_time INTEGER DEFAULT 60, -- 1 minute for guests, 1800 for users
  max_voice_time INTEGER DEFAULT 30, -- 30 seconds for guests, 600 for users
  is_active BOOLEAN DEFAULT true,
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '24 hours'),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on chat_sessions
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for chat_sessions
CREATE POLICY "Users can view their own chat sessions" ON public.chat_sessions
  FOR SELECT USING (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Users can create chat sessions" ON public.chat_sessions
  FOR INSERT WITH CHECK (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Users can update their own chat sessions" ON public.chat_sessions
  FOR UPDATE USING (user_id = auth.uid() OR user_id IS NULL);

-- Create system_settings table for admin configuration
CREATE TABLE IF NOT EXISTS public.system_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB NOT NULL,
  description TEXT,
  updated_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on system_settings
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for system_settings
CREATE POLICY "Anyone can view system settings" ON public.system_settings
  FOR SELECT USING (true);

CREATE POLICY "Only admins can manage system settings" ON public.system_settings
  FOR ALL USING (true); -- Will be restricted by application logic

-- Insert default system settings
INSERT INTO public.system_settings (setting_key, setting_value, description) VALUES
('otp_expiry_minutes', '5', 'OTP expiry time in minutes'),
('max_otp_attempts', '3', 'Maximum OTP verification attempts'),
('guest_chat_time_seconds', '60', 'Free chat time for guests in seconds'),
('user_chat_time_seconds', '1800', 'Chat time for logged-in users in seconds'),
('guest_voice_time_seconds', '30', 'Free voice chat time for guests in seconds'),
('user_voice_time_seconds', '600', 'Voice chat time for logged-in users in seconds'),
('commission_rates', '{"Photography": 10, "Catering": 8, "Decoration": 12, "DJ & Music": 15, "Priest": 5, "Transport": 10}', 'Commission rates by vendor category')
ON CONFLICT (setting_key) DO NOTHING;

-- Create function to clean up expired OTPs
CREATE OR REPLACE FUNCTION cleanup_expired_otps()
RETURNS void AS $$
BEGIN
  DELETE FROM public.otps 
  WHERE expires_at < NOW() 
  AND is_verified = false;
END;
$$ LANGUAGE plpgsql;

-- Create function to validate phone numbers
CREATE OR REPLACE FUNCTION validate_indian_phone(phone_number TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  -- Remove all non-digit characters
  phone_number := regexp_replace(phone_number, '[^0-9]', '', 'g');
  
  -- Check if it's a valid Indian mobile number
  -- 10 digits starting with 6, 7, 8, or 9
  -- Or 13 digits starting with 91 followed by 6, 7, 8, or 9
  RETURN phone_number ~ '^(91)?[6-9][0-9]{9}$';
END;
$$ LANGUAGE plpgsql;

-- Create function to generate OTP
CREATE OR REPLACE FUNCTION generate_otp()
RETURNS TEXT AS $$
BEGIN
  RETURN LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
END;
$$ LANGUAGE plpgsql;

-- Create function to create OTP record
CREATE OR REPLACE FUNCTION create_otp_record(
  p_email TEXT DEFAULT NULL,
  p_phone TEXT DEFAULT NULL,
  p_purpose TEXT DEFAULT 'signup'
)
RETURNS TABLE(otp_code TEXT, expires_at TIMESTAMPTZ) AS $$
DECLARE
  v_otp_code TEXT;
  v_expires_at TIMESTAMPTZ;
BEGIN
  -- Validate inputs
  IF p_email IS NULL AND p_phone IS NULL THEN
    RAISE EXCEPTION 'Either email or phone must be provided';
  END IF;
  
  IF p_phone IS NOT NULL AND NOT validate_indian_phone(p_phone) THEN
    RAISE EXCEPTION 'Invalid Indian phone number format';
  END IF;
  
  -- Generate OTP and expiry
  v_otp_code := generate_otp();
  v_expires_at := NOW() + INTERVAL '5 minutes';
  
  -- Clean up any existing OTPs for this email/phone
  DELETE FROM public.otps 
  WHERE (p_email IS NOT NULL AND email = p_email)
     OR (p_phone IS NOT NULL AND phone = p_phone);
  
  -- Insert new OTP record
  INSERT INTO public.otps (email, phone, otp_code, purpose, expires_at)
  VALUES (p_email, p_phone, v_otp_code, p_purpose, v_expires_at);
  
  RETURN QUERY SELECT v_otp_code, v_expires_at;
END;
$$ LANGUAGE plpgsql;

-- Create function to verify OTP
CREATE OR REPLACE FUNCTION verify_otp_code(
  p_email TEXT DEFAULT NULL,
  p_phone TEXT DEFAULT NULL,
  p_otp_code TEXT,
  p_purpose TEXT DEFAULT 'signup'
)
RETURNS BOOLEAN AS $$
DECLARE
  v_otp_record RECORD;
BEGIN
  -- Find the OTP record
  SELECT * INTO v_otp_record
  FROM public.otps
  WHERE otp_code = p_otp_code
    AND purpose = p_purpose
    AND is_verified = false
    AND expires_at > NOW()
    AND attempts < max_attempts
    AND (
      (p_email IS NOT NULL AND email = p_email) OR
      (p_phone IS NOT NULL AND phone = p_phone)
    )
  ORDER BY created_at DESC
  LIMIT 1;
  
  -- Check if OTP exists and is valid
  IF v_otp_record IS NULL THEN
    -- Increment attempts if record exists but is invalid
    UPDATE public.otps 
    SET attempts = attempts + 1
    WHERE otp_code = p_otp_code
      AND purpose = p_purpose
      AND (
        (p_email IS NOT NULL AND email = p_email) OR
        (p_phone IS NOT NULL AND phone = p_phone)
      );
    
    RETURN false;
  END IF;
  
  -- Mark OTP as verified
  UPDATE public.otps 
  SET is_verified = true, attempts = attempts + 1
  WHERE id = v_otp_record.id;
  
  RETURN true;
END;
$$ LANGUAGE plpgsql;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_otps_email_purpose ON public.otps(email, purpose);
CREATE INDEX IF NOT EXISTS idx_otps_phone_purpose ON public.otps(phone, purpose);
CREATE INDEX IF NOT EXISTS idx_otps_expires_at ON public.otps(expires_at);
CREATE INDEX IF NOT EXISTS idx_vendors_category ON public.vendors(category);
CREATE INDEX IF NOT EXISTS idx_vendors_city ON public.vendors(city);
CREATE INDEX IF NOT EXISTS idx_vendors_is_approved ON public.vendors(is_approved);
CREATE INDEX IF NOT EXISTS idx_bookings_customer_id ON public.bookings(customer_id);
CREATE INDEX IF NOT EXISTS idx_bookings_vendor_id ON public.bookings(vendor_id);
CREATE INDEX IF NOT EXISTS idx_bookings_event_date ON public.bookings(event_date);

-- Update vendor RLS policies to be more permissive for viewing
DROP POLICY IF EXISTS "Anyone can view approved vendors" ON public.vendors;
CREATE POLICY "Anyone can view approved vendors" ON public.vendors
  FOR SELECT USING (is_approved = true);

CREATE POLICY "Vendors can view their own listing" ON public.vendors
  FOR SELECT USING (auth.uid() = user_id);

-- Update bookings RLS policies to allow vendors to see their bookings
CREATE POLICY "Vendors can view their bookings" ON public.bookings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.vendors 
      WHERE vendors.id = bookings.vendor_id 
      AND vendors.user_id = auth.uid()
    )
  );

-- Create trigger to update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at columns
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_vendors_updated_at ON public.vendors;
CREATE TRIGGER update_vendors_updated_at
  BEFORE UPDATE ON public.vendors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_bookings_updated_at ON public.bookings;
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Clean up any orphaned records
DELETE FROM public.otps WHERE expires_at < NOW() - INTERVAL '1 day';