import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { Circle } from './Circle';
import { CircleComponent } from './circle/circle.component';
import { CircleService } from './services/circle.service';
import { StartCirclesService } from './services/start-circles.service';
import { StartCirclesComponent } from './start-circles/start-circles.component';
import { InicioComponent } from './rutas/inicio/inicio.component';
import { EdicionComponent } from './rutas/edicion/edicion.component';
import { HeaderComponent } from './rutas/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {path: '', component: InicioComponent, pathMatch: 'full'},
  {path: 'edicion', component: EdicionComponent}
]

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, RoundProgressModule, HttpClientModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot(routes)],
  providers: [CircleService, StartCirclesService, Circle],
  declarations: [AppComponent, CircleComponent, StartCirclesComponent, InicioComponent, EdicionComponent, HeaderComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/