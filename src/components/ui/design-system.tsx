
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Design System Components for Aaroham
export const AarohamButton = ({ 
  variant = 'primary', 
  size = 'default', 
  children, 
  className = "",
  ...props 
}: {
  variant?: 'primary' | 'secondary' | 'outline' | 'gold' | 'royal';
  size?: 'sm' | 'default' | 'lg' | 'xl';
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) => {
  const baseClasses = "font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg";
  
  const variants = {
    primary: "bg-gradient-to-r from-royal-blue to-bright-gold hover:from-navy-blue hover:to-golden-yellow text-white",
    secondary: "bg-white text-royal-blue border-2 border-royal-blue hover:bg-sky-blue hover:text-white",
    outline: "border-2 border-bright-gold text-bright-gold hover:bg-bright-gold hover:text-navy-blue",
    gold: "bg-gradient-to-r from-bright-gold to-golden-yellow text-navy-blue hover:from-golden-yellow hover:to-bright-gold shadow-xl",
    royal: "bg-gradient-to-r from-navy-blue to-deep-blue text-white hover:from-deep-blue hover:to-navy-blue"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    default: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl"
  };
  
  return (
    <Button 
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Button>
  );
};

export const AarohamCard = ({ 
  children, 
  hover = true, 
  variant = 'default',
  className = "" 
}: {
  children: React.ReactNode;
  hover?: boolean;
  variant?: 'default' | 'royal' | 'gold' | 'elegant';
  className?: string;
}) => {
  const variants = {
    default: "bg-white border-0 shadow-lg",
    royal: "bg-gradient-to-br from-white to-sky-blue border-2 border-royal-blue/20 shadow-xl",
    gold: "bg-gradient-to-br from-cream-gold to-white border-2 border-bright-gold/30 shadow-xl",
    elegant: "bg-white/95 backdrop-blur-sm border border-bright-gold/20 shadow-2xl"
  };

  return (
    <Card className={cn(
      "rounded-2xl overflow-hidden",
      variants[variant],
      hover ? 'hover:shadow-2xl hover:-translate-y-2 transition-all duration-300' : '',
      className
    )}>
      {children}
    </Card>
  );
};

export const AarohamBadge = ({ 
  children, 
  variant = 'default',
  size = 'default'
}: {
  children: React.ReactNode;
  variant?: 'default' | 'gold' | 'royal' | 'success' | 'featured';
  size?: 'sm' | 'default' | 'lg';
}) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    gold: "bg-gradient-to-r from-bright-gold to-golden-yellow text-navy-blue shadow-md",
    royal: "bg-gradient-to-r from-royal-blue to-navy-blue text-white shadow-md",
    success: "bg-gradient-to-r from-green-100 to-green-200 text-green-800",
    featured: "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    default: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };
  
  return (
    <Badge className={cn(
      "rounded-full font-medium transition-all duration-200 hover:scale-105",
      variants[variant],
      sizes[size]
    )}>
      {children}
    </Badge>
  );
};

export const AarohamSection = ({
  children,
  variant = 'default',
  className = ""
}: {
  children: React.ReactNode;
  variant?: 'default' | 'royal' | 'gold' | 'gradient';
  className?: string;
}) => {
  const variants = {
    default: "bg-white",
    royal: "bg-gradient-to-br from-navy-blue via-royal-blue to-deep-blue text-white",
    gold: "bg-gradient-to-br from-cream-gold via-light-gold to-bright-gold",
    gradient: "bg-gradient-to-br from-cream-gold via-white to-light-gold"
  };

  return (
    <section className={cn(
      "py-16 relative overflow-hidden",
      variants[variant],
      className
    )}>
      {variant !== 'default' && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-bright-gold rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-golden-yellow rounded-full blur-3xl animate-pulse"></div>
        </div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
};

export const AarohamHeading = ({
  children,
  level = 1,
  variant = 'default',
  className = ""
}: {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4;
  variant?: 'default' | 'gradient' | 'royal' | 'gold';
  className?: string;
}) => {
  const baseClasses = "font-majestic font-bold";
  
  const variants = {
    default: "text-navy-blue",
    gradient: "text-gradient-blue-gold",
    royal: "text-royal-blue",
    gold: "text-bright-gold"
  };

  const sizes = {
    1: "text-4xl md:text-5xl lg:text-6xl",
    2: "text-3xl md:text-4xl lg:text-5xl",
    3: "text-2xl md:text-3xl lg:text-4xl",
    4: "text-xl md:text-2xl lg:text-3xl"
  };

  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <HeadingTag className={cn(
      baseClasses,
      variants[variant],
      sizes[level],
      className
    )}>
      {children}
    </HeadingTag>
  );
};

export const AarohamLoader = ({ size = 'default' }: { size?: 'sm' | 'default' | 'lg' }) => {
  const sizes = {
    sm: "w-6 h-6",
    default: "w-8 h-8",
    lg: "w-12 h-12"
  };

  return (
    <div className={cn(
      "animate-spin rounded-full border-4 border-bright-gold border-t-transparent",
      sizes[size]
    )}></div>
  );
};
