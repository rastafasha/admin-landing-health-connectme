import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionesComponent } from './configuraciones/configuraciones.component';
import { CurrenciesIndexComponent } from './currencies/currencies-index/currencies-index.component';
import { CurrenciesEditComponent } from './currencies/currencies-edit/currencies-edit.component';
import { PlanesEditComponent } from './planes/planes-edit/planes-edit.component';
import { PlanesIndexComponent } from './planes/planes-index/planes-index.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RolesViewComponent } from './roles/roles-view/roles-view.component';

// Import Angular plugin.
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// paginacion
import { NgxPaginationModule } from 'ngx-pagination';

// angular file uploader
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { CategoryIndexComponent } from './category/category-index/category-index.component';
import { PaymentmethodIndexComponent } from './paymentmethod/paymentmethod-index/paymentmethod-index.component';
import { PaymentmethodEditComponent } from './paymentmethod/paymentmethod-edit/paymentmethod-edit.component';

@NgModule({
  declarations: [
    ConfiguracionesComponent,
    CurrenciesIndexComponent,
    CurrenciesEditComponent,
    PlanesEditComponent,
    PlanesIndexComponent,
    RolesViewComponent,
    CategoryEditComponent,
    CategoryIndexComponent,
    PaymentmethodIndexComponent,
    PaymentmethodEditComponent

  ],
  exports: [
    ConfiguracionesComponent,
    CurrenciesIndexComponent,
    CurrenciesEditComponent,
    PlanesEditComponent,
    PlanesIndexComponent,
    RolesViewComponent,
    CategoryEditComponent,
    CategoryIndexComponent,
    PaymentmethodIndexComponent,
    PaymentmethodEditComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    PipesModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    CKEditorModule,
    // AngularFileUploaderModule
  ]
})
export class ConfModule { }
