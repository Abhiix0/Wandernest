import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Languages, ArrowRight, Volume2, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const LanguageTranslator = () => {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("es");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
    { code: "ja", name: "Japanese" },
    { code: "zh", name: "Chinese" },
    { code: "ko", name: "Korean" },
    { code: "ar", name: "Arabic" },
    { code: "hi", name: "Hindi" },
    { code: "ru", name: "Russian" },
  ];

  const commonPhrases = [
    { en: "Hello", es: "Hola" },
    { en: "Thank you", es: "Gracias" },
    { en: "Where is the bathroom?", es: "¿Dónde está el baño?" },
    { en: "How much does this cost?", es: "¿Cuánto cuesta esto?" },
    { en: "I need help", es: "Necesito ayuda" },
    { en: "Do you speak English?", es: "¿Hablas inglés?" },
  ];

  const translate = () => {
    if (!sourceText.trim()) {
      toast({
        title: "Enter text to translate",
        description: "Please type something in the source text field",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    // Simulated translation - in production, integrate with Google Translate API or similar
    setTimeout(() => {
      setTranslatedText(`[Translated to ${languages.find(l => l.code === targetLang)?.name}]: ${sourceText}`);
      setLoading(false);
      toast({
        title: "Translation complete",
        description: "Text has been translated",
      });
    }, 800);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <PageHeader
        title="Language Translator"
        subtitle="Quick translations for your travel needs"
      />

      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="h-6 w-6" />
              Translate Text
            </CardTitle>
            <CardDescription>Translate between multiple languages instantly</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Select value={sourceLang} onValueChange={setSourceLang}>
                <SelectTrigger>
                  <SelectValue placeholder="Source Language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center justify-center">
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
              </div>

              <Select value={targetLang} onValueChange={setTargetLang}>
                <SelectTrigger>
                  <SelectValue placeholder="Target Language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Source Text</label>
                <Textarea
                  placeholder="Enter text to translate..."
                  value={sourceText}
                  onChange={(e) => setSourceText(e.target.value)}
                  className="min-h-[150px]"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Translation</label>
                <div className="relative">
                  <Textarea
                    value={translatedText}
                    readOnly
                    className="min-h-[150px] bg-muted/50"
                    placeholder="Translation will appear here..."
                  />
                  {translatedText && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(translatedText)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <Button onClick={translate} disabled={loading} className="w-full">
              <Languages className="mr-2 h-4 w-4" />
              {loading ? "Translating..." : "Translate"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Common Travel Phrases</CardTitle>
            <CardDescription>Quick access to frequently used phrases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {commonPhrases.map((phrase, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-smooth cursor-pointer"
                  onClick={() => {
                    setSourceText(phrase.en);
                    setSourceLang("en");
                    setTargetLang("es");
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-semibold mb-1">{phrase.en}</p>
                      <p className="text-muted-foreground">{phrase.es}</p>
                    </div>
                    <Badge variant="secondary">EN → ES</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default LanguageTranslator;
