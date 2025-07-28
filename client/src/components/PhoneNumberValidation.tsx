import { z } from "zod";

// Indian phone number validation schema
export const indianPhoneSchema = z.string()
  .min(10, "Phone number must be at least 10 digits")
  .max(10, "Phone number must be exactly 10 digits")
  .regex(/^[6-9]\d{9}$/, "Please enter a valid Indian mobile number (starting with 6, 7, 8, or 9)")
  .transform((val) => val.trim());

// Predefined phone number ranges for special validation
const WHITELISTED_PREFIXES = [
  "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", // 6 series
  "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", // 7 series  
  "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", // 8 series
  "90", "91", "92", "93", "94", "95", "96", "97", "98", "99"  // 9 series
];

export const validateIndianPhoneNumber = (phoneNumber: string): boolean => {
  try {
    // Remove any spaces, hyphens, or special characters
    const cleanNumber = phoneNumber.replace(/[\s\-\+\(\)]/g, '');
    
    // Remove country code if present
    const normalizedNumber = cleanNumber.startsWith('91') ? cleanNumber.slice(2) : cleanNumber;
    
    // Check if it's exactly 10 digits and starts with 6-9
    if (!/^[6-9]\d{9}$/.test(normalizedNumber)) {
      return false;
    }
    
    // Check against whitelisted prefixes
    const prefix = normalizedNumber.slice(0, 2);
    return WHITELISTED_PREFIXES.includes(prefix);
  } catch {
    return false;
  }
};

export const formatPhoneNumber = (phoneNumber: string): string => {
  const cleanNumber = phoneNumber.replace(/[\s\-\+\(\)]/g, '');
  const normalizedNumber = cleanNumber.startsWith('91') ? cleanNumber.slice(2) : cleanNumber;
  
  if (normalizedNumber.length === 10) {
    return `+91 ${normalizedNumber.slice(0, 5)} ${normalizedNumber.slice(5)}`;
  }
  
  return phoneNumber;
};

export const getPhoneValidationMessage = (phoneNumber: string): string => {
  const cleanNumber = phoneNumber.replace(/[\s\-\+\(\)]/g, '');
  const normalizedNumber = cleanNumber.startsWith('91') ? cleanNumber.slice(2) : cleanNumber;
  
  if (normalizedNumber.length < 10) {
    return "Phone number must be 10 digits";
  }
  
  if (normalizedNumber.length > 10) {
    return "Phone number must be exactly 10 digits";
  }
  
  if (!/^[6-9]/.test(normalizedNumber)) {
    return "Indian mobile numbers must start with 6, 7, 8, or 9";
  }
  
  if (!/^\d{10}$/.test(normalizedNumber)) {
    return "Phone number must contain only digits";
  }
  
  const prefix = normalizedNumber.slice(0, 2);
  if (!WHITELISTED_PREFIXES.includes(prefix)) {
    return "Please enter a valid Indian mobile number";
  }
  
  return "";
};