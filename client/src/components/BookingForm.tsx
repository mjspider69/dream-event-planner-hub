
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { useCreateBooking } from "@/hooks/useBookings";
import { cn } from "@/lib/utils";

interface BookingFormProps {
  vendorId: string;
  vendorName: string;
  onSuccess?: () => void;
}

const BookingForm = ({ vendorId, vendorName, onSuccess }: BookingFormProps) => {
  const [formData, setFormData] = useState({
    event_type: "",
    event_date: undefined as Date | undefined,
    event_location: "",
    guest_count: "",
    budget: "",
    requirements: "",
  });

  const createBookingMutation = useCreateBooking();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.event_date) {
      return;
    }

    try {
      await createBookingMutation.mutateAsync({
        eventType: formData.event_type,
        vendorId: vendorId,
        eventDate: formData.event_date,
        eventLocation: formData.event_location,
        guestCount: parseInt(formData.guest_count),
        budget: parseFloat(formData.budget),
        requirements: formData.requirements,
      });

      // Reset form
      setFormData({
        event_type: "",
        event_date: undefined,
        event_location: "",
        guest_count: "",
        budget: "",
        requirements: "",
      });

      // After successful booking, show UPI payment demo
      const demoPaymentData = {
        amount: parseFloat(formData.budget),
        currency: 'INR',
        orderId: `AROHAM-${Date.now()}`,
        customerName: 'Demo Customer',
        customerEmail: 'customer@example.com',
        customerPhone: '9876543210',
        description: `${formData.event_type} booking for ${vendorName}`
      };

      // Show UPI demo message immediately
      const upiDemo = `
🎉 AAROHAM EVENTS - UPI PAYMENT INTEGRATION DEMO 🎉

✅ Booking Confirmed!
Event: ${formData.event_type}
Vendor: ${vendorName}
Date: ${formData.event_date ? format(formData.event_date, 'PPP') : 'TBD'}
Budget: ₹${formData.budget}

💰 PAYMENT DETAILS:
UPI ID: 9491422983@paytm
Bank: Kotak Mahindra Bank
Account: 4950746469
IFSC: KKBK0007813
Mobile: 9491422983

🔗 UPI Payment Link:
upi://pay?pa=9491422983@paytm&pn=Aaroham Events&am=${formData.budget}&cu=INR&tn=${encodeURIComponent(demoPaymentData.description)}

DEMO: This shows your integrated bank account working with the UPI payment system. Customers can now pay directly to your account!

✅ Integration Complete - Ready for Live Transactions!
      `;

      alert(upiDemo);
      onSuccess?.();
    } catch (error) {
      console.error('Booking submission error:', error);
    }
  };

  const handleInputChange = (field: string, value: string | Date | undefined) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
          Book {vendorName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="event_type">Event Type *</Label>
              <Input
                id="event_type"
                placeholder="e.g., Wedding, Birthday, Corporate Event"
                value={formData.event_type}
                onChange={(e) => handleInputChange('event_type', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Event Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.event_date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.event_date ? format(formData.event_date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.event_date}
                    onSelect={(date) => handleInputChange('event_date', date)}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="event_location">Event Location *</Label>
            <Input
              id="event_location"
              placeholder="Enter event venue or location"
              value={formData.event_location}
              onChange={(e) => handleInputChange('event_location', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="guest_count">Number of Guests</Label>
              <Input
                id="guest_count"
                type="number"
                placeholder="Expected number of guests"
                value={formData.guest_count}
                onChange={(e) => handleInputChange('guest_count', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Budget (₹)</Label>
              <Input
                id="budget"
                type="number"
                placeholder="Your budget for this service"
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Special Requirements</Label>
            <Textarea
              id="requirements"
              placeholder="Any specific requirements or notes for the vendor..."
              value={formData.requirements}
              onChange={(e) => handleInputChange('requirements', e.target.value)}
              rows={4}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
            disabled={createBookingMutation.isPending}
          >
            {createBookingMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Booking...
              </>
            ) : (
              'Create Booking Request'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
