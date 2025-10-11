import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Shield, Sparkles, Users, Target, Zap, CheckCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOOptimization from "@/components/SEOOptimization";

const Packages = () => {
  const packages = [
    {
      id: 1,
      name: "Essential",
      price: "₹25,000",
      description: "Perfect for intimate celebrations",
      features: [
        "Up to 50 guests",
        "Basic decoration",
        "Photography (2 hours)",
        "Catering menu selection",
        "Event coordination"
      ],
      popular: false
    },
    {
      id: 2,
      name: "Premium",
      price: "₹75,000",
      description: "Ideal for memorable occasions",
      features: [
        "Up to 150 guests",
        "Premium decoration",
        "Photography & videography",
        "Multi-cuisine catering",
        "Entertainment arrangements",
        "Floral arrangements"
      ],
      popular: true
    },
    {
      id: 3,
      name: "Luxury",
      price: "₹1,50,000",
      description: "Ultimate celebration experience",
      features: [
        "Up to 300 guests",
        "Luxury decoration & themes",
        "Professional photography team",
        "Premium catering service",
        "Live entertainment",
        "Transportation arrangements",
        "Dedicated event manager"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-brand-cream">
      <Helmet>
        <title>Event Packages - Aaroham | Premium Event Planning</title>
        <meta name="description" content="Choose from our curated event packages for weddings, corporate events, and celebrations. Premium planning services with trusted vendors." />
      </Helmet>

      <SEOOptimization 
        title="Event Packages - Aaroham"
        description="Choose from our curated event packages for weddings, corporate events, and celebrations."
        keywords="event packages, wedding packages, corporate event planning, celebration packages"
      />

      <Header />

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-brand-tan text-brand-dark">
              <Crown className="w-4 h-4 mr-2" />
              Premium Packages
            </Badge>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-brand-peach via-brand-tan to-brand-dark bg-clip-text text-transparent font-heading">
              Choose Your Perfect Package
            </h1>
            <p className="text-xl text-brand-dark/70 max-w-3xl mx-auto leading-relaxed">
              Carefully curated packages designed to make your special moments unforgettable. 
              Each package includes premium vendors and personalized service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {packages.map((pkg) => (
              <Card key={pkg.id} className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${pkg.popular ? 'border-2 border-brand-peach shadow-xl' : 'border border-brand-tan/30'}`}>
                {pkg.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-brand-peach to-brand-tan text-brand-dark text-center py-2 text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <CardContent className="p-8">
                  <div className={`mb-6 ${pkg.popular ? 'mt-6' : ''}`}>
                    <h3 className="text-2xl font-bold mb-2 text-brand-dark">{pkg.name}</h3>
                    <div className="text-4xl font-bold text-brand-peach mb-2">{pkg.price}</div>
                    <p className="text-brand-dark/70">{pkg.description}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-brand-dark/80">
                        <CheckCircle className="w-5 h-5 text-brand-tan mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full py-3 text-lg font-semibold transition-all duration-300 ${
                      pkg.popular 
                        ? 'bg-gradient-to-r from-brand-peach to-brand-tan hover:opacity-90 text-brand-dark' 
                        : 'bg-white text-brand-dark border-2 border-brand-tan hover:bg-brand-peach/10'
                    }`}
                  >
                    Choose {pkg.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6 text-brand-dark">Need Something Custom?</h2>
            <p className="text-lg text-brand-dark/70 mb-8 max-w-2xl mx-auto">
              Every event is unique. Let us create a personalized package that perfectly matches your vision and requirements.
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-brand-peach to-brand-tan hover:opacity-90 text-brand-dark px-8 py-4 text-lg font-semibold"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Create Custom Package
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Packages;