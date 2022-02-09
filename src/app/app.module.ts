import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

import { AppComponent } from './app.component';
import { CircleComponent } from './circle/circle.component';
import { CircleService } from './services/circle.service';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, RoundProgressModule],
  providers: [CircleService],
  declarations: [AppComponent, CircleComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/