import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  loading = false;
  signupForm!: FormGroup;
  passwordShown = false;
  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required],
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      phone: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.pattern(/^01[0125][0-9]{8}$/),
        ],
      }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(5)],
      }),
    });
  }
  onSignup() {
    if (
      this.signupForm.value.name &&
      this.signupForm.value.email &&
      this.signupForm.value.phone &&
      this.signupForm.value.password
    ) {
      this.authService
        .signup(
          this.signupForm.value.name,
          this.signupForm.value.email,
          this.signupForm.value.phone,
          this.signupForm.value.password
        )
        .subscribe({
          /////////////////////////////////////////////mesh byd5ol hena
          next: (res: any) => {
            console.log('Erooooor');
            this.router.navigate(['../signin']);
          },
          error: (err: any) => {
            console.log('Erooooor');
            console.log('Erooooor');
            console.log(err);
          },
        });
    }
  }
  changeInput(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
    this.passwordShown = !this.passwordShown;
  }
}
