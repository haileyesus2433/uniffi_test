import { useEffect, useState, useRef } from 'react';
import { initLlm, generateLlm } from './llm';

export const useLlm = () => {
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    initLlm()
      .then(() => setReady(true))
      .catch((e) => setError(e.message));
  }, []);

  const ask = async (prompt: string) => {
    if (!ready) throw new Error('LLM not ready');
    setLoading(true);
    setError(null);
    try {
      const res = await generateLlm(prompt);
      return res;
    } catch (e: any) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { ready, loading, error, ask };
};
