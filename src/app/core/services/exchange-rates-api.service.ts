import { Currency } from './../../shared/models/currency';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRatesApiService {
  private uriRoot = 'https://api.exchangeratesapi.io/';

  constructor(private httpClient: HttpClient) {}

  quickSearch(
    baseCurrency: Currency,
    compareCurrency: Currency
  ): Observable<any> {
    return this.httpClient.get(`${this.uriRoot}/latest`, {
      params: new HttpParams().set(
        'symbols',
        `${baseCurrency.id},${compareCurrency.id}`
      ),
    });
  }
}
