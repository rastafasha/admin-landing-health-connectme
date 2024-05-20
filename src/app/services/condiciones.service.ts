import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Condiciones } from '../models/condiciones';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CondicionesService {

  public condiciones: Condiciones;


  constructor(private http: HttpClient) { }

  get token():string{
    return localStorage.getItem('auth_token') || '';
  }


  get headers(){
    return{
      headers: {
        'auth_token': this.token
      }
    }
  }


  profileAcepta(condiciones:any) {
    const url = `${baseUrl}/condicion/store`;
    return this.http.post(url, condiciones, this.headers);
  }

}
