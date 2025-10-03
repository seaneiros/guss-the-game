import { useRef, useCallback } from 'react';
import type { Nullable }       from '@guss/common';


export const useRequestKey = () => {
  const keyRef = useRef<Nullable<symbol>>(null);

  const setRequestKey = useCallback((key: symbol) => keyRef.current = key, []);

  const engage = useCallback(() => {
    const key = generateKey();
    setRequestKey(key);

    return key;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isCurrentRequest = useCallback((key: symbol) => keyRef.current === key, []);

  return {
    generateKey,
    setRequestKey,
    engage,
    isCurrentRequest,
  };
};


/* HELPERS */

function generateKey() {
  return Symbol();
}