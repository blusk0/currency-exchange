import { LatestResponse } from './../../shared/models/latest-response';
import { map } from 'rxjs/operators';
import { Currency } from './../../shared/models/currency';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

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
              resObj.rates.set(prop, res.rates[prop]);
            }
          }
          return resObj;
        })
      );
  }
}
