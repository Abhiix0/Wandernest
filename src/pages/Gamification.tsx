import { useState } from "react";
import { Helmet } from "react-helmet";
import { Award, Trophy, Star, Target, Map, Users, Heart, Camera, Lock, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: any;
  unlocked: boolean;
  progress?: number;
  requirement: string;
  category: "travel" | "community" | "safety";
}

interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  badges: number;
  country: string;
}

const badges: Badge[] = [
  {
    id: "1",
    name: "First Steps",
    description: "Complete your first trip",
    icon: Map,
    unlocked: true,
    requirement: "Complete 1 trip",
    category: "travel"
  },
  {
    id: "2",
    name: "Globe Trotter",
    description: "Visit 5 different countries",
    icon: Trophy,
    unlocked: true,
    requirement: "Visit 5 countries",
    category: "travel"
  },
  {
    id: "3",
    name: "Safety Champion",
    description: "Share 10 safety tips",
    icon: Heart,
    unlocked: true,
    progress: 7,
    requirement: "Share 10 safety tips (7/10)",
    category: "safety"
  },
  {
    id: "4",
    name: "Community Star",
    description: "Get 100 likes on posts",
    icon: Star,
    unlocked: false,
    progress: 45,
    requirement: "Get 100 likes (45/100)",
    category: "community"
  },
  {
    id: "5",
    name: "Photo Master",
    description: "Share 50 photos",
    icon: Camera,
    unlocked: false,
    progress: 28,
    requirement: "Share 50 photos (28/50)",
    category: "community"
  },
  {
    id: "6",
    name: "Wanderlust Elite",
    description: "Visit 20 countries",
    icon: Trophy,
    unlocked: false,
    progress: 12,
    requirement: "Visit 20 countries (12/20)",
    category: "travel"
  },
  {
    id: "7",
    name: "Safety Guardian",
    description: "Help 25 travelers with safety advice",
    icon: Heart,
    unlocked: false,
    progress: 8,
    requirement: "Help 25 travelers (8/25)",
    category: "safety"
  },
  {
    id: "8",
    name: "Travel Buddy",
    description: "Connect with 10 fellow travelers",
    icon: Users,
    unlocked: false,
    progress: 3,
    requirement: "Connect with 10 travelers (3/10)",
    category: "community"
  }
];

const leaderboard: LeaderboardUser[] = [
  { rank: 1, name: "Emma Wilson", avatar: "/placeholder.svg", points: 2450, badges: 24, country: "USA" },
  { rank: 2, name: "Sofia Rodriguez", avatar: "/placeholder.svg", points: 2230, badges: 21, country: "Spain" },
  { rank: 3, name: "Yuki Tanaka", avatar: "/placeholder.svg", points: 2105, badges: 19, country: "Japan" },
  { rank: 4, name: "Priya Sharma", avatar: "/placeholder.svg", points: 1890, badges: 18, country: "India" },
  { rank: 5, name: "You", avatar: "/placeholder.svg", points: 1675, badges: 15, country: "Global" }
];

export default function Gamification() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredBadges = selectedCategory === "all" 
    ? badges 
    : badges.filter(badge => badge.category === selectedCategory);

  const unlockedCount = badges.filter(b => b.unlocked).length;
  const totalPoints = 1675;
  const nextBadge = badges.find(b => !b.unlocked && b.progress !== undefined);

  return (
    <>
      <Helmet>
        <title>Achievements & Badges | SafeWander</title>
        <meta name="description" content="Track your travel achievements and compete with fellow travelers worldwide." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Achievements & Rewards</h1>
                <p className="text-muted-foreground">Track your journey and earn badges</p>
              </div>
              <Trophy className="h-12 w-12 text-primary" aria-hidden="true" />
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Points</p>
                      <p className="text-3xl font-bold text-foreground">{totalPoints}</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Star className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Badges Earned</p>
                      <p className="text-3xl font-bold text-foreground">{unlockedCount}/{badges.length}</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Award className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Global Rank</p>
                      <p className="text-3xl font-bold text-foreground">#5</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Tabs defaultValue="badges" className="space-y-8">
            <TabsList className="grid w-full md:w-auto grid-cols-2 md:inline-grid">
              <TabsTrigger value="badges">My Badges</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            </TabsList>

            {/* Badges Tab */}
            <TabsContent value="badges" className="space-y-8">
              {/* Next Badge Progress */}
              {nextBadge && (
                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="h-5 w-5" aria-hidden="true" />
                      Next Badge: {nextBadge.name}
                    </CardTitle>
                    <CardDescription>{nextBadge.requirement}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={nextBadge.progress} className="h-3" />
                    <p className="text-sm text-muted-foreground mt-2">
                      {nextBadge.progress}% complete
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* How to Earn Tips */}
              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-lg">How to Earn Badges</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-start gap-3">
                    <Map className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-semibold">Travel Badges</p>
                      <p className="text-muted-foreground">Complete trips, visit new countries, and explore destinations</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-semibold">Community Badges</p>
                      <p className="text-muted-foreground">Share photos, connect with travelers, and engage with posts</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Heart className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-semibold">Safety Badges</p>
                      <p className="text-muted-foreground">Share safety tips and help fellow travelers stay safe</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                <Badge 
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  className="cursor-pointer px-4 py-2"
                  onClick={() => setSelectedCategory("all")}
                >
                  All Badges
                </Badge>
                <Badge 
                  variant={selectedCategory === "travel" ? "default" : "outline"}
                  className="cursor-pointer px-4 py-2"
                  onClick={() => setSelectedCategory("travel")}
                >
                  Travel
                </Badge>
                <Badge 
                  variant={selectedCategory === "community" ? "default" : "outline"}
                  className="cursor-pointer px-4 py-2"
                  onClick={() => setSelectedCategory("community")}
                >
                  Community
                </Badge>
                <Badge 
                  variant={selectedCategory === "safety" ? "default" : "outline"}
                  className="cursor-pointer px-4 py-2"
                  onClick={() => setSelectedCategory("safety")}
                >
                  Safety
                </Badge>
              </div>

              {/* Badges Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredBadges.map((badge) => {
                  const IconComponent = badge.icon;
                  return (
                    <Card 
                      key={badge.id}
                      className={`relative ${!badge.unlocked ? 'opacity-60' : 'hover:shadow-lg transition-shadow'}`}
                    >
                      <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                        {!badge.unlocked && (
                          <Lock className="absolute top-2 right-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                        )}
                        <div className={`h-16 w-16 rounded-full ${badge.unlocked ? 'bg-primary' : 'bg-muted'} flex items-center justify-center`}>
                          <IconComponent className={`h-8 w-8 ${badge.unlocked ? 'text-primary-foreground' : 'text-muted-foreground'}`} aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{badge.name}</h3>
                          <p className="text-xs text-muted-foreground">{badge.description}</p>
                        </div>
                        {badge.progress !== undefined && (
                          <div className="w-full space-y-1">
                            <Progress value={badge.progress} className="h-2" />
                            <p className="text-xs text-muted-foreground">{badge.progress}% complete</p>
                          </div>
                        )}
                        <Badge variant={badge.unlocked ? "default" : "outline"} className="text-xs">
                          {badge.unlocked ? "Unlocked" : badge.requirement}
                        </Badge>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* Leaderboard Tab */}
            <TabsContent value="leaderboard" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" aria-hidden="true" />
                    Top Contributors
                  </CardTitle>
                  <CardDescription>Global traveler rankings based on points and achievements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {leaderboard.map((user) => (
                    <div 
                      key={user.rank}
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        user.name === "You" ? 'bg-primary/10 border border-primary/20' : 'bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${
                          user.rank === 1 ? 'bg-yellow-500 text-white' :
                          user.rank === 2 ? 'bg-gray-400 text-white' :
                          user.rank === 3 ? 'bg-orange-600 text-white' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          #{user.rank}
                        </div>
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-foreground">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.country}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground">{user.points} pts</p>
                        <p className="text-sm text-muted-foreground">{user.badges} badges</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
}
