import { Component, EventEmitter, HostBinding, OnInit, Output } from '@angular/core';
import { CirclesDbService } from '../services/circles-db.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ICircles } from '../ICircles';

@Component({
  selector: 'app-start-circles',
  templateUrl: './start-circles.component.html',
  styleUrls: ['./start-circles.component.css'],
  animations: [
    trigger('state', [
      state('opened', style({transform: 'translateX(0%)'})),
      state('void, closed', style({transform: 'translateX(0%)', opacity: 0})),
      transition('* => *', animate('500ms ease-in')),
    ])
  ],
})
export class StartCirclesComponent implements OnInit {

  constructor(private circlesDbService: CirclesDbService) { }

  @HostBinding('@state')
  state: 'opened' | 'closed' = 'opened';

  @Output()
  closed = new EventEmitter<void>();

  circulos: ICircles[] = [];

  increment(id: number, amount = 1) {
    for (let dato of this.circulos) {
      if (dato.id === id) {
        dato.current += amount;
      }
    }
  }

  decrement(id: number, amount = 1) {
    for (let dato of this.circulos) {
      if (dato.id === id) {
        dato.current -= amount;
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

  addNewCircle() {
    return;
  }

  borrarCirculo(id: number) {
    const _idToSring = id.toString();   

    document.getElementById(_idToSring)!.className += ' closing';
    setTimeout (() => {
      this.circulos = this.circulos.filter((dato) => dato.id !== id);
      if (this.circulos.length === 0) {
        this.closed.emit();
      }      
    }, 280);    
  }

  ngOnInit(): void {
    this.circlesDbService.getData().subscribe((data) => {
      this.circulos = data;
    });
  }

}
