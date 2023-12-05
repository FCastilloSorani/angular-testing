import { Component, OnInit, inject } from '@angular/core';

// Interfaces
import { Fact } from './interfaces/fact.interface';

// Services
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  fact!: Fact;

  loading: boolean = false;

  private appService = inject(AppService);

  constructor() {}

  changeLoadingState(): void {
    this.loading = !this.loading;
  }
}
