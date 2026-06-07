ALTER TABLE public.prompts
  ADD COLUMN IF NOT EXISTS original_prompt text,
  ADD COLUMN IF NOT EXISTS flow_prompt text,
  ADD COLUMN IF NOT EXISTS youtube_prompt text,
  ADD COLUMN IF NOT EXISTS veo_prompt text,
  ADD COLUMN IF NOT EXISTS kling_prompt text;

ALTER TABLE public.prompts ALTER COLUMN content DROP NOT NULL;