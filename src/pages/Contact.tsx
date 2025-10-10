import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, MessageSquare, Clock, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-ocean-gradient text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-slide-up opacity-90">
            Ready to plan your next adventure? We're here to help make it unforgettable.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="shadow-travel">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  Send us a Message
                </CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                </div>
                
                <div>
                  <Label htmlFor="tripType">Trip Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select trip type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="adventure">Adventure Travel</SelectItem>
                      <SelectItem value="cultural">Cultural Experience</SelectItem>
                      <SelectItem value="luxury">Luxury Travel</SelectItem>
                      <SelectItem value="family">Family Vacation</SelectItem>
                      <SelectItem value="solo">Solo Travel</SelectItem>
                      <SelectItem value="group">Group Travel</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="destination">Preferred Destination</Label>
                  <Input id="destination" placeholder="Where would you like to go?" />
                </div>
                
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us about your dream trip, preferred dates, budget, and any special requirements..."
                    rows={5}
                  />
                </div>
                
                <Button className="w-full bg-primary hover:bg-primary-hover" size="lg">
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-xl">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Office Address</h3>
                      <p className="text-muted-foreground">
                        123 Travel Lane<br />
                        Adventure District<br />
                        San Francisco, CA 94102
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone Numbers</h3>
                      <p className="text-muted-foreground">
                        US/Canada: +1 (555) 123-TRIP<br />
                        International: +1 (555) 123-4567
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email Addresses</h3>
                      <p className="text-muted-foreground">
                        General: hello@wandernest.com<br />
                        Bookings: trips@wandernest.com<br />
                        Support: help@wandernest.com
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Office Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Friday: 9AM - 7PM PST<br />
                        Saturday: 10AM - 4PM PST<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    Emergency Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Need help while traveling? Our 24/7 emergency support team is always available.
                  </p>
                  <div className="space-y-2">
                    <p className="font-semibold text-accent">Emergency Hotline: +1 (555) 911-HELP</p>
                    <p className="text-sm text-muted-foreground">
                      Available 24/7 for all WanderNest travelers
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-xl">Follow Our Journey</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Stay connected with us on social media for travel inspiration, tips, and updates.
                  </p>
                  <div className="flex gap-4">
                    <Button variant="outline" size="sm">Instagram</Button>
                    <Button variant="outline" size="sm">Facebook</Button>
                    <Button variant="outline" size="sm">Twitter</Button>
                    <Button variant="outline" size="sm">YouTube</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">
              Quick answers to common questions about booking and travel
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                question: "How far in advance should I book?",
                answer: "We recommend booking 2-3 months in advance for international trips and 4-6 weeks for domestic travel to ensure the best availability and pricing."
              },
              {
                question: "What's included in your packages?",
                answer: "Our packages typically include accommodations, most meals, guided tours, transportation, and entrance fees. Specific inclusions vary by trip - check individual package details."
              },
              {
                question: "Do you offer travel insurance?",
                answer: "Yes, we partner with leading travel insurance providers to offer comprehensive coverage options. We highly recommend purchasing insurance for international travel."
              },
              {
                question: "Can I customize existing packages?",
                answer: "Absolutely! All our packages can be customized to fit your preferences, budget, and timeline. Contact us to discuss modifications."
              },
              {
                question: "What's your cancellation policy?",
                answer: "Cancellation policies vary by trip and timing. Generally, cancellations 60+ days before departure receive full refunds minus processing fees."
              },
              {
                question: "Do you cater to dietary restrictions?",
                answer: "Yes, we accommodate all dietary restrictions and food allergies. Please inform us of any requirements when booking so we can make proper arrangements."
              }
            ].map((faq, index) => (
              <Card key={index} className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;