import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {UserService} from "@services/user/user.service";
import {environment} from "../../../environments/environments";
import {TokenService} from "@services/token/token.service";

@Injectable({providedIn: 'root'})
export class HttpClientInterceptor implements HttpInterceptor {
  private apiUrl = environment.apiUrl;
  constructor(private _userService: UserService, private tokenService: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let apiRequest = req.clone({
      url: this.apiUrl + req.url,
    });
    if (this.tokenService.getToken() != null) {
      apiRequest = apiRequest.clone({
        setHeaders: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + this.tokenService.getToken()
        }
      });
    }
    return next
      .handle(apiRequest)
      .pipe(
        catchError(response => {
          if (response instanceof HttpErrorResponse) {
            switch (response.status) {
              case 401:
                this._userService.logout();
                break;
            }
          }

          return throwError(response);
        })
      );
  }
}
