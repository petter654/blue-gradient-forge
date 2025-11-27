import { useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchAutocompleteProps {
  onSelect: (value: string) => void;
  placeholder?: string;
  suggestions?: string[];
}

export const SearchAutocomplete = ({ 
  onSelect, 
  placeholder = "Buscar classe de material...",
  suggestions = []
}: SearchAutocompleteProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const handleInputChange = (value: string) => {
    setQuery(value);
    if (value.trim()) {
      const filtered = suggestions.filter(s => 
        s.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setIsOpen(filtered.length > 0);
    } else {
      setFilteredSuggestions([]);
      setIsOpen(false);
    }
  };

  const handleSelect = (value: string) => {
    setQuery(value);
    setIsOpen(false);
    onSelect(value);
  };

  const handleClear = () => {
    setQuery("");
    setFilteredSuggestions([]);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => query && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full h-14 pl-12 pr-12 glass-input rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:glow-primary"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {isOpen && filteredSuggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 glass-card rounded-xl overflow-hidden animate-scale-in">
          <ul className="max-h-64 overflow-y-auto">
            {filteredSuggestions.map((suggestion, index) => (
              <li key={index}>
                <button
                  onClick={() => handleSelect(suggestion)}
                  className={cn(
                    "w-full px-4 py-3 text-left transition-colors",
                    "hover:bg-primary/10 focus:bg-primary/10 focus:outline-none",
                    "border-b border-border/30 last:border-0"
                  )}
                >
                  <span className="text-foreground">{suggestion}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
