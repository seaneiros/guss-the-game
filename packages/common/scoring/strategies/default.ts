import { IScoring } from '../types';


export class DefaultScoring implements IScoring {
  private tapCost = 1;
  private bonusTapCost = 10;
  private bonusTapStep = 11;

  calculate(taps: number = 0): number {
    if (taps <= 0) {
      return 0;
    }

    const tenPointsTaps = Math.floor(taps / this.bonusTapStep);

    return this.tapCost * (taps - tenPointsTaps) + this.bonusTapCost * tenPointsTaps;
  }
}