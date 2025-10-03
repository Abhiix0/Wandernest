import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { CurrencySelector } from "@/components/CurrencySelector";
import { Price } from "@/components/Price";
import { SearchBar } from "@/components/SearchBar";
import { useState, useEffect } from "react";

const destinations = [
  {
    id: 1,
    name: "Bali, Indonesia",
    image: "/placeholder.svg",
    price: "From $89/night",
    rating: 4.8,
    category: "Tropical",
    description: "Discover pristine beaches, ancient temples, and vibrant culture"
  },
  {
    id: 2,
    name: "Santorini, Greece", 
    image: "/placeholder.svg",
    price: "From $156/night",
    rating: 4.9,
    category: "Mediterranean",
    description: "Iconic blue domes, stunning sunsets, and whitewashed villages"
  },
  {
    id: 3,
    name: "Tokyo, Japan",
    image: "/placeholder.svg", 
    price: "From $78/night",
    rating: 4.7,
    category: "Urban",
    description: "Modern metropolis blending tradition with cutting-edge innovation"
  },
  {
    id: 4,
    name: "Patagonia, Chile",
    image: "/placeholder.svg",
    price: "From $120/night", 
    rating: 4.6,
    category: "Adventure",
    description: "Dramatic landscapes, glaciers, and world-class trekking"
  },
  {
    id: 5,
    name: "Marrakech, Morocco",
    image: "/placeholder.svg",
    price: "From $45/night",
    rating: 4.5,
    category: "Cultural", 
    description: "Bustling souks, stunning architecture, and rich traditions"
  },
  {
    id: 6,
    name: "Maldives",
    image: "/placeholder.svg",
    price: "From $299/night",
    rating: 4.9,
    category: "Luxury",
    description: "Overwater bungalows and crystal-clear lagoons"
  }
];

const categories = ["All", "Tropical", "Mediterranean", "Urban", "Adventure", "Cultural", "Luxury"];

const Destinations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get('search');
    if (search) {
      setSearchQuery(search);
    }
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = searchQuery === "" || 
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || dest.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

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
              <Link to="/destinations" className="text-primary font-medium">Destinations</Link>
              <Link to="/guides" className="hover:text-primary transition-smooth">Travel Guides</Link>
              <Link to="/book" className="hover:text-primary transition-smooth">Book a Trip</Link>
              <Link to="/about" className="hover:text-primary transition-smooth">About</Link>
              <Link to="/contact" className="hover:text-primary transition-smooth">Contact</Link>
            </nav>
            <CurrencySelector />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-hero-gradient text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Explore Amazing Destinations
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-slide-up opacity-90">
            Discover your next adventure from our curated collection of breathtaking locations
          </p>
          
          {/* Search Bar */}
          <div className="animate-slide-up">
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Search destinations..." 
              variant="hero"
              autoNavigate={false}
            />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-foreground">
              <Filter className="h-5 w-5" />
              <span className="font-medium">Filter by:</span>
            </div>
            {categories.map((category) => (
              <Badge 
                key={category}
                variant={category === selectedCategory ? "default" : "secondary"}
                className="cursor-pointer hover-lift"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredDestinations.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-2xl text-muted-foreground mb-4">No destinations found</p>
              <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
              <Button onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map((destination, index) => (
              <Card key={destination.id} className="overflow-hidden hover-lift shadow-card">
                <div className="h-64 bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                  <div className="absolute bottom-4 left-4 z-20 text-white">
                    <div className="flex items-center gap-1 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{destination.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-white/20 text-white">
                        ★ {destination.rating}
                      </Badge>
                      <Badge variant="secondary" className="bg-primary/20 text-white">
                        {destination.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{destination.name}</span>
                    <span className="text-lg text-primary font-bold">
                      <Price priceString={destination.price} showOriginal />
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{destination.description}</p>
                  <Button className="w-full bg-primary hover:bg-primary-hover">
                    View Details
                  </Button>
                </CardContent>
              </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-accent text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let our travel experts create a custom itinerary just for you
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-accent hover:bg-white/90">
            Contact Our Experts
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Destinations;