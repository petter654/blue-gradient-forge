import { Label } from "@/components/ui/label";

interface FormField {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}

interface DynamicFormProps {
  fields: FormField[];
  values: Record<string, string>;
  onChange: (name: string, value: string) => void;
}

export const DynamicForm = ({ fields, values, onChange }: DynamicFormProps) => {
  if (fields.length === 0) {
    return (
      <div className="glass-card rounded-xl p-8 text-center">
        <p className="text-muted-foreground">
          Selecione uma classe de material para visualizar os campos
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl p-6 space-y-4 animate-slide-in">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Atributos do Material
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name} className="text-sm font-medium text-foreground">
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <input
              id={field.name}
              type={field.type || "text"}
              value={values[field.name] || ""}
              onChange={(e) => onChange(field.name, e.target.value)}
              required={field.required}
              className="w-full h-11 px-4 glass-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none"
              placeholder={`Digite ${field.label.toLowerCase()}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
