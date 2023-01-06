import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactBookRoutingModule } from './contact-book-routing.module';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { ReportComponent } from './report/report.component';
import { EditComponent } from './edit/edit.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [AddComponent, ListComponent, ReportComponent, EditComponent],
  imports: [
    CommonModule,
    ContactBookRoutingModule,
    SharedModule
  ]
})
export class ContactBookModule { }
