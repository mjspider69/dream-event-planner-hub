
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const VendorAvailabilityTab = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Availability Calendar</h2>
      <Card>
        <CardContent className="p-12 text-center">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Calendar Coming Soon</h3>
          <p className="text-gray-600">Manage your availability and blocked dates.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorAvailabilityTab;
