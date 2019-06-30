import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientFormComponent } from './client-form/client-form.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { ClientLoginComponent } from './client-login/client-login.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientListComponent } from './client-list/client-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[ClientFormComponent, ClientProfileComponent, ClientLoginComponent],
  declarations: [ClientFormComponent, ClientProfileComponent, ClientLoginComponent, ClientListComponent]
})
export class ClientModule { }
