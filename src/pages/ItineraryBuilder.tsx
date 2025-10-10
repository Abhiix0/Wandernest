import { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sparkles, MapPin, DollarSign, Calendar, Clock, Edit2, Save, Trash2, Plus, Gem, PartyPopper } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface DayPlan {
  day: number;
  title: string;
  activities: Array<{
    time: string;
    activity: string;
    location: string;
    cost: number;
    type: "attraction" | "food" | "transport" | "activity";
  }>;
  totalCost: number;
}

const ItineraryBuilder = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    destination: "",
    budget: "",
    duration: "",
    interests: "",
  });
  const [itinerary, setItinerary] = useState<DayPlan[] | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleGenerate = async () => {
    if (!formData.destination || !formData.budget || !formData.duration) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      const days = parseInt(formData.duration) || 3;
      const budgetPerDay = (parseInt(formData.budget) || 1000) / days;
      
      const generatedItinerary: DayPlan[] = Array.from({ length: days }, (_, i) => ({
        day: i + 1,
        title: `Day ${i + 1} - Explore ${formData.destination}`,
        activities: [
          {
            time: "09:00 AM",
            activity: "Breakfast at local café",
            location: "Downtown area",
            cost: budgetPerDay * 0.1,
            type: "food" as const,
          },
          {
            time: "10:30 AM",
            activity: "Visit main attraction",
            location: `${formData.destination} landmark`,
            cost: budgetPerDay * 0.3,
            type: "attraction" as const,
          },
          {
            time: "01:00 PM",
            activity: "Lunch at recommended restaurant",
            location: "City center",
            cost: budgetPerDay * 0.15,
            type: "food" as const,
          },
          {
            time: "03:00 PM",
            activity: formData.interests || "Cultural experience",
            location: "Local area",
            cost: budgetPerDay * 0.25,
            type: "activity" as const,
          },
          {
            time: "07:00 PM",
            activity: "Dinner with local cuisine",
            location: "Traditional district",
            cost: budgetPerDay * 0.2,
            type: "food" as const,
          },
        ],
        totalCost: budgetPerDay,
      }));

      setItinerary(generatedItinerary);
      setIsGenerating(false);
      toast({
        title: "Itinerary Generated!",
        description: "Your personalized travel plan is ready.",
      });
    }, 2000);
  };

  const handleSave = () => {
    toast({
      title: "Itinerary Saved",
      description: "Your itinerary has been saved to your trips.",
    });
  };

  const handleDeleteActivity = (dayIndex: number, activityIndex: number) => {
    if (!itinerary) return;
    const newItinerary = [...itinerary];
    const activity = newItinerary[dayIndex].activities[activityIndex];
    newItinerary[dayIndex].activities.splice(activityIndex, 1);
    newItinerary[dayIndex].totalCost -= activity.cost;
    setItinerary(newItinerary);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "attraction": return <MapPin className="h-4 w-4" />;
      case "food": return "🍽️";
      case "transport": return "🚗";
      case "activity": return "🎯";
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <>
      <Helmet>
        <title>AI Itinerary Builder - WanderNest</title>
        <meta name="description" content="Create personalized travel itineraries with AI. Get daily plans, cost estimates, and local recommendations for your perfect trip." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                <Sparkles className="h-5 w-5" />
                <span className="font-semibold">AI-Powered Planning</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Build Your Perfect Itinerary
              </h1>
              <p className="text-lg text-muted-foreground">
                Let AI create a personalized travel plan based on your preferences, budget, and interests
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Input Form */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Trip Details</CardTitle>
                    <CardDescription>Tell us about your dream trip</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="destination">
                        Destination <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="destination"
                        placeholder="e.g., Paris, Tokyo, Bali"
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">
                        Duration (days) <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="duration"
                        type="number"
                        placeholder="3"
                        min="1"
                        max="30"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="budget">
                        Budget (USD) <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="budget"
                        type="number"
                        placeholder="1000"
                        min="0"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="interests">Interests</Label>
                      <Textarea
                        id="interests"
                        placeholder="e.g., museums, food tours, hiking, photography"
                        rows={3}
                        value={formData.interests}
                        onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                      />
                    </div>

                    <Button 
                      className="w-full" 
                      onClick={handleGenerate}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Generate Itinerary
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Generated Itinerary */}
              <div className="lg:col-span-2">
                {!itinerary ? (
                  <Card className="h-full flex items-center justify-center p-12">
                    <div className="text-center space-y-4">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
                        <Sparkles className="h-10 w-10 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">Ready to Plan?</h3>
                      <p className="text-muted-foreground max-w-sm mx-auto">
                        Fill in your trip details and let AI create a personalized itinerary just for you
                      </p>
                    </div>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {/* Itinerary Header */}
                    <Card>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-2xl mb-2">Your Itinerary</CardTitle>
                            <CardDescription className="flex items-center gap-4 flex-wrap">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {formData.destination}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {formData.duration} days
                              </span>
                              <span className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4" />
                                ${formData.budget} total
                              </span>
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setIsEditing(!isEditing)}
                            >
                              <Edit2 className="h-4 w-4 mr-2" />
                              {isEditing ? "Done" : "Edit"}
                            </Button>
                            <Button size="sm" onClick={handleSave}>
                              <Save className="h-4 w-4 mr-2" />
                              Save
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>

                    {/* Hidden Gems Section */}
                    <Card className="border-primary/20 bg-primary/5">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Gem className="h-5 w-5 text-primary" />
                          Hidden Gems & Local Events
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-start gap-3">
                          <PartyPopper className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                          <div>
                            <p className="font-medium">Local Night Market</p>
                            <p className="text-sm text-muted-foreground">Every Friday evening - authentic street food and crafts</p>
                          </div>
                        </div>
                        <Separator />
                        <div className="flex items-start gap-3">
                          <Gem className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                          <div>
                            <p className="font-medium">Secret Viewpoint Trail</p>
                            <p className="text-sm text-muted-foreground">30-min hike to breathtaking city views - rarely crowded</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Daily Plans */}
                    {itinerary.map((day, dayIndex) => (
                      <Card key={day.day}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-xl">{day.title}</CardTitle>
                            <Badge variant="secondary" className="font-semibold">
                              ${day.totalCost.toFixed(0)} budget
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {day.activities.map((activity, activityIndex) => (
                            <div key={activityIndex} className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
                              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary flex-shrink-0">
                                {getActivityIcon(activity.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex-1">
                                    <p className="font-semibold">{activity.activity}</p>
                                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                      <MapPin className="h-3 w-3" />
                                      {activity.location}
                                    </p>
                                  </div>
                                  <div className="text-right flex-shrink-0">
                                    <p className="text-sm font-medium text-muted-foreground">{activity.time}</p>
                                    <p className="text-sm font-semibold text-primary">${activity.cost.toFixed(0)}</p>
                                  </div>
                                </div>
                              </div>
                              {isEditing && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteActivity(dayIndex, activityIndex)}
                                  className="flex-shrink-0"
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              )}
                            </div>
                          ))}
                          {isEditing && (
                            <Button variant="outline" className="w-full">
                              <Plus className="h-4 w-4 mr-2" />
                              Add Activity
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
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

export default ItineraryBuilder;
