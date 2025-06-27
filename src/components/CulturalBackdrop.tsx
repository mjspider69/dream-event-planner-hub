
import { useEffect, useState } from "react";

interface CulturalBackdropProps {
  location: string;
  className?: string;
}

const CulturalBackdrop = ({ location, className = "" }: CulturalBackdropProps) => {
  const [backdropImage, setBackdropImage] = useState<string>("");

  const culturalBackdrops: Record<string, string> = {
    // States
    "rajasthan": "photo-1469041797191-50ace28483c3", // Camels in desert
    "kerala": "photo-1472396961693-142e6e269027", // Backwaters/nature
    "tamil nadu": "photo-1466442929976-97f336a657be", // Temple architecture
    "punjab": "photo-1493962853295-0fd70327578a", // Rural/agricultural
    "gujarat": "photo-1469041797191-50ace28483c3", // Desert landscape
    "maharashtra": "photo-1472396961693-142e6e269027", // Mountains/nature
    "karnataka": "photo-1472396961693-142e6e269027", // Garden city/nature
    "andhra pradesh": "photo-1466442929976-97f336a657be", // Traditional architecture
    "telangana": "photo-1466442929976-97f336a657be", // Modern meets traditional
    "west bengal": "photo-1472396961693-142e6e269027", // Cultural heritage
    "odisha": "photo-1466442929976-97f336a657be", // Temple architecture
    "madhya pradesh": "photo-1493962853295-0fd70327578a", // Wildlife/nature
    "uttar pradesh": "photo-1466442929976-97f336a657be", // Historical monuments
    "bihar": "photo-1466442929976-97f336a657be", // Ancient heritage
    "jharkhand": "photo-1472396961693-142e6e269027", // Tribal culture/nature
    "assam": "photo-1472396961693-142e6e269027", // Tea gardens/nature
    "himachal pradesh": "photo-1472396961693-142e6e269027", // Mountains
    "uttarakhand": "photo-1472396961693-142e6e269027", // Himalayan landscape
    "haryana": "photo-1493962853295-0fd70327578a", // Agricultural
    "delhi": "photo-1466442929976-97f336a657be", // Historical monuments
    "goa": "photo-1472396961693-142e6e269027", // Beaches/Portuguese heritage
    
    // Major Cities
    "mumbai": "photo-1472396961693-142e6e269027", // Urban coastal
    "delhi": "photo-1466442929976-97f336a657be", // Historical
    "bangalore": "photo-1472396961693-142e6e269027", // Garden city
    "chennai": "photo-1466442929976-97f336a657be", // Temple city
    "kolkata": "photo-1466442929976-97f336a657be", // Cultural capital
    "hyderabad": "photo-1466442929976-97f336a657be", // Nizami culture
    "pune": "photo-1472396961693-142e6e269027", // Cultural city
    "ahmedabad": "photo-1469041797191-50ace28483c3", // Gujarati culture
    "jaipur": "photo-1469041797191-50ace28483c3", // Pink city/desert
    "lucknow": "photo-1466442929976-97f336a657be", // Nawabi culture
    "kanpur": "photo-1493962853295-0fd70327578a", // Industrial heritage
    "nagpur": "photo-1472396961693-142e6e269027", // Orange city
    "indore": "photo-1472396961693-142e6e269027", // Cultural heritage
    "bhopal": "photo-1472396961693-142e6e269027", // City of lakes
    "coimbatore": "photo-1472396961693-142e6e269027", // Textile city
    "kochi": "photo-1472396961693-142e6e269027", // Backwaters
    "thiruvananthapuram": "photo-1472396961693-142e6e269027", // Kerala culture
    "chandigarh": "photo-1472396961693-142e6e269027", // Planned city
    "vadodara": "photo-1469041797191-50ace28483c3", // Gujarati heritage,
    
    // Default fallback
    "default": "photo-1472396961693-142e6e269027"
  };

  useEffect(() => {
    const locationKey = location.toLowerCase().trim();
    const imageId = culturalBackdrops[locationKey] || culturalBackdrops["default"];
    setBackdropImage(`https://images.unsplash.com/${imageId}?auto=format&fit=crop&w=1920&q=80`);
  }, [location]);

  if (!backdropImage) return null;

  return (
    <div 
      className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${className}`}
      style={{ backgroundImage: `url(${backdropImage})` }}
    >
      <div className="absolute inset-0 bg-black/30"></div>
    </div>
  );
};

export default CulturalBackdrop;
