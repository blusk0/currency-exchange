import { compare } from './../../shared/functions/compare';
import { LatestResponse } from './../../shared/models/latest-response';
import { map } from 'rxjs/operators';
import { Currency } from './../../shared/models/currency';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { HistoryResponse } from 'src/app/shared/models/history-response';

/**
 * Service to facilitate communication with the Exchange Rates API.
 *
 * @export
 * @class ExchangeRatesApiService
 */
@Injectable({
  providedIn: 'root',
})
export class ExchangeRatesApiService {
  // URI root to the exchange rates API
  private uriRoot = 'https://api.exchangeratesapi.io';

  constructor(private httpClient: HttpClient) {}

  /**
   * Get the up to date exchange rate between two currencies.
   *
   * @param {Currency} baseCurrency The currency to use as a base.
   * @param {Currency} compareCurrency The currency to compare with.
   * @returns {Observable<LatestResponse>} Observable of LatestResponse object.
   * @memberof ExchangeRatesApiService
   */
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

  /**
   * Get historical relationship between two currencies for provided time period
   *
   * @param {Currency} baseCurrency The currency to use as a base.
   * @param {Currency} compareCurrency The currency to compare with.
   * @param {Date} startAt Start date for comparison.
   * @param {Date} endAt Ending date for comparison.
   * @returns {Observable<HistoryResponse>} Observable of type HistoryResponse.
   * @memberof ExchangeRatesApiService
   */
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
