import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userId: string | null;
  private email: string | null;
  private accessToken: string | null;
  private refreshToken: string | null;
  private name: string | null;
  private phone: string | null;
  private balance: string | null;
  private balance_eth: string | null;
  private balance_btc: string | null;
  private activePlans: string | null;
  private activeDemoPlans: string | null;
  private devices: string | null;
  authStatusListner = new BehaviorSubject<boolean>(false);
  saveTimeout: any;
  constructor(private http: HttpClient, private router: Router) {}

  UserData() {
    return {
      userId: this.userId,
      email: this.email,
      name: this.name,
      phone: this.phone,
      balance_eth: this.balance_eth,
      balance_btc: this.balance_btc,
      activePlans: this.activePlans,
      activeDemoPlans: this.activeDemoPlans,
      devices: this.devices,
    };
  }
  signup(name: String, email: String, phone: number, password: String) {
    return this.http.post<any>(
      'https://cominer.herokuapp.com/api/user/register?key=c3fe929c35dd0cbcc8f062bb60e9d2ce7d14be21513d07c53e370d81ba9de4a4',
      {
        name,
        email,
        phone,
        password,
      }
    );
  }
  async signin(userName: String, password: String) {
    this.http
      .post<any>(
        'https://cominer.herokuapp.com/api/user/FFactorAuth?key=c3fe929c35dd0cbcc8f062bb60e9d2ce7d14be21513d07c53e370d81ba9de4a4',
        {
          userName: userName,
          password: password,
        }
      )
      .subscribe({
        next: (res) => {
          // this.accessToken = res.jwt.accessToken;
          // this.refreshToken = res.jwt.refreshToken;
          // this.userId = res.user.userID;
          // this.email = res.user.email;
          // this.name = res.user.name;
          // this.phone = res.user.phone;
          // this.balance_eth = res.user.balance.eth.toFixed(5);
          // this.balance_btc = res.user.balance.btc.toFixed(5);
          // this.activePlans = res.user.activePlans;
          // this.activeDemoPlans = res.user.activeDemoPlans;
          // this.devices = res.user.devices;
          // ///////////////////////////////session storage set values
          // sessionStorage.setItem('name', `${this.name}`);
          // sessionStorage.setItem('accessToken', `${this.accessToken}`);
          // sessionStorage.setItem('balance_btc', `${this.balance_btc}`);
          // sessionStorage.setItem('balance_eth', `${this.balance_eth}`);
          // sessionStorage.setItem('activePlans', `${this.activePlans}`);
          // sessionStorage.setItem('devices', `${this.devices}`);

          this.authStatusListner.next(true);

          //this.router.navigate(['/user/dashboard/overview']);
          // this.router.navigate(['./otp']);
          this.router.navigate(['/user/otp']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  logout() {
    clearTimeout(this.saveTimeout);
    this.clearAuthData();
    this.authStatusListner.next(false);
    this.router.navigate(['/']);
  }
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
    sessionStorage.removeItem('balance_btc');
    sessionStorage.removeItem('balance_eth');
    sessionStorage.removeItem('activePlans');
    sessionStorage.removeItem('devices');
  }
}
