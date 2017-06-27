import { ServiciosService, Pais } from './servicios.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banderas',
  templateUrl: './banderas.component.html'
})
    


    
export class BanderasComponent implements OnInit {
  paises: Pais[];
  pais: string;



  
  constructor(private serviciosService: ServiciosService, private router: Router) { }


  ngOnInit() {
    // Las banderas se cargan en forma asincrona en ngOnInit
    this.serviciosService.getBanderas().then(d => this.paises = d);
     
}

}