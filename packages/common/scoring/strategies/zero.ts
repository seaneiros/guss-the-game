import { IScoring } from '../types';


export class ZeroScoring implements IScoring {

  calculate(taps: number): number {
    return 0;
  }
}