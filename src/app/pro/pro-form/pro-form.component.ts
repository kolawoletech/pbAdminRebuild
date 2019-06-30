import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../core/auth.service';

type ProFields = 'email' | 'password' | 'expertise' | 'fullName';
type FormErrors = { [u in ProFields]: string };

@Component({
  selector: 'pro-form',
  templateUrl: './pro-form.component.html',
  styleUrls: ['./pro-form.component.scss']
})
export class ProFormComponent implements OnInit {

  proForm: FormGroup;
  newPro = true; // to toggle login or signup form
  passReset = false; // set to true when password reset is triggered
  formErrors: FormErrors = {
    'email': '',
    'password': '',
    'fullName':'',
    'expertise': ''
  };
  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'email': 'Email must be a valid email',
    },
    'password': {
      'required': 'Password is required.',
      'pattern': 'Password must be include at one letter and one number.',
      'minlength': 'Password must be at least 4 characters long.',
      'maxlength': 'Password cannot be more than 40 characters long.',
    },
    'fullName': {
      'required': 'Full Name is required.',
      'minlength': 'Password must be at least 4 characters long.',
      'maxlength': 'Password cannot be more than 40 characters long.',
    },
    'expertise': {
      'required': 'Expertise is required.',
      'minlength': 'Password must be at least 3 characters long.',
      'maxlength': 'Password cannot be more than 40 characters long.',
    },
  };

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit() {
    this.buildForm();
  }

  toggleForm() {
    this.newPro = !this.newPro;
  }

  signup() {
    this.auth.emailSignUp(this.proForm.value['email'], this.proForm.value['password']);
  }

  signUpPro() {
    this.auth.createPro(this.proForm.value['email'], this.proForm.value['password'], this.proForm.value['fullName'], this.proForm.value['expertise']);
  }

  login() {
    this.auth.emailLogin(this.proForm.value['email'], this.proForm.value['password']);
  }

  resetPassword() {
    this.auth.resetPassword(this.proForm.value['email'])
      .then(() => this.passReset = true);
  }

  buildForm() {
    this.proForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email,
      ]],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
      ]]
    });

    this.proForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  // Updates validation state on form changes.
  onValueChanged(data?: any) {
    if (!this.proForm) { return; }
    const form = this.proForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field) && (field === 'email' || field === 'password'|| field === 'fullName'|| field === 'password' )) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          if (control.errors) {
            for (const key in control.errors) {
              if (Object.prototype.hasOwnProperty.call(control.errors, key) ) {
                this.formErrors[field] += `${(messages as {[key: string]: string})[key]} `;
              }
            }
          }
        }
      }
    }
  }

}
