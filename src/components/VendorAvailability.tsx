
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { format, addDays } from "date-fns";
import { CheckCircle, XCircle } from "lucide-react";

interface VendorAvailabilityProps {
  vendorId: string;
}

const VendorAvailability = ({ vendorId }: VendorAvailabilityProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // For now, we'll show a simplified availability calendar
  // This will be enhanced once the vendor_availability table is available in types
  const mockAvailability = {
    availableDates: [
      new Date(),
      addDays(new Date(), 1),
      addDays(new Date(), 3),
      addDays(new Date(), 5),
      addDays(new Date(), 7),
    ],
    timeSlots: ['10:00 AM', '2:00 PM', '6:00 PM'],
  };

  const isDateAvailable = (date: Date) => {
    return mockAvailability.availableDates.some(
      availableDate => format(availableDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  const selectedDateAvailable = selectedDate ? isDateAvailable(selectedDate) : false;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Availability Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date < today;
              }}
              modifiers={{
                available: mockAvailability.availableDates,
              }}
              modifiersStyles={{
                available: {
                  backgroundColor: '#10b981',
                  color: 'white',
                },
              }}
              className="rounded-md border"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : 'Select a date'}
            </h3>

            {selectedDate && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  {selectedDateAvailable ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <Badge className="bg-green-500">Available</Badge>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-red-500" />
                      <Badge variant="destructive">Not Available</Badge>
                    </>
                  )}
                </div>

                {selectedDateAvailable && (
                  <div>
                    <p className="font-medium mb-2">Available Time Slots:</p>
                    <div className="flex flex-wrap gap-2">
                      {mockAvailability.timeSlots.map((slot, index) => (
                        <Badge key={index} variant="outline" className="px-3 py-1">
                          {slot}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Legend:</h4>
              <div className="space-y-1 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>Available dates</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-300 rounded"></div>
                  <span>Regular dates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorAvailability;
