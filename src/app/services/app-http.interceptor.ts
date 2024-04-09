import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class appHttpInterceptor implements HttpInterceptor {
  constructor() {
  }
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let modifiedReq = req.clone({
     headers: req.headers.set("Authorization", "Bearer JWT" ) // Replace 'Bearer JWT' with your actual authentication token

    });
    return next.handle(modifiedReq);
  }
}
