import { Component, OnInit } from '@angular/core';
import { Subcripcion } from 'src/app/models/subcripcion';
import { SubcripcionService } from 'src/app/services/subcripcion.service';

@Component({
  selector: 'app-subcripcion-list',
  templateUrl: './subcripcion-list.component.html',
  styleUrls: ['./subcripcion-list.component.css']
})
export class SubcripcionListComponent implements OnInit {

  subcripcions: Subcripcion;
    error: string;
    constructor(
      private subcripcionService: SubcripcionService,
    ) { }
  
    ngOnInit(): void {
      this.getRecentUsers();
    }
  
    getRecentUsers(): void {
      this.subcripcionService.getSubscripcions().subscribe(
        (subcripcions) =>{
          this.subcripcions = subcripcions;
          console.log(this.subcripcions);
          error => this.error = error;
        }
      );
    }

}
