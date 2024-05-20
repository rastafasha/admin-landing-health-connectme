import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Workshop } from 'src/app/models/workshop';
import { WorkshopService } from 'src/app/services/workshop.service';

import { FileSaverService } from 'ngx-filesaver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-workshop1',
  templateUrl: './workshop1.component.html',
  styleUrls: ['./workshop1.component.css']
})
export class Workshop1Component implements OnInit {

  title = "Registro de Solicitudes ";
  // workshops: Workshop[] = [];
  doctores: any;
  workshop: Workshop;
  datos: any;

  p: number = 1;
  count: number = 8;

  error: string;
  msm_error: string;
  roles;

  rolesSelected:number;

  rolesForm: FormGroup;
  query:string ='';

  constructor(
    private fb:FormBuilder,
    private workshopsService: WorkshopService,
    private location: Location,
    private fileSaver: FileSaverService
  ) { }

  ngOnInit(): void {
    this.getWorkshops();
    window.scrollTo(0,0);
  }

  getWorkshops(): void {
    this.workshopsService.getWorkshops().subscribe(
      (res:any) =>{
        this.doctores = res;
        console.log(res);
        error => this.error = error;
      }
    );
  }



  validarFormulario(){
    this.rolesForm = this.fb.group({
      role: [''],
    })
  }

  cambiarStatus(workshop: Workshop){
    this.workshopsService.updateStatus(workshop).subscribe(
      resp =>{ console.log(resp);
        Swal.fire('Actualizado', `actualizado correctamente`, 'success');
        this.getWorkshops();
      }
    )
  }

  search() {// funciona, devuelve la busqueda

    return this.workshopsService.search(this.query).subscribe(
      res=>{
        this.doctores = res;
        if(!this.query){
          this.ngOnInit();
        }
      });
  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  excelExport(){
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
    const EXCLE_EXTENSION = '.xlsx';

    this.getWorkshops();


    //custom code
    const worksheet = XLSX.utils.json_to_sheet(this.doctores);

    const workbook = {
      Sheets:{
        'testingSheet': worksheet
      },
      SheetNames:['testingSheet']
    }

    const excelBuffer = XLSX.write(workbook, {bookType:'xlsx', type: 'array'});

    const blobData = new Blob([excelBuffer],{type: EXCEL_TYPE});

    this.fileSaver.save(blobData, "workshop1Registro")

  }
  csvExport(){
    const CSV_TYPE = 'text/csv';
    const CSV_EXTENSION = '.csv';

    this.getWorkshops();


    //custom code
    const worksheet = XLSX.utils.json_to_sheet(this.doctores);

    const workbook = {
      Sheets:{
        'testingSheet': worksheet
      },
      SheetNames:['testingSheet']
    }

    const excelBuffer = XLSX.write(workbook, {bookType:'csv', type: 'array'});

    const blobData = new Blob([excelBuffer],{type: CSV_TYPE});

    this.fileSaver.save(blobData, "workshop1Registro")

  }

}
