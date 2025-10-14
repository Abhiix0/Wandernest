import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CurrencyProvider } from "@/hooks/useCurrency";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { Navbar } from "./components/Navbar";
import { NavigationDrawer } from "./components/NavigationDrawer";
import Index from "./pages/Index";
import Destinations from "./pages/Destinations";
import DestinationDetails from "./pages/DestinationDetails";
import TravelGuides from "./pages/TravelGuides";
import BookTrip from "./pages/BookTrip";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Safety from "./pages/Safety";
import Transportation from "./pages/Transportation";
import ItineraryBuilder from "./pages/ItineraryBuilder";
import SavedTrips from "./pages/SavedTrips";
import PackingList from "./pages/PackingList";
import OfflineMode from "./pages/OfflineMode";
import InteractiveMap from "./pages/InteractiveMap";
import TravelBuddy from "./pages/TravelBuddy";
import LocalGuides from "./pages/LocalGuides";
import Community from "./pages/Community";
import Gamification from "./pages/Gamification";
import AIConcierge from "./pages/AIConcierge";
import SmartPredictions from "./pages/SmartPredictions";
import WeatherForecast from "./pages/WeatherForecast";
import ExpenseTracker from "./pages/ExpenseTracker";
import LanguageTranslator from "./pages/LanguageTranslator";
import NearbyAttractions from "./pages/NearbyAttractions";
import EmergencyContacts from "./pages/EmergencyContacts";
import CurrencyConverter from "./pages/CurrencyConverter";
import SOSButton from "./components/SOSButton";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <CurrencyProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
              <NavigationDrawer open={sidebarOpen} onOpenChange={setSidebarOpen} />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/destinations" element={<Destinations />} />
                <Route path="/destinations/:id" element={<DestinationDetails />} />
                <Route path="/guides" element={<TravelGuides />} />
                <Route path="/safety" element={<Safety />} />
                <Route path="/transportation" element={<Transportation />} />
                <Route path="/itinerary-builder" element={<ItineraryBuilder />} />
                <Route path="/saved-trips" element={<SavedTrips />} />
                <Route path="/packing-list" element={<PackingList />} />
                <Route path="/offline-mode" element={<OfflineMode />} />
                <Route path="/map" element={<InteractiveMap />} />
                <Route path="/travel-buddy" element={<TravelBuddy />} />
                <Route path="/local-guides" element={<LocalGuides />} />
                <Route path="/community" element={<Community />} />
                <Route path="/achievements" element={<Gamification />} />
                <Route path="/ai-concierge" element={<AIConcierge />} />
                <Route path="/smart-predictions" element={<SmartPredictions />} />
                <Route path="/weather" element={<WeatherForecast />} />
                <Route path="/expenses" element={<ExpenseTracker />} />
                <Route path="/translator" element={<LanguageTranslator />} />
                <Route path="/nearby" element={<NearbyAttractions />} />
                <Route path="/emergency" element={<EmergencyContacts />} />
                <Route path="/currency" element={<CurrencyConverter />} />
                <Route path="/book" element={<BookTrip />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <SOSButton />
            </BrowserRouter>
          </TooltipProvider>
        </CurrencyProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
