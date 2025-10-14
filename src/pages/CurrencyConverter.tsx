import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRightLeft, TrendingUp, RefreshCw } from "lucide-react";
import { useCurrency, countries } from "@/hooks/useCurrency";
import { useToast } from "@/hooks/use-toast";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("100");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const { convertPrice, exchangeRates } = useCurrency();
  const { toast } = useToast();

  const handleConvert = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to convert",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Conversion complete",
      description: `${amount} ${fromCurrency} converted successfully`,
    });
  };

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const numAmount = parseFloat(amount) || 0;
  const usdAmount = numAmount / (exchangeRates[fromCurrency] || 1);
  const convertedValue = usdAmount * (exchangeRates[toCurrency] || 1);
  const convertedAmount = convertedValue.toFixed(2);
  const rate = (exchangeRates[toCurrency] || 1) / (exchangeRates[fromCurrency] || 1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <PageHeader
        title="Currency Converter"
        subtitle="Convert between currencies with live exchange rates"
      />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRightLeft className="h-6 w-6" />
                Convert Currency
              </CardTitle>
              <CardDescription>Real-time exchange rates updated daily</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Amount</label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium mb-2 block">From</label>
                    <Select value={fromCurrency} onValueChange={setFromCurrency}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.currency} value={country.currency}>
                            <span className="flex items-center gap-2">
                              <span>{country.flag}</span>
                              <span>{country.currency} - {country.name}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={swapCurrencies}
                      className="rounded-full"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-medium mb-2 block">To</label>
                    <Select value={toCurrency} onValueChange={setToCurrency}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.currency} value={country.currency}>
                            <span className="flex items-center gap-2">
                              <span>{country.flag}</span>
                              <span>{country.currency} - {country.name}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="p-6 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-sm text-muted-foreground mb-1">Converted Amount</p>
                  <p className="text-4xl font-bold text-primary">{convertedAmount}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
                  </p>
                </div>

                <Button onClick={handleConvert} className="w-full" size="lg">
                  <ArrowRightLeft className="mr-2 h-4 w-4" />
                  Convert
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Quick Reference Rates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {countries.slice(0, 6).map((country) => {
                  const countryRate = exchangeRates[country.currency] / exchangeRates[fromCurrency];
                  return (
                    <div
                      key={country.currency}
                      className="p-3 rounded-lg border hover:bg-muted/50 transition-smooth"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{country.flag}</span>
                        <span className="font-semibold">{country.currency}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        1 {fromCurrency} = {countryRate.toFixed(4)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CurrencyConverter;
