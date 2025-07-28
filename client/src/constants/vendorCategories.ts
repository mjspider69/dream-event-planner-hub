export const VENDOR_CATEGORIES = [
  // Corporate Events
  "Corporate Event Planners",
  "AV & Tech Setup Providers", 
  "Conference/Exhibition Booth Designers",
  "Team-Building Activity Coordinators",
  "Corporate Gifting Solutions",

  // Birthday & Personal Milestones
  "Birthday Party Planners",
  "Balloon & Thematic Decorators",
  "Cake & Dessert Artists",
  "Kids' Entertainers",
  "Photobooth & Instant Print Services",

  // Cultural & Religious Events
  "Festival Decor Experts",
  "Pooja Setup Services",
  "Traditional Musicians & Folk Artists", 
  "Mehendi & Face Art Professionals",
  "Local Food Caterers",

  // Social Events & Gatherings
  "Caterers for Small & Large Groups",
  "Bartenders & Mixologists",
  "MCs / Hosts / Stand-up Comedians",
  "Security & Valet Services",
  "Cleaning & Maintenance Crews",

  // Fashion, Launch & Promotional Events
  "Event Stylists & Set Designers",
  "Lighting & Effects Experts", 
  "Influencer Coordination Agencies",
  "Model & Brand Ambassador Agencies",
  "On-Ground Promo Staff Providers",

  // Educational & Institutional Events
  "EdTech Demo Setup Providers",
  "Stall/Backdrop Print Vendors",
  "Trophy & Award Makers",
  "Stationery & Welcome Kit Vendors",
  "Live Streaming Services",

  // Traditional Categories
  "Photography",
  "Videography", 
  "Decoration",
  "Catering",
  "DJ & Music",
  "Transportation",
  "Venue",
  "Priest",
  "Gifts"
] as const;

export const CATEGORY_GROUPS = {
  "Corporate Events": [
    "Corporate Event Planners",
    "AV & Tech Setup Providers", 
    "Conference/Exhibition Booth Designers",
    "Team-Building Activity Coordinators",
    "Corporate Gifting Solutions"
  ],
  "Birthday & Personal Milestones": [
    "Birthday Party Planners",
    "Balloon & Thematic Decorators",
    "Cake & Dessert Artists",
    "Kids' Entertainers",
    "Photobooth & Instant Print Services"
  ],
  "Cultural & Religious Events": [
    "Festival Decor Experts",
    "Pooja Setup Services",
    "Traditional Musicians & Folk Artists", 
    "Mehendi & Face Art Professionals",
    "Local Food Caterers"
  ],
  "Social Events & Gatherings": [
    "Caterers for Small & Large Groups",
    "Bartenders & Mixologists",
    "MCs / Hosts / Stand-up Comedians",
    "Security & Valet Services",
    "Cleaning & Maintenance Crews"
  ],
  "Fashion, Launch & Promotional Events": [
    "Event Stylists & Set Designers",
    "Lighting & Effects Experts", 
    "Influencer Coordination Agencies",
    "Model & Brand Ambassador Agencies",
    "On-Ground Promo Staff Providers"
  ],
  "Educational & Institutional Events": [
    "EdTech Demo Setup Providers",
    "Stall/Backdrop Print Vendors",
    "Trophy & Award Makers",
    "Stationery & Welcome Kit Vendors",
    "Live Streaming Services"
  ],
  "Traditional Services": [
    "Photography",
    "Videography", 
    "Decoration",
    "Catering",
    "DJ & Music",
    "Transportation",
    "Venue",
    "Priest",
    "Gifts"
  ]
};

export const CULTURAL_BACKDROPS = {
  // Major Cities
  "mumbai": "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1600&q=80", // Gateway of India
  "delhi": "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1600&q=80", // Red Fort
  "bangalore": "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1600&q=80", // Bangalore Palace
  "chennai": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80", // Marina Beach
  "kolkata": "https://images.unsplash.com/photo-1558431382-27ca3c750c69?auto=format&fit=crop&w=1600&q=80", // Victoria Memorial
  "hyderabad": "https://images.unsplash.com/photo-1599661046827-dacde645b985?auto=format&fit=crop&w=1600&q=80", // Charminar
  "pune": "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1600&q=80", // Shaniwar Wada
  "ahmedabad": "https://images.unsplash.com/photo-1614608008796-64d19fb430ba?auto=format&fit=crop&w=1600&q=80", // Sabarmati Ashram
  "jaipur": "https://images.unsplash.com/photo-1544531586-fbb6cf2ad31e?auto=format&fit=crop&w=1600&q=80", // Hawa Mahal
  "kochi": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=80", // Chinese Fishing Nets
  "lucknow": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1600&q=80", // Bara Imambara

  // States
  "maharashtra": "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1600&q=80",
  "rajasthan": "https://images.unsplash.com/photo-1544531586-fbb6cf2ad31e?auto=format&fit=crop&w=1600&q=80",
  "kerala": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=80",
  "gujarat": "https://images.unsplash.com/photo-1614608008796-64d19fb430ba?auto=format&fit=crop&w=1600&q=80",
  "karnataka": "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1600&q=80",
  "tamil nadu": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80",
  "west bengal": "https://images.unsplash.com/photo-1558431382-27ca3c750c69?auto=format&fit=crop&w=1600&q=80",
  "telangana": "https://images.unsplash.com/photo-1599661046827-dacde645b985?auto=format&fit=crop&w=1600&q=80",
  "uttar pradesh": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1600&q=80",

  // Cultural/Religious Places
  "varanasi": "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1600&q=80", // Ganga Ghats
  "agra": "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1600&q=80", // Taj Mahal
  "udaipur": "https://images.unsplash.com/photo-1609920658906-8223bd289001?auto=format&fit=crop&w=1600&q=80", // City Palace
  "jodhpur": "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1600&q=80", // Blue City
  "pushkar": "https://images.unsplash.com/photo-1554647286-f365d7defc2d?auto=format&fit=crop&w=1600&q=80", // Pushkar Lake
  "rishikesh": "https://images.unsplash.com/photo-1586500036706-41963de00b51?auto=format&fit=crop&w=1600&q=80", // Ganges & Mountains
  "goa": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=80", // Beaches
  "mysore": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80", // Mysore Palace
  "amritsar": "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=1600&q=80", // Golden Temple

  // Default fallback
  "all cities": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=80", // Indian flag/culture
  "default": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=80"
};