import { Component, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { CircleComponent } from './circle/circle.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(injector: Injector) {
    // Convert `CircleComponent and StartCirclesComponent` to a custom element.
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