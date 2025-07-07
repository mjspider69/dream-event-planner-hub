
import { Card, CardContent } from "@/components/ui/card";
import { 
  DollarSign, 
  UserCheck,
  Calendar, 
  Users, 
  Star
} from "lucide-react";

interface VendorStatsProps {
  totalEarnings: number;
  clientSelections: number;
  pendingBookings: number;
  completedBookings: number;
  rating: number;
}

const VendorStats = ({ 
  totalEarnings, 
  clientSelections, 
  pendingBookings, 
  completedBookings, 
  rating 
}: VendorStatsProps) => {
  return (
    <div className="grid md:grid-cols-5 gap-6 mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Earnings</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{totalEarnings.toLocaleString()}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Clients Selected</p>
              <p className="text-2xl font-bold text-blue-600">{clientSelections}</p>
            </div>
            <UserCheck className="h-8 w-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Bookings</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingBookings}</p>
            </div>
            <Calendar className="h-8 w-8 text-yellow-500" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed Events</p>
              <p className="text-2xl font-bold text-purple-600">{completedBookings}</p>
            </div>
            <Users className="h-8 w-8 text-purple-500" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rating</p>
              <p className="text-2xl font-bold text-amber-600">
                {rating ? Number(rating).toFixed(1) : '0.0'}
              </p>
            </div>
            <Star className="h-8 w-8 text-amber-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorStats;
