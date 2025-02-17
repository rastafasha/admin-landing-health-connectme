import { Component, OnInit } from '@angular/core';
import { RegistroLanding } from 'src/app/models/registro-langing';
import { User } from 'src/app/models/user';
import { RegistroLandingService } from 'src/app/services/registro-landing.service';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-usuarios-recientes',
  templateUrl: './usuarios-recientes.component.html',
  styleUrls: ['./usuarios-recientes.component.css']
})
export class UsuariosRecientesComponent implements OnInit {

  rlandings: RegistroLanding;
  error: string;
  constructor(
    private rlandingService: RegistroLandingService,
  ) { }

  ngOnInit(): void {
    this.getRecentUsers();
  }

  getRecentUsers(): void {
    this.rlandingService.getRecientes().subscribe(
      (rlandings) =>{
        this.rlandings = rlandings;
        console.log(this.rlandings);
        error => this.error = error;
      }
    );
  }

}
