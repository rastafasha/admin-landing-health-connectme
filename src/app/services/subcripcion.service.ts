import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators';
import { Subcripcion } from '../models/subcripcion';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class SubcripcionService {

  serverUrl = environment.apiUrl;
  public user;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.user;
  }

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


  
  getSubscripcions() {
          const url = `${baseUrl}/subcripcions`;
          return this.http.get<any>(url,this.headers)
            .pipe(
              map((resp:{ok: boolean, subcripcions: Subcripcion}) => resp.subcripcions)
            )
        }

}
