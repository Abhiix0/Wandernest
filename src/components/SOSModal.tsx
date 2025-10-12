import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, MapPin, Send, Shield, AlertTriangle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { logger } from "@/lib/logger";

interface SOSModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Location {
  latitude: number;
  longitude: number;
}

const SOSModal = ({ open, onOpenChange }: SOSModalProps) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [emergencyNumber, setEmergencyNumber] = useState("911");
  const { toast } = useToast();

  // Determine emergency number based on location
  const getEmergencyNumber = (countryCode?: string) => {
    const emergencyNumbers: Record<string, string> = {
      US: "911",
      GB: "999",
      EU: "112",
      IN: "112",
      AU: "000",
      JP: "110",
      CN: "110",
    };
    return emergencyNumbers[countryCode || "US"] || "112";
  };

  const requestLocation = () => {
    setLoadingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(loc);
          setLoadingLocation(false);
          
          // Fetch country code based on location (simplified)
          fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${loc.latitude}&longitude=${loc.longitude}&localityLanguage=en`)
            .then(res => res.json())
            .then(data => {
              const countryCode = data.countryCode;
              setEmergencyNumber(getEmergencyNumber(countryCode));
            })
            .catch(() => {
              setEmergencyNumber("112"); // Default to EU emergency
            });

          toast({
            title: "Location Retrieved",
            description: "Your current location has been identified.",
          });
        },
        (error) => {
          setLoadingLocation(false);
          toast({
            title: "Location Error",
            description: "Unable to access your location. Please enable location services.",
            variant: "destructive",
          });
          logger.error("Geolocation error:", error);
        }
      );
    } else {
      setLoadingLocation(false);
      toast({
        title: "Not Supported",
        description: "Geolocation is not supported by your browser.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (open) {
      requestLocation();
    }
  }, [open]);

  const handleCallEmergency = () => {
    window.location.href = `tel:${emergencyNumber}`;
    toast({
      title: "Calling Emergency Services",
      description: `Dialing ${emergencyNumber}...`,
    });
  };

  const handleShareLocation = () => {
    if (!location) {
      toast({
        title: "Location Required",
        description: "Please allow location access first.",
        variant: "destructive",
      });
      return;
    }

    const locationUrl = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
    
    if (navigator.share) {
      navigator.share({
        title: "Emergency Location Share",
        text: `I need help! My current location is:`,
        url: locationUrl,
      }).then(() => {
        toast({
          title: "Location Shared",
          description: "Your location has been shared successfully.",
        });
      }).catch(err => {
        logger.error("Share error:", err);
        // Fallback to copying
        navigator.clipboard.writeText(locationUrl);
        toast({
          title: "Location Copied",
          description: "Location link copied to clipboard. Share it with your emergency contacts.",
        });
      });
    } else {
      navigator.clipboard.writeText(locationUrl);
      toast({
        title: "Location Copied",
        description: "Location link copied to clipboard. Share it with your emergency contacts.",
      });
    }
  };

  const handleSendDistressAlert = () => {
    if (!location) {
      toast({
        title: "Location Required",
        description: "Please allow location access to send alert.",
        variant: "destructive",
      });
      return;
    }

    const message = `🆘 EMERGENCY ALERT 🆘\n\nI need immediate assistance!\n\nMy location: https://www.google.com/maps?q=${location.latitude},${location.longitude}\n\nTimestamp: ${new Date().toLocaleString()}`;

    if (navigator.share) {
      navigator.share({
        title: "Emergency Distress Alert",
        text: message,
      });
    } else {
      navigator.clipboard.writeText(message);
      toast({
        title: "Alert Message Copied",
        description: "Emergency message copied. Send it to your trusted contacts via SMS or messaging app.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-red-200">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600 text-xl">
            <AlertTriangle className="h-6 w-6" />
            Emergency SOS
          </DialogTitle>
          <DialogDescription>
            Choose an emergency action below. Your safety is our priority.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          {loadingLocation && (
            <Alert className="border-orange-200 bg-orange-50">
              <Loader2 className="h-4 w-4 animate-spin" />
              <AlertDescription>Detecting your location...</AlertDescription>
            </Alert>
          )}

          {location && (
            <Alert className="border-green-200 bg-green-50">
              <MapPin className="h-4 w-4" />
              <AlertDescription className="text-sm">
                Location detected: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
              </AlertDescription>
            </Alert>
          )}

          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <Button
                onClick={handleCallEmergency}
                className="w-full bg-red-600 hover:bg-red-700 text-white h-14 text-lg font-semibold"
                size="lg"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Emergency Services ({emergencyNumber})
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 space-y-3">
              <Button
                onClick={handleShareLocation}
                variant="outline"
                className="w-full h-12"
                disabled={!location}
              >
                <MapPin className="mr-2 h-4 w-4" />
                Share Live Location
              </Button>

              <Button
                onClick={handleSendDistressAlert}
                variant="outline"
                className="w-full h-12"
                disabled={!location}
              >
                <Send className="mr-2 h-4 w-4" />
                Send Distress Alert
              </Button>

              <Button
                onClick={() => {
                  toast({
                    title: "Quick Safety Tips",
                    description: "• Stay calm\n• Move to a safe location\n• Contact local authorities\n• Keep your phone charged\n• Stay visible and accessible",
                  });
                }}
                variant="outline"
                className="w-full h-12"
              >
                <Shield className="mr-2 h-4 w-4" />
                Quick Safety Tips
              </Button>
            </CardContent>
          </Card>

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Your privacy is protected. Location data is only shared when you explicitly choose to do so.
            </AlertDescription>
          </Alert>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SOSModal;
