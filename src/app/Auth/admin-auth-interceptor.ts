import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminAuthService } from './admin-auth.service';

import { AuthService } from './auth.service';

@Injectable()
export class AdminAuthInterceptor implements HttpInterceptor {
  constructor(private authService: AdminAuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken),
    });
    return next.handle(authRequest);
  }
}
