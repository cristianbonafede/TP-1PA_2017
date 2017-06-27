import { ServiciosService, ClimaCapital } from './servicios.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rest-call',
  templateUrl: './climacapital.component.html'
})
    
export class ClimaCapitalComponent implements OnInit {
  ciudades: ClimaCapital;
  codigoPais: string;

  constructor(private serviciosService: ServiciosService, private route: ActivatedRoute) { }

  ngOnInit() {

    // El pais se recupera como parametro, los parametros se definen en routes.ts
    // El servicio route.params, permite suscribirnos a eventos donde podemos recibir los parametros
    this.route.params.subscribe(params => {
      this.codigoPais = params['pais'];

      // Si el codigo de pais tiene un valor, buscamos las ciudades en forma asincrona
      if (this.codigoPais) {
       

         this.serviciosService.getClima(this.codigoPais).then(d => this.ciudades = d);

      }
    });
  }




    




}




