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

  constructor(
    private fb: FormBuilder,
    private exchangeRates: ExchangeRatesApiService
  ) {
    this.quickSearchForm = this.fb.group({
      baseCurrency: ['', Validators.required],
      compareCurrency: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.quickSearchForm.valueChanges.subscribe((event) => {
      console.dir(this.quickSearchForm.value);
    });
  }

  async searchCurrency() {
    if (!this.quickSearchForm.valid) {
      return;
    }

    this.searching$ = this.exchangeRates.quickSearch(
      this.quickSearchForm.get('baseCurrency').value,
      this.quickSearchForm.get('compareCurrency').value
    );

    await this.searching$.toPromise();
  }
}
