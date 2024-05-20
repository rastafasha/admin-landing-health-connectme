import { Component, OnInit } from '@angular/core';

//Services
import { HttpBackend, HttpClient, HttpHandler } from '@angular/common/http';

import { Location } from '@angular/common';
import { Currencies } from 'src/app/models/currencies';
import { User } from 'src/app/models/user';
import { CurrenciesService } from 'src/app/services/currencies.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-currencies-index',
  templateUrl: './currencies-index.component.html',
  styleUrls: ['./currencies-index.component.css']
})
export class CurrenciesIndexComponent implements OnInit {

  title = "Tipos de moneda"
  currenciesAll: Currencies;
  user: User;
  p: number = 1;
  count: number = 8;
  error: string;
  msm_error: string;
  loading = false;

  constructor(
    private location: Location,
    private http: HttpClient,
    private currenciesService: CurrenciesService,
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
    this.currenciesService.getCurrencies().subscribe(
      res =>{
        this.currenciesAll = res;
        error => this.error = error
        console.log(this.currenciesAll);
      }
    );
  }

  eliminarCurrency(id:number){
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
        this.currenciesService.deleteCurrency(id).subscribe(
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
