import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

import { environment } from 'src/environments/environment';

import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Paymentmethod } from 'src/app/models/paymentmethod';
import { PaimentmethodService } from 'src/app/services/paimentmethod.service';
import { Currencies } from 'src/app/models/currencies';
import { CurrenciesService } from 'src/app/services/currencies.service';

@Component({
  selector: 'app-paymentmethod-edit',
  templateUrl: './paymentmethod-edit.component.html',
  styleUrls: ['./paymentmethod-edit.component.css']
})
export class PaymentmethodEditComponent implements OnInit {

  title : string;

  public paymentmethodForm: FormGroup;
  public paymentmethod: Paymentmethod;
  public usuario: User;
  paymentmethods: Paymentmethod;
  error: string;

  idpaymentmethod:any;
  public currenciesAll: Currencies;

  public paymentmethodSeleccionado: Paymentmethod;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private paymentmethodService: PaimentmethodService,
    private currenciesService: CurrenciesService,
  ) {
    this.usuario = usuarioService.user;
    const base_url = environment.apiUrl;
  }

  ngOnInit(): void {
    this.validarFormulario();
    this.activatedRoute.params.subscribe( ({id}) => this.cargarPaymentmethod(id));
    window.scrollTo(0,0);
  }

  cargarPaymentmethod(id: number){
    if (id !== null && id !== undefined) {
      this.title = 'Editando Tipo de Pago';
      this.paymentmethodService.getPaymentmethod(+id).subscribe(
        res => {
          this.paymentmethodForm.patchValue({
            id: res.id,
            name: res.name,
            modoPaypal: res.modoPaypal,
            clienteIdPaypal: res.clienteIdPaypal,
            llaveSecretaPaypal: res.llaveSecretaPaypal,
            modoBinance: res.modoBinance,
            merchantIdBinance: res.merchantIdBinance,
            accountIdBinance: res.accountIdBinance,
            apiKeyBinance: res.apiKeyBinance,
          });
          this.paymentmethodSeleccionado = res;
          console.log(this.paymentmethodSeleccionado);
        }
      );
    } else {
      this.title = 'Creando Tipo de Pago';
    }

  }

  validarFormulario(){
    this.paymentmethodForm = this.fb.group({
      id: [''],
      name: ['',Validators.required],
      modoPaypal: ['1',Validators.required],
      clienteIdPaypal: ['',Validators.required],
      llaveSecretaPaypal: ['',Validators.required],
      modoBinance: ['1'],
      merchantIdBinance: [''],
      accountIdBinance: [''],
      apiKeyBinance: [''],
    })
  }

  get name() {
    return this.paymentmethodForm.get('name');
  }
  get modoPaypal() {
    return this.paymentmethodForm.get('modoPaypal');
  }
  get clienteIdPaypal() {
    return this.paymentmethodForm.get('clienteIdPaypal');
  }
  get llaveSecretaPaypal() {
    return this.paymentmethodForm.get('llaveSecretaPaypal');
  }
  get modoBinance() {
    return this.paymentmethodForm.get('modoBinance');
  }
  get merchantIdBinance() {
    return this.paymentmethodForm.get('merchantIdBinance');
  }
  get accountIdBinance() {
    return this.paymentmethodForm.get('accountIdBinance');
  }
  get apiKeyBinance() {
    return this.paymentmethodForm.get('apiKeyBinance');
  }




  updatePaymentmethod(){

    const formData = new FormData();
    formData.append('name', this.paymentmethodForm.get('name').value);
    formData.append('modoPaypal', this.paymentmethodForm.get('modoPaypal').value);
    formData.append('clienteIdPaypal', this.paymentmethodForm.get('clienteIdPaypal').value);
    formData.append('llaveSecretaPaypal', this.paymentmethodForm.get('llaveSecretaPaypal').value);
    formData.append('modoBinance', this.paymentmethodForm.get('modoBinance').value);
    formData.append('merchantIdBinance', this.paymentmethodForm.get('merchantIdBinance').value);
    formData.append('accountIdBinance', this.paymentmethodForm.get('accountIdBinance').value);
    formData.append('apiKeyBinance', this.paymentmethodForm.get('apiKeyBinance').value);

    const id = this.paymentmethodForm.get('id').value;

    if(id){
      //actualizar
      const data = {
        ...this.paymentmethodForm.value,
        id: this.paymentmethodSeleccionado.id
      }
      this.paymentmethodService.updatePaymentmethod(data, +id).subscribe(
        resp =>{
          Swal.fire('Actualizado', `Actualizado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/paymentmethods`);
          console.log(this.paymentmethodSeleccionado);
        });

    }else{
      //crear
      this.paymentmethodService.createPaymentmethod(this.paymentmethodForm.value)
      .subscribe( (resp: any) =>{
        Swal.fire('Creado', `Creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/paymentmethods`);
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
