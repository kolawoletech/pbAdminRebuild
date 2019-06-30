import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/auth.guard';
import { UserLoginComponent } from './ui/user-login/user-login.component';
import { HomePageComponent } from './ui/home-page/home-page.component';
import { NotesListComponent } from './notes/notes-list/notes-list.component';
import { ProListComponent } from './pro/pro-list/pro-list.component';
import { ProLoginComponent } from './pro/pro-login/pro-login.component';
import { ClientLoginComponent } from './client/client-login/client-login.component';
import { ClientListComponent } from './client/client-list/client-list.component';

import { UploadPageComponent } from './uploads/upload-page/upload-page.component';

import { SsrPageComponent } from './ui/ssr-page/ssr-page.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'clientList', component: ClientListComponent },

  { path: 'notes', component: NotesListComponent,  canActivate: [AuthGuard] },
  { path: 'uploads',  component: UploadPageComponent,  canActivate: [AuthGuard] },
  { path: 'pros',  component: ProLoginComponent},
  { path: 'users',  component: ClientLoginComponent},
  { path: 'ssr', component: SsrPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
