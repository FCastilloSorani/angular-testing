import { TestBed } from '@angular/core/testing';
import { AppService } from './app.service';

// HTTP
import { HttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

// Interfaces
import { Fact } from '../interfaces/fact.interface';

// RxJS
import { finalize, tap } from 'rxjs';

describe('AppService', () => {
  let service: AppService;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(AppService);

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('GETS', () => {
    it('#getStringValue should return string', () => {
      expect(typeof service.getStringValue()).toBe('string');
    });

    it('#getObservableString should return observable of string', (done: DoneFn) => {
      service
        .getObservableString()
        .pipe(
          tap((value) => expect(typeof value).toBe('string')),
          finalize(() => done())
        )
        .subscribe();
    });

    describe('#getCatsFact', () => {
      it('should fetch cat fact from API', () => {
        const baseUrlUrl: string = 'https://catfact.ninja';

        const dummyFact: Fact = {
          fact: 'fact',
          length: 4,
        };

        service
          .getCatsFact()
          .pipe(tap((fact: Fact) => expect(fact).toEqual(dummyFact)))
          .subscribe();

        // Create mock request
        const req = httpTestingController.expectOne(`${baseUrlUrl}/fact`);

        // Assert that the request is a GET.
        expect(req.request.method).toEqual('GET');

        // Respond with mock data, causing Observable to resolve.
        req.flush(dummyFact);
      });
    });
  });

  afterEach(() => httpTestingController.verify());
});
