import { LatestResponse } from './../../shared/models/latest-response';
import { ExchangeRatesApiService } from './../../core/services/exchange-rates-api.service';
import { CurrencyMap } from './../../shared/constants/currency-map';
import { Currency } from './../../shared/models/currency';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quickSearchForm: FormGroup;
  searching$: Observable<LatestResponse>;
  historySearching$: Observable<any>;
  currencyMap = CurrencyMap;
  currentResults: LatestResponse;
  currentResultsAux: Map<string, Currency> = new Map<string, Currency>();
  lineChartOptions = {
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            unit: 'day',
          },
          ticks: {
            fontColor: 'white',
            fontSize: 18,
            maxTicksLimit: 10,
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            labelString: 'Exchange Rate',
            display: true,
            fontColor: 'white',
            fontSize: 18,
          },
          ticks: {
            beginAtZero: true,
            source: 'data',
            fontColor: 'white',
            fontSize: 18,
          },
        },
      ],
    },
  };

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

    const base = this.quickSearchForm.get('baseCurrency').value;
    const compare = this.quickSearchForm.get('compareCurrency').value;

    this.searching$ = this.exchangeRates.quickSearch(base, compare);

    this.historySearching$ = this.exchangeRates.history(
      base,
      compare,
      moment().add(-1, 'month').toDate(),
      new Date()
    );

    const res = await Promise.all([
      this.searching$.toPromise(),
      this.historySearching$.toPromise(),
    ]);

    console.dir(res);

    this.currentResultsAux.set(
      'base',
      CurrencyMap.find((cur) => cur.id === res[0].base)
    );
    this.currentResultsAux.set(
      'compare',
      CurrencyMap.find((cur) => cur.id === res[0].ratesArr[0].id)
    );

    this.currentResults = res[0];
  }

  clearSelection() {}
}
