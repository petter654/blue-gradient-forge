import { NavLink } from "@/components/NavLink";
import { Zap, Settings, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export const Navigation = () => {
  return (
    <nav className="glass-card rounded-2xl p-2 flex items-center gap-2">
      <NavLink
        to="/"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all font-medium",
            isActive
              ? "bg-primary text-primary-foreground glow-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          )
        }
      >
        <Zap className="h-4 w-4" />
        <span>Gerador</span>
      </NavLink>
      
      <NavLink
        to="/admin"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all font-medium",
            isActive
              ? "bg-primary text-primary-foreground glow-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          )
        }
      >
        <Settings className="h-4 w-4" />
        <span>Admin</span>
      </NavLink>

      <NavLink
        to="/dicionario"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all font-medium",
            isActive
              ? "bg-primary text-primary-foreground glow-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          )
        }
      >
        <BookOpen className="h-4 w-4" />
        <span>Dicionário</span>
      </NavLink>
    </nav>
  );
};
