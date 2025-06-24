
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Calendar, Users, Crown } from "lucide-react";
import { Link } from "react-router-dom";

interface Event {
  id: string;
  title: string;
  image: string;
  price: string;
  originalPrice?: string;
  location: string;
  date: string;
  attendees: string;
  rating: number;
  reviews: number;
  category: string;
  featured?: boolean;
}

interface EventGridProps {
  events: Event[];
  title?: string;
  showFilters?: boolean;
}

const EventGrid = ({ events, title = "Featured Events", showFilters = true }: EventGridProps) => {
  const categories = ["All", "Wedding", "Corporate", "Birthday", "Anniversary", "Baby Shower", "Engagement"];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
            {title}
          </span>
        </h2>
        
        {showFilters && (
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                {category}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
            <div className="relative overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Badges */}
              <div className="absolute top-3 left-3">
                <Badge className="bg-blue-600 text-white px-2 py-1 text-xs">
                  {event.category}
                </Badge>
              </div>
              
              {event.featured && (
                <div className="absolute top-3 right-3">
                  <Badge className="bg-gradient-to-r from-amber-400 to-amber-600 text-white px-2 py-1 text-xs">
                    <Crown className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                </div>
              )}

              {/* Price Overlay */}
              <div className="absolute bottom-3 left-3">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-blue-600">{event.price}</span>
                    {event.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">{event.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < event.rating ? 'text-amber-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">({event.reviews})</span>
                </div>
              </div>

              <h3 className="font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                {event.title}
              </h3>

              <div className="space-y-2 text-xs text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{event.attendees} guests</span>
                </div>
              </div>

              <Link to={`/event/${event.id}`}>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 text-white text-sm">
                  View Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventGrid;
