import { Navigation } from "@/components/Navigation";
import { Settings, Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";

const Admin = () => {
  const handleSave = () => {
    toast.success("Classe salva com sucesso!");
  };

  const handleDelete = () => {
    toast.error("Classe excluída");
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <header className="text-center space-y-4 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full">
            <Settings className="h-4 w-4 text-accent" />
            <span className="text-sm text-muted-foreground">Área Administrativa</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Criação de{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Classes PDM
            </span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Configure classes de materiais e suas regras de geração
          </p>
        </header>

        {/* Navigation */}
        <div className="flex justify-center animate-slide-in">
          <Navigation />
        </div>

        {/* Main Content */}
        <div className="glass-card rounded-2xl p-6 space-y-6 animate-scale-in">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              Configuração da Classe
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Nome da Classe *
                </label>
                <input
                  type="text"
                  placeholder="Ex: TUBO PVC"
                  className="w-full h-11 px-4 glass-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Template Longo
                </label>
                <input
                  type="text"
                  placeholder="{MATERIAL} {DIAMETRO} {PRESSAO}"
                  className="w-full h-11 px-4 glass-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Template Curto (40 caracteres)
              </label>
              <input
                type="text"
                placeholder="{MATERIAL} {DIAMETRO}"
                className="w-full h-11 px-4 glass-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
          </div>

          <div className="border-t border-border/30 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                Atributos
              </h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-all">
                <Plus className="h-4 w-4" />
                <span className="font-medium">Adicionar Atributo</span>
              </button>
            </div>

            <div className="glass-card rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Ordem</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Nome</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Label</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Abreviar?</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border/30">
                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                      Nenhum atributo configurado
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 bg-success hover:bg-success/90 text-success-foreground rounded-xl font-semibold transition-all"
            >
              <Save className="h-5 w-5" />
              <span>Salvar Classe</span>
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-6 py-3 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-xl font-semibold transition-all"
            >
              <Trash2 className="h-5 w-5" />
              <span>Excluir</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
