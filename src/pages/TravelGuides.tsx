import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";

const guides = [
  {
    id: 1,
    title: "The Ultimate Guide to Backpacking Southeast Asia",
    excerpt: "Everything you need to know for an epic 3-month adventure through Thailand, Vietnam, Cambodia, and Laos.",
    author: "Sarah Chen",
    readTime: "12 min read",
    date: "March 15, 2024",
    category: "Backpacking",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Digital Nomad's Guide to Bali",
    excerpt: "Best coworking spaces, reliable wifi spots, and budget-friendly accommodations for remote workers.",
    author: "Mike Rodriguez", 
    readTime: "8 min read",
    date: "March 10, 2024",
    category: "Digital Nomad",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Family-Friendly Japan: Tokyo with Kids",
    excerpt: "Navigate Tokyo's bustling streets with children - from theme parks to kid-friendly restaurants.",
    author: "Emma Thompson",
    readTime: "10 min read", 
    date: "March 5, 2024",
    category: "Family Travel",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    title: "Sustainable Travel: Leave Only Footprints",
    excerpt: "How to minimize your environmental impact while exploring the world's most beautiful destinations.",
    author: "David Park",
    readTime: "6 min read",
    date: "February 28, 2024", 
    category: "Sustainable Travel",
    image: "/placeholder.svg"
  },
  {
    id: 5,
    title: "Solo Female Travel Safety Guide",
    excerpt: "Essential tips, precautions, and empowerment strategies for women traveling alone worldwide.",
    author: "Priya Sharma",
    readTime: "15 min read",
    date: "February 20, 2024",
    category: "Solo Travel", 
    image: "/placeholder.svg"
  },
  {
    id: 6,
    title: "Budget Travel Hacks: See More, Spend Less",
    excerpt: "Proven strategies to stretch your travel budget without compromising on amazing experiences.",
    author: "Alex Johnson",
    readTime: "9 min read",
    date: "February 15, 2024",
    category: "Budget Travel",
    image: "/placeholder.svg"
  }
];

const categories = ["All", "Backpacking", "Digital Nomad", "Family Travel", "Sustainable Travel", "Solo Travel", "Budget Travel"];

const TravelGuides = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-gradient">
              WanderNest
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="hover:text-primary transition-smooth">Home</Link>
              <Link to="/destinations" className="hover:text-primary transition-smooth">Destinations</Link>
              <Link to="/guides" className="text-primary font-medium">Travel Guides</Link>
              <Link to="/book" className="hover:text-primary transition-smooth">Book a Trip</Link>
              <Link to="/about" className="hover:text-primary transition-smooth">About</Link>
              <Link to="/contact" className="hover:text-primary transition-smooth">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-ocean-gradient text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Travel Guides & Tips
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-slide-up opacity-90">
            Expert advice, insider tips, and comprehensive guides for every type of traveler
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-medium text-foreground">Browse by category:</span>
            {categories.map((category) => (
              <Badge 
                key={category}
                variant={category === "All" ? "default" : "secondary"}
                className="cursor-pointer hover-lift"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Guide</h2>
            <Card className="overflow-hidden shadow-travel max-w-4xl mx-auto">
              <div className="md:flex">
                <div className="md:w-1/2 h-64 md:h-auto bg-muted">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <span className="text-muted-foreground text-lg">Featured Guide Image</span>
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <Badge className="mb-4">{guides[0].category}</Badge>
                  <h3 className="text-2xl font-bold mb-4">{guides[0].title}</h3>
                  <p className="text-muted-foreground mb-6">{guides[0].excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{guides[0].author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{guides[0].date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{guides[0].readTime}</span>
                    </div>
                  </div>
                  <Button className="bg-primary hover:bg-primary-hover">
                    Read Full Guide
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* All Guides Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">All Travel Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.slice(1).map((guide) => (
              <Card key={guide.id} className="overflow-hidden hover-lift shadow-card">
                <div className="h-48 bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                  <div className="absolute top-4 left-4 z-20">
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      {guide.category}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg leading-tight">{guide.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm">{guide.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{guide.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{guide.readTime}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Read Guide
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Never Miss a Travel Tip
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Subscribe to our newsletter for the latest guides, deals, and destination inspiration
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <input 
              type="email" 
              placeholder="Enter your email..."
              className="flex-1 px-4 py-3 rounded-lg text-foreground"
            />
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TravelGuides;