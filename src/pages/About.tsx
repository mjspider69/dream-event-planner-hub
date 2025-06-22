
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Heart, Users, Shield, TrendingUp, Award, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const coreValues = [
    {
      title: "Trust",
      description: "Building lasting relationships through transparency and reliability",
      icon: Shield,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Fairness", 
      description: "Ensuring equitable opportunities for all vendors and customers",
      icon: Award,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Innovation",
      description: "Leveraging cutting-edge AI to revolutionize event planning",
      icon: TrendingUp,
      color: "from-purple-500 to-violet-500"
    },
    {
      title: "Cultural Respect",
      description: "Honoring traditions while embracing modern celebration styles",
      icon: Heart,
      color: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 to-orange-600/10"></div>
        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-amber-100 text-amber-700 hover:bg-amber-200">
              ✨ Our Story
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent leading-tight">
              Aaroham - Rising with
              <br />
              Every Celebration
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover how we're transforming India's event planning landscape through the perfect 
              blend of artificial intelligence and cultural wisdom.
            </p>
          </div>
        </div>
      </section>

      {/* Meaning of Aaroham */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-orange-100 text-orange-700">The Name</Badge>
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                What Does Aaroham Mean?
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                <strong>Aaroham</strong> (आरोहम्) is a beautiful Sanskrit word meaning "ascending" or "rising." 
                It represents our core belief that every celebration should elevate the human spirit, 
                bringing people together in joy and creating memories that lift us higher.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Just as celebrations mark life's ascending moments - from birthdays that celebrate 
                another year of growth to weddings that mark the beginning of a new journey together - 
                Aaroham embodies the upward movement of life's most precious occasions.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Rising Together</p>
                  <p className="text-gray-600">Elevating every celebration</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80"
                alt="Traditional Indian celebration"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-20"></div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Inspiration */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700">Vision & Inspiration</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Our Vision for the Future
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="bg-gradient-to-br from-white to-amber-50 border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  To become India's most trusted event planning ecosystem, where technology serves 
                  tradition and every celebration becomes a masterpiece of cultural expression and 
                  personal meaning.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-600">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    AI-powered personalization for every event
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    Pan-India network of verified vendors
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    Cultural sensitivity in every recommendation
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-orange-50 border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mb-6">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Our Inspiration</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Born from the frustration of endless vendor searches and the dream of seamless 
                  celebrations, Aaroham was inspired by India's rich tradition of hospitality and 
                  the potential of AI to make it accessible to everyone.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-600">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    Simplifying complex event planning
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    Empowering local vendor communities
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    Preserving cultural celebration traditions
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-700">Core Values</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              What Drives Us Forward
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our values guide every decision we make, ensuring that Aaroham remains true to its 
              mission of elevating celebrations across India.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-600 to-orange-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Rise with Aaroham?</h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have elevated their celebrations with our 
            AI-powered platform. Your perfect event awaits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/plan-event">
              <Button size="lg" className="bg-white text-amber-600 hover:bg-amber-50 text-lg px-8 py-6">
                Plan My Event
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/vendors">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                Explore Vendors
                <Users className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
