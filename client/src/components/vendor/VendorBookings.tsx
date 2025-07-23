
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MessageCircle } from "lucide-react";

interface Booking {
  id: string;
  event_type: string;
  event_location: string;
  event_date: string;
  status: string;
  guest_count: number;
  budget: number;
}

interface VendorBookingsProps {
  bookings: Booking[];
}

const VendorBookings = ({ bookings }: VendorBookingsProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Bookings</h2>
        <Badge variant="outline">
          {bookings.length} Total Bookings
        </Badge>
      </div>

      {bookings.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-gray-600">Your bookings will appear here when customers book your services.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <Card key={booking.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{booking.event_type}</h3>
                    <p className="text-gray-600">{booking.event_location}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(booking.event_date).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Guests: {booking.guest_count} | Budget: ₹{booking.budget?.toLocaleString()}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Chat
                    </Button>
                    {booking.status === 'pending' && (
                      <Button size="sm" className="bg-gradient-to-r from-amber-500 to-orange-500">
                        Accept
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorBookings;
