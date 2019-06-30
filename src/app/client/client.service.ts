import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase,  AngularFireList, AngularFireObject, } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    public afAuth: AngularFireAuth,
    public afDb: AngularFireDatabase
  ) { }

  getAllClients(): AngularFireList<any> {
    return this.afDb.list(`/clientProfile/`);
  }
}
