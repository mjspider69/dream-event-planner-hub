
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, Star, DollarSign, X } from "lucide-react";

interface FilterOptions {
  category: string[];
  location: string;
  budget: string;
  rating: number;
  availability: string;
}

const VendorFilter = ({ 
  onFilterChange, 
  totalResults = 0 
}: { 
  onFilterChange: (filters: FilterOptions) => void;
  totalResults?: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    category: [],
    location: '',
    budget: '',
    rating: 0,
    availability: ''
  });

  const categories = [
    "Photography", "Videography", "Decoration", "Catering", 
    "Music & DJ", "Transportation", "Venue", "Priest", "Gifts"
  ];

  const budgetRanges = [
    "Under ₹25,000", "₹25,000 - ₹50,000", "₹50,000 - ₹1,00,000", 
    "₹1,00,000 - ₹2,50,000", "Above ₹2,50,000"
  ];

  const cities = [
    "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", 
    "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Lucknow"
  ];

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleCategory = (category: string) => {
    const newCategories = filters.category.includes(category)
      ? filters.category.filter(c => c !== category)
      : [...filters.category, category];
    updateFilter('category', newCategories);
  };

  const clearFilters = () => {
    const emptyFilters = {
      category: [],
      location: '',
      budget: '',
      rating: 0,
      availability: ''
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const activeFiltersCount = 
    filters.category.length + 
    (filters.location ? 1 : 0) + 
    (filters.budget ? 1 : 0) + 
    (filters.rating > 0 ? 1 : 0) + 
    (filters.availability ? 1 : 0);

  return (
    <div className="space-y-4">
      {/* Search and Filter Header */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search vendors by name or service..."
            className="pl-10 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-blue-500"
          />
        </div>
        
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          className="border-2 border-blue-500 text-blue-600 rounded-full px-6 relative"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-amber-500 text-white min-w-6 h-6 rounded-full p-0 flex items-center justify-center">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {totalResults} vendors found
        </p>
        {activeFiltersCount > 0 && (
          <Button
            onClick={clearFilters}
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-700"
          >
            <X className="h-4 w-4 mr-1" />
            Clear all filters
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.category.map((cat) => (
            <Badge key={cat} className="bg-blue-100 text-blue-800 flex items-center">
              {cat}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => toggleCategory(cat)}
              />
            </Badge>
          ))}
          {filters.location && (
            <Badge className="bg-green-100 text-green-800 flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {filters.location}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => updateFilter('location', '')}
              />
            </Badge>
          )}
          {filters.budget && (
            <Badge className="bg-amber-100 text-amber-800 flex items-center">
              <DollarSign className="h-3 w-3 mr-1" />
              {filters.budget}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => updateFilter('budget', '')}
              />
            </Badge>
          )}
          {filters.rating > 0 && (
            <Badge className="bg-purple-100 text-purple-800 flex items-center">
              <Star className="h-3 w-3 mr-1" />
              {filters.rating}+ stars
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => updateFilter('rating', 0)}
              />
            </Badge>
          )}
        </div>
      )}

      {/* Filter Panel */}
      {isOpen && (
        <Card className="shadow-lg border-0">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-3">Service Category</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.category.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="mr-2 text-blue-600 rounded"
                      />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="font-semibold mb-3">Location</h3>
                <select
                  value={filters.location}
                  onChange={(e) => updateFilter('location', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">All Cities</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Budget Range */}
              <div>
                <h3 className="font-semibold mb-3">Budget Range</h3>
                <div className="space-y-2">
                  {budgetRanges.map((range) => (
                    <label key={range} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="budget"
                        checked={filters.budget === range}
                        onChange={() => updateFilter('budget', range)}
                        className="mr-2 text-blue-600"
                      />
                      <span className="text-sm">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <h3 className="font-semibold mb-3">Minimum Rating</h3>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        checked={filters.rating === rating}
                        onChange={() => updateFilter('rating', rating)}
                        className="mr-2 text-blue-600"
                      />
                      <div className="flex items-center">
                        {[...Array(rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
                        ))}
                        <span className="text-sm ml-1">& above</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VendorFilter;
