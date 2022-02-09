import { Component, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { CircleService } from './services/circle.service';
import { CircleComponent } from './circle/circle.component';

@Component({
  selector: 'app-root',
  template: `
    <button type="button" (click)="circle.showAsElement()">Show as element</button>
  `,
})
export class AppComponent {
  constructor(injector: Injector, public circle: CircleService) {
    // Convert `PopupComponent` to a custom element.
    const CircleElement = createCustomElement(CircleComponent, {injector});
    // Register the custom element with the browser.
    customElements.define('circle-element', CircleElement);
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/