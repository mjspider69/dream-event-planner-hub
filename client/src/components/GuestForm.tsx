
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Utensils, UserCheck, Phone } from "lucide-react";

interface GuestFormProps {
  onSubmit: (guestData: GuestData) => void;
  onSkip: () => void;
}

interface GuestData {
  totalGuests: number;
  ageBreakdown: {
    children: number;
    adults: number;
    seniors: number;
  };
  dietaryRestrictions: string;
  specialGuests: string;
  seatingPreferences: string;
  eventContact: {
    name: string;
    phone: string;
    relation: string;
  };
}

const GuestForm = ({ onSubmit, onSkip }: GuestFormProps) => {
  const [guestData, setGuestData] = useState<GuestData>({
    totalGuests: 0,
    ageBreakdown: {
      children: 0,
      adults: 0,
      seniors: 0
    },
    dietaryRestrictions: '',
    specialGuests: '',
    seatingPreferences: '',
    eventContact: {
      name: '',
      phone: '',
      relation: ''
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(guestData);
  };

  const updateAgeBreakdown = (category: keyof typeof guestData.ageBreakdown, value: number) => {
    setGuestData(prev => ({
      ...prev,
      ageBreakdown: {
        ...prev.ageBreakdown,
        [category]: value
      }
    }));
  };

  const updateEventContact = (field: keyof typeof guestData.eventContact, value: string) => {
    setGuestData(prev => ({
      ...prev,
      eventContact: {
        ...prev.eventContact,
        [field]: value
      }
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-2xl w-full bg-white shadow-2xl border-0 max-h-[90vh] overflow-y-auto">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Guest Information</CardTitle>
          <p className="text-gray-600">Help us make your event perfect with guest details (Optional)</p>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Guest Count */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                Guest Count & Age Breakdown
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Total Expected Guests</label>
                  <Input
                    type="number"
                    value={guestData.totalGuests || ''}
                    onChange={(e) => setGuestData(prev => ({ ...prev, totalGuests: parseInt(e.target.value) || 0 }))}
                    placeholder="Enter total count"
                  />
                </div>
                
                <div className="space-y-3">
                  <label className="block text-sm font-medium">Age Breakdown</label>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <Input
                        type="number"
                        placeholder="Children"
                        value={guestData.ageBreakdown.children || ''}
                        onChange={(e) => updateAgeBreakdown('children', parseInt(e.target.value) || 0)}
                        className="text-sm"
                      />
                      <label className="text-xs text-gray-500">0-12 years</label>
                    </div>
                    <div>
                      <Input
                        type="number"
                        placeholder="Adults"
                        value={guestData.ageBreakdown.adults || ''}
                        onChange={(e) => updateAgeBreakdown('adults', parseInt(e.target.value) || 0)}
                        className="text-sm"
                      />
                      <label className="text-xs text-gray-500">13-60 years</label>
                    </div>
                    <div>
                      <Input
                        type="number"
                        placeholder="Seniors"
                        value={guestData.ageBreakdown.seniors || ''}
                        onChange={(e) => updateAgeBreakdown('seniors', parseInt(e.target.value) || 0)}
                        className="text-sm"
                      />
                      <label className="text-xs text-gray-500">60+ years</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dietary Restrictions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Utensils className="h-5 w-5 mr-2 text-green-600" />
                Dietary Requirements
              </h3>
              
              <Textarea
                placeholder="Any dietary restrictions, allergies, or special food requirements for guests..."
                value={guestData.dietaryRestrictions}
                onChange={(e) => setGuestData(prev => ({ ...prev, dietaryRestrictions: e.target.value }))}
                rows={3}
              />
            </div>

            {/* Special Guests */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <UserCheck className="h-5 w-5 mr-2 text-purple-600" />
                Special Guests & Seating
              </h3>
              
              <div className="space-y-3">
                <Textarea
                  placeholder="VIP guests, elderly guests with special needs, or anyone requiring special attention..."
                  value={guestData.specialGuests}
                  onChange={(e) => setGuestData(prev => ({ ...prev, specialGuests: e.target.value }))}
                  rows={2}
                />
                
                <Textarea
                  placeholder="Seating preferences or special arrangements needed..."
                  value={guestData.seatingPreferences}
                  onChange={(e) => setGuestData(prev => ({ ...prev, seatingPreferences: e.target.value }))}
                  rows={2}
                />
              </div>
            </div>

            {/* Event Day Contact */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Phone className="h-5 w-5 mr-2 text-orange-600" />
                Event Day Point of Contact
              </h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                <Input
                  placeholder="Contact person name"
                  value={guestData.eventContact.name}
                  onChange={(e) => updateEventContact('name', e.target.value)}
                />
                <Input
                  type="tel"
                  placeholder="Phone number"
                  value={guestData.eventContact.phone}
                  onChange={(e) => updateEventContact('phone', e.target.value)}
                />
                <Select onValueChange={(value) => updateEventContact('relation', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Relation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="self">Myself</SelectItem>
                    <SelectItem value="family">Family Member</SelectItem>
                    <SelectItem value="friend">Friend</SelectItem>
                    <SelectItem value="coordinator">Event Coordinator</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-6">
              <Button 
                type="button"
                variant="outline" 
                onClick={onSkip}
                className="flex-1"
              >
                Skip for Now
              </Button>
              <Button 
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
              >
                Save Guest Information
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              This information helps vendors prepare better for your event. You can update this anytime from your dashboard.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuestForm;
