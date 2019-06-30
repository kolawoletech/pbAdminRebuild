import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class ProService {

  constructor(
    public afAuth: AngularFireAuth,
    public afDb: AngularFireDatabase
  ) {}

  
}
