import { useState } from "react";
import { Helmet } from "react-helmet";
import { Users, MapPin, Calendar, Heart, Shield, CheckCircle2, Filter, MessageCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

interface Traveler {
  id: string;
  name: string;
  avatar: string;
  destination: string;
  dates: string;
  interests: string[];
  gender: string;
  age: number;
  verified: boolean;
  bio: string;
  safetyRating: number;
}

const TravelBuddy = () => {
  const { toast } = useToast();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGender, setSelectedGender] = useState<string>("all");
  const [selectedDestination, setSelectedDestination] = useState<string>("all");

  const travelers: Traveler[] = [
    {
      id: "1",
      name: "Sarah Chen",
      avatar: "/placeholder.svg",
      destination: "Bali, Indonesia",
      dates: "Mar 15-25, 2025",
      interests: ["Yoga", "Photography", "Beaches"],
      gender: "Female",
      age: 28,
      verified: true,
      bio: "Solo traveler looking for like-minded companions to explore temples and beaches. Love morning yoga sessions!",
      safetyRating: 98,
    },
    {
      id: "2",
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg",
      destination: "Tokyo, Japan",
      dates: "Apr 1-14, 2025",
      interests: ["Food", "Culture", "Shopping"],
      gender: "Female",
      age: 32,
      verified: true,
      bio: "First time in Japan! Would love to meet other travelers to explore food markets and cultural sites together.",
      safetyRating: 95,
    },
    {
      id: "3",
      name: "Alex Kim",
      avatar: "/placeholder.svg",
      destination: "Paris, France",
      dates: "May 5-15, 2025",
      interests: ["Art", "History", "Cafes"],
      gender: "Non-binary",
      age: 26,
      verified: true,
      bio: "Art enthusiast planning to visit every museum in Paris. Looking for museum buddies and cafe companions!",
      safetyRating: 97,
    },
    {
      id: "4",
      name: "Maya Patel",
      avatar: "/placeholder.svg",
      destination: "Bali, Indonesia",
      dates: "Mar 18-28, 2025",
      interests: ["Hiking", "Wellness", "Nature"],
      gender: "Female",
      age: 30,
      verified: true,
      bio: "Wellness retreat in Ubud! Seeking travel companions for sunrise hikes and wellness activities.",
      safetyRating: 99,
    },
  ];

  const destinations = ["all", "Bali, Indonesia", "Tokyo, Japan", "Paris, France"];
  const genderOptions = ["all", "Female", "Male", "Non-binary", "Prefer not to say"];

  const filteredTravelers = travelers.filter((traveler) => {
    const genderMatch = selectedGender === "all" || traveler.gender === selectedGender;
    const destinationMatch =
      selectedDestination === "all" || traveler.destination === selectedDestination;
    return genderMatch && destinationMatch;
  });

  const handleConnect = (name: string) => {
    toast({
      title: "Connection Request Sent",
      description: `Your request to connect with ${name} has been sent`,
    });
  };

  return (
    <>
      <Helmet>
        <title>Travel Buddy Finder - Connect with Fellow Travelers | WanderWise</title>
        <meta
          name="description"
          content="Find verified travel companions with similar interests and destinations. Connect safely with fellow travelers around the world."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
              <Users className="h-10 w-10 text-primary" aria-hidden="true" />
              Travel Buddy Finder
            </h1>
            <p className="text-muted-foreground text-lg">
              Connect with verified travelers heading to your destination
            </p>
          </header>

          {/* Safety Tips Banner */}
          <Card className="mb-6 bg-primary/5 border-primary/30">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary mt-1 flex-shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Safety Meeting Tips</h3>
                  <ul className="text-sm text-muted-foreground space-y-1" role="list">
                    <li>• Always meet in public places first</li>
                    <li>• Share your itinerary with friends or family</li>
                    <li>• Video chat before meeting in person</li>
                    <li>• Trust your instincts - if something feels off, it probably is</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Filters */}
          <section className="mb-6" aria-label="Traveler filters">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="mb-4 gap-2"
              aria-expanded={showFilters}
              aria-controls="filter-options"
            >
              <Filter className="h-4 w-4" aria-hidden="true" />
              Filters
            </Button>

            {showFilters && (
              <Card id="filter-options" className="mb-6">
                <CardContent className="p-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="destination-filter" className="text-sm font-medium mb-2 block">
                        Destination
                      </label>
                      <select
                        id="destination-filter"
                        className="w-full p-2 rounded-md border border-input bg-background"
                        value={selectedDestination}
                        onChange={(e) => setSelectedDestination(e.target.value)}
                        aria-label="Filter by destination"
                      >
                        {destinations.map((dest) => (
                          <option key={dest} value={dest}>
                            {dest === "all" ? "All Destinations" : dest}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="gender-filter" className="text-sm font-medium mb-2 block">
                        Gender Preference
                      </label>
                      <select
                        id="gender-filter"
                        className="w-full p-2 rounded-md border border-input bg-background"
                        value={selectedGender}
                        onChange={(e) => setSelectedGender(e.target.value)}
                        aria-label="Filter by gender"
                      >
                        {genderOptions.map((gender) => (
                          <option key={gender} value={gender}>
                            {gender === "all" ? "All Genders" : gender}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </section>

          {/* Travelers Grid */}
          <section aria-label="Travel buddy results">
            <h2 className="text-xl font-semibold mb-4">
              Available Travel Buddies ({filteredTravelers.length})
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTravelers.map((traveler) => (
                <Card key={traveler.id} className="border-muted hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={traveler.avatar} alt="" />
                        <AvatarFallback className="text-lg">
                          {traveler.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-lg truncate">{traveler.name}</CardTitle>
                          {traveler.verified && (
                            <CheckCircle2
                              className="h-5 w-5 text-primary flex-shrink-0"
                              aria-label="Verified user"
                            />
                          )}
                        </div>
                        <CardDescription className="text-sm">
                          {traveler.age} • {traveler.gender}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
                        <span className="truncate">{traveler.destination}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
                        <span>{traveler.dates}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Shield className="h-4 w-4 text-green-500 flex-shrink-0" aria-hidden="true" />
                        <span>Safety Rating: {traveler.safetyRating}/100</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Interests:</p>
                      <div className="flex flex-wrap gap-2">
                        {traveler.interests.map((interest, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">{traveler.bio}</p>

                    <div className="flex gap-2">
                      <Button
                        className="flex-1"
                        onClick={() => handleConnect(traveler.name)}
                        aria-label={`Send connection request to ${traveler.name}`}
                      >
                        <MessageCircle className="h-4 w-4 mr-2" aria-hidden="true" />
                        Connect
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        aria-label={`Save ${traveler.name} to favorites`}
                      >
                        <Heart className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default TravelBuddy;
