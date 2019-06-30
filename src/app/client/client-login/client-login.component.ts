import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
@Component({
  selector: 'client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.scss']
})
export class ClientLoginComponent  {

 constructor(public auth: AuthService,
    private router: Router) { }

  /// Social Login

  async signInWithGithub() {
    await this.auth.githubLogin();
    return await this.afterSignIn();
  }

  async signInWithGoogle() {
    await this.auth.googleLogin();
    return await this.afterSignIn();
  }

  async signInWithFacebook() {
    await this.auth.facebookLogin();
    await this.afterSignIn();
  }

  async signInWithTwitter() {
    await this.auth.twitterLogin();
    return await this.afterSignIn();
  }

  /// Anonymous Sign In

  async signInAnonymously() {
    await this.auth.anonymousLogin();
    return await this.afterSignIn();
  }

  /// Shared

  private afterSignIn() {
    // Do after login stuff here, such router redirects, toast messages, etc.
    return this.router.navigate(['/']);
  }

}
