
import { ClimaCapitalComponent } from './Eltiempo/climacapital.component';
import { BanderasComponent } from './Eltiempo/banderas.component';
import { PeliculasYSeriesComponent } from './Peliculas/peliculasyseries.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



// Route Configuration
export const routes: Routes = [

  { path: 'eltiempo/:pais', component: ClimaCapitalComponent},
  { path: 'banderas', component: BanderasComponent},
  { path: 'peliculas', component: PeliculasYSeriesComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);