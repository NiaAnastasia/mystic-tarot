import { useReadingStore } from "../store/readingStore";

export const useInterpretation = () => {
  const { readingId, appendInterpretation, setIsStreaming } = useReadingStore();

  const streamInterpretation = async (id?: string) => {
    const targetId = id || readingId;
    if (!targetId) return;

    setIsStreaming(true);

    const response = await fetch("/api/interpret", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ readingId: targetId }),
    });

    const reader = response.body!.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));

      for (const line of lines) {
        const data = line.replace("data: ", "");
        if (data === "[DONE]") {
          setIsStreaming(false);
          return;
        }
        try {
          const parsed = JSON.parse(data);
          if (parsed.text) appendInterpretation(parsed.text);
        } catch {
          // ignore malformed SSE lines
        }
      }
    }

    setIsStreaming(false);
  };

  return { streamInterpretation };
};
