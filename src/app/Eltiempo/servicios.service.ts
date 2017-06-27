import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ServiciosService {
  private static CLIMA_URL ="https://api.weatherbit.io/v1.0/current/geosearch?city={0}&key=71f68000cd0942988e8241a9929e14ae";
  private static BANDERAS_URL = "https://restcountries.eu/rest/v2/all";

  constructor(private http: Http) { }
  
  // Obtiene informacion del clima en la capital en forma asincrona, devuelve una promesa
  
  getClima(capital: string): Promise<ClimaCapital> {
    let url = StringFormat.Format(ServiciosService.CLIMA_URL, capital);

    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as ClimaCapital)
      .catch(this.handleError);
  }
  

  // Obtiene la lista de paises en forma asincrona, devuelve una promesa
  getBanderas(): Promise<Pais[]> {

    return this.http.get(ServiciosService.BANDERAS_URL)
      .toPromise()
      .then(response => response.json() as Pais[])
      .catch(this.handleError);
  }
  

     getPaisesNombre(nombre:string) : Pais[]{
     let listapaises = this.getBanderas();
       let paisfiltro:Pais[];  
      listapaises.then(d => paisfiltro = d);
      let filtrado=  paisfiltro.filter(item => item.name == nombre);
      return filtrado;
        }
  


  private handleError(error: any): Promise<any> {
    console.error('An error occurred clima', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}

export interface ClimaCapital {
  city_name: string;
  temp: string;
  slp: string;
  wind_spd: string;
  visibility_val: string;
  wind_cdir: string;
  sunrise:string;
  sunset:string;
  uv:string;
  rh:string;
  clouds:string;
  
}

export interface Pais {
  name: string;
  alpha2Code: string;
  alpha3Code: string;
  flag: string;
  latlng: string[];
  capital: string;
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