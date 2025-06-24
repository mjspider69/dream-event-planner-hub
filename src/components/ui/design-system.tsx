
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Design System Components for Aaroham
export const AarohamButton = ({ 
  variant = 'primary', 
  size = 'default', 
  children, 
  ...props 
}: {
  variant?: 'primary' | 'secondary' | 'outline' | 'gold';
  size?: 'sm' | 'default' | 'lg';
  children: React.ReactNode;
  [key: string]: any;
}) => {
  const baseClasses = "font-semibold rounded-full transition-all duration-300 transform hover:scale-105";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 text-white shadow-lg",
    secondary: "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50",
    outline: "border-2 border-amber-500 text-amber-600 hover:bg-amber-50",
    gold: "bg-gradient-to-r from-amber-400 to-amber-600 text-white hover:from-amber-500 hover:to-amber-700"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    default: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };
  
  return (
    <Button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]}`} 
      {...props}
    >
      {children}
    </Button>
  );
};

export const AarohamCard = ({ 
  children, 
  hover = true, 
  className = "" 
}: {
  children: React.ReactNode;
  hover?: boolean;
  className?: string;
}) => {
  return (
    <Card className={`
      bg-white border-0 shadow-lg rounded-2xl overflow-hidden
      ${hover ? 'hover:shadow-2xl hover:-translate-y-2 transition-all duration-300' : ''}
      ${className}
    `}>
      {children}
    </Card>
  );
};

export const AarohamBadge = ({ 
  children, 
  variant = 'default' 
}: {
  children: React.ReactNode;
  variant?: 'default' | 'gold' | 'blue';
}) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    gold: "bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800",
    blue: "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800"
  };
  
  return (
    <Badge className={`${variants[variant]} px-4 py-2 rounded-full font-medium`}>
      {children}
    </Badge>
  );
};
