import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { SearchAutocomplete } from "@/components/SearchAutocomplete";
import { DynamicForm } from "@/components/DynamicForm";
import { ResultDisplay } from "@/components/ResultDisplay";
import { Sparkles, Layers } from "lucide-react";
import { toast } from "sonner";

// Mock data - substituir por API real
const mockClasses = [
  "TUBO PVC",
  "TUBO METAL",
  "VÁLVULA GAVETA",
  "CONEXÃO FLANGEADA",
  "REGISTRO ESFERA"
];

const mockFields = [
  { name: "material", label: "Material", required: true },
  { name: "diametro", label: "Diâmetro", required: true },
  { name: "pressao", label: "Pressão", required: false },
  { name: "norma", label: "Norma", required: false }
];

const Index = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [longDesc, setLongDesc] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleClassSelect = (value: string) => {
    setSelectedClass(value);
    setFormValues({});
    setLongDesc("");
    setShortDesc("");
    toast.success(`Classe "${value}" selecionada`);
  };

  const handleFormChange = (name: string, value: string) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async () => {
    if (!selectedClass) {
      toast.error("Selecione uma classe de material");
      return;
    }

    // Validar campos obrigatórios
    const requiredFields = mockFields.filter(f => f.required);
    for (const field of requiredFields) {
      if (!formValues[field.name]) {
        toast.error(`Campo "${field.label}" é obrigatório`);
        return;
      }
    }

    setIsGenerating(true);
    
    // Simular chamada API
    setTimeout(() => {
      const values = Object.values(formValues).join(" ");
      setLongDesc(`${selectedClass} ${values} CONFORME NORMA ABNT`);
      setShortDesc(`${selectedClass.substring(0, 15)} ${values.substring(0, 20)}`.substring(0, 40));
      setIsGenerating(false);
      toast.success("PDM gerado com sucesso!");
    }, 1500);
  };

  const handleBulkGenerate = () => {
    toast.info("Funcionalidade de geração em massa em desenvolvimento");
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <header className="text-center space-y-4 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full">
            <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm text-muted-foreground">Sistema Interno AEGEA</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Gerador de{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              PDM
            </span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Crie descrições padronizadas de materiais de forma rápida e consistente
          </p>
        </header>

        {/* Navigation */}
        <div className="flex justify-center animate-slide-in">
          <Navigation />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Input */}
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 space-y-6 animate-scale-in">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  1. Buscar Classe
                </h2>
                <SearchAutocomplete
                  onSelect={handleClassSelect}
                  suggestions={mockClasses}
                />
                {selectedClass && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-accent">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>Classe selecionada: {selectedClass}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                2. Preencher Atributos
              </h2>
              <DynamicForm
                fields={selectedClass ? mockFields : []}
                values={formValues}
                onChange={handleFormChange}
              />
            </div>

            {/* Action Buttons */}
            {selectedClass && (
              <div className="flex flex-col sm:flex-row gap-3 animate-slide-in">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="flex-1 h-12 flex items-center justify-center gap-2 bg-primary hover:bg-primary-glow text-primary-foreground rounded-xl font-semibold transition-all glow-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      <span>Gerando...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      <span>Gerar PDM</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleBulkGenerate}
                  className="flex-1 h-12 flex items-center justify-center gap-2 glass-card hover:bg-muted/50 text-foreground rounded-xl font-semibold transition-all"
                >
                  <Layers className="h-5 w-5" />
                  <span>Gerar em Massa</span>
                </button>
              </div>
            )}
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                3. Resultados
              </h2>
              {longDesc || shortDesc ? (
                <ResultDisplay
                  longDescription={longDesc}
                  shortDescription={shortDesc}
                />
              ) : (
                <div className="glass-card rounded-xl p-12 text-center">
                  <div className="max-w-sm mx-auto space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
                      <Sparkles className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Aguardando Geração
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Preencha os campos e clique em "Gerar PDM" para visualizar as descrições
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
