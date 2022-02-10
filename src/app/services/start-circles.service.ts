import { Injectable } from '@angular/core';
import { NgElement, WithProperties } from '@angular/elements';
import { StartCirclesComponent } from '../start-circles/start-circles.component';

@Injectable()
export class StartCirclesService {
  
  constructor() {}
  // This uses the new custom-element method to add the element to the DOM.
  showAsElement() {
    // Create element
    const startCirclesEl: NgElement & WithProperties<StartCirclesComponent> = document.createElement('start-circles') as any;

    // Listen to the close event
    startCirclesEl.addEventListener('closed', () => document.body.removeChild(startCirclesEl));

    // Add to the DOM
    document.body.appendChild(startCirclesEl);
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/