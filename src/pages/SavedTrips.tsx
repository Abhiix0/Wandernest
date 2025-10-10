import { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  Heart,
  Clock,
  Plane
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface Trip {
  id: string;
  destination: string;
  dates: string;
  duration: string;
  budget: number;
  image: string;
  status: "upcoming" | "past" | "wishlist";
  activities: number;
}

const SavedTrips = () => {
  const { toast } = useToast();
  const [trips, setTrips] = useState<Trip[]>([
    {
      id: "1",
      destination: "Paris, France",
      dates: "May 15-22, 2025",
      duration: "7 days",
      budget: 2500,
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop",
      status: "upcoming",
      activities: 12,
    },
    {
      id: "2",
      destination: "Tokyo, Japan",
      dates: "March 10-20, 2025",
      duration: "10 days",
      budget: 3200,
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop",
      status: "past",
      activities: 18,
    },
    {
      id: "3",
      destination: "Santorini, Greece",
      dates: "TBD",
      duration: "5 days",
      budget: 1800,
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&auto=format&fit=crop",
      status: "wishlist",
      activities: 8,
    },
  ]);

  const handleDelete = (id: string) => {
    setTrips(trips.filter(trip => trip.id !== id));
    toast({
      title: "Trip Deleted",
      description: "Your trip has been removed from your dashboard.",
    });
  };

  const handleView = (destination: string) => {
    toast({
      title: "Opening Trip",
      description: `Loading details for ${destination}...`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Plane className="h-4 w-4" />;
      case "past":
        return <Clock className="h-4 w-4" />;
      case "wishlist":
        return <Heart className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-primary/10 text-primary border-primary/20";
      case "past":
        return "bg-muted text-muted-foreground border-border";
      case "wishlist":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "";
    }
  };

  const filterTrips = (status: string) => {
    if (status === "all") return trips;
    return trips.filter(trip => trip.status === status);
  };

  const TripCard = ({ trip }: { trip: Trip }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={trip.image} 
          alt={trip.destination}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          <Badge className={getStatusColor(trip.status)}>
            <span className="flex items-center gap-1">
              {getStatusIcon(trip.status)}
              {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
            </span>
          </Badge>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{trip.destination}</CardTitle>
        <CardDescription className="space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{trip.dates}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {trip.duration}
            </span>
            <span className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              ${trip.budget}
            </span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {trip.activities} activities planned
          </p>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleView(trip.destination)}
            >
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button 
              variant="outline" 
              size="sm"
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleDelete(trip.id)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const EmptyState = ({ type }: { type: string }) => (
    <Card className="p-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
          <MapPin className="h-10 w-10 text-primary" />
        </div>
        <h3 className="text-xl font-semibold">No {type} trips yet</h3>
        <p className="text-muted-foreground max-w-sm mx-auto">
          {type === "upcoming" && "Start planning your next adventure!"}
          {type === "past" && "Your travel memories will appear here"}
          {type === "wishlist" && "Add destinations you dream of visiting"}
        </p>
        <Link to="/itinerary-builder">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create New Trip
          </Button>
        </Link>
      </div>
    </Card>
  );

  return (
    <>
      <Helmet>
        <title>My Trips - WanderNest</title>
        <meta name="description" content="View and manage your saved trips, upcoming adventures, and travel wishlist." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                My Trips Dashboard
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Manage your upcoming adventures, past travels, and dream destinations
              </p>
              <Link to="/itinerary-builder">
                <Button size="lg">
                  <Plus className="h-5 w-5 mr-2" />
                  Create New Trip
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <Tabs defaultValue="all" className="space-y-8">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
                <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6">
                {trips.length === 0 ? (
                  <EmptyState type="all" />
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trips.map(trip => (
                      <TripCard key={trip.id} trip={trip} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="upcoming" className="space-y-6">
                {filterTrips("upcoming").length === 0 ? (
                  <EmptyState type="upcoming" />
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filterTrips("upcoming").map(trip => (
                      <TripCard key={trip.id} trip={trip} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="past" className="space-y-6">
                {filterTrips("past").length === 0 ? (
                  <EmptyState type="past" />
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filterTrips("past").map(trip => (
                      <TripCard key={trip.id} trip={trip} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="wishlist" className="space-y-6">
                {filterTrips("wishlist").length === 0 ? (
                  <EmptyState type="wishlist" />
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filterTrips("wishlist").map(trip => (
                      <TripCard key={trip.id} trip={trip} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t py-8 mt-12">
          <div className="container mx-auto px-4 text-center text-muted-foreground">
            <p>&copy; 2025 WanderNest. Your journey starts here.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default SavedTrips;
