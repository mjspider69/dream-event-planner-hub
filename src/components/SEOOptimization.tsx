
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

const SEOOptimization = ({ 
  title = "Aaroham - India's Premier AI-Powered Royal Event Planning Platform",
  description = "Transform your celebrations with Aaroham's AI-powered event planning. From royal weddings to corporate events, we connect you with verified vendors across India. Plan, book, and celebrate with confidence.",
  keywords = "event planning, wedding planning, AI event planner, royal events, Indian weddings, corporate events, birthday parties, event management, vendor booking, celebration planning",
  ogImage = "/placeholder.svg"
}: SEOProps) => {
  const location = useLocation();

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'author', content: 'Aaroham Royal Events' },
      { name: 'robots', content: 'index, follow' },
      { name: 'language', content: 'EN' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      
      // Open Graph / Facebook
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: `https://aaroham.com${location.pathname}` },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: ogImage },
      { property: 'og:site_name', content: 'Aaroham Royal Events' },
      
      // Twitter
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:url', content: `https://aaroham.com${location.pathname}` },
      { property: 'twitter:title', content: title },
      { property: 'twitter:description', content: description },
      { property: 'twitter:image', content: ogImage },
      
      // Additional SEO tags
      { name: 'theme-color', content: '#DAA520' },
      { name: 'msapplication-TileColor', content: '#DAA520' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
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

    // Add structured data for better SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Aaroham Royal Events",
      "description": description,
      "url": "https://aaroham.com",
      "logo": "https://aaroham.com/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9876543210",
        "contactType": "customer service",
        "availableLanguage": ["English", "Hindi"]
      },
      "sameAs": [
        "https://www.facebook.com/aaroham",
        "https://www.instagram.com/aaroham",
        "https://www.twitter.com/aaroham"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN",
        "addressRegion": "India"
      },
      "priceRange": "₹₹₹",
      "serviceArea": {
        "@type": "Country",
        "name": "India"
      }
    };

    let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script') as HTMLScriptElement;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);

  }, [title, description, keywords, ogImage, location.pathname]);

  return null;
};

export default SEOOptimization;
