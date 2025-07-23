import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: any;
}

const SEOOptimization = ({ 
  title = "Aaroham - India's Premier AI-Powered Event Planning Platform",
  description = "Transform your celebrations with Aaroham's AI-powered event planning. From royal weddings to corporate events, we connect you with verified vendors across India. Plan, book, and celebrate with confidence.",
  keywords = "event planning, wedding planning, AI event planner, royal events, Indian weddings, corporate events, birthday parties, event management, vendor booking, celebration planning, aaroham",
  ogImage = "https://aaroham-com.lovable.app/og-image.jpg",
  canonicalUrl,
  structuredData
}: SEOProps) => {
  const location = useLocation();

  useEffect(() => {
    // Update document title
    document.title = title;

    // Get current URL for canonical and OG URLs
    const currentUrl = canonicalUrl || `https://aaroham-com.lovable.app${location.pathname}`;

    // Update meta tags
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'author', content: 'Aaroham Event Planning' },
      { name: 'robots', content: 'index, follow' },
      { name: 'language', content: 'EN' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'theme-color', content: '#f59e0b' },
      { name: 'msapplication-TileColor', content: '#f59e0b' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      
      // Open Graph / Facebook
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: currentUrl },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: ogImage },
      { property: 'og:site_name', content: 'Aaroham' },
      { property: 'og:locale', content: 'en_IN' },
      
      // Twitter
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:url', content: currentUrl },
      { property: 'twitter:title', content: title },
      { property: 'twitter:description', content: description },
      { property: 'twitter:image', content: ogImage },
      { property: 'twitter:site', content: '@aaroham_events' },
      { property: 'twitter:creator', content: '@aaroham_events' },
    ];

    metaTags.forEach(({ name, property, content }) => {
      let meta = document.querySelector(`meta[${name ? 'name' : 'property'}="${name || property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        if (name) meta.setAttribute('name', name);
        if (property) meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

    // Add structured data for better SEO
    const defaultStructuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Aaroham",
      "description": description,
      "url": "https://aaroham-com.lovable.app",
      "logo": "https://aaroham-com.lovable.app/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-769-888-9321",
        "contactType": "customer service",
        "availableLanguage": ["English", "Hindi"],
        "areaServed": "IN"
      },
      "sameAs": [
        "https://www.instagram.com/aaroham_",
        "https://www.linkedin.com/groups/14719662/",
        "https://www.facebook.com/aaroham"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN",
        "addressRegion": "Maharashtra",
        "addressLocality": "Mumbai"
      },
      "priceRange": "₹₹₹",
      "serviceArea": {
        "@type": "Country",
        "name": "India"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "1250"
      },
      "offers": {
        "@type": "Offer",
        "description": "AI-powered event planning services",
        "category": "Event Planning"
      }
    };

    const finalStructuredData = structuredData || defaultStructuredData;

    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(finalStructuredData);

  }, [title, description, keywords, ogImage, canonicalUrl, structuredData, location.pathname]);

  return null;
};

export default SEOOptimization;