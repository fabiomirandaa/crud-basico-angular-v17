import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { LoaderService } from '@shared/services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (loaderService.isLoading$ | async) {
      <div class="overlay">
        <div class="loader"></div>
      </div>
    }
    `,
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  constructor(public loaderService: LoaderService) { }
}
