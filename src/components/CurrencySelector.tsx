import { Globe, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useCurrency, countries } from '@/hooks/useCurrency';

export const CurrencySelector = () => {
  const { selectedCountry, setSelectedCountry, isLoading } = useCurrency();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 min-w-[140px]"
          aria-label="Select country and currency"
        >
          <Globe className="h-4 w-4" />
          <span className="flex items-center gap-1">
            <span>{selectedCountry.flag}</span>
            <span className="hidden sm:inline">{selectedCountry.currency}</span>
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-64 max-h-[400px] overflow-y-auto bg-popover z-50"
      >
        <DropdownMenuLabel>Choose Country & Currency</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isLoading && (
          <div className="p-4 text-center text-sm text-muted-foreground">
            Loading exchange rates...
          </div>
        )}
        {countries.map((country) => (
          <DropdownMenuItem
            key={country.code}
            onClick={() => setSelectedCountry(country)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{country.flag}</span>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{country.name}</span>
                <span className="text-xs text-muted-foreground">
                  {country.currency} ({country.symbol})
                </span>
              </div>
            </div>
            {selectedCountry.code === country.code && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
