import { useEffect, useState } from "react";
import { CULTURAL_BACKDROPS } from "@/constants/vendorCategories";

interface CulturalBackdropProps {
  location: string;
  className?: string;
}

const CulturalBackdrop = ({ location, className = "" }: CulturalBackdropProps) => {
  const [backdropImage, setBackdropImage] = useState<string>("");

  useEffect(() => {
    const locationKey = location.toLowerCase().trim();
    const imageUrl = CULTURAL_BACKDROPS[locationKey as keyof typeof CULTURAL_BACKDROPS] || CULTURAL_BACKDROPS["default"];
    setBackdropImage(imageUrl);
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