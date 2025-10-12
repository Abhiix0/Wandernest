import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, MapPin } from "lucide-react";
import { logger } from "@/lib/logger";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    logger.routeError(location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-travel">
        <CardContent className="text-center p-8">
          <div className="mb-6">
            <div className="text-8xl font-bold text-primary mb-4">404</div>
            <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Destination Not Found</h1>
          <p className="text-muted-foreground mb-6">
            Looks like you've wandered off the beaten path. The page you're looking for doesn't exist.
          </p>
          
          <div className="space-y-3">
            <Link to="/" className="block">
              <Button className="w-full bg-primary hover:bg-primary-hover">
                <Home className="h-4 w-4 mr-2" />
                Return Home
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
          
          <div className="mt-6 text-sm text-muted-foreground">
            <p>Or explore our popular destinations:</p>
            <div className="flex flex-wrap gap-2 mt-2 justify-center">
              <Link to="/destinations" className="text-primary hover:underline">
                Browse All Destinations
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
