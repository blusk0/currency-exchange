export class LatestResponse {
  base: string;
  date: Date;
  rates: Map<string, number>;

  constructor() {
    this.rates = new Map<string, number>();
  }
}
