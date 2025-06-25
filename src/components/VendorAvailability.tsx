
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { format, addDays } from "date-fns";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

interface VendorAvailabilityProps {
  vendorId: string;
}

interface AvailabilitySlot {
  id: string;
  vendor_id: string;
  date: string;
  time_slots: string[] | null;
  is_available: boolean;
  created_at: string;
}

const VendorAvailability = ({ vendorId }: VendorAvailabilityProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const { data: availability, isLoading } = useQuery({
    queryKey: ['vendor-availability', vendorId],
    queryFn: async () => {
      const startDate = new Date();
      const endDate = addDays(startDate, 30); // Get availability for next 30 days

      const { data, error } = await supabase
        .from('vendor_availability')
        .select('*')
        .eq('vendor_id', vendorId)
        .gte('date', format(startDate, 'yyyy-MM-dd'))
        .lte('date', format(endDate, 'yyyy-MM-dd'))
        .order('date');

      if (error) {
        throw error;
      }

      return data as AvailabilitySlot[];
    },
    enabled: !!vendorId,
  });

  const getAvailabilityForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return availability?.find(slot => slot.date === dateStr);
  };

  const selectedDateAvailability = selectedDate ? getAvailabilityForDate(selectedDate) : null;

  const availableDates = availability?.filter(slot => slot.is_available).map(slot => new Date(slot.date)) || [];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Availability Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading availability...</span>
          </div>
        ) : (
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
                  available: availableDates,
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

              {selectedDate && selectedDateAvailability ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    {selectedDateAvailability.is_available ? (
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

                  {selectedDateAvailability.is_available && selectedDateAvailability.time_slots && (
                    <div>
                      <p className="font-medium mb-2">Available Time Slots:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedDateAvailability.time_slots.map((slot, index) => (
                          <Badge key={index} variant="outline" className="px-3 py-1">
                            {slot}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : selectedDate && !selectedDateAvailability ? (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <Badge className="bg-green-500">Available (No specific slots)</Badge>
                </div>
              ) : null}

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
        )}
      </CardContent>
    </Card>
  );
};

export default VendorAvailability;
