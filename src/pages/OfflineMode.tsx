import { useState } from "react";
import { Helmet } from "react-helmet";
import { Download, Map, Languages, Book, CheckCircle2, HardDrive } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface DownloadItem {
  id: string;
  name: string;
  type: "map" | "itinerary" | "translator" | "guide";
  size: string;
  progress: number;
  downloaded: boolean;
}

const OfflineMode = () => {
  const { toast } = useToast();
  const [downloads, setDownloads] = useState<DownloadItem[]>([
    { id: "1", name: "Paris City Map", type: "map", size: "45 MB", progress: 100, downloaded: true },
    { id: "2", name: "French Language Pack", type: "translator", size: "120 MB", progress: 100, downloaded: true },
    { id: "3", name: "My Paris Itinerary", type: "itinerary", size: "2 MB", progress: 100, downloaded: true },
  ]);

  const availableDownloads = [
    { name: "Tokyo City Map", type: "map", size: "52 MB", icon: Map },
    { name: "Japanese Language Pack", type: "translator", size: "135 MB", icon: Languages },
    { name: "Bali Travel Guide", type: "guide", size: "28 MB", icon: Book },
  ];

  const totalStorage = downloads.reduce((acc, item) => {
    if (item.downloaded) {
      return acc + parseInt(item.size);
    }
    return acc;
  }, 0);

  const handleDownload = (name: string, type: string, size: string) => {
    const newDownload: DownloadItem = {
      id: Date.now().toString(),
      name,
      type: type as any,
      size,
      progress: 0,
      downloaded: false,
    };

    setDownloads([...downloads, newDownload]);

    // Simulate download progress
    const interval = setInterval(() => {
      setDownloads((prev) =>
        prev.map((item) => {
          if (item.id === newDownload.id && item.progress < 100) {
            return { ...item, progress: item.progress + 10 };
          }
          if (item.id === newDownload.id && item.progress >= 100) {
            return { ...item, downloaded: true };
          }
          return item;
        })
      );
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      toast({
        title: "Download Complete",
        description: `${name} is now available offline`,
      });
    }, 3000);
  };

  const handleDelete = (id: string) => {
    setDownloads(downloads.filter((item) => item.id !== id));
    toast({
      title: "Removed",
      description: "Content removed from offline storage",
    });
  };

  return (
    <>
      <Helmet>
        <title>Offline Mode - Download Travel Resources | WanderWise</title>
        <meta
          name="description"
          content="Download maps, itineraries, and language packs for offline access during your travels. Stay prepared even without internet connection."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Offline Mode</h1>
            <p className="text-muted-foreground text-lg">
              Download essential travel resources to access them without internet
            </p>
          </header>

          {/* Storage Overview */}
          <Card className="mb-8 border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HardDrive className="h-5 w-5" aria-hidden="true" />
                Storage Usage
              </CardTitle>
              <CardDescription>Track your offline content storage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Total Downloaded</span>
                    <span className="text-sm text-muted-foreground">{totalStorage} MB / 500 MB</span>
                  </div>
                  <Progress value={(totalStorage / 500) * 100} className="h-3" aria-label="Storage usage progress" />
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">{downloads.filter((d) => d.downloaded && d.type === "map").length}</p>
                    <p className="text-sm text-muted-foreground">Maps</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">{downloads.filter((d) => d.downloaded && d.type === "translator").length}</p>
                    <p className="text-sm text-muted-foreground">Language Packs</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">{downloads.filter((d) => d.downloaded && d.type === "itinerary").length}</p>
                    <p className="text-sm text-muted-foreground">Itineraries</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Downloaded Content */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-primary" aria-hidden="true" />
                Downloaded Content
              </h2>
              <div className="space-y-3">
                {downloads.map((item) => (
                  <Card key={item.id} className="border-muted">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">{item.name}</h3>
                            <p className="text-sm text-muted-foreground capitalize">{item.type} • {item.size}</p>
                          </div>
                          {item.downloaded && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(item.id)}
                              aria-label={`Delete ${item.name}`}
                            >
                              Delete
                            </Button>
                          )}
                        </div>
                        {!item.downloaded && (
                          <Progress value={item.progress} className="h-2" aria-label={`Download progress for ${item.name}`} />
                        )}
                        {item.downloaded && (
                          <div className="flex items-center gap-2 text-sm text-primary">
                            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                            <span>Available offline</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Available Downloads */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Download className="h-6 w-6 text-primary" aria-hidden="true" />
                Available Downloads
              </h2>
              <div className="space-y-3">
                {availableDownloads.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Card key={index} className="border-muted hover:border-primary/50 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground mb-1">{item.name}</h3>
                            <p className="text-sm text-muted-foreground capitalize mb-3">
                              {item.type} • {item.size}
                            </p>
                            <Button
                              onClick={() => handleDownload(item.name, item.type, item.size)}
                              size="sm"
                              className="w-full"
                              aria-label={`Download ${item.name}`}
                            >
                              <Download className="h-4 w-4 mr-2" aria-hidden="true" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Offline Resources List */}
          <section className="mt-8">
            <Card className="bg-muted/50 border-muted">
              <CardHeader>
                <CardTitle>Offline Features</CardTitle>
                <CardDescription>What you can do without internet connection</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid md:grid-cols-2 gap-3" role="list">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span>View downloaded maps and navigate saved routes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span>Access saved itineraries and bookings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span>Use offline translator for essential phrases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span>Read downloaded travel guides</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span>View emergency contacts and safety information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span>Access packing lists and travel documents</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </>
  );
};

export default OfflineMode;
