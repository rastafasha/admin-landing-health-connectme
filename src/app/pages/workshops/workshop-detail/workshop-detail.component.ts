import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Workshop } from 'src/app/models/workshop';
import { WorkshopService } from 'src/app/services/workshop.service';

@Component({
  selector: 'app-workshop-detail',
  templateUrl: './workshop-detail.component.html',
  styleUrls: ['./workshop-detail.component.css']
})
export class WorkshopDetailComponent implements OnInit {

  title = "Detalle Registro";
  workshop: Workshop;
  error: string;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private workshopService: WorkshopService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.activatedRoute.params.subscribe( ({id}) => this.getPagoById(id));
  }
  
  getPagoById(id:number){
    this.workshopService.getWorkshop(id).subscribe(
      res=>{
        this.workshop = res;
      }
    )
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}
