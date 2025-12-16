import { useEffect, useState } from "react";

export function useTextStream(text: string | undefined, speed = 15) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!text) {
      setDisplayed("");
      return;
    }

    let i = 0;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;

      setDisplayed(text.slice(0, i));

      if (i < text.length) {
        i += 1;
        setTimeout(tick, speed);
      }
    };

    tick();

    return () => {
      cancelled = true;
    };
  }, [text, speed]);

  return displayed;
}
