import { Injectable } from '@angular/core';
import {UserLoginRequest, UserLoginTokenResponse, UserSignUpRequest, UserSignUpResponse} from "@model/user/user";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {TokenService} from "@services/token/token.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  login(loginUser: UserLoginRequest): Observable<UserLoginTokenResponse>{
    return this.http.post<any>('login', loginUser)
  }

  register(userData: UserSignUpRequest):Observable<UserLoginTokenResponse>  {
    return this.http.post<any>('register', userData)
  }

  getUserList(params: Partial<UserSignUpResponse>): Observable<UserSignUpResponse[]>{
    console.log(params);
    return this.http.get<UserSignUpResponse[]>('users', {params})
  }

  isLoggedIn(){
    return !!this.tokenService.getToken();
  }

  logout(){

  }

  clearStorage(){

  }
}
