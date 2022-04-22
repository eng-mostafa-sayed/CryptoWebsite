import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  phase = 0;
  constructor(
    public authService: AuthService,
    private sharedSerivce: SharedService
  ) {}

  ngOnInit() {}
  resetPassword() {
    this.authService.resetPassword('sd');
  }
}
