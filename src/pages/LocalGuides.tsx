import { useState } from "react";
import { Helmet } from "react-helmet";
import { Search, Star, MapPin, DollarSign, Shield, Calendar, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

interface Guide {
  id: string;
  name: string;
  avatar: string;
  location: string;
  languages: string[];
  rating: number;
  reviews: number;
  hourlyRate: number;
  specialties: string[];
  verified: boolean;
  bio: string;
  yearsExperience: number;
}

const mockGuides: Guide[] = [
  {
    id: "1",
    name: "Maria Santos",
    avatar: "/placeholder.svg",
    location: "Tokyo, Japan",
    languages: ["English", "Japanese", "Spanish"],
    rating: 4.9,
    reviews: 127,
    hourlyRate: 45,
    specialties: ["Culture", "Food Tours", "History"],
    verified: true,
    bio: "Passionate about sharing Tokyo's hidden gems and authentic experiences.",
    yearsExperience: 8
  },
  {
    id: "2",
    name: "Aisha Khan",
    avatar: "/placeholder.svg",
    location: "Bali, Indonesia",
    languages: ["English", "Indonesian", "Hindi"],
    rating: 4.8,
    reviews: 93,
    hourlyRate: 35,
    specialties: ["Adventure", "Wellness", "Photography"],
    verified: true,
    bio: "Helping travelers discover Bali's spiritual and natural beauty.",
    yearsExperience: 5
  },
  {
    id: "3",
    name: "Sophie Martin",
    avatar: "/placeholder.svg",
    location: "Paris, France",
    languages: ["English", "French", "German"],
    rating: 5.0,
    reviews: 156,
    hourlyRate: 55,
    specialties: ["Art", "Architecture", "Wine Tours"],
    verified: true,
    bio: "Art historian specializing in Parisian culture and cuisine.",
    yearsExperience: 12
  }
];

export default function LocalGuides() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("rating");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

  const filteredGuides = mockGuides
    .filter(guide => 
      (searchQuery === "" || 
       guide.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
       guide.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedLanguage === "all" || guide.languages.includes(selectedLanguage))
    )
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price-low") return a.hourlyRate - b.hourlyRate;
      if (sortBy === "price-high") return b.hourlyRate - a.hourlyRate;
      return 0;
    });

  return (
    <>
      <Helmet>
        <title>Verified Local Guides | SafeWander</title>
        <meta name="description" content="Connect with verified local guides for authentic, safe travel experiences worldwide." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Verified Local Guides</h1>
                <p className="text-muted-foreground">Connect with trusted guides for authentic experiences</p>
              </div>
              <Shield className="h-12 w-12 text-primary" aria-hidden="true" />
            </div>

            {/* Search and Filters */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" aria-hidden="true" />
                <Input
                  type="search"
                  placeholder="Search by location or guide name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  aria-label="Search guides"
                />
              </div>

              <div className="flex flex-wrap gap-4">
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-[200px]" aria-label="Filter by language">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Languages</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="Japanese">Japanese</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[200px]" aria-label="Sort guides">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rating</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </header>

        {/* Safety Verification Banner */}
        <div className="bg-primary/10 border-b border-primary/20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Safety Verification Process</h3>
                <p className="text-sm text-muted-foreground">
                  All guides are verified through background checks, certification validation, and user reviews. Look for the verified badge.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Guides Grid */}
        <main className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <p className="text-muted-foreground">{filteredGuides.length} verified guides found</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide) => (
              <Card key={guide.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={guide.avatar} alt={guide.name} />
                        <AvatarFallback>{guide.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {guide.name}
                          {guide.verified && (
                            <Badge variant="default" className="text-xs">
                              <Shield className="h-3 w-3 mr-1" aria-hidden="true" />
                              Verified
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" aria-hidden="true" />
                          {guide.location}
                        </CardDescription>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                      <span className="font-semibold">{guide.rating}</span>
                      <span className="text-muted-foreground">({guide.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-primary font-semibold">
                      <DollarSign className="h-4 w-4" aria-hidden="true" />
                      {guide.hourlyRate}/hr
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{guide.bio}</p>

                  <div>
                    <p className="text-xs font-semibold text-foreground mb-2">Languages:</p>
                    <div className="flex flex-wrap gap-2">
                      {guide.languages.map((lang) => (
                        <Badge key={lang} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-foreground mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-2">
                      {guide.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Award className="h-4 w-4" aria-hidden="true" />
                    <span>{guide.yearsExperience} years experience</span>
                  </div>
                </CardContent>

                <CardFooter>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" onClick={() => setSelectedGuide(guide)}>
                        <Calendar className="h-4 w-4 mr-2" aria-hidden="true" />
                        Book Guide
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Book {guide.name}</DialogTitle>
                        <DialogDescription>
                          Select a date to book your guided experience
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <CalendarComponent
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date()}
                          className="rounded-md border mx-auto"
                        />
                        {selectedDate && (
                          <div className="mt-4 p-4 bg-muted rounded-lg space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Date:</span>
                              <span className="font-semibold">{selectedDate.toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Hourly Rate:</span>
                              <span className="font-semibold">${guide.hourlyRate}/hr</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                              <Clock className="h-3 w-3" aria-hidden="true" />
                              <span>You'll confirm the time with the guide after booking</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <DialogFooter>
                        <Button 
                          className="w-full" 
                          disabled={!selectedDate}
                          onClick={() => {
                            // Booking logic here
                            alert(`Booking request sent to ${guide.name} for ${selectedDate?.toLocaleDateString()}`);
                          }}
                        >
                          Confirm Booking Request
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
