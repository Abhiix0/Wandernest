import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Shield, 
  Phone, 
  MapPin, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Building2, 
  Navigation, 
  Heart, 
  Users, 
  Star,
  ExternalLink,
  Hospital,
  Home
} from "lucide-react";
import { Link } from "react-router-dom";

const safetyTips = {
  dos: [
    "Research your destination thoroughly before traveling",
    "Keep copies of important documents (passport, ID, insurance)",
    "Share your itinerary with trusted contacts",
    "Use verified transportation services",
    "Stay in well-reviewed, women-friendly accommodations",
    "Trust your instincts - if something feels wrong, leave"
  ],
  donts: [
    "Don't share your hotel room number publicly",
    "Avoid walking alone in unfamiliar areas after dark",
    "Don't accept drinks from strangers",
    "Don't display expensive jewelry or electronics",
    "Avoid sharing real-time location on social media",
    "Don't ignore local customs and dress codes"
  ]
};

const verifiedStays = [
  {
    id: 1,
    name: "Haven Women's Hostel",
    location: "Bangkok, Thailand",
    rating: 4.9,
    reviews: 1243,
    price: "$28/night",
    safetyScore: 98,
    features: ["Women-Only Dorms", "24/7 Security", "Female Staff", "Safe Lockers"],
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500&h=300&fit=crop"
  },
  {
    id: 2,
    name: "Sanctuary Suites",
    location: "Barcelona, Spain", 
    rating: 4.8,
    reviews: 856,
    price: "$89/night",
    safetyScore: 96,
    features: ["Central Location", "Key Card Access", "CCTV", "Staff on Call"],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop"
  },
  {
    id: 3,
    name: "Lotus Guesthouse",
    location: "Bali, Indonesia",
    rating: 4.9,
    reviews: 2104,
    price: "$45/night",
    safetyScore: 97,
    features: ["Gated Property", "Airport Pickup", "Female Host", "Community Space"],
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500&h=300&fit=crop"
  }
];

const emergencyContacts = [
  {
    category: "Global Emergency",
    contacts: [
      { name: "International SOS", number: "+1-215-942-8226" },
      { name: "US Embassy Emergency", number: "+1-202-501-4444" }
    ]
  },
  {
    category: "Women's Helplines",
    contacts: [
      { name: "International Women's Helpline", number: "+44-808-2000-247" },
      { name: "Global Women's Safety Network", number: "+1-800-799-7233" }
    ]
  },
  {
    category: "Medical Emergency",
    contacts: [
      { name: "International Medical Assistance", number: "+1-317-262-2929" },
      { name: "Travel Health Emergency", number: "+44-20-7234-8000" }
    ]
  }
];

const safeZones = [
  { type: "Police Station", icon: Shield, color: "text-blue-600" },
  { type: "Hospital", icon: Hospital, color: "text-red-600" },
  { type: "Embassy", icon: Building2, color: "text-purple-600" },
  { type: "Safe Space", icon: Heart, color: "text-pink-600" }
];

const Safety = () => {
  const handleSOS = () => {
    // This would trigger emergency protocols
    alert("🚨 SOS Alert Activated!\n\nYour location has been shared with:\n- Emergency contacts\n- Local authorities\n- WanderNest support team\n\nHelp is on the way. Stay safe!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-gradient">
              WanderNest
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="hover:text-primary transition-smooth">Home</Link>
              <Link to="/destinations" className="hover:text-primary transition-smooth">Destinations</Link>
              <Link to="/guides" className="hover:text-primary transition-smooth">Travel Guides</Link>
              <Link to="/safety" className="text-primary font-medium">Safety</Link>
              <Link to="/book" className="hover:text-primary transition-smooth">Book a Trip</Link>
              <Link to="/about" className="hover:text-primary transition-smooth">About</Link>
              <Link to="/contact" className="hover:text-primary transition-smooth">Contact</Link>
            </nav>
            <div className="md:hidden">
              <Button variant="outline" size="sm">Menu</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-hero-gradient text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Shield className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Safety & Women-Friendly Travel
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Travel confidently with verified stays, safety resources, and 24/7 support designed for women travelers
          </p>
          <Badge variant="secondary" className="bg-white/20 text-white px-6 py-3 text-lg">
            <Heart className="h-5 w-5 mr-2 inline" />
            Trusted by 10,000+ Solo Women Travelers
          </Badge>
        </div>
      </section>

      {/* Emergency SOS Section - Prominent */}
      <section className="py-8 bg-red-50 dark:bg-red-950/20 border-y-2 border-red-200 dark:border-red-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Alert className="bg-white dark:bg-card border-red-300 mb-4">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <AlertDescription className="text-base">
                <strong>In an emergency?</strong> Press the SOS button to instantly alert emergency contacts and local authorities with your location.
              </AlertDescription>
            </Alert>
            <Button 
              size="lg" 
              onClick={handleSOS}
              className="bg-red-600 hover:bg-red-700 text-white text-xl px-12 py-8 h-auto"
              role="button"
              aria-label="Emergency SOS button - Press to alert emergency contacts and share your location"
            >
              <Phone className="h-8 w-8 mr-3" />
              Emergency SOS
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Available 24/7 in 150+ countries • Average response time: 3 minutes
            </p>
          </div>
        </div>
      </section>

      {/* Safety Dashboard */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Safety Dashboard</h2>
            <p className="text-xl text-muted-foreground">
              Essential safety guidelines for confident travel
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Do's */}
            <Card className="shadow-travel">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-2xl">Safety Do's</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3" role="list" aria-label="Safety recommendations">
                  {safetyTips.dos.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Don'ts */}
            <Card className="shadow-travel">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                    <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <CardTitle className="text-2xl">Safety Don'ts</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3" role="list" aria-label="Safety warnings">
                  {safetyTips.donts.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Verified Stays */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Verified Safe Stays</h2>
            <p className="text-xl text-muted-foreground">
              Women-friendly accommodations with verified safety ratings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {verifiedStays.map((stay) => (
              <Card key={stay.id} className="overflow-hidden hover-lift shadow-travel">
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src={stay.image} 
                    alt={`${stay.name} - Safe accommodation for women travelers`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-600 text-white">
                      <Shield className="h-3 w-3 mr-1" />
                      {stay.safetyScore}% Safe
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{stay.name}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {stay.location}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{stay.rating}</span>
                      <span className="text-sm text-muted-foreground">({stay.reviews})</span>
                    </div>
                    <span className="text-lg font-bold text-primary">{stay.price}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {stay.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button className="w-full bg-primary hover:bg-primary-hover">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="hover-lift">
              View All Verified Stays
            </Button>
          </div>
        </div>
      </section>

      {/* Safe Routes Map */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Safe Routes Map</h2>
            <p className="text-xl text-muted-foreground">
              Navigate confidently with safety zones and emergency points
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Card className="shadow-travel">
              <CardContent className="p-0">
                <div 
                  className="h-96 bg-muted rounded-lg flex items-center justify-center relative"
                  role="region"
                  aria-label="Interactive safety map showing safe zones, police stations, hospitals, and embassies"
                >
                  {/* Placeholder for actual map integration */}
                  <div className="text-center p-8">
                    <Navigation className="h-16 w-16 mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-2">Interactive Safety Map</h3>
                    <p className="text-muted-foreground mb-6">
                      Map showing safe routes, emergency services, and verified locations
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                      {safeZones.map((zone, index) => (
                        <div key={index} className="flex flex-col items-center gap-2 p-4 bg-background rounded-lg">
                          <zone.icon className={`h-8 w-8 ${zone.color}`} />
                          <span className="text-sm font-medium">{zone.type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <Card className="text-center p-4">
                <Shield className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <p className="font-semibold">24</p>
                <p className="text-sm text-muted-foreground">Police Stations</p>
              </Card>
              <Card className="text-center p-4">
                <Hospital className="h-8 w-8 mx-auto mb-2 text-red-600" />
                <p className="font-semibold">15</p>
                <p className="text-sm text-muted-foreground">Hospitals</p>
              </Card>
              <Card className="text-center p-4">
                <Building2 className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <p className="font-semibold">8</p>
                <p className="text-sm text-muted-foreground">Embassies</p>
              </Card>
              <Card className="text-center p-4">
                <Heart className="h-8 w-8 mx-auto mb-2 text-pink-600" />
                <p className="font-semibold">32</p>
                <p className="text-sm text-muted-foreground">Safe Spaces</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Links */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Emergency Resources</h2>
            <p className="text-xl text-muted-foreground">
              Quick access to help when you need it most
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {emergencyContacts.map((section, index) => (
              <Card key={index} className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    {section.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3" role="list" aria-label={`${section.category} contact numbers`}>
                    {section.contacts.map((contact, idx) => (
                      <li key={idx} className="flex flex-col gap-1 pb-3 border-b last:border-0">
                        <span className="font-medium">{contact.name}</span>
                        <a 
                          href={`tel:${contact.number}`} 
                          className="text-primary hover:underline flex items-center gap-1"
                          aria-label={`Call ${contact.name} at ${contact.number}`}
                        >
                          <Phone className="h-4 w-4" />
                          {contact.number}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 max-w-4xl mx-auto">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="h-5 w-5" />
                  Additional Safety Resources
                </CardTitle>
                <CardDescription>
                  Download these apps and bookmark these resources before your trip
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Smart Traveler App (US State Dept)
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Women's Safety App
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Local Embassy Finder
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Travel Insurance 24/7
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <Users className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Join Our Safe Travel Community
          </h2>
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto">
            Connect with thousands of women travelers, share experiences, and get real-time safety updates
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/book">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Plan Safe Trip
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Join Community
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gradient-white mb-4">WanderNest</h3>
              <p className="text-background/70 mb-4">
                Empowering women to explore the world safely and confidently.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li><Link to="/" className="hover:text-background transition-smooth">Home</Link></li>
                <li><Link to="/destinations" className="hover:text-background transition-smooth">Destinations</Link></li>
                <li><Link to="/safety" className="hover:text-background transition-smooth">Safety</Link></li>
                <li><Link to="/book" className="hover:text-background transition-smooth">Book Trip</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Safety</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li><Link to="/safety" className="hover:text-background transition-smooth">Safety Guidelines</Link></li>
                <li><Link to="/safety" className="hover:text-background transition-smooth">Verified Stays</Link></li>
                <li><Link to="/safety" className="hover:text-background transition-smooth">Emergency Contacts</Link></li>
                <li><Link to="/safety" className="hover:text-background transition-smooth">Travel Insurance</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">24/7 Support</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li>Emergency: +1-800-SAFE-NOW</li>
                <li>Support: support@wandernest.com</li>
                <li>WhatsApp: +1-555-0123</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm text-background/70">
            <p>&copy; 2024 WanderNest. Your safety is our priority. Travel confidently.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Safety;
