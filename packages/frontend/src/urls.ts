import type { UUID } from '@guss/common';
import qs from 'query-string';


const urls = {
  index: createUrlGetter(() => '/'),

  login: createUrlGetter(() => '/login'),

  games: createUrlGetter(() => '/games'),
  gameDetails: createUrlGetter((id: UUID) => `/games/${id}`),
};

export default urls;


/* HELPERS */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createUrlGetter(pathCreator: (...args: any[]) => string) {
  if (typeof pathCreator !== 'function') {
    throw new TypeError(`argument is not a function; ${typeof pathCreator} passed`);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (...args: any[]) {
    const creatorArgsCount = pathCreator.length;
    const queryParams = args[creatorArgsCount] || {};
    const hashValue = args[creatorArgsCount + 1];

    const pathStr = pathCreator.apply(pathCreator, args.slice(0, creatorArgsCount));
    const queryStr = qs.stringify(queryParams, { arrayFormat: 'comma' });
    const hashStr = hashValue != null && String(hashValue);

    return [pathStr, queryStr && `?${queryStr}`, hashStr && `#${hashStr}`].filter(Boolean).join('');
  };
}