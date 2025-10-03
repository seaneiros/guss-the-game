import { Role }                from '../enums';
import { UnhandledValueError } from '../error/UnhandledValueError';
import { DefaultScoring }      from './strategies/default';
import { ZeroScoring }         from './strategies/zero';


export * from './types';

export function createScoreCalculator(role: Role) {
  switch(role) {
    case Role.Admin:
    case Role.User:
      return new DefaultScoring();
    case Role.PhantomUser:
      return new ZeroScoring();
    default: throw new UnhandledValueError(role);
  }
}