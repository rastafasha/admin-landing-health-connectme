import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegistroLanding } from '../models/registro-langing';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs';

const baseUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class RegistroLandingService {

  public rlanding: RegistroLanding;
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
  
   
    getRegistroLandings() {
      const url = `${baseUrl}/registrols`;
      return this.http.get<any>(url,this.headers)
        .pipe(
          map((resp:{ok: boolean, rlandings: RegistroLanding}) => resp.rlandings)
        )
    }

    listConfig(type_id: number){
      const url = `${baseUrl}/registrols/config/${type_id}`;
      return this.http.get<any>(url,this.headers)
        .pipe(
          map((resp:{ok: boolean, rlanding: RegistroLanding}) => resp.rlanding)
        )
    }
    getRecientes() {
      const url = `${baseUrl}/registrol/recientes`;
      return this.http.get<any>(url,this.headers)
        .pipe(
          map((resp:{ok: boolean, rlandings: RegistroLanding}) => resp.rlandings)
        )
    }
  
    getRegistroLanding(registrol: any) {
      const url = `${baseUrl}/registrol/show/${registrol}`;
      return this.http.get<any>(url, this.headers)
        .pipe(
          map((resp:{ok: boolean, rlanding: RegistroLanding}) => resp.rlanding)
          );
    }
  
  
    createRegistroLanding(registrol:any) {
      const url = `${baseUrl}/registrol/store`;
      return this.http.post(url, registrol, this.headers);
    }
  
    updateRegistroLanding(registrol:RegistroLanding) {
      const url = `${baseUrl}/registrol/update/${registrol.id}`;
      return this.http.put(url, registrol, this.headers);
  
    }
  
    updateStatus(registrol:RegistroLanding) {
      const url = `${baseUrl}/registrol/update/status/${registrol.id}`;
      return this.http.put(url, registrol, this.headers);
    }
    updateType(registrol:RegistroLanding) {
      const url = `${baseUrl}/registrol/update/type/${registrol.id}`;
      return this.http.put(url, registrol, this.headers);
    }

    sendIvitation(registrol:RegistroLanding) {
      const url = `${baseUrl}/registrol/sendinvitation/${registrol.id}`;
      return this.http.put(url, registrol, this.headers);
    }
  
  
  
    deleteRegistroLanding(registrol: any) {
      const url = `${baseUrl}/registrol/destroy/${registrol}`;
      return this.http.delete(url, this.headers);
    }
  
    deleteFoto(id) {
      return this.http.delete(baseUrl + '/registrol/delete-foto/' + id);
    }
  
    search(query=''){
      return this.http.get(`${baseUrl}/registrol/search`, {params: {buscar: query}})
  
    }
  
}
