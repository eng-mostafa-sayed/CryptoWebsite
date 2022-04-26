import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  APIBaseUrl: string = 'https://cominer.herokuapp.com/api';
  APIKey: string =
    'c3fe929c35dd0cbcc8f062bb60e9d2ce7d14be21513d07c53e370d81ba9de4a4';

  private email: String | null;
  private accessToken: String | null;
  private name: String | null;
  private refreshToken: String | null;
  private resetToken: String = '';

  authStatusListner = new BehaviorSubject<boolean>(false);
  saveTimeout: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private sharedSerivce: SharedService
  ) {}
  //////////////////////////////////////////////the auth autherization
  header: any = {
    headers: new HttpHeaders().set(
      'Authorization',
      `Bearer ${sessionStorage.getItem('accessToken')}`
    ),
  };
  //////////////////////////////////////////////////////////////////////////////////the auth functions////////////////////////////////
  signup(name: String, email: String, phone: number, password: String) {
    return this.http.post<any>(
      `${this.APIBaseUrl}/user/register?key=${this.APIKey}`,
      {
        name,
        email,
        phone,
        password,
      }
    );
  }
  async signin(userName: String, password: String) {
    //here i added the income username to the session storage to use it
    this.name = userName;
    sessionStorage.setItem('password', `${password}`);
    this.http
      .post<any>(`${this.APIBaseUrl}/user/FFactorAuth?key=${this.APIKey}`, {
        userName: userName,
        password: password,
      })
      .subscribe({
        next: (res) => {
          if (res.message == 'Wrong credentials') {
            this.sharedSerivce.sentMessage.next(
              'something went wrong please try again'
            );
            this.authStatusListner.next(false);
          } else if (res.message != 'Wrong credentials') {
            this.authStatusListner.next(true);
            this.router.navigate(['/user/otp']);
            sessionStorage.removeItem('password');
          }
        },
        error: (err) => {
          this.sharedSerivce.sentMessage.next(
            'something went wrong please try again'
          );
          console.log(err);
        },
      });
  }
  async logout() {
    clearTimeout(this.saveTimeout);
    await this.logingOut();
    this.clearAuthData();
    this.authStatusListner.next(false);
    this.router.navigate(['/']);
  }
  logingOut() {
    this.http
      .post<any>(`${this.APIBaseUrl}/user/logout?key=${this.APIKey}`, {
        token: this.refreshToken,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          this.sharedSerivce.sentMessage.next('something went wrong');
          console.log(err);
        },
      });
  }
  ///////////////////////////////////////////////////////////////
  async otpValidator(otp: string) {
    await this.http
      .post<any>(`${this.APIBaseUrl}/user/TwoFactorAuth?key=${this.APIKey}`, {
        userName: this.name,
        otp: otp,
      })
      .subscribe({
        next: (res) => {
          //console.log(res);
          this.accessToken = res.jwt.accessToken;
          this.refreshToken = res.jwt.refreshToken;

          // ///////////////////////////////session storage set values
          sessionStorage.setItem('accessToken', `${this.accessToken}`);

          this.authStatusListner.next(true);
          this.router.navigate(['/user/dashboard/overview']);
        },
        error: (err) => {
          this.sharedSerivce.sentMessage.next(
            'something went wrong please try again'
          );
          console.log(err);
        },
      });
  }
  //////////////////////////////////////////////////////////////
  resendOtp() {
    let n = this.name;
    let p = sessionStorage.getItem('password');
    this.signin(n ? n : 'dummy data', p ? p : 'dummy data');
  }

  // //////////////////////////////////////////////////////////////
  async resetPassword(forgetEmail: string) {
    this.http
      .post<any>(`${this.APIBaseUrl}/user/forgetPassword?key=${this.APIKey}`, {
        email: forgetEmail,
      })
      .subscribe({
        next: (res) => {
          this.authStatusListner.next(true);
          sessionStorage.setItem('email', forgetEmail);
          this.router.navigate(['/user/recovery-message']);
        },
        error: (err) => {
          this.sharedSerivce.sentMessage.next('wrong password');
          console.log(err);
        },
      });
  }
  /////////////////////////////////////////////////////////////

  async resetPasswordVerificationCode(verifyCode: string) {
    await this.http
      .post<any>(`${this.APIBaseUrl}/user/verifyCode?key=${this.APIKey}`, {
        email: this.email ? this.email : sessionStorage.getItem('email'),
        code: verifyCode,
      })
      .subscribe({
        next: (res) => {
          sessionStorage.setItem('resetToken', res.token);
          this.resetToken = res.token;
          this.authStatusListner.next(true);
        },
        error: (err) => {
          this.sharedSerivce.sentMessage.next(
            'wrong verification code please try again'
          );
          console.log(err);
        },
      });
  }
  /////////////////////////////////////////////////////////////
  resetNewPassword(newPassword: any) {
    return this.http.post<any>(
      `${this.APIBaseUrl}/user/resetPassword?key=${this.APIKey}`,
      {
        newPassword: newPassword,
        code: sessionStorage.getItem('code')?.toString().trim(),
      },
      {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${this.resetToken}`
        ),
      }
    );
  }
  /////////////////////////////////////////////////////////////

  private clearAuthData() {
    sessionStorage.removeItem('accessToken');
  }
}
