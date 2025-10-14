import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Star, Clock, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { VerifiedBadge } from "@/components/VerifiedBadge";

interface Attraction {
  id: string;
  name: string;
  category: string;
  distance: string;
  rating: number;
  isOpen: boolean;
  description: string;
  isVerified: boolean;
  verificationSource: string;
}

const NearbyAttractions = () => {
  const [location, setLocation] = useState("");
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const searchAttractions = () => {
    if (!location.trim()) {
      toast({
        title: "Enter a location",
        description: "Please enter your current location",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    // Simulated data - in production, integrate with Google Places or OpenStreetMap API
    setTimeout(() => {
      setAttractions([
        {
          id: "1",
          name: "Historic City Museum",
          category: "Museum",
          distance: "0.5 km",
          rating: 4.7,
          isOpen: true,
          description: "Explore the rich history of the region",
          isVerified: true,
          verificationSource: "OpenStreetMap",
        },
        {
          id: "2",
          name: "Central Park",
          category: "Park",
          distance: "1.2 km",
          rating: 4.9,
          isOpen: true,
          description: "Beautiful green space perfect for relaxation",
          isVerified: true,
          verificationSource: "Google Places",
        },
        {
          id: "3",
          name: "Local Art Gallery",
          category: "Gallery",
          distance: "2.0 km",
          rating: 4.5,
          isOpen: false,
          description: "Contemporary art exhibitions and installations",
          isVerified: true,
          verificationSource: "OpenStreetMap",
        },
        {
          id: "4",
          name: "Traditional Food Market",
          category: "Food & Dining",
          distance: "0.8 km",
          rating: 4.8,
          isOpen: true,
          description: "Authentic local cuisine and fresh produce",
          isVerified: true,
          verificationSource: "Google Places",
        },
        {
          id: "5",
          name: "Ancient Temple",
          category: "Religious Site",
          distance: "3.5 km",
          rating: 4.9,
          isOpen: true,
          description: "Sacred temple with stunning architecture",
          isVerified: true,
          verificationSource: "Wikipedia & OpenStreetMap",
        },
      ]);
      setLoading(false);
      toast({
        title: "Attractions found",
        description: `Found nearby attractions in ${location}`,
      });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <PageHeader
        title="Nearby Attractions"
        subtitle="Discover interesting places around you"
      />

      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="h-6 w-6" />
              Search Nearby
            </CardTitle>
            <CardDescription>Enter your location to find nearby attractions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Enter your current location (e.g., Paris, France)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && searchAttractions()}
              />
              <Button onClick={searchAttractions} disabled={loading}>
                <Search className="mr-2 h-4 w-4" />
                {loading ? "Searching..." : "Search"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {attractions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {attractions.map((attraction) => (
              <Card key={attraction.id} className="hover:shadow-lg transition-smooth">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2 mb-2">
                        {attraction.name}
                        {attraction.isVerified && (
                          <VerifiedBadge source={attraction.verificationSource} />
                        )}
                      </CardTitle>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary">{attraction.category}</Badge>
                        <Badge variant={attraction.isOpen ? "default" : "destructive"}>
                          <Clock className="mr-1 h-3 w-3" />
                          {attraction.isOpen ? "Open Now" : "Closed"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{attraction.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{attraction.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{attraction.distance} away</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Navigation className="mr-2 h-4 w-4" />
                      Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {attractions.length === 0 && location && !loading && (
          <Card>
            <CardContent className="text-center py-12">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                No attractions found. Try searching for a different location.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default NearbyAttractions;
