import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Components
import { AppComponent } from './app.component';

// Interfaces
import { Fact } from './interfaces/fact.interface';

// Servies
import { AppService } from './services/app.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('AppComponent', () => {
  let service: AppService;

  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [AppComponent],
      providers: [AppService],
    });

    service = TestBed.inject(AppService);

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  describe('#loading', () => {
    it('should be false when component init', () => {
      const component = new AppComponent();

      expect(component.loading).toBe(false);
    });
  });

  describe('#changeLoadingState', () => {
    it('should exists', () => {
      const component = new AppComponent();

      expect(component.changeLoadingState).toBeTruthy();
    });

    it('should change loading state', () => {
      const component = new AppComponent();

      expect(component.loading).withContext('at first').toBe(false);

      component.changeLoadingState();

      expect(component.loading)
        .withContext('after state changed once')
        .toBe(true);

      component.changeLoadingState();

      expect(component.loading)
        .withContext('after state changed twice')
        .toBe(false);
    });
  });

  describe('#fact', () => {
    it('should be undefined after construction', () => {
      const component = new AppComponent();
      expect(component.fact).toBeFalsy();
    });
  });
});
