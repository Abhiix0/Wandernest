import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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

interface MapMarkersProps {
  locations: Location[];
  onMarkerClick: (location: Location) => void;
}

export const MapMarkers = ({ locations, onMarkerClick }: MapMarkersProps) => {
  return (
    <>
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.lat, location.lng]}
          eventHandlers={{
            click: () => onMarkerClick(location),
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
    </>
  );
};
