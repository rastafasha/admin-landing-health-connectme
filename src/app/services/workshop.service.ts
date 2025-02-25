import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {map} from 'rxjs/operators';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';

//Eviroment
import { environment } from '../../environments/environment';
//Models
import { Workshop } from '../models/workshop';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {

  public workshop: Workshop;
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

 
  getWorkshops() {
    const url = `${baseUrl}/doctors`;
    return this.http.get<any>(url,this.headers)
      .pipe(
        map((resp:{ok: boolean, doctores: Workshop}) => resp.doctores)
      )
  }

  getWorkshop(doctor: any) {
    const url = `${baseUrl}/doctor/show/${doctor}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, doctor: Workshop}) => resp.doctor)
        );
  }


  createWorkshop(doctor:any) {
    const url = `${baseUrl}/doctor/store`;
    return this.http.post(url, doctor, this.headers);
  }

  updateWorkshop(doctor:Workshop) {
    const url = `${baseUrl}/doctor/update/${doctor.id}`;
    return this.http.put(url, doctor, this.headers);

  }

  updateStatus(doctor:Workshop) {
    const url = `${baseUrl}/doctor/update/status/${doctor.id}`;
    return this.http.put(url, doctor, this.headers);
  }
  



  deleteWorkshop(doctor: any) {
    const url = `${baseUrl}/doctor/destroy/${doctor}`;
    return this.http.delete(url, this.headers);
  }

  deleteFoto(id) {
    return this.http.delete(baseUrl + '/doctor/delete-foto/' + id);
  }

  search(query=''){
    return this.http.get(`${baseUrl}/doctor/search`, {params: {buscar: query}})

  }




}
