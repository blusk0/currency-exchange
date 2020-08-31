import { Currency } from './currency';
export class HistoryResponse {
  startAt: Date;
  endAt: Date;
  base: Currency;
  compare: Currency;
  rates: object;
  ratesArr: Array<{ date: string; value: number }>;

  constructor() {
    this.ratesArr = [];
  }
}
