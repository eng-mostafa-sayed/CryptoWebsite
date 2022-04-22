import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  APIBaseUrl: string = 'https://cominer.herokuapp.com/api';
  APIKey: string =
    'c3fe929c35dd0cbcc8f062bb60e9d2ce7d14be21513d07c53e370d81ba9de4a4';

  private userId: string | null;
  private email: string | null;
  private accessToken: string | null;
  private refreshToken: string | null;
  private name: string | null;
  private phone: string | null;
  private balance: string | null;
  private balance_eth: string | null;
  private balance_btc: string | null;
  private balance_rvn: string | null;
  private balance_ltct: string | null;
  private activePlans: string | null;
  private activeDemoPlans: string | null;
  private devices: string | null;
  authStatusListner = new BehaviorSubject<boolean>(false);
  saveTimeout: any;
  constructor(private http: HttpClient, private router: Router) {}

  header: any = {
    headers: new HttpHeaders().set(
      'Authorization',
      `Bearer ${sessionStorage.getItem('accessToken')}`
    ),
  };
  // UserData() {
  //   // return this.http.post<any>(
  //   //   `${this.APIBaseUrl}/user/getUserData?key=${this.APIKey}`,
  //   //   this.header
  //   // );
  //   return {
  //     name: this.name,
  //     balance_eth: this.balance_eth,
  //     balance_btc: this.balance_btc,
  //     balance_rvn: this.balance_rvn,
  //     balance_ltct: this.balance_ltct,
  //     activePlans: this.activePlans,
  //   };
  // }

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
    sessionStorage.setItem('name', `${userName}`);
    sessionStorage.setItem('password', `${password}`);
    this.http
      .post<any>(`${this.APIBaseUrl}/user/FFactorAuth?key=${this.APIKey}`, {
        userName: userName,
        password: password,
      })
      .subscribe({
        next: (res) => {
          console.log(res);

          if (res.message == 'Wrong credentials') {
            this.authStatusListner.next(false);
          } else if (res.message != 'Wrong credentials') {
            this.authStatusListner.next(true);
            this.router.navigate(['/user/otp']);
            sessionStorage.removeItem('password');
          }
        },
        error: (err) => {
          //console.log(err);
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
          console.log(err);
        },
      });
  }
  ///////////////////////////////////////////////////////////////
  async otpValidator(otp: string) {
    await this.http
      .post<any>(`${this.APIBaseUrl}/user/TwoFactorAuth?key=${this.APIKey}`, {
        userName: sessionStorage.getItem('name'),
        otp: otp,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
          this.accessToken = res.jwt.accessToken;
          this.refreshToken = res.jwt.refreshToken;

          // ///////////////////////////////session storage set values
          sessionStorage.setItem('accessToken', `${this.accessToken}`);

          this.authStatusListner.next(true);
          this.router.navigate(['/user/dashboard/overview']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  //////////////////////////////////////////////////////////////
  resendOtp() {
    let n = sessionStorage.getItem('name');
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
          console.log(res);
          this.authStatusListner.next(true);
          // this.router.navigate(['/user/dashboard/overview']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  /////////////////////////////////////////////////////////////
  autoAuth() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const newExpirDate = Number(authInfo.expirDate) - Date.now();
    if (newExpirDate > 0) {
      this.saveTimeout = setTimeout(() => {
        this.logout();
      }, newExpirDate);
      this.authStatusListner.next(true);
      // this.accessToken = authInfo.accessToken;
      // this.userId = authInfo.userId;
      // this.email = authInfo.email;
    }
  }

  private saveAuthData(
    accessToken: string,
    expirDate: number,
    email: string,
    userId: string
  ) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('email', email);
    localStorage.setItem('userId', userId);
    localStorage.setItem('expirDate', expirDate.toString());
  }
  private getAuthData() {
    const accessToken = localStorage.getItem('accessToken');
    const email = localStorage.getItem('email');
    const userId = localStorage.getItem('userId');
    const expirDate = localStorage.getItem('expirDate');
    if (!accessToken || !expirDate) {
      return;
    }
    return {
      accessToken,
      expirDate,
      email,
      userId,
    };
  }
  private clearAuthData() {
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('accessToken');
  }
}
