import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WeatherForecast = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchWeather = async () => {
    if (!location.trim()) {
      toast({
        title: "Enter a location",
        description: "Please enter a city or destination name",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    // Simulated weather data - in production, integrate with OpenWeatherMap API
    setTimeout(() => {
      setWeatherData({
        location: location,
        temperature: 28,
        condition: "Partly Cloudy",
        humidity: 65,
        windSpeed: 12,
        visibility: 10,
        forecast: [
          { day: "Today", high: 28, low: 22, condition: "Partly Cloudy" },
          { day: "Tomorrow", high: 30, low: 24, condition: "Sunny" },
          { day: "Wed", high: 27, low: 21, condition: "Rainy" },
          { day: "Thu", high: 29, low: 23, condition: "Sunny" },
          { day: "Fri", high: 31, low: 25, condition: "Clear" },
        ],
      });
      setLoading(false);
      toast({
        title: "Weather loaded",
        description: `Showing forecast for ${location}`,
      });
    }, 800);
  };

  const getWeatherIcon = (condition: string) => {
    if (condition.includes("Rain")) return <CloudRain className="h-8 w-8" />;
    if (condition.includes("Cloud")) return <Cloud className="h-8 w-8" />;
    return <Sun className="h-8 w-8" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <PageHeader
        title="Weather Forecast"
        subtitle="Check weather conditions for your travel destinations"
      />

      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search Location</CardTitle>
            <CardDescription>Enter a city or destination to view weather forecast</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Enter city name (e.g., Paris, Tokyo, Bali)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
              />
              <Button onClick={fetchWeather} disabled={loading}>
                <Search className="mr-2 h-4 w-4" />
                {loading ? "Loading..." : "Search"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {weatherData && (
          <>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">{weatherData.location}</CardTitle>
                <CardDescription>Current Weather Conditions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="flex items-center gap-4">
                    {getWeatherIcon(weatherData.condition)}
                    <div>
                      <p className="text-3xl font-bold">{weatherData.temperature}°C</p>
                      <p className="text-muted-foreground">{weatherData.condition}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Droplets className="h-6 w-6 text-blue-500" />
                    <div>
                      <p className="font-semibold">Humidity</p>
                      <p className="text-muted-foreground">{weatherData.humidity}%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Wind className="h-6 w-6 text-blue-500" />
                    <div>
                      <p className="font-semibold">Wind Speed</p>
                      <p className="text-muted-foreground">{weatherData.windSpeed} km/h</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Eye className="h-6 w-6 text-blue-500" />
                    <div>
                      <p className="font-semibold">Visibility</p>
                      <p className="text-muted-foreground">{weatherData.visibility} km</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5-Day Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {weatherData.forecast.map((day: any, index: number) => (
                    <div key={index} className="text-center p-4 rounded-lg bg-muted/50">
                      <p className="font-semibold mb-2">{day.day}</p>
                      <div className="flex justify-center mb-2">
                        {getWeatherIcon(day.condition)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{day.condition}</p>
                      <p className="font-bold">{day.high}° / {day.low}°</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
};

export default WeatherForecast;
