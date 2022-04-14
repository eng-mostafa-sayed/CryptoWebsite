import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  loading = false;
  otpForm!: FormGroup;
  passwordShown = false;
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.otpForm = new FormGroup({
      otp: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }
  onProcess() {
    if (this.otpForm.value.otp)
      this.authService.otpValidator(this.otpForm.value.otp);
  }
}
