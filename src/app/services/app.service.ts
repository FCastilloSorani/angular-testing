import { Injectable, inject } from '@angular/core';

// HTTP
import { HttpClient } from '@angular/common/http';

// Interfaces
import { Fact } from '../interfaces/fact.interface';

// RxJS
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly httpClient = inject(HttpClient);

  getStringValue(): string {
    return 'value';
  }

  getObservableString(): Observable<string> {
    return of('value');
  }

  getCatsFact(): Observable<Fact> {
    return this.httpClient.get<Fact>('https://catfact.ninja/fact');
  }
}
