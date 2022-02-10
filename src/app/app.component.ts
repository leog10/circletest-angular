import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { CircleService } from './services/circle.service';
import { CircleComponent } from './circle/circle.component';
import { StartCirclesService } from './services/start-circles.service';
import { StartCirclesComponent } from './start-circles/start-circles.component';
import { ICircles } from './ICircles';
import { CirclesDbService } from './services/circles-db.service';

@Component({
  selector: 'app-root',
  template: `
    <button type="button" (click)="circle.showAsElement()">Single Add</button>
    <button type="button" (click)="startCircles.showAsElement()">Add from JsonDB</button>
  `,
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(injector: Injector, public circle: CircleService, public startCircles: StartCirclesService, public circlesDbService: CirclesDbService) {
    // Convert `PopupComponent` to a custom element.
    const CircleElement = createCustomElement(CircleComponent, {injector});
    const startCirclesEl = createCustomElement(StartCirclesComponent, {injector});
    // Register the custom element with the browser.
    customElements.define('circle-element', CircleElement);
    customElements.define('start-circles', startCirclesEl);
  }
  
  circulos: ICircles[] = [];

  ngOnInit(): void {
    this.circlesDbService.getData().subscribe((data) => {
      this.circulos = data;
    });
  }

  ngAfterViewInit(): void {

    setTimeout (() => {
      console.log(this.circulos.length);  
      let addCircles = true; 
      if (this.circulos.length > 0 && addCircles) {
        this.startCircles.showAsElement();
        addCircles = false;
      }
    }, 500);
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/