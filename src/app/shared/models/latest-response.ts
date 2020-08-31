export class LatestResponse {
  base: string;
  date: Date;
  rates: object;
  ratesArr: Array<{ id: string; value: number }>;

  constructor() {
    this.ratesArr = [];
  }
}
