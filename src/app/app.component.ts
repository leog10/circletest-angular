import { Component, Injector, OnInit } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { CircleComponent } from './circle/circle.component';
import { StartCirclesComponent } from './start-circles/start-circles.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(injector: Injector) {
    // Convert `PopupComponent` to a custom element.
    const CircleElement = createCustomElement(CircleComponent, {injector});
    const startCirclesEl = createCustomElement(StartCirclesComponent, {injector});
    // Register the custom element with the browser.
    customElements.define('circle-element', CircleElement);
    customElements.define('start-circles', startCirclesEl);
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/