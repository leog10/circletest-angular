import { Component, EventEmitter, HostBinding, OnInit, Output } from '@angular/core';
import { CirclesDbService } from '../services/circles-db.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ICircle } from '../ICircles';
import { Router } from '@angular/router';
import { Circle } from '../Circle';

@Component({
  selector: 'app-start-circles',
  templateUrl: './start-circles.component.html',
  styleUrls: ['./start-circles.component.css'],
  animations: [
    trigger('state', [
      state('opened', style({transform: 'translateX(0%)'})),
      state('void, closed', style({transform: 'translateX(0%)', opacity: 0})),
      transition('* => *', animate('450ms ease-in')),
    ])
  ],
})
export class StartCirclesComponent implements OnInit {

  constructor(private circlesDbService: CirclesDbService, private router: Router) { }

  hasRoute(route: string) {
    return this.router.url === route;
  }

  circulos: ICircle[] = [];

  defaultCircle: ICircle = new Circle;

  buttonDisabled: boolean = true;
  
  @HostBinding('@state')
  state: 'opened' | 'closed' = 'opened';

  @Output()
  closed = new EventEmitter<void>();

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

  saveCircle(circle: ICircle) {
    (<HTMLInputElement> document.getElementById('saveButton'+(circle.id?.toString()))).disabled = true;
    this.circlesDbService.updateCircle(circle).subscribe();
  }

  increment(id: number, amount = 1) {
    for (let dato of this.circulos) {
      if (dato.id === id) {
        dato.current += amount;
        document.getElementById('saveButton'+(id.toString()))?.removeAttribute('disabled');
      }
    }
  }

  decrement(id: number, amount = 1) {
    for (let dato of this.circulos) {
      if (dato.id === id) {
        dato.current -= amount;
        document.getElementById('saveButton'+(id.toString()))?.removeAttribute('disabled');
      }
    }
  }

  getOverlayStyle(id: number) {
    let isSemi = false;
    let radius: number;

    for (let dato of this.circulos) {
      if (dato.id === id) {
        isSemi = dato.semicircle;
        radius = dato.radius;
      }
    }

    const transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

    return {
      top: isSemi ? 'auto' : '50%',
      bottom: isSemi ? '5%' : 'auto',
      left: '50%',
      transform,
      'font-size': radius! / 3.5 + 'px',
    };
  }

  //Borra el objeto en la base de datos segun el id pasado por parametro.
  borrarCirculoEnDb(circle: ICircle) {
    this.circlesDbService.deleteCircle(circle).subscribe(() =>{
      this.circulos = this.circulos.filter((dato) => dato.id !== circle.id);
    })
  }

  //Borra el Custom Element del DOM y borra el objeto de la base de datos.
  borrarCirculo(circle: ICircle) {
    (<HTMLInputElement> document.getElementById('deleteButton'+(circle.id?.toString()))).disabled = true;
    (<HTMLInputElement> document.getElementById('saveButton'+(circle.id?.toString()))).disabled = true;
    //Pasa el parametro id a string para manipular el DOM con getElementById que recibe un string como parametro.
    const _idToSring = circle.id!.toString();
    //Agrega la clase ' closing' con espacio para no generar conflicto con las clases existentes.
    //La clase .closing le da una animacion al eliminar el elemento.
    document.getElementById(_idToSring)!.className += ' closing';
    //Se crea un delay antes de eliminar el elemento para dar tiempo a la animacion de cierre a mostrarse en pantalla.
    setTimeout (() => {
      this.borrarCirculoEnDb(circle);
      if (this.circulos.length === 0) {
        this.closed.emit();
      }      
    }, 450);    
  }

  getCirclesFromDb() {
    this.circlesDbService.getData().subscribe((data) => {
      this.circulos = data;
    });
  }
  
  ngOnInit(): void {
    this.getCirclesFromDb();
  }

}
