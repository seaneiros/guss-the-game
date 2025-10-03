import { useEffect, useState } from 'react';


export const useCountdown = (initialValue: number | (() => number)) => {
  const [ countdown, setCountdown ] = useState(initialValue);

  useEffect(() => {
    const interval = setInterval(() => setCountdown(value => {
      if (value <= 0) {
        clearInterval(interval);
        return value;
      }

      return value - 1;
    }), 1000);

    return () => {
      clearInterval(interval);
    }
  }, []);

  return countdown;
};