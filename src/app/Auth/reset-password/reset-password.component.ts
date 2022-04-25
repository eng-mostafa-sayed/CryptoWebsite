import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  phase = 0;
  restForm: FormGroup;
  constructor(
    public authService: AuthService,
    private sharedSerivce: SharedService
  ) {}

  ngOnInit() {
    this.restForm = new FormGroup({
      email: new FormControl(null, Validators.required),
    });
  }
  resetPassword() {
    this.authService.resetPassword(this.restForm.value);
  }
}
