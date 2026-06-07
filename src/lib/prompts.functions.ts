import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Single-owner mode (no auth yet). All persisted prompts belong to this user_id.
const OWNER_USER_ID = "00000000-0000-0000-0000-000000000001";

const SavePromptInput = z.object({
  title: z.string().min(1).max(255),
  category: z.string().max(64).nullable().optional(),
  platform: z.string().max(64).nullable().optional(),
  language: z.string().max(32).nullable().optional(),
  duration: z.string().max(32).nullable().optional(),
  original_prompt: z.string().max(20000).nullable().optional(),
  flow_prompt: z.string().max(20000).nullable().optional(),
  youtube_prompt: z.string().max(20000).nullable().optional(),
  veo_prompt: z.string().max(20000).nullable().optional(),
  kling_prompt: z.string().max(20000).nullable().optional(),
});

export const savePrompt = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => SavePromptInput.parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("prompts")
      .insert({
        user_id: OWNER_USER_ID,
        title: data.title,
        category: data.category ?? null,
        platform: data.platform ?? null,
        language: data.language ?? null,
        duration: data.duration ?? null,
        content: data.original_prompt ?? null,
        original_prompt: data.original_prompt ?? null,
        flow_prompt: data.flow_prompt ?? null,
        youtube_prompt: data.youtube_prompt ?? null,
        veo_prompt: data.veo_prompt ?? null,
        kling_prompt: data.kling_prompt ?? null,
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: row.id };
  });

export const listPrompts = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("prompts")
    .select(
      "id, title, category, platform, language, duration, original_prompt, flow_prompt, youtube_prompt, veo_prompt, kling_prompt, content, is_favorite, created_at",
    )
    .eq("user_id", OWNER_USER_ID)
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) throw new Error(error.message);
  return (data ?? []).map((p) => ({
    id: p.id as string,
    title: (p.title as string) ?? "Sin título",
    category: (p.category as string) ?? "—",
    platform: (p.platform as string) ?? "—",
    language: (p.language as string) ?? null,
    duration: (p.duration as string) ?? null,
    excerpt: ((p.original_prompt ?? p.content ?? "") as string).slice(0, 160),
    favorite: Boolean(p.is_favorite),
    created_at: p.created_at as string,
  }));
});

export type StoredPrompt = Awaited<ReturnType<typeof listPrompts>>[number];
