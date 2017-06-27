import { PeliculasService, Peliculas, Seleccion } from './peliculas.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculasyseries.component.html'
})
    

export class PeliculasYSeriesComponent implements OnInit {
        
    _seleccion : Seleccion[];
    _seleccionado : string;
    peliculas : Peliculas[];
    pelicula: Peliculas;
    titulo: string;
    director: string;
    actor: string;  
    disTitulo: boolean;
    disActor: boolean;
    disDirector: boolean;
    disButton: boolean;
    error: number;
 
   

  constructor(private peliculasService: PeliculasService, private router: Router) { 
  this.titulo="";
  this.director="";
  this.actor="";
  this.disTitulo =false;
  this.disActor = false;
  this.disDirector = false;
  this.disButton = true;
  
  }
  ngOnInit() {
  }
    
 onBuscar(){
     
     // Limpio 
     this.peliculas = null;
     this.error = null;
     this.pelicula = null;
   
     //valido
     if(this._seleccionado){
     
        if(this._seleccionado == "Actor"){

            if(this.actor.length <= 4 || /[A-Za-z\s]/.test(this.actor)===false) 
                alert("Ingrese un Actor con al menos 5 caracteres, solo se permiten letras");
            else
                this.peliculasService.getActor(this.actor).then(d => this.peliculas = d, e => this.error = e);}        
                                                
        if(this._seleccionado == "Director"){
        
            if(this.director.length <= 4  || /[A-Za-z\s]/.test(this.director)===false )
                alert("Ingrese un Director con al menos 5 caracteres, solo se permiten letras");
            else
                this.peliculasService.getDirector(this.director).then(d => this.peliculas = d, e => this.error = e);}
    
        if(this._seleccionado == "Titulo"){
             
            if(this.titulo === "") 
                alert("Ingrese un titulo");
                
            else
                this.peliculasService.getTitulo(this.titulo).then(d => this.pelicula = d, e => this.error = e);

        } }  
      else
        alert("Seleccione una opcion de filtrado para buscar peliculas o series");       
 }
    //Guardo las variables del input
setActor(e: string){
   this.actor=e; 
}
setTitle(e: string){
   this.titulo=e; 
}
setDirector(e: string){
   this.director=e; 
}
    
// traido los posibles filtros
seleccionar(){

    this._seleccion = this.peliculasService.getSeleccion(); }
    
onChange($event, opcion : string) {
    
    //Habilito o desabilito input segun sea el caso
       this.disButton = false;
       this._seleccionado = opcion;
    
       if(this._seleccionado == "Actor"){

           this.disTitulo = true;
           this.disDirector = true;
           this.disActor = false;}
    
       if(this._seleccionado == "Director"){
        
           this.disTitulo = true;
           this.disDirector = false;
           this.disActor = true;}

       if(this._seleccionado == "Titulo"){

          this.disTitulo = false;
          this.disDirector = true;
          this.disActor = true;}
        
     
}
        
}












