import {Injectable, OnInit} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService implements OnInit{
  storage: string = "";
  constructor() { }
  ngOnInit() {
  }

  getToken() {
    this.storage = localStorage.getItem('leave_application') ?? "";
    if(this.storage){
      return JSON.parse(this.storage).accessToken;
    }
  }

  getUserInfo(){
    this.storage = localStorage.getItem('leave_application') ?? "";
    if(this.storage){
      return JSON.parse(this.storage).user;
    }
  }

  clearStorage(){
    localStorage.removeItem("leave_application")
  }
}
