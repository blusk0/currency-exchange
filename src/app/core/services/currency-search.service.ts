import { Currency } from './../../shared/models/currency';
import { CurrencyMap } from './../../shared/constants/currency-map';
import { Injectable } from '@angular/core';

/**
 * Service to handle searching currencies by user input.
 *
 * @export
 * @class CurrencySearchService
 */
@Injectable({
  providedIn: 'root',
})
export class CurrencySearchService {
  private currentSelection: Currency[] = [];

  /**
   * Search through currency map and return values that match user input.
   *
   * @param {string} search The user provided string search.
   * @returns {Currency[]} Collection of Currency objects that match search.
   * @memberof CurrencySearchService
   */
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
