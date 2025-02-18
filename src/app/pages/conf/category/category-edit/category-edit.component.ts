import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

import { environment } from 'src/environments/environment';

import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { TypeService } from 'src/app/services/type-service.service';
import { Type } from 'src/app/models/type';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  title : string;

  public categoryForm: FormGroup;
  public type: Type;
  public types: Type;
  public usuario: User;
  error: string;

  idcategory:any;

  public categorySeleccionado: Category;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private typeService: TypeService,
  ) {
    this.usuario = usuarioService.user;
    const base_url = environment.apiUrl;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({id}) => this.cargarCategory(id));
    this.validarFormulario();
    window.scrollTo(0,0);

    if(this.categorySeleccionado){
      //actualizar
      this.title = 'Creando Categoría';

    }else{
      //crear
      this.title = 'Edit Categoría';
    }
  }

  validarFormulario(){
    this.categoryForm = this.fb.group({
      name: ['',Validators.required],
      state: ['', Validators.required],
    })
  }

  cargarCategory(id: number){
    if (id !== null && id !== undefined) {
      this.title = 'Editando Categoría';
      this.typeService.getType(id).subscribe(
        res => {
          this.categoryForm.patchValue({
            id: res.id,
            name: res.name,
            state: res.state,
          });
          this.categorySeleccionado = res;
          console.log(this.categorySeleccionado);
        }
      );
    } else {
      this.title = 'Creando Categoría';
    }

  }

  updateCategory(){

    const {name, state } = this.categoryForm.value;

    if(this.categorySeleccionado){
      //actualizar
      const data = {
        ...this.categoryForm.value,
        id: this.categorySeleccionado.id
      }
      this.typeService.updateType(data).subscribe(
        resp =>{
          Swal.fire('Actualizado', `${name}  actualizado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/categories`);
          console.log(this.categorySeleccionado);
        });

    }else{
      //crear
      this.typeService.createType(this.categoryForm.value)
      .subscribe( (resp: any) =>{
        Swal.fire('Creado', `${name} creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/categories`);
        // this.enviarNotificacion();
      })
    }

  }

  // enviarNotificacion(): void {
  //   this.alertService.success("Mensaje de Monedas","Se ha creado una nueva moneda!");
  // }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
