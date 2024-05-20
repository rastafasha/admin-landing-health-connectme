import { Component, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { Profile } from 'src/app/models/profile';
import { CondicionesService } from 'src/app/services/condiciones.service';
import { Condiciones } from 'src/app/models/condiciones';


@Component({
  selector: 'app-condiciones',
  templateUrl: './condiciones.component.html',
  styleUrls: ['./condiciones.component.css']
})
export class CondicionesComponent implements OnInit {
  profileSeleccionado: Profile;
  user: User;
  userprofile: User;
  aceptaForm: FormGroup;
  error:string;

  public condicionAceptada: any;

  id: number | null;

  constructor(
    private location: Location,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private condicionesService: CondicionesService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.activatedRoute.params.subscribe( ({id}) => this.getUserServer(id));
  }

  getUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.id = this.user.id;
  }

  getUserServer(id:number){
    this.userService.getUserById(+id).subscribe(
      res =>{
        this.userprofile = res[0];
        error => this.error = error
        console.log(this.userprofile);
      }
    );

    if (!id == null || !id == undefined || id) {
      this.activatedRoute.params.subscribe( ({id}) => this.iniciarFormularioAcepta(id));

    }else{
      alert('Agrega info a tu durectorio!');
    }
  }

  validarAcepta(){
    this.aceptaForm = this.fb.group({
      id: [''],
      user_id: [this.user.id],
      aceptaCondiciones: ['', Validators.required],
    });
  }
  iniciarFormularioAcepta(id:number){
    // const id = this.route.snapshot.paramMap.get('id');
    if (!id == null || !id == undefined || id) {

      this.userService.getUserById(+id).subscribe(
        res => {
          this.aceptaForm.patchValue({
            id: res.id,
            user_id: this.user.id,
            aceptaCondiciones: res.aceptaCondiciones,
          });
          this.profileSeleccionado = res[0];
        }
      );
    }
    this.validarAcepta()

  }

  get user_id() { return this.aceptaForm.get('user_id'); }
  get aceptaCondiciones() { return this.aceptaForm.get('aceptaCondiciones'); }

  aceptarCodiciones(){

    const formData = new FormData();
    formData.append('aceptaCondiciones', this.aceptaForm.get('aceptaCondiciones').value);
    formData.append('user_id', this.aceptaForm.get('user_id').value);
    const id = this.aceptaForm.get('id').value;

    const data = {
      ...this.aceptaForm.value,
      user_id: this.user.id,
    }
    this.condicionesService.profileAcepta(data).subscribe(
      resp =>{
        // console.log(resp);
        this.condicionAceptada = resp;
        Swal.fire('Gracias!', `puedes llenar tus datos`, 'success');

      }
    )
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
