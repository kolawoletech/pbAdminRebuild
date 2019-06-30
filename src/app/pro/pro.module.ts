import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ProDetailsComponent } from './pro-details/pro-details.component';
import { ProListComponent } from './pro-list/pro-list.component';
import { ProService } from './pro.service';
import { ProFormComponent } from './pro-form/pro-form.component';
import { ProLoginComponent } from './pro-login/pro-login.component';
import { ProProfileComponent } from './pro-profile/pro-profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ProDetailsComponent, ProListComponent, ProFormComponent, ProLoginComponent, ProProfileComponent],
  exports: [ProDetailsComponent, ProListComponent, ProFormComponent],
  providers: [ProService]
})
export class ProModule { }
