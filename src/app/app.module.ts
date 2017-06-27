import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routes';

import { AppComponent } from './app.component';
import { ClimaCapitalComponent } from './Eltiempo/climacapital.component';
import { ServiciosService } from './Eltiempo/servicios.service';
import { BanderasComponent } from './Eltiempo/banderas.component';
import { PeliculasService } from './Peliculas/peliculas.service';
import { PeliculasYSeriesComponent } from './Peliculas/peliculasyseries.component';

@NgModule({
  declarations: [
    AppComponent,
    ClimaCapitalComponent,
    BanderasComponent,
    PeliculasYSeriesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [ServiciosService, PeliculasService],
  bootstrap: [AppComponent]

})
export class AppModule { }