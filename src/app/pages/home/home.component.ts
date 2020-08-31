import { LatestResponse } from './../../shared/models/latest-response';
import { ExchangeRatesApiService } from './../../core/services/exchange-rates-api.service';
import { CurrencyMap } from './../../shared/constants/currency-map';
import { Currency } from './../../shared/models/currency';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quickSearchForm: FormGroup;
  searching$: Observable<any>;
  currencyMap = CurrencyMap;
  currentResults: LatestResponse;
  currentResultsAux: Map<string, Currency> = new Map<string, Currency>();

  constructor(
    private fb: FormBuilder,
    private exchangeRates: ExchangeRatesApiService
  ) {
    this.quickSearchForm = this.fb.group({
      baseCurrency: ['', Validators.required],
      compareCurrency: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  async searchCurrency() {
    if (!this.quickSearchForm.valid) {
      return;
    }

    this.searching$ = this.exchangeRates.quickSearch(
      this.quickSearchForm.get('baseCurrency').value,
      this.quickSearchForm.get('compareCurrency').value
    );

    const res = await this.searching$.toPromise();
    console.dir(res.rates.keys());
    this.currentResultsAux.set(
      'base',
      CurrencyMap.find((cur) => cur.id === res.base)
    );
    this.currentResultsAux.set(
      'compare',
      CurrencyMap.find((cur) => cur.id === res.rates.keys().next().value)
    );

    this.currentResults = res;
  }

  clearSelection() {}
}
