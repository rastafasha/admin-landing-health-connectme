import { Component, OnInit } from '@angular/core';

//Services
import { HttpBackend, HttpClient, HttpHandler } from '@angular/common/http';

import { Location } from '@angular/common';
import { User } from 'src/app/models/user';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
import { TypeService } from 'src/app/services/type-service.service';
import { Type } from 'src/app/models/type';


@Component({
  selector: 'app-category-index',
  templateUrl: './category-index.component.html',
  styleUrls: ['./category-index.component.css']
})
export class CategoryIndexComponent implements OnInit {


  title = "Categorias"
  types: Type;
  user: User;
  p: number = 1;
  count: number = 8;
  error: string;
  msm_error: string;
  loading = false;

  constructor(
    private location: Location,
    private http: HttpClient,
    private typeService: TypeService,
    handler: HttpBackend
  ) {
    this.http = new HttpClient(handler);
   }

  ngOnInit(): void {
    this.getCurrencies();
    this.getUser();
    window.scrollTo(0,0);
  }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    console.log(this.user.id);


  }

  getCurrencies(): void {
    this.typeService.getTypes().subscribe(
      res =>{
        this.types = res;
        error => this.error = error
        console.log(this.types);
      }
    );
  }

  eliminarCategory(id:number){
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
        this.typeService.deleteType(id).subscribe(
          response =>{
            this.getCurrencies();
          }
          );
        Swal.fire(
          'Borrado!',
          'El Archivo fue borrado.',
          'success'
        )
        this.ngOnInit();
      }
    });

  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
