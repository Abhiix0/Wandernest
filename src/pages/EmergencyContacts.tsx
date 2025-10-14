import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, AlertCircle, Hospital, Shield, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const EmergencyContacts = () => {
  const emergencyNumbers = [
    {
      country: "India",
      flag: "🇮🇳",
      contacts: [
        { service: "Emergency", number: "112", icon: AlertCircle },
        { service: "Police", number: "100", icon: Shield },
        { service: "Ambulance", number: "102", icon: Hospital },
        { service: "Fire", number: "101", icon: AlertCircle },
      ],
    },
    {
      country: "United States",
      flag: "🇺🇸",
      contacts: [
        { service: "Emergency", number: "911", icon: AlertCircle },
        { service: "Non-Emergency", number: "311", icon: Phone },
      ],
    },
    {
      country: "United Kingdom",
      flag: "🇬🇧",
      contacts: [
        { service: "Emergency", number: "999", icon: AlertCircle },
        { service: "Non-Emergency", number: "101", icon: Phone },
      ],
    },
    {
      country: "European Union",
      flag: "🇪🇺",
      contacts: [
        { service: "Emergency", number: "112", icon: AlertCircle },
      ],
    },
    {
      country: "Australia",
      flag: "🇦🇺",
      contacts: [
        { service: "Emergency", number: "000", icon: AlertCircle },
        { service: "Police", number: "131 444", icon: Shield },
      ],
    },
    {
      country: "Japan",
      flag: "🇯🇵",
      contacts: [
        { service: "Police", number: "110", icon: Shield },
        { service: "Ambulance/Fire", number: "119", icon: Hospital },
      ],
    },
    {
      country: "Singapore",
      flag: "🇸🇬",
      contacts: [
        { service: "Emergency", number: "999", icon: AlertCircle },
        { service: "Ambulance", number: "995", icon: Hospital },
      ],
    },
    {
      country: "UAE",
      flag: "🇦🇪",
      contacts: [
        { service: "Police", number: "999", icon: Shield },
        { service: "Ambulance", number: "998", icon: Hospital },
        { service: "Fire", number: "997", icon: AlertCircle },
      ],
    },
  ];

  const makeCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <PageHeader
        title="Emergency Contacts"
        subtitle="Quick access to emergency numbers worldwide"
      />

      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8 border-destructive/50 bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-6 w-6" />
              Important Safety Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-0.5">•</span>
                <span>Always verify local emergency numbers when arriving in a new country</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-0.5">•</span>
                <span>Save your embassy contact information before traveling</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-0.5">•</span>
                <span>Keep this information accessible offline when possible</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-0.5">•</span>
                <span>Know your exact location before calling emergency services</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {emergencyNumbers.map((country, index) => (
            <Card key={index} className="hover:shadow-lg transition-smooth">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-3xl">{country.flag}</span>
                  {country.country}
                </CardTitle>
                <CardDescription>Emergency contact numbers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {country.contacts.map((contact, idx) => {
                    const IconComponent = contact.icon;
                    return (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-smooth"
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent className="h-5 w-5 text-destructive" />
                          <div>
                            <p className="font-semibold">{contact.service}</p>
                            <p className="text-2xl font-bold text-destructive">{contact.number}</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => makeCall(contact.number)}
                        >
                          <Phone className="mr-2 h-4 w-4" />
                          Call
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-6 w-6" />
              International Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">US Citizens Abroad</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  US State Department Emergency
                </p>
                <p className="font-bold text-lg">+1-202-501-4444</p>
              </div>
              <div className="p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">UK Citizens Abroad</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Foreign, Commonwealth & Development Office
                </p>
                <p className="font-bold text-lg">+44 20 7008 5000</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EmergencyContacts;
