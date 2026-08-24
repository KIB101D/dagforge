// useLongPress.js
import { useRef, useCallback } from "react";

const LONG_PRESS_DURATION = 500;
const MOVE_TOLERANCE = 10;

export const useLongPress = (onLongPress) => {
  const timerRef = useRef(null);
  const startPosRef = useRef({ x: 0, y: 0 });

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const onTouchStart = useCallback(
    (event) => {
      const touch = event.touches[0];
      startPosRef.current = { x: touch.clientX, y: touch.clientY };
      timerRef.current = setTimeout(() => {
        onLongPress(touch.clientX, touch.clientY);
      }, LONG_PRESS_DURATION);
    },
    [onLongPress],
  );

  const onTouchMove = useCallback(
    (event) => {
      const touch = event.touches[0];
      const dx = touch.clientX - startPosRef.current.x;
      const dy = touch.clientY - startPosRef.current.y;
      if (Math.sqrt(dx * dx + dy * dy) > MOVE_TOLERANCE) clear();
    },
    [clear],
  );

  const onTouchEnd = useCallback(() => clear(), [clear]);

  return { onTouchStart, onTouchMove, onTouchEnd };
};
