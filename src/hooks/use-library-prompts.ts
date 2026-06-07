import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listPrompts, type StoredPrompt } from "@/lib/prompts.functions";

export interface UseLibraryPromptsResult {
  data: StoredPrompt[];
  isLoading: boolean;
  error: Error | null;
  isEmpty: boolean;
  refetch: () => void;
}

export function useLibraryPrompts(): UseLibraryPromptsResult {
  const fetcher = useServerFn(listPrompts);
  const q = useQuery({
    queryKey: ["library", "prompts"],
    queryFn: () => fetcher(),
  });
  const data = q.data ?? [];
  return {
    data,
    isLoading: q.isLoading,
    error: (q.error as Error) ?? null,
    isEmpty: !q.isLoading && data.length === 0,
    refetch: () => q.refetch(),
  };
}
