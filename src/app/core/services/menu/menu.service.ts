import { Injectable } from '@angular/core';
import {Menu} from "@model/menu/menu";
import {Observable, of} from "rxjs";
import {menuData} from "@core/data/menu.data";
import {TokenService} from "@services/token/token.service";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private tokenService: TokenService) { }

  loadMenus(): Observable<Menu[]> {
    const userRole = this.tokenService.getUserInfo().role
    return of(menuData.filter(menu => menu.role.findIndex(d => d.toString() == userRole.toString()) !== -1));
  }
}
