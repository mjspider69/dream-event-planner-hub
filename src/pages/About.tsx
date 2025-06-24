
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Crown, Shield, Sparkles, Users, Target, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOOptimization from "@/components/SEOOptimization";

const About = () => {
  const values = [
    {
      title: "Trust",
      description: "Building lasting relationships through transparent communication and reliable service delivery.",
      icon: Shield,
      color: "from-blue-600 to-blue-700"
    },
    {
      title: "Innovation", 
      description: "Leveraging cutting-edge AI technology to revolutionize event planning and enhance user experience.",
      icon: Zap,
      color: "from-amber-500 to-amber-600"
    },
    {
      title: "Cultural Respect",
      description: "Honoring diverse traditions and customs while creating meaningful celebrations for every community.",
      icon: Crown,
      color: "from-blue-600 to-amber-500"
    },
    {
      title: "Excellence",
      description: "Maintaining the highest standards in vendor curation, service quality, and customer satisfaction.",
      icon: Sparkles,
      color: "from-amber-600 to-blue-600"
    }
  ];

  const timeline = [
    {
      year: "2024",
      title: "Platform Launch",
      description: "Aaroham goes live with AI-powered event planning capabilities"
    },
    {
      year: "2023",
      title: "Technology Development", 
      description: "Built advanced AI algorithms for vendor matching and event personalization"
    },
    {
      year: "2022",
      title: "Vision Inception",
      description: "Identified the need for intelligent event planning solutions in India"
    }
  ];

  return (
    <>
      <SEOOptimization 
        title="About Aaroham - Our Story of Rising with Every Celebration"
        description="Learn about Aaroham's mission to revolutionize event planning in India through AI technology, cultural respect, and verified vendor networks."
        keywords="about aaroham, event planning company, AI technology, indian celebrations, vendor network"
      />
      <div className="min-h-screen bg-white">
        <Header />

        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-amber-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-amber-100 text-blue-800 px-6 py-2 text-sm font-medium rounded-full">
                Our Story
              </Badge>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
                  Aaroham
                </span>
                <br />
                <span className="text-gray-900">Rising with Every Celebration</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                In Sanskrit, "Aaroham" means "rising" or "ascending" - embodying our mission to elevate 
                every celebration through intelligent technology and deep cultural understanding.
              </p>
            </div>
          </div>
        </section>

        {/* Meaning of Aaroham */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-6 bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                    The Meaning Behind Our Name
                  </Badge>
                  <h2 className="text-4xl font-bold mb-6 text-gray-900">
                    What Does <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">Aaroham</span> Mean?
                  </h2>
                  <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                    <p>
                      <strong className="text-blue-600">Aaroham (आरोहम्)</strong> is a Sanskrit word that signifies "rising," 
                      "ascending," or "climbing upward." It represents growth, progress, and the journey toward excellence.
                    </p>
                    <p>
                      We chose this name because we believe every celebration is an opportunity to rise above the ordinary, 
                      to create moments that ascend beyond expectations, and to help our clients reach new heights of joy and fulfillment.
                    </p>
                    <p>
                      Just as a beautiful melody rises in crescendo, we help your events build from a simple idea to 
                      an unforgettable celebration that leaves lasting memories.
                    </p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="bg-gradient-to-br from-blue-100 to-amber-100 rounded-3xl p-8 text-center">
                    <div className="w-32 h-32 bg-gradient-to-r from-blue-600 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Crown className="h-16 w-16 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">आरोहम्</h3>
                    <p className="text-lg text-gray-700 mb-2">Sanskrit: "Rising" | "Ascending"</p>
                    <p className="text-sm text-gray-600">Elevating celebrations to new heights</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Inspiration */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <Badge className="mb-6 bg-amber-100 text-amber-800 px-4 py-2 rounded-full">
                  Vision & Inspiration
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-8">
                  <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
                    Our Vision for the Future
                  </span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <Card className="border-0 shadow-lg bg-white">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mb-6">
                      <Target className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Vision</h3>
                    <p className="text-gray-600 leading-relaxed">
                      To become India's most trusted event planning platform, where technology meets tradition, 
                      and every celebration becomes a masterpiece. We envision a world where planning memorable 
                      events is effortless, joyful, and accessible to everyone.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center mb-6">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Inspiration</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Born from the belief that every celebration deserves to be extraordinary, we draw inspiration 
                      from India's rich cultural heritage of hospitality and festivity. Our platform bridges the gap 
                      between traditional event planning and modern convenience.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <Badge className="mb-6 bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                  Our Core Values
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-8">
                  <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
                    What Drives Us Forward
                  </span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Our values form the foundation of everything we do, guiding our decisions and shaping our relationships 
                  with clients, vendors, and communities.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {values.map((value, index) => (
                  <Card key={index} className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                    <CardContent className="p-8">
                      <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <value.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-amber-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <Badge className="mb-6 bg-amber-100 text-amber-800 px-4 py-2 rounded-full">
                  Our Journey
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-8">
                  <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
                    The Aaroham Story
                  </span>
                </h2>
              </div>

              <div className="space-y-8">
                {timeline.map((milestone, index) => (
                  <div key={index} className="flex items-center group">
                    <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-r from-blue-600 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                      {milestone.year}
                    </div>
                    <div className="ml-8 flex-grow">
                      <Card className="border-0 shadow-md bg-white">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                          <p className="text-gray-600">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-amber-500">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Rise with Us?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of satisfied customers who have experienced the Aaroham difference. 
                Let's create something extraordinary together.
              </p>
              <div className="space-y-4">
                <a href="/plan-event" className="inline-block">
                  <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105">
                    Start Your Event Journey
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default About;
