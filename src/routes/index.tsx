import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  TrendingUp,
  Wand2,
  Workflow,
  FolderKanban,
  ArrowRight,
  Activity,
  Lightbulb,
  CalendarClock,
  Brain,
  Clapperboard,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — AI Content Studio" },
      { name: "description", content: "Plataforma privada de creación de contenido con IA." },
    ],
  }),
  component: Index,
});

const commandCenter = {
  activeProject: {
    name: "Frutas IA — Pitahaya",
    status: "En progreso",
    lastActivity: "hace 2 horas",
  },
  trend: {
    category: "Frutas medicinales IA",
    viral: 94,
    label: "Potencial viral",
  },
  idea: {
    idea: "Serie de 8s: 'Pitahaya que cura'",
    reason: "El nicho de frutas medicinales crece +212% esta semana en TikTok.",
  },
  production: {
    project: "Restauraciones vintage",
    status: "Renderizando 70%",
  },
  nextPublish: {
    platform: "TikTok",
    date: "Hoy · 19:30",
    status: "Programada",
  },
  insight: "Los videos de Pitahaya tienen mejor rendimiento que el resto del catálogo.",
};

function Index() {
  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-10 p-5 sm:p-8 lg:space-y-12 xl:p-12">
      <PageHeader
        title="Bienvenido de nuevo"
        subtitle="Tu estudio personal de creación de contenido con IA."
        actions={
          <Button
            asChild
            className="h-10 rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)] transition-all hover:scale-[1.02] hover:opacity-95"
          >
            <Link to="/crear/prompts">
              <Sparkles className="mr-2 h-4 w-4" strokeWidth={2.2} />
              Crear nuevo
            </Link>
          </Button>
        }
      />

      {/* Centro de Mando Inteligente */}
      <section className="space-y-5">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70">
          Centro de mando
        </h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {/* 1 — Proyecto Activo */}
          <Card className="surface-card hover-lift animate-fade-in">
            <CardHeader className="relative flex flex-row items-center gap-2 pb-2">
              <FolderKanban className="h-4 w-4 text-primary" strokeWidth={2.2} />
              <CardTitle className="text-[12px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                Proyecto activo
              </CardTitle>
            </CardHeader>
            <CardContent className="relative space-y-2">
              <p className="text-[17px] font-semibold tracking-tight">
                {commandCenter.activeProject.name}
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-primary/30 bg-primary/10 text-[10.5px] font-medium uppercase tracking-wider text-primary">
                  {commandCenter.activeProject.status}
                </Badge>
                <span className="text-[11.5px] text-muted-foreground">
                  Última actividad {commandCenter.activeProject.lastActivity}
                </span>
              </div>
              <Button asChild size="sm" variant="secondary" className="mt-3 h-9 w-full rounded-xl">
                <Link to="/biblioteca/proyectos">
                  Abrir proyecto <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* 2 — Tendencia del Día */}
          <Card className="surface-card hover-lift animate-fade-in" style={{ animationDelay: "60ms" }}>
            <CardHeader className="relative flex flex-row items-center gap-2 pb-2">
              <TrendingUp className="h-4 w-4 text-primary" strokeWidth={2.2} />
              <CardTitle className="text-[12px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                Tendencia del día
              </CardTitle>
            </CardHeader>
            <CardContent className="relative space-y-3">
              <p className="text-[17px] font-semibold tracking-tight">
                {commandCenter.trend.category}
              </p>
              <div>
                <div className="mb-1 flex items-center justify-between text-[11.5px] text-muted-foreground">
                  <span>{commandCenter.trend.label}</span>
                  <span className="font-medium text-primary">{commandCenter.trend.viral}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/40">
                  <div className="h-full rounded-full bg-[image:var(--gradient-primary)]" style={{ width: `${commandCenter.trend.viral}%` }} />
                </div>
              </div>
              <Button asChild size="sm" variant="secondary" className="mt-1 h-9 w-full rounded-xl">
                <Link to="/investigar/tendencias">
                  Explorar tendencias <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* 3 — Idea Recomendada por IA */}
          <Card className="surface-card hover-lift animate-fade-in" style={{ animationDelay: "120ms" }}>
            <CardHeader className="relative flex flex-row items-center gap-2 pb-2">
              <Lightbulb className="h-4 w-4 text-primary" strokeWidth={2.2} />
              <CardTitle className="text-[12px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                Idea recomendada por IA
              </CardTitle>
            </CardHeader>
            <CardContent className="relative space-y-2">
              <p className="text-[16px] font-semibold leading-snug tracking-tight">
                {commandCenter.idea.idea}
              </p>
              <p className="text-[12px] leading-relaxed text-muted-foreground">
                {commandCenter.idea.reason}
              </p>
              <Button asChild size="sm" className="mt-3 h-9 w-full rounded-xl">
                <Link to="/crear/prompts">
                  <Wand2 className="mr-1.5 h-3.5 w-3.5" /> Crear prompt
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* 4 — Video en Producción */}
          <Card className="surface-card hover-lift animate-fade-in" style={{ animationDelay: "180ms" }}>
            <CardHeader className="relative flex flex-row items-center gap-2 pb-2">
              <Clapperboard className="h-4 w-4 text-primary" strokeWidth={2.2} />
              <CardTitle className="text-[12px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                Video en producción
              </CardTitle>
            </CardHeader>
            <CardContent className="relative space-y-2">
              <p className="text-[17px] font-semibold tracking-tight">
                {commandCenter.production.project}
              </p>
              <Badge variant="outline" className="border-secondary/30 bg-secondary/10 text-[10.5px] font-medium uppercase tracking-wider text-secondary">
                {commandCenter.production.status}
              </Badge>
              <Button asChild size="sm" variant="secondary" className="mt-3 h-9 w-full rounded-xl">
                <Link to="/crear/flow">
                  <Workflow className="mr-1.5 h-3.5 w-3.5" /> Abrir Flow Center
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* 5 — Próxima Publicación */}
          <Card className="surface-card hover-lift animate-fade-in" style={{ animationDelay: "240ms" }}>
            <CardHeader className="relative flex flex-row items-center gap-2 pb-2">
              <CalendarClock className="h-4 w-4 text-primary" strokeWidth={2.2} />
              <CardTitle className="text-[12px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                Próxima publicación
              </CardTitle>
            </CardHeader>
            <CardContent className="relative space-y-2">
              <p className="text-[17px] font-semibold tracking-tight">
                {commandCenter.nextPublish.platform}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-[12.5px] text-muted-foreground">
                  {commandCenter.nextPublish.date}
                </span>
                <Badge variant="outline" className="border-primary/30 bg-primary/10 text-[10.5px] font-medium uppercase tracking-wider text-primary">
                  {commandCenter.nextPublish.status}
                </Badge>
              </div>
              <Button asChild size="sm" variant="secondary" className="mt-3 h-9 w-full rounded-xl">
                <Link to="/publicar">
                  Ver calendario <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* 6 — Insight Principal */}
          <Card className="surface-card relative overflow-hidden hover-lift animate-fade-in" style={{ animationDelay: "300ms" }}>
            <div className="ambient-blob -right-10 -top-10 h-44 w-44 bg-primary" />
            <CardHeader className="relative flex flex-row items-center gap-2 pb-2">
              <Brain className="h-4 w-4 text-primary" strokeWidth={2.2} />
              <CardTitle className="text-[12px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                Insight principal
              </CardTitle>
            </CardHeader>
            <CardContent className="relative space-y-3">
              <p className="text-[16px] font-semibold leading-snug tracking-tight">
                "{commandCenter.insight}"
              </p>
              <Button asChild size="sm" variant="secondary" className="h-9 w-full rounded-xl">
                <Link to="/investigar/aprendizaje">
                  <Activity className="mr-1.5 h-3.5 w-3.5" /> Ver aprendizaje
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
