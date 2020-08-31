import { compare } from './../../shared/functions/compare';
import { LatestResponse } from './../../shared/models/latest-response';
import { map } from 'rxjs/operators';
import { Currency } from './../../shared/models/currency';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { HistoryResponse } from 'src/app/shared/models/history-response';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRatesApiService {
  private uriRoot = 'https://api.exchangeratesapi.io';

  constructor(private httpClient: HttpClient) {}

  quickSearch(
    baseCurrency: Currency,
    compareCurrency: Currency
  ): Observable<LatestResponse> {
    return this.httpClient
      .get<LatestResponse>(`${this.uriRoot}/latest`, {
        params: new HttpParams()
          .set('symbols', compareCurrency.id)
          .set('base', baseCurrency.id),
      })
      .pipe(
        map((res) => {
          const resObj = new LatestResponse();
          resObj.base = res.base;
          resObj.date = new Date(res.date);
          for (const prop in res.rates) {
            if (res.rates.hasOwnProperty(prop)) {
              resObj.ratesArr.push({ id: prop, value: res.rates[prop] });
            }
          }
          return resObj;
        })
      );
  }

  history(
    baseCurrency: Currency,
    compareCurrency: Currency,
    startAt: Date,
    endAt: Date
  ): Observable<HistoryResponse> {
    return this.httpClient
      .get<HistoryResponse>(`${this.uriRoot}/history`, {
        params: new HttpParams()
          .set('symbols', compareCurrency.id)
          .set('base', baseCurrency.id)
          .set('start_at', moment(startAt).format('YYYY-MM-DD'))
          .set('end_at', moment(endAt).format('YYYY-MM-DD')),
      })
      .pipe(
        map((res) => {
          const hist = new HistoryResponse();
          hist.base = baseCurrency;
          hist.compare = compareCurrency;
          hist.startAt = startAt;
          hist.endAt = endAt;
          hist.rates = res.rates;
          for (const date in res.rates) {
            if (res.rates.hasOwnProperty(date)) {
              hist.ratesArr.push({
                date,
                value: res.rates[date][compareCurrency.id],
              });
            }
          }
          hist.ratesArr = hist.ratesArr.sort((a, b) => compare(a.date, b.date));
          return hist;
        })
      );
  }
}
