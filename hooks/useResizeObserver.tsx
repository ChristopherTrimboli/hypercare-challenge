import { useState, useEffect, useCallback } from "react";

function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return function (...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn(...args);
    }
  };
}

const useResizeObserver = (
  ref: React.RefObject<HTMLElement>,
  {
    throttleTimeout = 500,
  }: {
    throttleTimeout?: number;
  } = {}
) => {
  const [dimensions, setDimensions] = useState<DOMRectReadOnly | null>(null);

  const throttledSetDimensions = useCallback(
    throttle((rect: DOMRectReadOnly) => {
      setDimensions(rect);
    }, throttleTimeout),
    [throttleTimeout]
  );

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        throttledSetDimensions(entry.contentRect);
      });
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, throttledSetDimensions]);

  return dimensions;
};

export default useResizeObserver;
