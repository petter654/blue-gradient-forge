import { Navigation } from "@/components/Navigation";
import { BookOpen, Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const mockAbreviacoes = [
  { id: 1, de: "POLICLORETO DE VINILA", para: "PVC" },
  { id: 2, de: "MILIMETROS", para: "MM" },
  { id: 3, de: "QUILOGRAMA POR CENTIMETRO QUADRADO", para: "KGF/CM²" },
];

const Dicionario = () => {
  const handleAdd = () => {
    toast.success("Abreviação adicionada!");
  };

  const handleEdit = (id: number) => {
    toast.info(`Editando abreviação ${id}`);
  };

  const handleDelete = (id: number) => {
    toast.error(`Abreviação ${id} excluída`);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <header className="text-center space-y-4 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full">
            <BookOpen className="h-4 w-4 text-accent" />
            <span className="text-sm text-muted-foreground">Gerenciamento de Termos</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Dicionário de{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Abreviações
            </span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Configure mapeamentos de termos completos para suas abreviações
          </p>
        </header>

        {/* Navigation */}
        <div className="flex justify-center animate-slide-in">
          <Navigation />
        </div>

        {/* Add Form */}
        <div className="glass-card rounded-2xl p-6 animate-scale-in">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Nova Abreviação
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Termo Completo (DE)
              </label>
              <input
                type="text"
                placeholder="Ex: POLICLORETO DE VINILA"
                className="w-full h-11 px-4 glass-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Abreviação (PARA)
              </label>
              <input
                type="text"
                placeholder="Ex: PVC"
                className="w-full h-11 px-4 glass-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-glow text-primary-foreground rounded-xl font-semibold transition-all glow-primary"
            >
              <Plus className="h-5 w-5" />
              <span>Adicionar</span>
            </button>
          </div>
        </div>

        {/* List */}
        <div className="glass-card rounded-2xl overflow-hidden animate-slide-in">
          <div className="p-6 border-b border-border/30">
            <h2 className="text-xl font-semibold text-foreground">
              Abreviações Cadastradas ({mockAbreviacoes.length})
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/30">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Termo Completo
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Abreviação
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockAbreviacoes.map((abrev) => (
                  <tr key={abrev.id} className="border-t border-border/30 hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4 text-foreground">
                      {abrev.de}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-lg bg-accent/10 text-accent font-medium">
                        {abrev.para}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(abrev.id)}
                          className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(abrev.id)}
                          className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dicionario;
