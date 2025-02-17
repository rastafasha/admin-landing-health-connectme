import { Injectable } from '@angular/core';
import { Type } from '../models/type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
const baseUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class TypeService {

  public type: Type;
      // public role: Role;
      error:string;
    
      constructor(
        private http: HttpClient,
        private router: Router,
        ) {
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
    
     
      getTypes() {
        const url = `${baseUrl}/types`;
        return this.http.get<any>(url,this.headers)
          .pipe(
            map((resp:{ok: boolean, types: Type}) => resp.types)
          )
      }
      getRecientes() {
        const url = `${baseUrl}/type/recientes`;
        return this.http.get<any>(url,this.headers)
          .pipe(
            map((resp:{ok: boolean, types: Type}) => resp.types)
          )
      }
    
      getType(type: any) {
        const url = `${baseUrl}/type/show/${type}`;
        return this.http.get<any>(url, this.headers)
          .pipe(
            map((resp:{ok: boolean, type: Type}) => resp.type)
            );
      }
    
    
      createType(type:any) {
        const url = `${baseUrl}/type/store`;
        return this.http.post(url, type, this.headers);
      }
    
      updateType(type:Type) {
        const url = `${baseUrl}/type/update/${type.id}`;
        return this.http.put(url, type, this.headers);
    
      }
    
      updateStatus(type:Type) {
        const url = `${baseUrl}/type/update/status/${type.id}`;
        return this.http.put(url, type, this.headers);
      }
    
    
    
      deleteType(type: any) {
        const url = `${baseUrl}/type/destroy/${type}`;
        return this.http.delete(url, this.headers);
      }
    
}
