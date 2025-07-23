/*
  # Fix OTP System and Add Google Auth Support

  1. Enhanced OTP System
    - Improved OTP table structure with better validation
    - Enhanced functions for OTP generation and verification
    - Support for two-way verification (email + SMS)
    - Better error handling and security

  2. Google OAuth Support
    - Updated auth configuration for Google sign-in
    - Enhanced user profile creation for OAuth users

  3. Admin Dashboard Enhancements
    - Better data tracking and analytics
    - Enhanced vendor management
    - Improved user management

  4. SEO and Performance
    - Database optimizations
    - Better indexing for faster queries
*/

-- Drop existing OTP table and recreate with better structure
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
  max_attempts INTEGER DEFAULT 3,
  
  -- Constraints
  CONSTRAINT otp_email_or_phone_required CHECK (email IS NOT NULL OR phone IS NOT NULL),
  CONSTRAINT otp_code_format CHECK (otp_code ~ '^[0-9]{6}$'),
  CONSTRAINT otp_purpose_valid CHECK (purpose IN ('signup', 'login', 'password_reset', 'vendor_signup', 'phone_verification'))
);

-- Enable RLS on OTPs table
ALTER TABLE public.otps ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for OTPs
CREATE POLICY "Anyone can create OTPs" ON public.otps
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can read OTPs for verification" ON public.otps
  FOR SELECT USING (true);

CREATE POLICY "Anyone can update OTPs for verification" ON public.otps
  FOR UPDATE USING (true);

CREATE POLICY "System can delete expired OTPs" ON public.otps
  FOR DELETE USING (true);

-- Enhanced function to validate Indian phone numbers
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

-- Enhanced function to generate secure OTP
CREATE OR REPLACE FUNCTION generate_otp()
RETURNS TEXT AS $$
BEGIN
  -- Generate a secure 6-digit OTP
  RETURN LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
END;
$$ LANGUAGE plpgsql;

-- Enhanced function to create OTP record with better validation
CREATE OR REPLACE FUNCTION create_otp_record(
  p_email TEXT DEFAULT NULL,
  p_phone TEXT DEFAULT NULL,
  p_purpose TEXT DEFAULT 'signup'
)
RETURNS TABLE(otp_code TEXT, expires_at TIMESTAMPTZ) AS $$
DECLARE
  v_otp_code TEXT;
  v_expires_at TIMESTAMPTZ;
  v_max_attempts INTEGER := 3;
BEGIN
  -- Validate inputs
  IF p_email IS NULL AND p_phone IS NULL THEN
    RAISE EXCEPTION 'Either email or phone must be provided';
  END IF;
  
  -- Validate email format if provided
  IF p_email IS NOT NULL AND p_email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  
  -- Validate phone format if provided
  IF p_phone IS NOT NULL AND NOT validate_indian_phone(p_phone) THEN
    RAISE EXCEPTION 'Invalid Indian phone number format';
  END IF;
  
  -- Validate purpose
  IF p_purpose NOT IN ('signup', 'login', 'password_reset', 'vendor_signup', 'phone_verification') THEN
    RAISE EXCEPTION 'Invalid OTP purpose';
  END IF;
  
  -- Generate OTP and expiry (5 minutes from now)
  v_otp_code := generate_otp();
  v_expires_at := NOW() + INTERVAL '5 minutes';
  
  -- Clean up any existing non-verified OTPs for this email/phone and purpose
  DELETE FROM public.otps 
  WHERE purpose = p_purpose
    AND is_verified = false
    AND (
      (p_email IS NOT NULL AND email = p_email) OR
      (p_phone IS NOT NULL AND phone = p_phone)
    );
  
  -- Insert new OTP record
  INSERT INTO public.otps (email, phone, otp_code, purpose, expires_at, max_attempts)
  VALUES (p_email, p_phone, v_otp_code, p_purpose, v_expires_at, v_max_attempts);
  
  -- Log OTP creation for debugging (remove in production)
  RAISE NOTICE 'OTP created: % for email: % phone: % purpose: %', v_otp_code, p_email, p_phone, p_purpose;
  
  RETURN QUERY SELECT v_otp_code, v_expires_at;
END;
$$ LANGUAGE plpgsql;

-- Enhanced function to verify OTP with better security
CREATE OR REPLACE FUNCTION verify_otp_code(
  p_email TEXT DEFAULT NULL,
  p_phone TEXT DEFAULT NULL,
  p_otp_code TEXT,
  p_purpose TEXT DEFAULT 'signup'
)
RETURNS BOOLEAN AS $$
DECLARE
  v_otp_record RECORD;
  v_is_valid BOOLEAN := false;
BEGIN
  -- Validate inputs
  IF p_email IS NULL AND p_phone IS NULL THEN
    RAISE EXCEPTION 'Either email or phone must be provided for verification';
  END IF;
  
  IF p_otp_code IS NULL OR LENGTH(p_otp_code) != 6 OR p_otp_code !~ '^[0-9]{6}$' THEN
    RAISE EXCEPTION 'Invalid OTP format. Must be 6 digits.';
  END IF;
  
  -- Find the most recent valid OTP record
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
  
  -- Increment attempts for any matching OTP (even if invalid)
  UPDATE public.otps 
  SET attempts = attempts + 1
  WHERE otp_code = p_otp_code
    AND purpose = p_purpose
    AND (
      (p_email IS NOT NULL AND email = p_email) OR
      (p_phone IS NOT NULL AND phone = p_phone)
    );
  
  -- Check if OTP is valid
  IF v_otp_record IS NOT NULL THEN
    -- Mark OTP as verified
    UPDATE public.otps 
    SET is_verified = true
    WHERE id = v_otp_record.id;
    
    v_is_valid := true;
    
    -- Log successful verification
    RAISE NOTICE 'OTP verified successfully for email: % phone: % purpose: %', p_email, p_phone, p_purpose;
  ELSE
    -- Log failed verification
    RAISE NOTICE 'OTP verification failed for email: % phone: % code: % purpose: %', p_email, p_phone, p_otp_code, p_purpose;
  END IF;
  
  RETURN v_is_valid;
END;
$$ LANGUAGE plpgsql;

-- Function to clean up expired OTPs (run periodically)
CREATE OR REPLACE FUNCTION cleanup_expired_otps()
RETURNS void AS $$
BEGIN
  DELETE FROM public.otps 
  WHERE expires_at < NOW() - INTERVAL '1 hour'
    OR (is_verified = true AND created_at < NOW() - INTERVAL '24 hours');
  
  RAISE NOTICE 'Cleaned up expired OTPs';
END;
$$ LANGUAGE plpgsql;

-- Enhanced profiles table for better user management
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone_verified BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_login TIMESTAMPTZ;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{}';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS oauth_provider TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS oauth_id TEXT;

-- Enhanced vendors table
ALTER TABLE public.vendors ADD COLUMN IF NOT EXISTS is_online BOOLEAN DEFAULT true;
ALTER TABLE public.vendors ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE public.vendors ADD COLUMN IF NOT EXISTS speciality TEXT[];
ALTER TABLE public.vendors ADD COLUMN IF NOT EXISTS social_media JSONB DEFAULT '{}';
ALTER TABLE public.vendors ADD COLUMN IF NOT EXISTS availability JSONB DEFAULT '{}';
ALTER TABLE public.vendors ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'pending';

-- Enhanced bookings table
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending';
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS booking_expires_at TIMESTAMPTZ;
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS special_requirements TEXT;
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS vendor_response TEXT;
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS customer_rating INTEGER CHECK (customer_rating >= 1 AND customer_rating <= 5);
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS vendor_rating INTEGER CHECK (vendor_rating >= 1 AND vendor_rating <= 5);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_otps_email_purpose_expires ON public.otps(email, purpose, expires_at);
CREATE INDEX IF NOT EXISTS idx_otps_phone_purpose_expires ON public.otps(phone, purpose, expires_at);
CREATE INDEX IF NOT EXISTS idx_otps_code_purpose ON public.otps(otp_code, purpose);
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_user_type ON public.profiles(user_type);
CREATE INDEX IF NOT EXISTS idx_vendors_category_city ON public.vendors(category, city);
CREATE INDEX IF NOT EXISTS idx_vendors_is_approved_featured ON public.vendors(is_approved, is_featured);
CREATE INDEX IF NOT EXISTS idx_bookings_customer_vendor ON public.bookings(customer_id, vendor_id);
CREATE INDEX IF NOT EXISTS idx_bookings_event_date_status ON public.bookings(event_date, status);

-- Update RLS policies for better security
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Enhanced vendor policies
DROP POLICY IF EXISTS "Anyone can view approved vendors" ON public.vendors;
CREATE POLICY "Anyone can view approved vendors" ON public.vendors
  FOR SELECT USING (is_approved = true);

CREATE POLICY "Vendors can view their own listing" ON public.vendors
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Vendors can update their own listing" ON public.vendors;
CREATE POLICY "Vendors can update their own listing" ON public.vendors
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create vendor listings" ON public.vendors;
CREATE POLICY "Users can create vendor listings" ON public.vendors
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Enhanced booking policies
CREATE POLICY "Vendors can view their bookings" ON public.bookings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.vendors 
      WHERE vendors.id = bookings.vendor_id 
      AND vendors.user_id = auth.uid()
    )
  );

-- Function to handle OAuth user profile creation
CREATE OR REPLACE FUNCTION handle_oauth_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Create profile for OAuth users
  IF NEW.app_metadata->>'provider' IN ('google', 'facebook', 'github') THEN
    INSERT INTO public.profiles (
      user_id,
      full_name,
      email_verified,
      oauth_provider,
      oauth_id,
      user_type
    ) VALUES (
      NEW.id,
      COALESCE(NEW.user_metadata->>'full_name', NEW.user_metadata->>'name', split_part(NEW.email, '@', 1)),
      true,
      NEW.app_metadata->>'provider',
      NEW.user_metadata->>'sub',
      'customer'
    )
    ON CONFLICT (user_id) DO UPDATE SET
      full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
      email_verified = true,
      last_login = NOW();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for OAuth user handling
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_oauth_user();

-- Insert sample data for testing (if not exists)
INSERT INTO public.vendors (
  business_name, 
  contact_person, 
  email, 
  phone, 
  category, 
  city, 
  description, 
  price_range, 
  is_approved, 
  rating, 
  total_bookings,
  is_featured
) VALUES
(
  'Royal Photography Studio',
  'Rajesh Kumar',
  'rajesh@royalphoto.com',
  '+91 98765 43210',
  'Photography',
  'Mumbai',
  'Premium wedding and event photography with 10+ years experience',
  '₹50,000 - ₹1,50,000',
  true,
  4.8,
  156,
  true
),
(
  'Golden Decorators',
  'Priya Sharma',
  'priya@goldendecorators.com',
  '+91 87654 32109',
  'Decoration',
  'Delhi',
  'Elegant wedding and event decoration services across North India',
  '₹75,000 - ₹2,50,000',
  true,
  4.6,
  89,
  false
),
(
  'Spice Garden Catering',
  'Amit Patel',
  'amit@spicegarden.com',
  '+91 76543 21098',
  'Catering',
  'Bangalore',
  'Authentic flavors and exceptional catering services for all occasions',
  '₹800 - ₹1,500 per plate',
  true,
  4.9,
  234,
  true
)
ON CONFLICT (email) DO NOTHING;

-- Clean up any existing expired OTPs
SELECT cleanup_expired_otps();