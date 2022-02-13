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

  defaultCircle: ICircle = new Circle;

  //Verifica que el circulo creado tenga al menos una modificacion en sus propiedades para habilitar el boton "Guardar"
  hasChanges(circle: ICircle): boolean {
    // Crea un nuevo objeto a partir de defaultCircle y crea un nuevo objeto a partir del circulo creado circle\
    // Se borra el id de ambos ya que _defCircle tiene id:undefined y _circle tiene el id asignado al ejecutarse el metodo ngOnInit
    // De esta manera ambos objetos se pueden comparar por las demas propiedades evitando el id.
    var _defCircle = Object.assign({}, this.defaultCircle);
    var _circle = Object.assign({}, circle);
    delete _defCircle.id;
    delete _circle.id;

    if (JSON.stringify(_defCircle) === JSON.stringify(_circle)) {
      return true;
    }    
    return false;
  }

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

  saveCircle(circle: ICircle) {
    this.circlesDbService.updateCircle(circle).subscribe();
    (<HTMLInputElement> document.getElementById('saveButton'+(this.circle.id?.toString()))).disabled = true;
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

  //Obtiene los objetos de la database y por iteracion le asigna una id unica al nuevo circulo
  getCirclesFromDb() {
    this.circlesDbService.getData().subscribe((data) => {
      let idIterator = 1;
      for (let circle of data ) {
        if (idIterator === circle.id) {
          idIterator++;
        }
      }
      this.circle.id = idIterator;
    });
  }

  ngOnInit(): void {
    this.getCirclesFromDb();
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