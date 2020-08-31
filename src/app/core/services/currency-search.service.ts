import { Currency } from './../../shared/models/currency';
import { CurrencyMap } from './../../shared/constants/currency-map';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrencySearchService {
  private currentSelection: Currency[] = [];

  searchCurrencies(search: string): Currency[] {
    const searchReg = new RegExp(search, 'i');

    return CurrencyMap.filter(
      (x) =>
        !this.currentSelection.some((selected) => selected === x) &&
        (x.country.match(searchReg) ||
          x.id.match(searchReg) ||
          x.name.match(searchReg))
    );
  }
}
