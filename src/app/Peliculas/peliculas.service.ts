import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PeliculasService {
        private static URL_Pelisbase = "http://netflixroulette.net/api/api.php?";
        private static URL_Titulo = "title={0}";
        private static URL_Actor = "actor={0}";
        private static URL_Director = "director={0}";
        private selecciones : Seleccion[];

  constructor(private http: Http) { 
  //incialiso los posibles filtros
      
  this.selecciones = [{ nombre : "Titulo" } , { nombre : "Actor" }, { nombre : "Director" }]; }
    
   //obtener peliculas por titulo
  getTitulo(titulo: string): Promise<Peliculas> {
    let url = StringFormat.Format(PeliculasService.URL_Titulo, titulo);
    let url_completo = PeliculasService.URL_Pelisbase + url;
    return this.http.get(url_completo)
      .toPromise()
      .then(response => response.json() as Peliculas)
      .catch(this.handleError);
  }
    //obtener por actor    
  getActor(actor: string): Promise<Peliculas[]> {
    let url = StringFormat.Format(PeliculasService.URL_Actor, actor);
    let url_completo = PeliculasService.URL_Pelisbase + url;
    return this.http.get(url_completo)
      .toPromise()
      .then(response => response.json() as Peliculas[])
      .catch(this.handleError);
  }      
    //obtener por director    
  getDirector(director: string): Promise<Peliculas[]> {
    let url = StringFormat.Format(PeliculasService.URL_Director, director);
    let url_completo = PeliculasService.URL_Pelisbase + url;
    return this.http.get(url_completo)
      .toPromise()
      .then(response => response.json() as Peliculas[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error( error);
    return Promise.reject(error.message || error);
  }
    
  getSeleccion(): Seleccion[]{
            return this.selecciones;}

}    
export interface Peliculas{
        show_title: string
        release_year: string
        rating: string
        category: string
        director: string
        poster: string
        runtime: string
        show_cast: string
        summary: string;
        }

export interface Seleccion {
        nombre: string;
    }

export class StringFormat {
        public static Empty: string = "";

    public static isNullOrWhiteSpace(value: string): boolean {
        try {
            if (value == null || value == 'undefined')
                return false;

            return value.replace(/\s/g, '').length < 1;
        }
        catch (e) {
            return false;
        }
    }

    public static Format(value, ...args): string {
        try {
            return value.replace(/{(\d+(:.*)?)}/g, function (match, i) {
                var s = match.split(':');
                if (s.length > 1) {
                    i = i[0];
                    match = s[1].replace('}', '');
                }

                var arg = StringFormat.formatPattern(match, args[i]);
                return typeof arg != 'undefined' && arg != null ? arg : StringFormat.Empty;
            });
        }
        catch (e) {
            return StringFormat.Empty;
        }
    }

    private static formatPattern(match, arg): string {
        switch (match) {
            case 'L':
                arg = arg.toLowerCase();
                break;
            case 'U':
                arg = arg.toUpperCase();
                break;
            default:
                break;
        }

        return arg;
    }
}

  