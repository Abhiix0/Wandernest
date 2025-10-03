import { useState } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Cloud, Users, AlertTriangle, Search } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const SmartPredictions = () => {
  const [destination, setDestination] = useState("");
  const [showPredictions, setShowPredictions] = useState(false);

  const handleSearch = () => {
    if (destination.trim()) {
      setShowPredictions(true);
    }
  };

  // Mock prediction data - in production, this would come from ML models
  const predictions = {
    crowdDensity: {
      level: "Moderate",
      percentage: 65,
      trend: "increasing",
      details: "Expected to increase by 15% during weekend",
    },
    weatherRisk: {
      level: "Low",
      percentage: 20,
      forecast: "Clear skies expected for next 7 days",
      alerts: [],
    },
    flightDelays: {
      level: "Low",
      percentage: 12,
      onTimeRate: 88,
      details: "Minimal disruptions predicted",
    },
    bestTimeToVisit: {
      period: "Next 2 weeks",
      reasoning: "Lower crowds, stable weather, good flight availability",
    },
  };

  return (
    <>
      <Helmet>
        <title>Smart Travel Predictions - WanderNest</title>
        <meta
          name="description"
          content="AI-powered predictions for crowd density, weather disruptions, flight delays, and optimal travel times."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <header className="bg-primary text-primary-foreground py-16 px-4">
          <div className="container mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <TrendingUp className="h-8 w-8" />
              <h1 className="text-4xl md:text-5xl font-bold">Smart Travel Predictions</h1>
            </div>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              AI-powered insights to help you plan the perfect time to travel
            </p>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12 max-w-6xl">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Search Destination</CardTitle>
              <CardDescription>Get AI predictions for your travel destination</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter destination (e.g., Tokyo, Paris, Bali)"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
                <Button onClick={handleSearch}>
                  <Search className="h-4 w-4 mr-2" />
                  Predict
                </Button>
              </div>
            </CardContent>
          </Card>

          {showPredictions && (
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Crowd Density
                    </CardTitle>
                    <Badge variant={predictions.crowdDensity.percentage > 70 ? "destructive" : "secondary"}>
                      {predictions.crowdDensity.level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Current Level</span>
                      <span className="text-sm font-medium">{predictions.crowdDensity.percentage}%</span>
                    </div>
                    <Progress value={predictions.crowdDensity.percentage} />
                  </div>
                  <p className="text-sm text-muted-foreground">{predictions.crowdDensity.details}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-orange-500" />
                    <span>Trend: {predictions.crowdDensity.trend}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Cloud className="h-5 w-5" />
                      Weather Risk
                    </CardTitle>
                    <Badge variant={predictions.weatherRisk.percentage > 50 ? "destructive" : "secondary"}>
                      {predictions.weatherRisk.level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Risk Level</span>
                      <span className="text-sm font-medium">{predictions.weatherRisk.percentage}%</span>
                    </div>
                    <Progress value={predictions.weatherRisk.percentage} className="bg-blue-100" />
                  </div>
                  <p className="text-sm text-muted-foreground">{predictions.weatherRisk.forecast}</p>
                  {predictions.weatherRisk.alerts.length > 0 && (
                    <div className="flex items-start gap-2 text-sm text-orange-600">
                      <AlertTriangle className="h-4 w-4 mt-0.5" />
                      <span>Weather alerts active</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Flight Delays
                    </CardTitle>
                    <Badge variant={predictions.flightDelays.percentage > 30 ? "destructive" : "secondary"}>
                      {predictions.flightDelays.level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Delay Probability</span>
                      <span className="text-sm font-medium">{predictions.flightDelays.percentage}%</span>
                    </div>
                    <Progress value={predictions.flightDelays.percentage} className="bg-green-100" />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">On-time Rate</span>
                    <span className="font-medium text-green-600">{predictions.flightDelays.onTimeRate}%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{predictions.flightDelays.details}</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Best Time to Visit
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-2xl font-bold text-primary">
                    {predictions.bestTimeToVisit.period}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {predictions.bestTimeToVisit.reasoning}
                  </p>
                  <Button className="w-full">
                    Plan Trip for This Period
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {!showPredictions && (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <TrendingUp className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  Enter a destination to see AI-powered travel predictions
                </p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </>
  );
};

export default SmartPredictions;
