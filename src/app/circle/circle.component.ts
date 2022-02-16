import { Component, EventEmitter, HostBinding, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ICircle } from '../ICircles';
import { CirclesDbService } from '../services/circles-db.service';
import { Circle } from '../Circle';
import { Router } from '@angular/router';

@Component({
  selector: 'my-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css'],
  animations: [
    trigger('state', [
      state('opened', style({transform: 'translateX(0%)'})),
      state('void, closed', style({transform: 'translateX(0%)', opacity: 0})),
      transition('* => *', animate('450ms ease-in')),
    ])
  ],
})

export class CircleComponent {
  constructor(private circlesDbService: CirclesDbService, private router: Router) { }
  @HostBinding('@state')
  state: 'opened' | 'closed' = 'opened';

  @Output()
  closed = new EventEmitter<void>();
  
  @Output()
  deleteCircle = new EventEmitter<ICircle>();

  @Output()
  closing = new EventEmitter<void>();

  hasRoute(route: string) {
    return this.router.url === route;
  }

  buttonDisabled: boolean = true;

  circulos: ICircle[] = [];

  circle: ICircle = new Circle;

  borrarCirculoEnDb(circle: ICircle) {
    this.circlesDbService.deleteCircle(circle).subscribe(() =>{
      this.circulos = this.circulos.filter((dato) => dato.id !== circle.id);
    })
  }

  borrarCirculo(circle: ICircle) {
    this.closing.emit();
    (<HTMLInputElement> document.getElementById('deleteButton'+(this.circle.id?.toString()))).disabled = true;
    (<HTMLInputElement> document.getElementById('saveButton'+(this.circle.id?.toString()))).disabled = true;
    setTimeout (() => {
      this.closed.emit();
      this.borrarCirculoEnDb(circle);      
   }, 450);
  }

  countdownTimer(timerInSeconds: number, element: HTMLInputElement, textToShow: string){
    let startTime = timerInSeconds;
    element.innerHTML = `${textToShow} (${startTime})`;
    let interval = setInterval(function(){
      if(startTime === 1){
        element.innerHTML = `${textToShow}`;
        clearInterval(interval);
        return;
      }
      startTime--;
      element.innerHTML = `${textToShow} (${startTime})`;
    }, 1000);

    setTimeout(() => {
      element.disabled = false;
    }, (timerInSeconds * 1000));
  }

  saveCircle(circle: ICircle) {
    this.circlesDbService.updateCircle(circle).subscribe();

    let buttonSave = (<HTMLInputElement> document.getElementById('saveButton'+(this.circle.id?.toString())));
    buttonSave.disabled = true;

    this.countdownTimer(5,buttonSave,'Guardar');
  }

  // CIRCULO VARIABLES Y METODOS

  increment(amount = 1) {
    this.circle.current += amount;
  }

  decrement(amount = 1) {
    this.circle.current -= amount;
  }

  getOverlayStyle() {
    const isSemi = this.circle.semicircle;
    const transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

    return {
      top: isSemi ? 'auto' : '50%',
      bottom: isSemi ? '5%' : 'auto',
      left: '50%',
      transform,
      'font-size': this.circle.radius / 3.5 + 'px',
    };
  }

  generateId() {
    let year = new Date().getFullYear();
    let date = Date.now();
    let id = `${year}${date}`
    this.circle.id = Number(id);
  }

  ngOnInit(): void {
    this.generateId()
    setTimeout (() => {
    this.circlesDbService.addCircle(this.circle).subscribe();
   }, 100);
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/