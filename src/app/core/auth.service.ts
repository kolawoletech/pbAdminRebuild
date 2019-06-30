import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { firebase } from '@firebase/app';
import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { NotifyService } from './notify.service';

import { Observable, of } from 'rxjs';
import { switchMap, startWith, tap, filter } from 'rxjs/operators';

interface User {
  uid: string;
  email?: string | null;
  photoURL?: string;
  displayName?: string;
}

interface Pro {
  uid: string;
  email?: string | null;
  photoURL?: string;
  displayName?: string;
}

interface Client {
  uid: string;
  email?: string | null;
  photoURL?: string;
  displayName?: string;
}

@Injectable()
export class AuthService {
  user: Observable<User | null>;
  pro: Observable<Pro | null>;
  client: Observable<Client | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase,
    private afs: AngularFirestore,
    private router: Router,
    private notify: NotifyService
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
      // tap(user => localStorage.setItem('user', JSON.stringify(user))),
      // startWith(JSON.parse(localStorage.getItem('user')))
    );
  }

  ////// OAuth Methods /////

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  githubLogin() {
    const provider = new auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  twitterLogin() {
    const provider = new auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: any) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(credential => {
        this.notify.update('Welcome to Firestarter!!!', 'success');
        return this.updateUserData(credential.user);
      })
      .catch(error => this.handleError(error));
  }

  //// Anonymous Auth ////

  anonymousLogin() {
    return this.afAuth.auth
      .signInAnonymously()
      .then(credential => {
        this.notify.update('Welcome to Firestarter!!!', 'success');
        return this.updateUserData(credential.user); // if using firestore
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  //// Email/Password Auth ////

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => {
        this.notify.update('Welcome new user!', 'success');
        return this.updateUserData(credential.user); // if using firestore
      })
      .catch(error => this.handleError(error));
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(credential => {
        this.notify.update('Welcome back!', 'success');
        return this.updateUserData(credential.user);
      })
      .catch(error => this.handleError(error));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = auth();

    return fbAuth
      .sendPasswordResetEmail(email)
      .then(() => this.notify.update('Password update email sent', 'info'))
      .catch(error => this.handleError(error));
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error');
  }

  // Sets user data to firestore after succesful login
  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || 'nameless user',
      photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ'
    };
    return userRef.set(data);
  }

  createPro(
    email: string,
    password: string,
    fullName: string,
    expertise: string
  ): Promise<any> {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(
        newPro => {
          console.log("I Am Here")
          this.afDb
            .object(`proProfile/${newPro.user.uid}`)
            .set({
              email,
              fullName,
              proId: newPro.user.uid,
              pro: true,
              expertise
            })
        this.notify.update('Welcome new user!', 'success');
        return this.updateUserData(newPro.user); // if using firestore
        },
        error => {
          console.error(error);
          console.log("Got Here")
        }
      )
      .catch(error => this.handleError(error));;
  }

  createClient(
    email: string,
    password: string,
    fullName: string
  ): Promise<any> {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(
        newClient => {
          this.afDb
            .object(`clientProfile/${newClient.user.uid}`)
            .set({
              email,
              fullName,
              proId: newClient.user.uid,
              client: true
            })
        this.notify.update('Welcome new client!', 'success');
        return this.updateUserData(newClient.user); // if using firestore
        },
        error => {
          console.error(error);
          console.log("Got Here")
        }
      )
      .catch(error => this.handleError(error));;
  }
}
