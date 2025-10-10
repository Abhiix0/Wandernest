import { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Luggage, 
  Plus, 
  Trash2, 
  Download, 
  Save, 
  CheckCircle2,
  Shirt,
  Sun,
  Droplets,
  Snowflake,
  Briefcase,
  Heart
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface ChecklistItem {
  id: string;
  item: string;
  category: string;
  checked: boolean;
}

const PackingList = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    destination: "",
    duration: "",
    season: "",
  });
  const [checklist, setChecklist] = useState<ChecklistItem[] | null>(null);
  const [newItem, setNewItem] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const categories = [
    { name: "Clothing", icon: Shirt, color: "text-blue-500" },
    { name: "Toiletries", icon: Droplets, color: "text-cyan-500" },
    { name: "Documents", icon: Briefcase, color: "text-amber-500" },
    { name: "Electronics", icon: Briefcase, color: "text-purple-500" },
    { name: "Health & Safety", icon: Heart, color: "text-red-500" },
    { name: "Miscellaneous", icon: Luggage, color: "text-gray-500" },
  ];

  const handleGenerate = () => {
    if (!formData.destination || !formData.duration || !formData.season) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to generate a checklist.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    // Simulate generation
    setTimeout(() => {
      const baseItems: ChecklistItem[] = [
        // Clothing
        { id: "1", item: "Comfortable walking shoes", category: "Clothing", checked: false },
        { id: "2", item: "Casual daytime outfits", category: "Clothing", checked: false },
        { id: "3", item: "Evening wear", category: "Clothing", checked: false },
        { id: "4", item: "Underwear and socks", category: "Clothing", checked: false },
        { id: "5", item: "Sleepwear", category: "Clothing", checked: false },
        // Toiletries
        { id: "6", item: "Toothbrush and toothpaste", category: "Toiletries", checked: false },
        { id: "7", item: "Shampoo and conditioner", category: "Toiletries", checked: false },
        { id: "8", item: "Sunscreen", category: "Toiletries", checked: false },
        { id: "9", item: "Moisturizer", category: "Toiletries", checked: false },
        { id: "10", item: "Deodorant", category: "Toiletries", checked: false },
        // Documents
        { id: "11", item: "Passport", category: "Documents", checked: false },
        { id: "12", item: "Travel insurance", category: "Documents", checked: false },
        { id: "13", item: "Booking confirmations", category: "Documents", checked: false },
        { id: "14", item: "Emergency contacts", category: "Documents", checked: false },
        // Electronics
        { id: "15", item: "Phone and charger", category: "Electronics", checked: false },
        { id: "16", item: "Power bank", category: "Electronics", checked: false },
        { id: "17", item: "Camera", category: "Electronics", checked: false },
        { id: "18", item: "Universal adapter", category: "Electronics", checked: false },
        // Health & Safety
        { id: "19", item: "First aid kit", category: "Health & Safety", checked: false },
        { id: "20", item: "Prescription medications", category: "Health & Safety", checked: false },
        { id: "21", item: "Hand sanitizer", category: "Health & Safety", checked: false },
        // Miscellaneous
        { id: "22", item: "Day backpack", category: "Miscellaneous", checked: false },
        { id: "23", item: "Water bottle", category: "Miscellaneous", checked: false },
        { id: "24", item: "Travel pillow", category: "Miscellaneous", checked: false },
      ];

      // Add season-specific items
      if (formData.season === "summer") {
        baseItems.push(
          { id: "25", item: "Sunglasses", category: "Clothing", checked: false },
          { id: "26", item: "Hat", category: "Clothing", checked: false },
          { id: "27", item: "Swimsuit", category: "Clothing", checked: false }
        );
      } else if (formData.season === "winter") {
        baseItems.push(
          { id: "25", item: "Winter coat", category: "Clothing", checked: false },
          { id: "26", item: "Gloves", category: "Clothing", checked: false },
          { id: "27", item: "Scarf", category: "Clothing", checked: false }
        );
      }

      setChecklist(baseItems);
      setIsGenerating(false);
      toast({
        title: "Checklist Generated!",
        description: "Your personalized packing list is ready.",
      });
    }, 1500);
  };

  const toggleItem = (id: string) => {
    if (!checklist) return;
    setChecklist(checklist.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const addCustomItem = () => {
    if (!newItem.trim() || !checklist) return;
    const newChecklistItem: ChecklistItem = {
      id: Date.now().toString(),
      item: newItem,
      category: "Miscellaneous",
      checked: false,
    };
    setChecklist([...checklist, newChecklistItem]);
    setNewItem("");
    toast({
      title: "Item Added",
      description: "Custom item added to your checklist.",
    });
  };

  const removeItem = (id: string) => {
    if (!checklist) return;
    setChecklist(checklist.filter(item => item.id !== id));
  };

  const handleSave = () => {
    toast({
      title: "Checklist Saved",
      description: "Your packing list has been saved.",
    });
  };

  const handleDownload = () => {
    if (!checklist) return;
    
    const text = checklist
      .map(item => `${item.checked ? '✓' : '○'} ${item.item} (${item.category})`)
      .join('\n');
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.destination}-packing-list.txt`;
    a.click();
    
    toast({
      title: "Download Started",
      description: "Your packing list is being downloaded.",
    });
  };

  const getSeasonIcon = (season: string) => {
    switch (season) {
      case "summer": return <Sun className="h-4 w-4" />;
      case "winter": return <Snowflake className="h-4 w-4" />;
      case "spring":
      case "fall": return <Droplets className="h-4 w-4" />;
      default: return null;
    }
  };

  const progress = checklist 
    ? Math.round((checklist.filter(item => item.checked).length / checklist.length) * 100)
    : 0;

  return (
    <>
      <Helmet>
        <title>Packing Checklist Generator - WanderNest</title>
        <meta name="description" content="Generate a personalized packing checklist based on your destination, trip duration, and season." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                <Luggage className="h-5 w-5" />
                <span className="font-semibold">Smart Packing</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Packing Checklist Generator
              </h1>
              <p className="text-lg text-muted-foreground">
                Never forget essential items again. Get a customized packing list for your trip
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
                    <CardDescription>Tell us about your trip</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="destination">Destination</Label>
                      <Input
                        id="destination"
                        placeholder="e.g., Paris, Tokyo"
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (days)</Label>
                      <Input
                        id="duration"
                        type="number"
                        placeholder="7"
                        min="1"
                        max="90"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="season">Season</Label>
                      <Select 
                        value={formData.season} 
                        onValueChange={(value) => setFormData({ ...formData, season: value })}
                      >
                        <SelectTrigger id="season">
                          <SelectValue placeholder="Select season" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="summer">Summer</SelectItem>
                          <SelectItem value="winter">Winter</SelectItem>
                          <SelectItem value="spring">Spring</SelectItem>
                          <SelectItem value="fall">Fall</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      className="w-full" 
                      onClick={handleGenerate}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <Luggage className="mr-2 h-4 w-4 animate-pulse" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Luggage className="mr-2 h-4 w-4" />
                          Generate Checklist
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Generated Checklist */}
              <div className="lg:col-span-2">
                {!checklist ? (
                  <Card className="h-full flex items-center justify-center p-12">
                    <div className="text-center space-y-4">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
                        <Luggage className="h-10 w-10 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">Ready to Pack?</h3>
                      <p className="text-muted-foreground max-w-sm mx-auto">
                        Fill in your trip details and get a personalized packing checklist
                      </p>
                    </div>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {/* Progress Card */}
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              {formData.destination} Packing List
                              {getSeasonIcon(formData.season)}
                            </CardTitle>
                            <CardDescription>
                              {checklist.filter(item => item.checked).length} of {checklist.length} items packed
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={handleSave}>
                              <Save className="h-4 w-4 mr-2" />
                              Save
                            </Button>
                            <Button variant="outline" size="sm" onClick={handleDownload}>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-semibold">{progress}%</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Add Custom Item */}
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add custom item..."
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addCustomItem()}
                          />
                          <Button onClick={addCustomItem}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Checklist by Category */}
                    {categories.map(category => {
                      const categoryItems = checklist.filter(item => item.category === category.name);
                      if (categoryItems.length === 0) return null;

                      return (
                        <Card key={category.name}>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                              <category.icon className={`h-5 w-5 ${category.color}`} />
                              {category.name}
                              <Badge variant="secondary" className="ml-auto">
                                {categoryItems.filter(item => item.checked).length}/{categoryItems.length}
                              </Badge>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {categoryItems.map(item => (
                              <div 
                                key={item.id}
                                className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent/5 transition-colors"
                              >
                                <Checkbox
                                  id={item.id}
                                  checked={item.checked}
                                  onCheckedChange={() => toggleItem(item.id)}
                                />
                                <Label
                                  htmlFor={item.id}
                                  className={`flex-1 cursor-pointer ${
                                    item.checked ? 'line-through text-muted-foreground' : ''
                                  }`}
                                >
                                  {item.item}
                                </Label>
                                {item.checked && (
                                  <CheckCircle2 className="h-4 w-4 text-primary" />
                                )}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeItem(item.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      );
                    })}
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

export default PackingList;
