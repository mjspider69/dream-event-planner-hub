
-- Create vendor_earnings table
CREATE TABLE public.vendor_earnings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID REFERENCES public.vendors(id) ON DELETE CASCADE NOT NULL,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  commission_amount DECIMAL(10,2) NOT NULL,
  commission_rate DECIMAL(5,4) NOT NULL,
  net_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on vendor_earnings
ALTER TABLE public.vendor_earnings ENABLE ROW LEVEL SECURITY;

-- Create policies for vendor_earnings
CREATE POLICY "Vendors can view their own earnings" ON public.vendor_earnings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.vendors 
      WHERE vendors.id = vendor_earnings.vendor_id 
      AND vendors.user_id = auth.uid()
    )
  );

CREATE POLICY "System can create earnings" ON public.vendor_earnings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "System can update earnings" ON public.vendor_earnings
  FOR UPDATE USING (true);
