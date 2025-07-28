// Comprehensive vendor categories for all event types
export const VENDOR_CATEGORIES = {
  // Corporate Events
  CORPORATE: {
    "Corporate Event Planners": [
      "Annual Day Organizers",
      "Conference Management",
      "Team Outing Specialists",
      "Board Meeting Coordinators",
      "Corporate Retreat Planners"
    ],
    "AV & Tech Setup Providers": [
      "Sound System Rentals",
      "LED Screen Providers",
      "Live Streaming Services",
      "Projector & Equipment Rentals",
      "Lighting Technology"
    ],
    "Conference & Exhibition": [
      "Booth Designers",
      "Exhibition Stall Setup",
      "Trade Show Organizers",
      "Convention Center Management",
      "Display & Signage"
    ],
    "Team Building Activities": [
      "Adventure Sports Coordinators",
      "Indoor Activity Organizers",
      "Team Building Trainers",
      "Corporate Games & Sports",
      "Leadership Development Activities"
    ],
    "Corporate Gifting": [
      "Customized Gift Solutions",
      "Branded Merchandise",
      "Executive Gift Services",
      "Employee Recognition Gifts",
      "Corporate Hampers"
    ]
  },

  // Birthday & Personal Milestones
  BIRTHDAY: {
    "Birthday Party Planners": [
      "Kids Birthday Specialists",
      "Adult Birthday Organizers",
      "Milestone Birthday Planners",
      "Surprise Party Coordinators",
      "Theme-based Party Planners"
    ],
    "Balloon & Thematic Decorators": [
      "Balloon Arch Specialists",
      "Theme-based Decoration",
      "Cartoon Character Setups",
      "Superhero Theme Decorators",
      "Princess Theme Specialists"
    ],
    "Cake & Dessert Artists": [
      "Custom Cake Designers",
      "Cupcake Specialists",
      "Dessert Table Setup",
      "Sugar Art Creators",
      "Themed Cake Artists"
    ],
    "Kids Entertainment": [
      "Magicians & Illusionists",
      "Clowns & Puppeteers",
      "Face Painting Artists",
      "Balloon Twisters",
      "Character Performers"
    ],
    "Photo & Memory Services": [
      "Photobooth Providers",
      "Instant Print Services",
      "Birthday Photography",
      "Video Documentation",
      "Memory Book Creation"
    ]
  },

  // Cultural & Religious Events
  CULTURAL: {
    "Festival Decoration": [
      "Diwali Decoration Specialists",
      "Ganesh Chaturthi Organizers",
      "Navratri Setup Providers",
      "Christmas Decoration",
      "Eid Celebration Planners"
    ],
    "Pooja & Religious Services": [
      "Mandap Setup Services",
      "Temple Decoration",
      "Priest & Pandit Services",
      "Religious Idol Providers",
      "Sacred Fire Arrangements"
    ],
    "Traditional Music & Arts": [
      "Classical Musicians",
      "Folk Dance Groups",
      "Traditional Instrument Players",
      "Cultural Performance Artists",
      "Regional Music Specialists"
    ],
    "Mehendi & Beauty": [
      "Bridal Mehendi Artists",
      "Face Art Professionals",
      "Traditional Makeup Artists",
      "Hair Styling Specialists",
      "Beauty Parlor Services"
    ],
    "Regional Cuisine": [
      "Traditional Food Caterers",
      "Regional Specialty Chefs",
      "Festival Food Specialists",
      "Sweet & Snack Providers",
      "Traditional Beverage Services"
    ]
  },

  // Wedding Specialists
  WEDDING: {
    "Wedding Photography": [
      "Traditional Wedding Photographers",
      "Candid Photography Specialists",
      "Pre-wedding Shoot Experts",
      "Drone Photography Services",
      "Wedding Album Designers"
    ],
    "Bridal Services": [
      "Bridal Makeup Artists",
      "Hair Styling Specialists",
      "Bridal Outfit Designers",
      "Jewelry Rental Services",
      "Bridal Mehendi Artists"
    ],
    "Wedding Decoration": [
      "Mandap Decorators",
      "Floral Arrangement Specialists",
      "Wedding Stage Designers",
      "Entrance Gate Decorators",
      "Reception Hall Decorators"
    ],
    "Wedding Music & Entertainment": [
      "Wedding DJ Services",
      "Live Band Performers",
      "Shehnai Players",
      "Dhol Players",
      "Wedding Singers"
    ],
    "Wedding Transportation": [
      "Baraat Vehicle Providers",
      "Luxury Car Rentals",
      "Decorated Car Services",
      "Horse & Elephant Rentals",
      "Guest Transportation"
    ]
  },

  // Social Events & Gatherings
  SOCIAL: {
    "Catering Services": [
      "Small Group Caterers",
      "Large Event Caterers",
      "Specialty Cuisine Providers",
      "Buffet Service Specialists",
      "Live Food Counters"
    ],
    "Bar & Beverage Services": [
      "Professional Bartenders",
      "Mixologists",
      "Wine Service Specialists",
      "Non-alcoholic Beverage Services",
      "Coffee & Tea Services"
    ],
    "Entertainment Services": [
      "MCs & Event Hosts",
      "Stand-up Comedians",
      "Live Music Performers",
      "DJ Services",
      "Game Show Organizers"
    ],
    "Security & Support": [
      "Event Security Services",
      "Valet Parking Services",
      "Crowd Management",
      "Emergency Medical Services",
      "Guest Reception Services"
    ],
    "Cleaning & Maintenance": [
      "Post-event Cleaning",
      "Maintenance Crews",
      "Waste Management",
      "Equipment Sanitization",
      "Venue Restoration"
    ]
  },

  // Fashion, Launch & Promotional Events
  FASHION: {
    "Event Styling": [
      "Fashion Show Organizers",
      "Runway Setup Specialists",
      "Model Coordination Services",
      "Styling Consultants",
      "Wardrobe Management"
    ],
    "Lighting & Effects": [
      "Stage Lighting Specialists",
      "Special Effects Providers",
      "Smoke & Fog Machine Rentals",
      "LED Wall Providers",
      "Laser Light Shows"
    ],
    "Influencer & PR": [
      "Influencer Coordination",
      "PR Agency Services",
      "Media Relations",
      "Social Media Management",
      "Celebrity Management"
    ],
    "Model & Brand Services": [
      "Modeling Agencies",
      "Brand Ambassador Services",
      "Product Launch Specialists",
      "Promotional Staff Providers",
      "Demo Coordinators"
    ]
  },

  // Educational & Institutional Events
  EDUCATIONAL: {
    "Educational Setup": [
      "EdTech Demo Providers",
      "Training Session Organizers",
      "Workshop Coordinators",
      "Seminar Management",
      "Academic Event Planners"
    ],
    "Print & Backdrop": [
      "Banner & Signage Providers",
      "Backdrop Design Services",
      "Print & Graphics Solutions",
      "Stage Backdrop Specialists",
      "Promotional Material Printing"
    ],
    "Awards & Recognition": [
      "Trophy & Medal Makers",
      "Certificate Printing Services",
      "Award Ceremony Organizers",
      "Recognition Gift Providers",
      "Achievement Display Services"
    ],
    "Stationery & Kits": [
      "Welcome Kit Providers",
      "Promotional Stationery",
      "Conference Material Suppliers",
      "Registration Kit Services",
      "Educational Material Providers"
    ]
  }
};

// Flattened list for easy search and filtering
export const ALL_VENDOR_TYPES = Object.values(VENDOR_CATEGORIES)
  .flatMap(category => Object.keys(category))
  .sort();

// Get category by vendor type
export const getCategoryByVendorType = (vendorType: string): string => {
  for (const [categoryName, subcategories] of Object.entries(VENDOR_CATEGORIES)) {
    if (Object.keys(subcategories).includes(vendorType)) {
      return categoryName;
    }
  }
  return 'OTHER';
};

// Get all vendor types for a category
export const getVendorTypesByCategory = (category: string): string[] => {
  const categoryData = VENDOR_CATEGORIES[category as keyof typeof VENDOR_CATEGORIES];
  return categoryData ? Object.keys(categoryData) : [];
};

// State-wise backdrop images for location-based vendor pages
export const STATE_BACKDROPS = {
  "Maharashtra": "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1920&h=1080&q=80", // Mumbai cityscape
  "Delhi": "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1920&h=1080&q=80", // India Gate
  "Karnataka": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1920&h=1080&q=80", // Bangalore
  "Tamil Nadu": "https://images.unsplash.com/photo-1582553293855-05200cac5635?auto=format&fit=crop&w=1920&h=1080&q=80", // Chennai
  "Gujarat": "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=1920&h=1080&q=80", // Gujarat architecture
  "Rajasthan": "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1920&h=1080&q=80", // Rajasthan palace
  "West Bengal": "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1920&h=1080&q=80", // Kolkata
  "Kerala": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1920&h=1080&q=80", // Kerala backwaters
  "Punjab": "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?auto=format&fit=crop&w=1920&h=1080&q=80", // Golden Temple
  "Uttar Pradesh": "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1920&h=1080&q=80", // Taj Mahal
  "Goa": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1920&h=1080&q=80", // Goa beaches
  "Himachal Pradesh": "https://images.unsplash.com/photo-1606219758200-ddc8c7c86df8?auto=format&fit=crop&w=1920&h=1080&q=80", // Mountains
  "Uttarakhand": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1920&h=1080&q=80", // Rishikesh
  "Andhra Pradesh": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1920&h=1080&q=80", // Hyderabad
  "Default": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1920&h=1080&q=80" // Indian cultural heritage
};

// Cultural images for specified places
export const CULTURAL_BACKDROPS = {
  "Varanasi": "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1920&h=1080&q=80",
  "Rishikesh": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1920&h=1080&q=80",
  "Pushkar": "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1920&h=1080&q=80",
  "Amritsar": "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?auto=format&fit=crop&w=1920&h=1080&q=80",
  "Haridwar": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&h=1080&q=80",
  "Mathura": "https://images.unsplash.com/photo-1582135739765-b3c16c2ad54c?auto=format&fit=crop&w=1920&h=1080&q=80",
  "Tirupati": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1920&h=1080&q=80"
};

export const getLocationBackdrop = (location: string): string => {
  // Check for cultural places first
  if (CULTURAL_BACKDROPS[location as keyof typeof CULTURAL_BACKDROPS]) {
    return CULTURAL_BACKDROPS[location as keyof typeof CULTURAL_BACKDROPS];
  }
  
  // Check for states
  if (STATE_BACKDROPS[location as keyof typeof STATE_BACKDROPS]) {
    return STATE_BACKDROPS[location as keyof typeof STATE_BACKDROPS];
  }
  
  // Return default
  return STATE_BACKDROPS.Default;
};