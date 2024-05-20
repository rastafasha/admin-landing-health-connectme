import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit {
  title = 'Admin Usuario';
  public user: User;
  public userprofile: User;

  error: string;

  id:any;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.user = userService.user;
  }

  ngOnInit(): void {
    this.closeMenu();
    this.getUser();
    window.scrollTo(0,0);
    this.getUserProfile();
  }

  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");
      }
  }

  getUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.id = this.user.id;
  }

  getUserProfile(){
    this.userService.getUserById(this.user.id).subscribe(
      res =>{
        this.user = res[0];
        error => this.error = error;
      }
    );
    // if(this.user.profiles == null ){
    //   Swal.fire('Debes llenar tu perfil y aceptar las condiciones');
    // }
  }



}
