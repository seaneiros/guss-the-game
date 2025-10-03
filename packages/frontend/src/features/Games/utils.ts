export const formatDiff = (seconds: number) => {
  const minutes = seconds < 60 ? 0 : Math.floor(seconds / 60);
  const sec = seconds - (minutes * 60);

  return [minutes, sec].map(val => val < 10 ? `0${val}` : val).join(':');
};