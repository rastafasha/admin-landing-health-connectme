import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Workshop } from 'src/app/models/workshop';
import { WorkshopService } from 'src/app/services/workshop.service';
import { RegistroLandingService } from 'src/app/services/registro-landing.service';
import { RegistroLanding } from 'src/app/models/registro-langing';
import { TypeService } from 'src/app/services/type-service.service';
import { Type } from 'src/app/models/type';

@Component({
  selector: 'app-workshop-detail',
  templateUrl: './workshop-detail.component.html',
  styleUrls: ['./workshop-detail.component.css']
})
export class WorkshopDetailComponent implements OnInit {

  title = "Detalle Registro";
  rlanding: RegistroLanding;
  type: Type;
  error: string;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private typeService: TypeService,
    private registroLandingService: RegistroLandingService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.activatedRoute.params.subscribe( ({id}) => this.getPagoById(id));
    
  }
  
  getPagoById(id:number){
    this.registroLandingService.getRegistroLanding(id).subscribe(
      res=>{
        this.rlanding = res;
        this.getConfig();
      }
    )
  }

  getConfig(){
    this.typeService.getType(this.rlanding.type_id).subscribe((resp:any)=>{
      this.type = resp.name
    })
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}
