import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, Save, Pencil, Heart, Sparkles, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Film } from "lucide-react";
import { FlowConnector } from "@/components/flow-connector";
import { useServerFn } from "@tanstack/react-start";
import { useQueryClient } from "@tanstack/react-query";
import { savePrompt } from "@/lib/prompts.functions";

export const Route = createFileRoute("/crear/prompts")({
  head: () => ({ meta: [{ title: "Generador de Prompts — AI Content Studio" }] }),
  component: PromptsGenerator,
});

const templates = [
  { id: "frutas", label: "Animales de Frutas" },
  { id: "influencer", label: "Influencer IA" },
  { id: "curiosidades", label: "Curiosidades de Frutas" },
  { id: "restauraciones", label: "Restauraciones" },
  { id: "historias", label: "Historias" },
];

type FormState = {
  category: string;
  platform: string;
  style: string;
  language: string;
  duration: string;
};

const EMPTY_FORM: FormState = { category: "", platform: "", style: "", language: "", duration: "" };

function PromptsGenerator() {
  const [result, setResult] = useState("");
  const [active, setActive] = useState(templates[0].id);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const save = useServerFn(savePrompt);
  const qc = useQueryClient();
  const activeTemplate = templates.find((t) => t.id === active) ?? templates[0];

  const update = (k: keyof FormState) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async () => {
    if (!result.trim()) {
      toast.error("Genera un prompt antes de guardar.");
      return;
    }
    setSaving(true);
    try {
      await save({
        data: {
          title: `${activeTemplate.label}${form.category ? " — " + form.category : ""}`,
          category: form.category || activeTemplate.label,
          platform: form.platform || null,
          language: form.language || null,
          duration: form.duration || null,
          original_prompt: result,
          flow_prompt: result,
          youtube_prompt: result,
          veo_prompt: result,
          kling_prompt: result,
        },
      });
      await qc.invalidateQueries({ queryKey: ["library", "prompts"] });
      toast.success("Prompt guardado en tu biblioteca.");
    } catch (e) {
      toast.error("No pudimos guardar el prompt.", {
        description: e instanceof Error ? e.message : "Intenta nuevamente.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-6 lg:p-10">
      <PageHeader
        title="Generador de Prompts"
        subtitle="Crea prompts optimizados por categoría, plataforma y estilo."
      />

      <Tabs
        value={active}
        onValueChange={(v) => {
          setActive(v);
          setForm(EMPTY_FORM);
          setResult("");
        }}
        className="w-full"
      >
        <TabsList className="flex w-full flex-wrap justify-start gap-1 bg-card p-1">
          {templates.map((t) => (
            <TabsTrigger key={t.id} value={t.id} className="data-[state=active]:bg-primary/15 data-[state=active]:text-primary">
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {templates.map((t) => (
          <TabsContent key={t.id} value={t.id} className="mt-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="border-border/60 bg-card">
                <CardHeader>
                  <CardTitle className="text-base">{t.label}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Field label="Categoría">
                    <Input
                      placeholder="Ej. Pitahaya tropical"
                      value={form.category}
                      onChange={(e) => update("category")(e.target.value)}
                    />
                  </Field>
                  <Field label="Plataforma">
                    <Select value={form.platform} onValueChange={update("platform")}>
                      <SelectTrigger><SelectValue placeholder="Selecciona plataforma" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="YouTube">YouTube</SelectItem>
                        <SelectItem value="TikTok">TikTok</SelectItem>
                        <SelectItem value="Instagram">Instagram</SelectItem>
                        <SelectItem value="Facebook">Facebook</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Estilo">
                    <Select value={form.style} onValueChange={update("style")}>
                      <SelectTrigger><SelectValue placeholder="Cinemático, realista..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cinemático">Cinemático</SelectItem>
                        <SelectItem value="Realista">Realista</SelectItem>
                        <SelectItem value="Cartoon">Cartoon</SelectItem>
                        <SelectItem value="Anime">Anime</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Idioma">
                      <Select value={form.language} onValueChange={update("language")}>
                        <SelectTrigger><SelectValue placeholder="Español" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Español">Español</SelectItem>
                          <SelectItem value="Inglés">Inglés</SelectItem>
                          <SelectItem value="Portugués">Portugués</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Duración">
                      <Select value={form.duration} onValueChange={update("duration")}>
                        <SelectTrigger><SelectValue placeholder="8s" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5s">5 segundos</SelectItem>
                          <SelectItem value="8s">8 segundos</SelectItem>
                          <SelectItem value="15s">15 segundos</SelectItem>
                          <SelectItem value="30s">30 segundos</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>

                  <Button
                    className="w-full bg-[image:var(--gradient-primary)] text-primary-foreground hover:opacity-90"
                    onClick={() =>
                      setResult(
                        `[${t.label}] Prompt generado:\nUn video ${form.style || "cinemático"} en ${form.language || "español"}, de ${form.duration || "8s"}, mostrando ${(form.category || t.label).toLowerCase()} con iluminación dramática y enfoque macro.`,
                      )
                    }
                  >
                    <Sparkles className="mr-2 h-4 w-4" /> Generar prompt
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border/60 bg-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-base">Resultado</CardTitle>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => { navigator.clipboard.writeText(result); toast.success("Copiado"); }}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={handleSave}
                      disabled={saving || !result.trim()}
                      aria-label="Guardar prompt"
                    >
                      {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => toast("Función preparada para integración futura", { description: "Disponible cuando se conecte la API real." })}><Pencil className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => toast("Función preparada para integración futura", { description: "Disponible cuando se conecte la API real." })}><Heart className="h-4 w-4" /></Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={result}
                    onChange={(e) => setResult(e.target.value)}
                    placeholder="Aquí aparecerá tu prompt generado..."
                    className="min-h-[280px] resize-none bg-background/40 font-mono text-sm"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <FlowConnector
        title="Tu prompt está listo"
        description="Envíalo al Flow Center para generar tu video o guárdalo en la biblioteca."
        steps={[
          { label: "Enviar a Flow", to: "/crear/flow", icon: Film },
          { label: "Guardar en Biblioteca", to: "/biblioteca/prompts", icon: Save },
        ]}
      />
    </div>
  );
}


function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}