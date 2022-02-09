import { Component, EventEmitter, HostBinding, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'my-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css'],
  animations: [
    trigger('state', [
      state('opened', style({transform: 'translateX(0%)'})),
      state('void, closed', style({transform: 'translateX(0%)', opacity: 0})),
      transition('* => *', animate('300ms ease-in-out')),
    ])
  ],
})

export class CircleComponent {
  @HostBinding('@state')
  state: 'opened' | 'closed' = 'opened';

  @Output()
  closed = new EventEmitter<void>();

  @Output()
  closing = new EventEmitter<void>();

  closeCircle() {
    this.closing.emit();
    setTimeout (() => {
      this.closed.emit();
   }, 250);
  }

  // CIRCULO VARIABLES Y METODOS

  current: number = 10;
  max: number = 100;
  radius: number = 50;
  semicircle: boolean = false;

  increment(amount = 1) {
    this.current += amount;
  }

  getOverlayStyle() {
    const isSemi = this.semicircle;
    const transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

    return {
      top: isSemi ? 'auto' : '50%',
      bottom: isSemi ? '5%' : 'auto',
      left: '50%',
      transform,
      'font-size': this.radius / 3.5 + 'px',
    };
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/