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

// Cultural backdrop images for different states and cities
export const CULTURAL_BACKDROPS: Record<string, string> = {
  // States
  "rajasthan": "https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=1920&q=80", // Desert/Camels
  "kerala": "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1920&q=80", // Backwaters
  "tamil nadu": "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=1920&q=80", // Temple architecture
  "punjab": "https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&w=1920&q=80", // Agricultural/Rural
  "gujarat": "https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=1920&q=80", // Desert landscape
  "maharashtra": "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1920&q=80", // Mountains/nature
  "karnataka": "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1920&q=80", // Garden city
  "andhra pradesh": "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=1920&q=80", // Traditional architecture
  "telangana": "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=1920&q=80", // Modern meets traditional
  "west bengal": "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1920&q=80", // Cultural heritage
  "odisha": "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=1920&q=80", // Temple architecture
  "madhya pradesh": "https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&w=1920&q=80", // Wildlife/nature
  "uttar pradesh": "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=1920&q=80", // Historical monuments
  "bihar": "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=1920&q=80", // Ancient heritage
  "jharkhand": "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1920&q=80", // Tribal culture
  "assam": "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1920&q=80", // Tea gardens
  "himachal pradesh": "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1920&q=80", // Mountains
  "uttarakhand": "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1920&q=80", // Himalayan landscape
  "haryana": "https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&w=1920&q=80", // Agricultural
  "delhi": "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=1920&q=80", // Historical monuments
  "goa": "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1920&q=80", // Beaches
  
  // Major Cities
  "mumbai": "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1920&q=80", // Urban coastal
  "bangalore": "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1920&q=80", // Garden city
  "chennai": "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=1920&q=80", // Temple city
  "kolkata": "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=1920&q=80", // Cultural capital
  "hyderabad": "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=1920&q=80", // Nizami culture
  "pune": "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1920&q=80", // Cultural city
  "ahmedabad": "https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=1920&q=80", // Gujarati culture
  "jaipur": "https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=1920&q=80", // Pink city
  "lucknow": "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=1920&q=80", // Nawabi culture
  "kanpur": "https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&w=1920&q=80", // Industrial heritage
  "nagpur": "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1920&q=80", // Orange city
  "indore": "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1920&q=80", // Cultural heritage
  "bhopal": "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1920&q=80", // City of lakes
  "coimbatore": "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1920&q=80", // Textile city
  "kochi": "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1920&q=80", // Backwaters
  "thiruvananthapuram": "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1920&q=80", // Kerala culture
  "chandigarh": "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1920&q=80", // Planned city
  "vadodara": "https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=1920&q=80", // Gujarati heritage
  
  // Default fallback
  "default": "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1920&q=80"
};