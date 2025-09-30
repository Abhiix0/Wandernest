import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Train, 
  Bus, 
  Plane, 
  Car,
  Search,
  Calendar,
  Users,
  Clock,
  Star,
  MapPin,
  ArrowRight,
  ChevronDown,
  Shield,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react";
import { Link } from "react-router-dom";

const transportOptions = {
  flights: [
    {
      id: 1,
      provider: "SkyWings Airlines",
      from: "New York (JFK)",
      to: "London (LHR)",
      departure: "10:30 AM",
      arrival: "10:45 PM",
      duration: "7h 15m",
      price: 489,
      rating: 4.7,
      reviews: 2341,
      type: "Direct",
      cancellation: "Free cancellation up to 24 hours before departure",
      safetyRating: 95,
      amenities: ["WiFi", "Meals", "Entertainment", "Power Outlets"]
    },
    {
      id: 2,
      provider: "Global Express",
      from: "New York (JFK)",
      to: "London (LHR)",
      departure: "2:15 PM",
      arrival: "2:30 AM+1",
      duration: "9h 15m",
      price: 349,
      rating: 4.5,
      reviews: 1876,
      type: "1 Stop",
      cancellation: "Cancellation fee applies after booking",
      safetyRating: 92,
      amenities: ["WiFi", "Snacks", "Entertainment"]
    }
  ],
  trains: [
    {
      id: 3,
      provider: "EuroRail Express",
      from: "Paris",
      to: "Amsterdam",
      departure: "9:00 AM",
      arrival: "12:30 PM",
      duration: "3h 30m",
      price: 89,
      rating: 4.8,
      reviews: 1523,
      type: "High-speed",
      cancellation: "Full refund up to 48 hours before departure",
      safetyRating: 98,
      amenities: ["WiFi", "Power Outlets", "Quiet Carriages", "Café"]
    },
    {
      id: 4,
      provider: "Continental Railways",
      from: "Paris",
      to: "Amsterdam",
      departure: "1:45 PM",
      arrival: "5:30 PM",
      duration: "3h 45m",
      price: 65,
      rating: 4.6,
      reviews: 987,
      type: "Standard",
      cancellation: "Partially refundable up to 24 hours",
      safetyRating: 96,
      amenities: ["WiFi", "Snacks Available", "Storage"]
    }
  ],
  buses: [
    {
      id: 5,
      provider: "Comfort Coaches",
      from: "Barcelona",
      to: "Valencia",
      departure: "8:00 AM",
      arrival: "12:15 PM",
      duration: "4h 15m",
      price: 28,
      rating: 4.4,
      reviews: 645,
      type: "Express",
      cancellation: "Free cancellation up to 12 hours before",
      safetyRating: 94,
      amenities: ["WiFi", "AC", "Reclining Seats", "USB Ports"]
    },
    {
      id: 6,
      provider: "MegaBus Europe",
      from: "Barcelona",
      to: "Valencia",
      departure: "11:30 AM",
      arrival: "4:00 PM",
      duration: "4h 30m",
      price: 19,
      rating: 4.2,
      reviews: 423,
      type: "Standard",
      cancellation: "Non-refundable after booking",
      safetyRating: 91,
      amenities: ["WiFi", "AC", "Storage"]
    }
  ],
  taxis: [
    {
      id: 7,
      provider: "Premium Ride Service",
      from: "Airport",
      to: "City Center",
      departure: "On demand",
      arrival: "35 mins",
      duration: "35 mins",
      price: 45,
      rating: 4.9,
      reviews: 3421,
      type: "Verified Driver",
      cancellation: "Free cancellation up to 5 minutes before pickup",
      safetyRating: 97,
      amenities: ["GPS Tracking", "Driver Rating", "24/7 Support", "Cashless"]
    },
    {
      id: 8,
      provider: "Budget Taxi Co",
      from: "Airport",
      to: "City Center",
      departure: "On demand",
      arrival: "40 mins",
      duration: "40 mins",
      price: 32,
      rating: 4.5,
      reviews: 1872,
      type: "Standard",
      cancellation: "Cancellation may incur charges",
      safetyRating: 93,
      amenities: ["GPS Tracking", "Licensed Driver", "Cashless"]
    }
  ]
};

const safetyTips = [
  {
    category: "Before Booking",
    tips: [
      "Always book through verified providers",
      "Check reviews and safety ratings",
      "Verify cancellation policies",
      "Compare multiple options"
    ]
  },
  {
    category: "During Travel",
    tips: [
      "Keep your ticket/confirmation handy",
      "Share your travel details with contacts",
      "Stay alert and trust your instincts",
      "Keep valuables secure"
    ]
  },
  {
    category: "Women Travelers",
    tips: [
      "Book women-only compartments when available",
      "Travel during daylight hours when possible",
      "Sit near families or other women",
      "Have emergency contacts readily available"
    ]
  }
];

const Transportation = () => {
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    date: "",
    passengers: "1"
  });

  const [activeTab, setActiveTab] = useState("flights");

  const getIcon = (type: string) => {
    switch(type) {
      case "flights": return Plane;
      case "trains": return Train;
      case "buses": return Bus;
      case "taxis": return Car;
      default: return Plane;
    }
  };

  const currentResults = transportOptions[activeTab as keyof typeof transportOptions] || [];

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
              <Link to="/safety" className="hover:text-primary transition-smooth">Safety</Link>
              <Link to="/transportation" className="text-primary font-medium">Transportation</Link>
              <Link to="/book" className="hover:text-primary transition-smooth">Book Trip</Link>
              <Link to="/contact" className="hover:text-primary transition-smooth">Contact</Link>
            </nav>
            <div className="md:hidden">
              <Button variant="outline" size="sm">Menu</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-ocean-gradient text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Book Your Transportation
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Safe, verified transport options for every journey - flights, trains, buses, and taxis
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-card/50">
        <div className="container mx-auto px-4">
          <Card className="max-w-5xl mx-auto shadow-travel">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="md:col-span-2">
                  <label className="text-sm font-medium mb-2 block" htmlFor="from-input">
                    From
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="from-input"
                      placeholder="Departure city"
                      className="pl-10"
                      value={searchData.from}
                      onChange={(e) => setSearchData({...searchData, from: e.target.value})}
                      aria-label="Departure city or location"
                    />
                  </div>
                </div>

                <div className="flex items-end justify-center">
                  <ArrowRight className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-medium mb-2 block" htmlFor="to-input">
                    To
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="to-input"
                      placeholder="Arrival city"
                      className="pl-10"
                      value={searchData.to}
                      onChange={(e) => setSearchData({...searchData, to: e.target.value})}
                      aria-label="Arrival city or destination"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="text-sm font-medium mb-2 block" htmlFor="date-input">
                    Travel Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="date-input"
                      type="date"
                      className="pl-10"
                      value={searchData.date}
                      onChange={(e) => setSearchData({...searchData, date: e.target.value})}
                      aria-label="Select travel date"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block" htmlFor="passengers-input">
                    Passengers
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="passengers-input"
                      type="number"
                      min="1"
                      max="10"
                      className="pl-10"
                      value={searchData.passengers}
                      onChange={(e) => setSearchData({...searchData, passengers: e.target.value})}
                      aria-label="Number of passengers"
                    />
                  </div>
                </div>

                <div className="flex items-end">
                  <Button 
                    className="w-full bg-primary hover:bg-primary-hover"
                    aria-label="Search for transportation options"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Content - Results and Sidebar */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Results Section */}
            <div className="lg:col-span-3">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList 
                  className="grid w-full grid-cols-4 mb-8"
                  role="tablist"
                  aria-label="Transportation type filter"
                >
                  <TabsTrigger value="flights" className="flex items-center gap-2">
                    <Plane className="h-4 w-4" />
                    <span className="hidden sm:inline">Flights</span>
                  </TabsTrigger>
                  <TabsTrigger value="trains" className="flex items-center gap-2">
                    <Train className="h-4 w-4" />
                    <span className="hidden sm:inline">Trains</span>
                  </TabsTrigger>
                  <TabsTrigger value="buses" className="flex items-center gap-2">
                    <Bus className="h-4 w-4" />
                    <span className="hidden sm:inline">Buses</span>
                  </TabsTrigger>
                  <TabsTrigger value="taxis" className="flex items-center gap-2">
                    <Car className="h-4 w-4" />
                    <span className="hidden sm:inline">Taxis</span>
                  </TabsTrigger>
                </TabsList>

                {Object.keys(transportOptions).map((tabKey) => (
                  <TabsContent key={tabKey} value={tabKey}>
                    <div className="space-y-4" role="list" aria-label={`${tabKey} transportation options`}>
                      {currentResults.map((option: any) => {
                        const Icon = getIcon(activeTab);
                        return (
                          <Collapsible key={option.id}>
                            <Card className="hover-lift shadow-card">
                              <CardContent className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                  {/* Provider Info */}
                                  <div className="md:col-span-3">
                                    <div className="flex items-start gap-3">
                                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Icon className="h-6 w-6 text-primary" />
                                      </div>
                                      <div>
                                        <h3 className="font-semibold">{option.provider}</h3>
                                        <div className="flex items-center gap-1 mt-1">
                                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                          <span className="text-sm">{option.rating}</span>
                                          <span className="text-xs text-muted-foreground">({option.reviews})</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Journey Info */}
                                  <div className="md:col-span-5">
                                    <div className="flex items-center gap-4">
                                      <div className="text-center">
                                        <div className="font-bold text-lg">{option.departure}</div>
                                        <div className="text-sm text-muted-foreground">{option.from}</div>
                                      </div>
                                      
                                      <div className="flex-1 flex flex-col items-center">
                                        <div className="text-xs text-muted-foreground mb-1">{option.duration}</div>
                                        <div className="w-full h-0.5 bg-primary/20 relative">
                                          <div className="absolute inset-0 flex items-center justify-center">
                                            <ArrowRight className="h-4 w-4 text-primary bg-background" />
                                          </div>
                                        </div>
                                        <Badge variant="secondary" className="text-xs mt-1">{option.type}</Badge>
                                      </div>
                                      
                                      <div className="text-center">
                                        <div className="font-bold text-lg">{option.arrival}</div>
                                        <div className="text-sm text-muted-foreground">{option.to}</div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Price & Action */}
                                  <div className="md:col-span-4 flex items-center justify-between md:justify-end gap-4">
                                    <div className="text-right">
                                      <div className="text-2xl font-bold text-primary">${option.price}</div>
                                      <div className="text-xs text-muted-foreground">per person</div>
                                      <Badge className="mt-1 bg-green-600">
                                        <Shield className="h-3 w-3 mr-1" />
                                        {option.safetyRating}% Safe
                                      </Badge>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                      <Button className="bg-primary hover:bg-primary-hover">
                                        Book Now
                                      </Button>
                                      <CollapsibleTrigger asChild>
                                        <Button 
                                          variant="outline" 
                                          size="sm"
                                          aria-label="View more details about this transport option"
                                        >
                                          Details
                                          <ChevronDown className="h-4 w-4 ml-1" />
                                        </Button>
                                      </CollapsibleTrigger>
                                    </div>
                                  </div>
                                </div>

                                {/* Expandable Details */}
                                <CollapsibleContent>
                                  <div className="mt-6 pt-6 border-t grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                        Amenities
                                      </h4>
                                      <div className="flex flex-wrap gap-2">
                                        {option.amenities.map((amenity: string, idx: number) => (
                                          <Badge key={idx} variant="secondary" className="text-xs">
                                            {amenity}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>

                                    <div>
                                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                                        <Info className="h-4 w-4 text-blue-600" />
                                        Cancellation Policy
                                      </h4>
                                      <p className="text-sm text-muted-foreground">{option.cancellation}</p>
                                    </div>

                                    <div>
                                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                                        <Shield className="h-4 w-4 text-green-600" />
                                        Safety Rating
                                      </h4>
                                      <div className="flex items-center gap-2">
                                        <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                                          <div 
                                            className="bg-green-600 h-full" 
                                            style={{width: `${option.safetyRating}%`}}
                                            role="progressbar"
                                            aria-valuenow={option.safetyRating}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                            aria-label={`Safety rating: ${option.safetyRating} percent`}
                                          />
                                        </div>
                                        <span className="text-sm font-semibold">{option.safetyRating}%</span>
                                      </div>
                                      <p className="text-xs text-muted-foreground mt-2">
                                        Based on safety audits and user feedback
                                      </p>
                                    </div>

                                    <div>
                                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                                        <Star className="h-4 w-4 text-yellow-600" />
                                        Customer Reviews
                                      </h4>
                                      <div className="flex items-center gap-2">
                                        <div className="flex">
                                          {[...Array(5)].map((_, i) => (
                                            <Star 
                                              key={i} 
                                              className={`h-4 w-4 ${i < Math.floor(option.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                            />
                                          ))}
                                        </div>
                                        <span className="text-sm font-semibold">{option.rating}</span>
                                        <span className="text-sm text-muted-foreground">({option.reviews} reviews)</span>
                                      </div>
                                    </div>
                                  </div>
                                </CollapsibleContent>
                              </CardContent>
                            </Card>
                          </Collapsible>
                        );
                      })}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            {/* Safety Tips Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 shadow-travel">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Safety Tips
                  </CardTitle>
                  <CardDescription>
                    Best practices for safe travel
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {safetyTips.map((section, idx) => (
                    <div key={idx}>
                      <h4 className="font-semibold mb-3 text-sm">{section.category}</h4>
                      <ul className="space-y-2" role="list" aria-label={`${section.category} safety tips`}>
                        {section.tips.map((tip, tipIdx) => (
                          <li key={tipIdx} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  <div className="pt-4 border-t">
                    <div className="bg-primary/5 rounded-lg p-4">
                      <AlertCircle className="h-5 w-5 text-primary mb-2" />
                      <p className="text-xs text-muted-foreground">
                        All providers are verified and meet our safety standards. Report any issues to our 24/7 support.
                      </p>
                    </div>
                  </div>

                  <Link to="/safety">
                    <Button variant="outline" className="w-full">
                      More Safety Info
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Book With Us?</h2>
            <p className="text-xl text-muted-foreground">
              Safe, verified, and trusted by thousands of travelers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Verified Providers</h3>
              <p className="text-sm text-muted-foreground">All partners are safety-audited and licensed</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">Round-the-clock assistance whenever you need</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Best Prices</h3>
              <p className="text-sm text-muted-foreground">Compare options and get the best deals</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Real Reviews</h3>
              <p className="text-sm text-muted-foreground">Authentic feedback from verified travelers</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Transportation;
