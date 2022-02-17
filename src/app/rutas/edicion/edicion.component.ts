import { Component } from '@angular/core';
import { CircleService } from 'src/app/services/circle.service';

@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.component.html',
  styleUrls: ['./edicion.component.css']
})
export class EdicionComponent {

  constructor(private circle: CircleService) { }

  createNewCirlce() {
    let newCircleButton = (<HTMLInputElement> document.getElementById('newCircle'));
    let divMaxCirclesReached = (<HTMLInputElement> document.getElementById('maxCirclesReached'));
    if (document.getElementById('appStartCircles')!.childElementCount > 5) {
      newCircleButton.disabled = true;
      divMaxCirclesReached.style.display = '';      
    } else {
      this.circle.showAsElement();
      newCircleButton.disabled = true;
      this.countdownTimer(5,newCircleButton,'Crear Circulo') 
    }
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
}
