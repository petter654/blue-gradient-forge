import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ResultDisplayProps {
  longDescription: string;
  shortDescription: string;
}

export const ResultDisplay = ({ longDescription, shortDescription }: ResultDisplayProps) => {
  const [copiedLong, setCopiedLong] = useState(false);
  const [copiedShort, setCopiedShort] = useState(false);

  const handleCopy = async (text: string, type: 'long' | 'short') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'long') {
        setCopiedLong(true);
        setTimeout(() => setCopiedLong(false), 2000);
      } else {
        setCopiedShort(true);
        setTimeout(() => setCopiedShort(false), 2000);
      }
      toast.success("Copiado para área de transferência!");
    } catch (err) {
      toast.error("Erro ao copiar");
    }
  };

  if (!longDescription && !shortDescription) {
    return null;
  }

  return (
    <div className="space-y-4 animate-slide-in">
      {/* Long Description */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">Descrição Longa</h3>
          <button
            onClick={() => handleCopy(longDescription, 'long')}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all",
              "bg-success/10 hover:bg-success/20 text-success",
              copiedLong && "bg-success/30"
            )}
          >
            {copiedLong ? (
              <>
                <Check className="h-4 w-4" />
                <span className="text-sm font-medium">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span className="text-sm font-medium">Copiar</span>
              </>
            )}
          </button>
        </div>
        <textarea
          readOnly
          value={longDescription}
          className="w-full h-24 px-4 py-3 glass-input rounded-lg text-foreground resize-none focus:outline-none"
        />
      </div>

      {/* Short Description */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-foreground">Descrição Curta</h3>
            <span className="text-xs text-muted-foreground bg-muted/30 px-2 py-0.5 rounded">
              {shortDescription.length}/40 caracteres
            </span>
          </div>
          <button
            onClick={() => handleCopy(shortDescription, 'short')}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all",
              "bg-success/10 hover:bg-success/20 text-success",
              copiedShort && "bg-success/30"
            )}
          >
            {copiedShort ? (
              <>
                <Check className="h-4 w-4" />
                <span className="text-sm font-medium">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span className="text-sm font-medium">Copiar</span>
              </>
            )}
          </button>
        </div>
        <textarea
          readOnly
          value={shortDescription}
          className="w-full h-20 px-4 py-3 glass-input rounded-lg text-foreground resize-none focus:outline-none"
        />
      </div>
    </div>
  );
};
