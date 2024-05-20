import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Currencies } from 'src/app/models/currencies';
import { Plan } from 'src/app/models/plan';
import { CurrenciesService } from 'src/app/services/currencies.service';
import { PlanesService } from 'src/app/services/planes.service';
import { environment } from 'src/environments/environment';
import { AccountService } from 'src/app/services/account.service';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
}

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-planes-edit',
  templateUrl: './planes-edit.component.html',
  styleUrls: ['./planes-edit.component.css']
})
export class PlanesEditComponent implements OnInit {

  /**
   * Editor type area wyswyg
   */
  public Editor = DecoupledEditor;
  public editorData = `<p>This is a CKEditor 4 WYSIWYG editor instance created with Angular.</p>`;


  public planForm: FormGroup;

  public plan: Plan;

  public imgSelect : String | ArrayBuffer;
  public currenciesAll: Currencies;

  title: string;

  public planSeleccionado: Plan;


  imagePath: string;
  error: string;
  uploadError: string;
  public storage = environment.apiUrlMedia


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private planService: PlanesService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private currenciesService: CurrenciesService,
    private accountService: AccountService,
    ) { }

  ngOnInit(): void {
    this.getCurrencies();
    this.validarFormulario();
    this.activatedRoute.params.subscribe( ({id}) => this.getplan(id));
  }
  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
  }

  getCurrencies(): void {
    this.currenciesService.getCurrencies().subscribe(
      res =>{
        this.currenciesAll = res;
      }
    );
  }

  getplan(id){
    if (id !== null && id !== undefined) {
      this.title = 'Editando plan';
      this.planService.getPlan(+id).subscribe(
        res => {
          this.planForm.patchValue({
            id: res.id,
            name: res.name,
            price: res.price,
            color: res.color,
            tiempo: res.tiempo,
            description: res.description,
            adicional: res.adicional,
            currency_id: this.currenciesAll.id,
            status: res.status,
          });
          this.planSeleccionado = res;
          console.log(this.planSeleccionado);
        }
      );
    } else {
      this.title = 'Creando plan';
    }
  }

  validarFormulario(){
    this.planForm = this.fb.group({
      id: [''],
      name: [''],
      price: [''],
      color: [''],
      tiempo: [''],
      description: [''],
      adicional: [''],
      currency_id: [''],
      status: [''],
    })
  }
  get name() {
    return this.planForm.get('name');
  }

  get price() {
    return this.planForm.get('price');
  }
  get currency_id() {
    return this.planForm.get('currency_id');
  }

  get status() {
    return this.planForm.get('status');
  }
  get color() {
    return this.planForm.get('color');
  }
  get tiempo() {
    return this.planForm.get('tiempo');
  }
  get description() {
    return this.planForm.get('description');
  }
  get adicional() {
    return this.planForm.get('adicional');
  }




  editPlan(){

    const formData = new FormData();
    formData.append('name', this.planForm.get('name').value);
    formData.append('price', this.planForm.get('price').value);
    formData.append('description', this.planForm.get('description').value);
    formData.append('adicional', this.planForm.get('adicional').value);
    formData.append('color', this.planForm.get('color').value);
    formData.append('tiempo', this.planForm.get('tiempo').value);
    formData.append('currency_id', this.planForm.get('currency_id').value);
    formData.append('status', this.planForm.get('status').value);
    const id = this.planForm.get('id').value;
    if(id){
      //actualizar

      this.planService.updatePlan(this.planForm.value, this.planForm.controls['id'].value).subscribe(
        resp =>{
          // Swal.fire('Actualizado', `actualizado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/planes`);
          console.log(this.planSeleccionado);
        });

    }else{
      //crear
      this.planService.createPlan(formData)
      .subscribe( (resp: any) =>{
        Swal.fire('Creado', ` creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/planes`);
        // this.enviarNotificacion();
      })
    }
    return false;
  }





  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }






}




