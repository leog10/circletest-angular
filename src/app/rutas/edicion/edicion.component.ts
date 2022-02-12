import { Component, OnInit } from '@angular/core';
import { CircleService } from 'src/app/services/circle.service';
import { StartCirclesService } from 'src/app/services/start-circles.service';

@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.component.html',
  styleUrls: ['./edicion.component.css']
})
export class EdicionComponent implements OnInit {

  constructor(private circle: CircleService, private startCircles: StartCirclesService) { }

  buttonDisabled: boolean = false;

  createNewCirlce() {
    this.circle.showAsElement();
    setTimeout(() => {      
      this.buttonDisabled = false;
    }, 800)
    this.buttonDisabled = true;
  }
  
  ngOnInit(): void {
  }

}
