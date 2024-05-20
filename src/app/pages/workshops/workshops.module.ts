import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopsComponent } from './workshops/workshops.component';
import { Workshop1Component } from './workshop1/workshop1.component';

// paginacion
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { WorkshopDetailComponent } from './workshop-detail/workshop-detail.component';

@NgModule({
  declarations: [
    WorkshopsComponent,
    Workshop1Component,
    WorkshopDetailComponent
  ],
  exports: [
    WorkshopsComponent,
    Workshop1Component,
    WorkshopDetailComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    RouterModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class WorkshopsModule { }
