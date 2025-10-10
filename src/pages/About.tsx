import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Award, Leaf, Globe, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const team = [
  {
    name: "Sarah Chen",
    role: "Founder & CEO",
    bio: "Former travel journalist with 15+ years exploring 60+ countries. Passionate about sustainable tourism.",
    image: "/placeholder.svg"
  },
  {
    name: "Mike Rodriguez", 
    role: "Head of Operations",
    bio: "Ex-airline industry veteran specializing in seamless travel logistics and customer experience.",
    image: "/placeholder.svg"
  },
  {
    name: "Emma Thompson",
    role: "Destination Expert",
    bio: "Cultural anthropologist and adventure seeker who curates authentic local experiences.",
    image: "/placeholder.svg"
  },
  {
    name: "David Park",
    role: "Sustainability Director", 
    bio: "Environmental scientist ensuring all our trips support local communities and ecosystems.",
    image: "/placeholder.svg"
  }
];

const values = [
  {
    icon: Heart,
    title: "Authentic Experiences",
    description: "We believe travel should connect you with real people, cultures, and places - not just tourist attractions."
  },
  {
    icon: Leaf,
    title: "Sustainable Tourism",
    description: "Every trip we design supports local communities and minimizes environmental impact."
  },
  {
    icon: Users,
    title: "Expert Guidance",
    description: "Our team of travel specialists brings decades of combined experience to craft your perfect journey."
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "From hidden gems to iconic destinations, we unlock the world's most incredible experiences."
  }
];

const stats = [
  { number: "50,000+", label: "Happy Travelers" },
  { number: "120+", label: "Countries Covered" },
  { number: "15+", label: "Years Experience" },
  { number: "4.9", label: "Average Rating" }
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-hero-gradient text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Our Story
            </h1>
            <p className="text-xl md:text-2xl mb-8 animate-slide-up opacity-90">
              Born from a passion for authentic travel and meaningful connections, 
              WanderNest exists to unlock the world's most incredible experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Redefining Travel, One Journey at a Time
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  WanderNest was founded in 2009 by a group of passionate travelers who believed that 
                  tourism should be a force for good. We were tired of cookie-cutter itineraries and 
                  experiences that barely scratched the surface of what makes a destination special.
                </p>
                <p className="text-lg text-muted-foreground mb-8">
                  Today, we're proud to be a certified B-Corporation, committed to using business as 
                  a force for positive social and environmental impact. Every trip we design not only 
                  creates unforgettable memories for our travelers but also supports local communities 
                  and protects the natural world.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2">
                    <Award className="h-4 w-4" />
                    B-Corp Certified
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2">
                    <Shield className="h-4 w-4" />
                    Carbon Neutral
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2">
                    <Heart className="h-4 w-4" />
                    Community Focused
                  </Badge>
                </div>
              </div>
              <div className="h-96 bg-muted rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <span className="text-muted-foreground text-lg">Mission Image</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="shadow-card hover-lift">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground">
              The passionate travelers behind your perfect journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center shadow-card hover-lift">
                <CardHeader>
                  <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <Users className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <p className="text-primary font-medium">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-accent text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let us help you discover the world in a way that's meaningful, sustainable, and unforgettable.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/book">
              <Button size="lg" variant="secondary" className="bg-white text-accent hover:bg-white/90">
                Plan Your Trip
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;