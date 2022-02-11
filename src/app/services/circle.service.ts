
import { Injectable } from '@angular/core';
import { NgElement, WithProperties } from '@angular/elements';
import { CircleComponent } from '../circle/circle.component';


@Injectable()
export class CircleService {
  constructor() {}

  // This uses the new custom-element method to add the popup to the DOM.
  showAsElement() {
    // Create element
    const circleEl: NgElement & WithProperties<CircleComponent> = document.createElement('circle-element') as any;
    
    // Listen to the closing event
    circleEl.addEventListener('closing', () => circleEl.setAttribute('class','closing'));
    
    // Listen to the close event
    circleEl.addEventListener('closed', () => document.body.removeChild(circleEl));

    // Add to the DOM
    document.body.appendChild(circleEl);
  }
} 


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/