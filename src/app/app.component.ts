import { Component, Injector, OnInit } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { CircleService } from './services/circle.service';
import { CircleComponent } from './circle/circle.component';
import { StartCirclesService } from './services/start-circles.service';
import { StartCirclesComponent } from './start-circles/start-circles.component';

@Component({
  selector: 'app-root',
  template: `
  <div class="container">
    <button type="button" [disabled]="buttonDisabled" (click)="createNewCirlce()">Crear Circulo</button>
  </div>
  `,
})
export class AppComponent implements OnInit {
  constructor(injector: Injector, public circle: CircleService, public startCircles: StartCirclesService) {
    // Convert `PopupComponent` to a custom element.
    const CircleElement = createCustomElement(CircleComponent, {injector});
    const startCirclesEl = createCustomElement(StartCirclesComponent, {injector});
    // Register the custom element with the browser.
    customElements.define('circle-element', CircleElement);
    customElements.define('start-circles', startCirclesEl);
  }
  
  buttonDisabled: boolean = false;

  createNewCirlce() {
    this.circle.showAsElement();
    setTimeout(() => {      
      this.buttonDisabled = false;
    }, 800)
    this.buttonDisabled = true;
  }
  
  ngOnInit(): void {
    this.startCircles.showAsElement();
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/