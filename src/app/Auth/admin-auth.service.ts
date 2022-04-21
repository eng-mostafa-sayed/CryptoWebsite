import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  private rootURL = 'https://cominer.herokuapp.com';
  private key =
    'c3fe929c35dd0cbcc8f062bb60e9d2ce7d14be21513d07c53e370d81ba9de4a4';
  authStatusListener$ = new BehaviorSubject<boolean>(false);
  private isAuthenticated = false;
  private token: string;
  private refersh: string;
  otpError$ = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private sharedService: SharedService
  ) {}
  public getToken() {
    return this.token;
  }
  public getRefersh() {
    return this.refersh;
  }
  public getAuth() {
    return this.isAuthenticated;
  }

  public signinFF(password: String) {
    return this.http.post(`${this.rootURL}/admin/FFAuth?key=${this.key}`, {
      password: password,
    });
  }
  public getOTP(otp: String) {
    return this.http
      .post(`${this.rootURL}/admin/2FAuth?key=${this.key}`, {
        otp: otp,
      })
      .subscribe({
        next: (res: any) => {
          this.token = res.jwt.accessToken;
          this.refersh = res.jwt.refreshToken;
          this.isAuthenticated = true;
          this.authStatusListener$.next(true);
          localStorage.setItem('token', this.token);
          localStorage.setItem('refersh', this.refersh);
          this.sharedService.isLoading.next(false);
          this.router.navigate(['admin/dashboard/overview']);
        },
        error: (err) => {
          this.otpError$.next(true);
        },
      });
  }
  public autoAuth() {
    const token = localStorage.getItem('token');
    const refersh = localStorage.getItem('refersh');
    console.log(token, refersh);
    if (!token || !refersh) {
      return;
    }
    this.token = token;
    this.refersh = refersh;
    this.isAuthenticated = true;
    this.authStatusListener$.next(true);
  }
  public logout() {
    this.http
      .post(
        `${this.rootURL}/admin/logout?key=${this.key}`,
        {
          token: this.getRefersh(),
        },
        { responseType: 'text' }
      )
      .subscribe({
        next: () => {
          console.log('Logged out successfully');
          localStorage.removeItem('token');
          localStorage.removeItem('refersh');
          this.token = '';
          this.refersh = '';
          this.isAuthenticated = false;
          this.authStatusListener$.next(false);
          this.router.navigate(['/']);
        },
        error: (err) => {},
      });
  }
}
