import { Link, useRouterState } from "@tanstack/react-router";
import { ReactNode } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Sparkles, FileText, Image as ImageIcon, Video, Heart, FolderKanban, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { CalendarClock, BarChart3 } from "lucide-react";
import { FlowConnector } from "@/components/flow-connector";

const tabs = [
  { to: "/biblioteca/prompts", label: "Prompts", icon: FileText },
  { to: "/biblioteca/imagenes", label: "Imágenes", icon: ImageIcon },
  { to: "/biblioteca/videos", label: "Videos", icon: Video },
  { to: "/biblioteca/favoritos", label: "Favoritos", icon: Heart },
  { to: "/biblioteca/proyectos", label: "Proyectos", icon: FolderKanban },
  { to: "/biblioteca/descargas", label: "Descargas", icon: Download },
] as const;

export function LibraryShell({ children, count }: { children: ReactNode; count?: number }) {
  const path = useRouterState({ select: (r) => r.location.pathname });
  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6 p-6 lg:p-10">
      <PageHeader
        title="Biblioteca Inteligente"
        subtitle="Todos tus recursos creados en AI Content Studio, centralizados y buscables."
        actions={
          <>
            {typeof count === "number" && (
              <div className="hidden items-center gap-1.5 rounded-full border border-border/60 bg-card/60 px-3 py-1.5 text-xs text-muted-foreground sm:flex">
                <span className="font-medium text-foreground">{count.toLocaleString("es")}</span>
                <span>recursos</span>
              </div>
            )}
            <Button size="sm" className="gap-1.5">
              <Sparkles className="h-3.5 w-3.5" /> Nuevo recurso
            </Button>
          </>
        }
      />

      <div className="-mx-1 overflow-x-auto">
        <div className="flex min-w-max items-center gap-1 rounded-xl border border-border/60 bg-card/40 p-1">
          {tabs.map((t) => {
            const active = path === t.to;
            return (
              <Link
                key={t.to}
                to={t.to}
                className={cn(
                  "group inline-flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-medium transition-all",
                  active
                    ? "bg-accent text-foreground shadow-[var(--shadow-soft)]"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                <t.icon className={cn("h-3.5 w-3.5", active ? "text-primary" : "")} />
                {t.label}
              </Link>
            );
          })}
        </div>
      </div>

      {children}

      <FlowConnector
        title="Continúa el flujo desde tu biblioteca"
        description="Programa tu contenido para publicación o analiza su rendimiento."
        steps={[
          { label: "Programar Publicación", to: "/publicar", icon: CalendarClock },
          { label: "Ver Rendimiento", to: "/investigar/aprendizaje", icon: BarChart3 },
        ]}
      />
    </div>
  );
}

export function EmptyState({ label }: { label: string }) {
  return (
    <div className="surface-card flex flex-col items-center justify-center gap-2 p-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/60">
        <Sparkles className="h-5 w-5 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium">Sin resultados</p>
      <p className="text-xs text-muted-foreground">No se encontraron {label} con los filtros actuales.</p>
    </div>
  );
}
