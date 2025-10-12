import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/Price";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { Star, DollarSign, Clock, MapPin } from "lucide-react";
import { Destination } from "@/types";

interface DestinationHeroProps {
  destination: Destination;
  onBookNow: () => void;
  onAddToItinerary: () => void;
}

export const DestinationHero = ({ 
  destination, 
  onBookNow, 
  onAddToItinerary 
}: DestinationHeroProps) => {
  return (
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
                {destination.continent || destination.country}
              </Badge>
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-4xl md:text-6xl font-bold">
                {destination.name}
              </h1>
              {destination.isVerified && (
                <VerifiedBadge 
                  source={destination.verificationSource || "trusted APIs"} 
                  size="md"
                />
              )}
            </div>
            
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
                  <Price priceString={destination.price.toString()} showOriginal />
                </span>
              </div>
              {destination.duration && (
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{Array.isArray(destination.duration) ? destination.duration[0] : destination.duration}</span>
                </div>
              )}
            </div>
            
            <p className="text-lg mb-8 opacity-90">
              {destination.description}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90"
                onClick={onBookNow}
              >
                Book This Destination
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={onAddToItinerary}
              >
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
  );
};
