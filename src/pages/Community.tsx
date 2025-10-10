import { useState } from "react";
import { Helmet } from "react-helmet";
import { Image, MapPin, Heart, MessageCircle, Share2, Upload, AlertCircle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  image: string;
  caption: string;
  location: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  category: "recent" | "top-rated" | "safety-tips";
  isSafetyTip?: boolean;
}

const mockPosts: Post[] = [
  {
    id: "1",
    author: { name: "Sarah Chen", avatar: "/placeholder.svg", verified: true },
    image: "/placeholder.svg",
    caption: "Hidden gem alert! This café in Kyoto serves the best matcha I've ever had. No tourists, just locals and incredible vibes. 🍵✨",
    location: "Kyoto, Japan",
    timestamp: "2 hours ago",
    likes: 234,
    comments: 18,
    shares: 12,
    isLiked: false,
    category: "recent"
  },
  {
    id: "2",
    author: { name: "Priya Patel", avatar: "/placeholder.svg", verified: true },
    image: "/placeholder.svg",
    caption: "Safety tip: Always keep a copy of your passport and emergency contacts in a separate bag. Saved me when my purse was stolen in Barcelona!",
    location: "Barcelona, Spain",
    timestamp: "5 hours ago",
    likes: 892,
    comments: 67,
    shares: 234,
    isLiked: true,
    category: "safety-tips",
    isSafetyTip: true
  },
  {
    id: "3",
    author: { name: "Maya Johnson", avatar: "/placeholder.svg", verified: true },
    image: "/placeholder.svg",
    caption: "Sunrise at Bali's rice terraces. Worth waking up at 4am! The local guide made all the difference. 🌅",
    location: "Ubud, Bali",
    timestamp: "1 day ago",
    likes: 1456,
    comments: 89,
    shares: 178,
    isLiked: false,
    category: "top-rated"
  }
];

export default function Community() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [activeTab, setActiveTab] = useState("recent");
  const [newPost, setNewPost] = useState({ caption: "", location: "" });

  const filteredPosts = posts.filter(post => {
    if (activeTab === "recent") return true;
    if (activeTab === "top-rated") return post.likes > 500;
    if (activeTab === "safety-tips") return post.isSafetyTip;
    return true;
  });

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleUpload = () => {
    if (newPost.caption && newPost.location) {
      const post: Post = {
        id: Date.now().toString(),
        author: { name: "You", avatar: "/placeholder.svg", verified: false },
        image: "/placeholder.svg",
        caption: newPost.caption,
        location: newPost.location,
        timestamp: "Just now",
        likes: 0,
        comments: 0,
        shares: 0,
        isLiked: false,
        category: "recent"
      };
      setPosts([post, ...posts]);
      setNewPost({ caption: "", location: "" });
    }
  };

  return (
    <>
      <Helmet>
        <title>Community | SafeWander</title>
        <meta name="description" content="Share your travel experiences and connect with fellow travelers worldwide." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Safety Reminder Banner */}
        <div className="bg-orange-500/10 border-b border-orange-500/20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Community Safety Guidelines</h3>
                <p className="text-sm text-muted-foreground">
                  Be respectful, avoid sharing exact accommodation addresses, and report inappropriate content. Your safety is our priority.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <main className="container mx-auto px-4 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-grid">
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="top-rated">
                <TrendingUp className="h-4 w-4 mr-2" aria-hidden="true" />
                Top Rated
              </TabsTrigger>
              <TabsTrigger value="safety-tips">Safety Tips</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-6">
              {filteredPosts.length === 0 ? (
                <Card className="p-12 text-center">
                  <Image className="h-16 w-16 mx-auto text-muted-foreground mb-4" aria-hidden="true" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No posts yet</h3>
                  <p className="text-muted-foreground mb-4">Be the first to share your experience!</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Upload className="h-4 w-4 mr-2" aria-hidden="true" />
                        Share Now
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts.map((post) => (
                    <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardHeader className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={post.author.avatar} alt={post.author.name} />
                              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-semibold text-sm">{post.author.name}</p>
                                {post.author.verified && (
                                  <Badge variant="default" className="text-xs">Verified</Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <div className="aspect-square bg-muted relative overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.caption}
                          className="w-full h-full object-cover"
                        />
                        {post.isSafetyTip && (
                          <Badge className="absolute top-3 right-3 bg-orange-500">
                            Safety Tip
                          </Badge>
                        )}
                      </div>

                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" aria-hidden="true" />
                          {post.location}
                        </div>
                        <p className="text-sm text-foreground">{post.caption}</p>
                      </CardContent>

                      <CardFooter className="p-4 pt-0 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleLike(post.id)}
                            className="gap-2"
                            aria-label={post.isLiked ? "Unlike post" : "Like post"}
                          >
                            <Heart 
                              className={`h-5 w-5 ${post.isLiked ? "fill-red-500 text-red-500" : ""}`}
                              aria-hidden="true"
                            />
                            <span>{post.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-2" aria-label="View comments">
                            <MessageCircle className="h-5 w-5" aria-hidden="true" />
                            <span>{post.comments}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-2" aria-label="Share post">
                            <Share2 className="h-5 w-5" aria-hidden="true" />
                            <span>{post.shares}</span>
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
}
