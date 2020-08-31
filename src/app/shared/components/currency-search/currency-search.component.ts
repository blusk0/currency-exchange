import { CurrencySearchService } from './../../../core/services/currency-search.service';
import { CurrencyMap } from './../../constants/currency-map';
import { Currency } from './../../models/currency';
import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-currency-search',
  templateUrl: './currency-search.component.html',
  styleUrls: ['./currency-search.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencySearchComponent),
      multi: true,
    },
  ],
})
export class CurrencySearchComponent implements OnInit {
  currencyMap = CurrencyMap;
  private searchChange: BehaviorSubject<string> = new BehaviorSubject('');
  private currency: Currency;

  get selectedCurrency(): Currency {
    return this.currency;
  }
  set selectedCurrency(value: Currency) {
    if (!value) {
      this.currency = undefined;
      this.onChange(undefined);
    } else if (value?.id?.length) {
      this.currency = value;
      this.onChange(value);
    }
  }

  filteredCurrencies: Observable<Currency[]>;

  constructor(private search: CurrencySearchService) {}

  ngOnInit(): void {
    this.filteredCurrencies = this.searchChange.pipe(
      startWith(''),
      map((value) => this.search.searchCurrencies(value))
    );
  }

  searchKeyUp(value) {
    this.searchChange.next(value.target.value);
  }

  currencyDisplay(currency: Currency): string {
    return currency ? `${currency.symbol} ${currency.name}` : '';
  }

  /*************************************************************************/
  /*                       Value Accessor Requirements                     */
  /*************************************************************************/
  onChange = (_: Currency) => {};

  registerOnChange(fn: (_: Currency) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {}

  setDisabledState?(isDisabled: boolean) {}

  writeValue(value: Currency) {
    if (value?.id?.length) {
      this.currency = value;
    } else {
      this.currency = undefined;
    }
  }
  /*************************************************************************/
  /*************************************************************************/
  /*************************************************************************/
}
