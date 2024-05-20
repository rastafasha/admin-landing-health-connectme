import { Component, OnInit } from '@angular/core';

import { HttpBackend, HttpClient, HttpHandler } from '@angular/common/http';

import { Location } from '@angular/common';
import { Plan } from 'src/app/models/plan';
import { User } from 'src/app/models/user';
import { PlanesService } from 'src/app/services/planes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-planes-index',
  templateUrl: './planes-index.component.html',
  styleUrls: ['./planes-index.component.css']
})
export class PlanesIndexComponent implements OnInit {
  title = "Planes y productos"
  planes: Plan;
  user: User;
  p: number = 1;
  count: number = 8;
  error: string;
  msm_error: string;
  loading = false;

  constructor(
    private location: Location,
    private planesService: PlanesService,
    handler: HttpBackend
  ) {
   }

  ngOnInit(): void {
    this.getPlanes();
    window.scrollTo(0,0);
  }

  getPlanes(): void {
    // return this.planesService.carga_info();
    this.planesService.getPlanes().subscribe(
      res =>{
        this.planes = res;
        error => this.error = error
        console.log(this.planes);
      }
    );
  }

  eliminarPlan(plan:Plan){

    Swal.fire({
      title: 'Estas Seguro?',
      text: "No podras recuperarlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.planesService.deletePlan(plan).subscribe(
          response =>{
            this.getPlanes();
          }
          );
        Swal.fire(
          'Borrado!',
          'El Archivo fue borrado.',
          'success'
        )
        this.ngOnInit();
      }
    })
  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }



}
