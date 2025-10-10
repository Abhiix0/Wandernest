import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Star, 
  Plane, 
  Shield, 
  Bus, 
  Clock,
  ChevronRight,
  ArrowLeft,
  Map
} from "lucide-react";
import { destinations, Destination } from "@/data/destinations";
import { CurrencySelector } from "@/components/CurrencySelector";
import { Price } from "@/components/Price";
import { useState } from "react";

const DestinationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const destination = destinations.find(d => d.id === Number(id));

  if (!destination) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Destination Not Found</h1>
          <p className="text-muted-foreground mb-6">The destination you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/destinations")}>
            Back to Destinations
          </Button>
        </div>
      </div>
    );
  }

  const relatedDestinations = destination.nearbyDestinations
    ? destinations.filter(d => 
        destination.nearbyDestinations?.some(nearby => 
          d.name.toLowerCase().includes(nearby.toLowerCase())
        )
      ).slice(0, 3)
    : destinations
        .filter(d => d.id !== destination.id && d.country === destination.country)
        .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Button variant="ghost" onClick={() => navigate("/destinations")} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Destinations
        </Button>
      </div>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/destinations" className="hover:text-primary">Destinations</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">{destination.country}</span>
          {destination.parentLocation && (
            <>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">{destination.name}</span>
            </>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-hero-gradient text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                {destination.locationType && (
                  <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white">
                    {destination.locationType.charAt(0).toUpperCase() + destination.locationType.slice(1)}
                  </Badge>
                )}
                <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white">
                  {destination.continent}
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {destination.name}
              </h1>
              
              {destination.parentLocation && (
                <p className="text-xl mb-4 opacity-90">
                  {destination.parentLocation}
                </p>
              )}
              
              <p className="text-xl mb-6 opacity-90">
                {destination.country}
              </p>
              
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-semibold">{destination.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  <span className="text-lg font-semibold">
                    <Price priceString={destination.price} showOriginal />
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{destination.duration}</span>
                </div>
              </div>
              
              <p className="text-lg mb-8 opacity-90">
                {destination.description}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Book This Destination
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Add to Itinerary
                </Button>
              </div>
            </div>
            
            <div className="w-full md:w-96 h-64 md:h-96 bg-muted rounded-lg overflow-hidden shadow-elegant">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <MapPin className="h-24 w-24 text-white/50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="py-8 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Calendar className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Best Season</p>
                    <p className="font-semibold">{destination.bestSeason}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Plane className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Airport</p>
                    <p className="font-semibold text-sm">{destination.airport}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Currency</p>
                    <p className="font-semibold">{destination.currency}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Star className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Budget Level</p>
                    <p className="font-semibold">{destination.budgetLevel}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              {destination.overview && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {destination.overview}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Top Attractions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-primary" />
                    Top Attractions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {destination.topAttractions.map((attraction, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-accent/10 hover:bg-accent/20 transition-smooth">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          {index + 1}
                        </div>
                        <p className="font-medium">{attraction}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Suggested Itinerary */}
              {destination.suggestedItinerary && destination.suggestedItinerary.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Calendar className="h-6 w-6 text-primary" />
                      Suggested Itinerary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {destination.suggestedItinerary.map((day, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                              {index + 1}
                            </div>
                          </div>
                          <div className="flex-1 pt-2">
                            <p className="font-medium text-foreground">{day}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Safety Tips */}
              {destination.safetyTips && destination.safetyTips.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Shield className="h-6 w-6 text-primary" />
                      Safety Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {destination.safetyTips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Shield className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Local Transport */}
              {destination.localTransport && destination.localTransport.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Bus className="h-6 w-6 text-primary" />
                      Local Transport Options
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {destination.localTransport.map((transport, index) => (
                        <Badge key={index} variant="outline" className="text-sm py-2 px-4">
                          {transport}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Travel Types */}
              <Card>
                <CardHeader>
                  <CardTitle>Travel Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {destination.travelType.map((type, index) => (
                      <Badge key={index} variant="secondary">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Budget Info */}
              {destination.averageDailyCost && (
                <Card>
                  <CardHeader>
                    <CardTitle>Budget Guide</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Average Daily Cost</p>
                      <p className="text-2xl font-bold text-primary">{destination.averageDailyCost}</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Budget Level</p>
                      <Badge variant="outline" className="text-lg py-1">
                        {destination.budgetLevel}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Plan Your Trip</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" onClick={() => navigate("/itinerary-builder")}>
                    Build Itinerary
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => navigate("/book")}>
                    Book Hotels
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => navigate("/map")}>
                    <Map className="h-4 w-4 mr-2" />
                    View on Map
                  </Button>
                </CardContent>
              </Card>

              {/* Nearby Destinations */}
              {destination.nearbyDestinations && destination.nearbyDestinations.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Nearby Places</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {destination.nearbyDestinations.map((nearby, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>{nearby}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Destinations */}
      {relatedDestinations.length > 0 && (
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedDestinations.map((dest) => (
                <Card key={dest.id} className="overflow-hidden hover-lift shadow-card cursor-pointer" onClick={() => navigate(`/destinations/${dest.id}`)}>
                  <div className="h-48 bg-muted relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                    <div className="absolute bottom-4 left-4 z-20 text-white">
                      <div className="flex items-center gap-1 mb-2">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm font-medium">{dest.name}, {dest.country}</span>
                      </div>
                      <Badge variant="secondary" className="bg-white/20 text-white backdrop-blur-sm">
                        ★ {dest.rating}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg">{dest.name}</span>
                      <span className="text-sm text-primary font-bold">
                        <Price priceString={dest.price} showOriginal />
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{dest.description}</p>
                    <Button className="w-full" size="sm">View Details</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-accent text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let us help you create the perfect itinerary for {destination.name}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-accent hover:bg-white/90" onClick={() => navigate("/itinerary-builder")}>
              Build Custom Itinerary
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" onClick={() => navigate("/contact")}>
              Contact Travel Expert
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DestinationDetails;
