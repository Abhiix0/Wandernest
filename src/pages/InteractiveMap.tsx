import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import { MapPin, Hotel, UtensilsCrossed, Landmark, Shield, Navigation, Heart, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { destinations } from "@/data/destinations";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Leaflet
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Location {
  id: string;
  name: string;
  category: "attraction" | "hotel" | "restaurant" | "safety";
  lat: number;
  lng: number;
  rating: number;
  price?: string;
  safetyScore?: number;
  saved: boolean;
  description?: string;
  detailsLink?: string;
}

const InteractiveMap = () => {
  const { toast } = useToast();
  const [activeFilters, setActiveFilters] = useState<string[]>(["attraction"]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [showRouteOptions, setShowRouteOptions] = useState(false);

  // Transform destinations data into map locations
  const generateLocations = (): Location[] => {
    return destinations
      .filter(dest => dest.coordinates)
      .map(dest => ({
        id: dest.id.toString(),
        name: dest.name,
        category: "attraction" as const,
        lat: dest.coordinates!.lat,
        lng: dest.coordinates!.lng,
        rating: dest.rating,
        price: dest.price,
        saved: false,
        description: dest.description,
        detailsLink: `/destinations/${dest.id}`
      }));
  };

  const [locationStates, setLocationStates] = useState<Location[]>(generateLocations());

  const filters = [
    { value: "attraction", label: "Attractions", icon: Landmark, color: "bg-blue-500" },
    { value: "hotel", label: "Hotels", icon: Hotel, color: "bg-purple-500" },
    { value: "restaurant", label: "Restaurants", icon: UtensilsCrossed, color: "bg-orange-500" },
    { value: "safety", label: "Safety Points", icon: Shield, color: "bg-green-500" },
  ];

  const toggleFilter = (value: string) => {
    setActiveFilters((prev) =>
      prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value]
    );
  };

  const toggleSave = (id: string) => {
    setLocationStates((prev) =>
      prev.map((loc) => (loc.id === id ? { ...loc, saved: !loc.saved } : loc))
    );
    const location = locationStates.find((loc) => loc.id === id);
    toast({
      title: location?.saved ? "Removed from saved" : "Saved location",
      description: location?.name,
    });
  };

  const handlePlanRoute = () => {
    setShowRouteOptions(true);
    toast({
      title: "Route Planning",
      description: "Calculating safest route...",
    });
  };

  const filteredLocations = locationStates.filter((loc) => activeFilters.includes(loc.category));

  const getCategoryIcon = (category: string) => {
    const filter = filters.find((f) => f.value === category);
    return filter ? filter.icon : MapPin;
  };

  const getCategoryColor = (category: string) => {
    const filter = filters.find((f) => f.value === category);
    return filter ? filter.color : "bg-gray-500";
  };

  return (
    <>
      <Helmet>
        <title>Interactive Map - Explore Destinations | WanderWise</title>
        <meta
          name="description"
          content="Explore attractions, hotels, restaurants, and safety points on an interactive map. Plan safe routes and bookmark your favorite locations."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <header className="mb-6">
            <h1 className="text-4xl font-bold text-foreground mb-2">Interactive Map</h1>
            <p className="text-muted-foreground text-lg">
              Explore attractions, hotels, restaurants, and safety points
            </p>
          </header>

          {/* Filters */}
          <section className="mb-6" aria-label="Map filters">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
              <h2 className="text-lg font-semibold">Filters</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => {
                const Icon = filter.icon;
                const isActive = activeFilters.includes(filter.value);
                return (
                  <Button
                    key={filter.value}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleFilter(filter.value)}
                    className="gap-2"
                    aria-pressed={isActive}
                    aria-label={`Filter by ${filter.label}`}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {filter.label}
                  </Button>
                );
              })}
            </div>
          </section>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Map Display */}
            <section className="lg:col-span-2" aria-label="Interactive tourist map">
              <Card className="border-primary/20 shadow-lg overflow-hidden rounded-xl">
                <div className="relative h-[70vh] min-h-[500px]">
                  <MapContainer
                    center={[20.5937, 78.9629]}
                    zoom={5}
                    style={{ height: "100%", width: "100%", borderRadius: "0.75rem" }}
                    scrollWheelZoom={true}
                    className="z-0"
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {filteredLocations.map((location) => (
                      <Marker
                        key={location.id}
                        position={[location.lat, location.lng]}
                        eventHandlers={{
                          click: () => setSelectedLocation(location),
                        }}
                      >
                        <Popup>
                          <div className="p-2 min-w-[200px]">
                            <h3 className="font-semibold text-base mb-1">{location.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2 capitalize">
                              {location.category}
                            </p>
                            {location.description && (
                              <p className="text-sm mb-2 line-clamp-2">{location.description}</p>
                            )}
                            {location.rating > 0 && (
                              <p className="text-sm mb-2">Rating: {location.rating} ⭐</p>
                            )}
                            {location.detailsLink && (
                              <Link to={location.detailsLink}>
                                <Button size="sm" className="w-full mt-2">
                                  View Details
                                </Button>
                              </Link>
                            )}
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              </Card>

              {/* Route Planning */}
              {showRouteOptions && (
                <Card className="mt-4 bg-primary/5 border-primary/30">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Navigation className="h-5 w-5 text-primary mt-1" aria-hidden="true" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-2">Safe Route</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Distance:</span>
                            <span className="font-medium">2.3 km</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Est. Time:</span>
                            <span className="font-medium">28 minutes walk</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Safety Score:</span>
                            <Badge className="bg-green-500">92/100</Badge>
                          </div>
                        </div>
                        <Button className="w-full mt-4" size="sm">
                          Start Navigation
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </section>

            {/* Locations List */}
            <aside className="space-y-4" aria-label="Location details">
              <h2 className="text-xl font-semibold mb-4">
                Locations ({filteredLocations.length})
              </h2>

              {selectedLocation && (
                <Card className="border-primary shadow-lg">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-foreground">
                            {selectedLocation.name}
                          </h3>
                          <p className="text-sm text-muted-foreground capitalize">
                            {selectedLocation.category}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleSave(selectedLocation.id)}
                          aria-label={selectedLocation.saved ? "Remove from saved" : "Save location"}
                        >
                          <Heart
                            className={`h-5 w-5 ${
                              selectedLocation.saved ? "fill-red-500 text-red-500" : ""
                            }`}
                            aria-hidden="true"
                          />
                        </Button>
                      </div>

                      {selectedLocation.rating > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Rating:</span>
                          <Badge variant="secondary">{selectedLocation.rating} ⭐</Badge>
                        </div>
                      )}

                      {selectedLocation.price && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Price:</span>
                          <span className="text-sm text-muted-foreground">
                            {selectedLocation.price}
                          </span>
                        </div>
                      )}

                      {selectedLocation.safetyScore !== undefined && (
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-green-500" aria-hidden="true" />
                          <span className="text-sm font-medium">Safety Score:</span>
                          <Badge className="bg-green-500">{selectedLocation.safetyScore}</Badge>
                        </div>
                      )}

                      <Button
                        className="w-full"
                        onClick={handlePlanRoute}
                        aria-label={`Plan route to ${selectedLocation.name}`}
                      >
                        <Navigation className="h-4 w-4 mr-2" aria-hidden="true" />
                        Plan Route
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-3">
                {filteredLocations.map((location) => {
                  const Icon = getCategoryIcon(location.category);
                  const colorClass = getCategoryColor(location.category);
                  return (
                    <Card
                      key={location.id}
                      className={`cursor-pointer border-muted hover:border-primary/50 transition-colors ${
                        selectedLocation?.id === location.id ? "border-primary" : ""
                      }`}
                      onClick={() => setSelectedLocation(location)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Select ${location.name}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setSelectedLocation(location);
                        }
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${colorClass} text-white`}>
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-semibold text-foreground truncate">
                                {location.name}
                              </h3>
                              {location.saved && (
                                <Heart className="h-4 w-4 fill-red-500 text-red-500 flex-shrink-0" aria-label="Saved" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground capitalize">
                              {location.category}
                            </p>
                            {location.rating > 0 && (
                              <p className="text-sm mt-1">{location.rating} ⭐</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default InteractiveMap;
