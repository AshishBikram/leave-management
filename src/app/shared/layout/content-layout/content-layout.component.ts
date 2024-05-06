import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav, MatSidenavModule} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {Store} from "@ngrx/store";
import * as MenuActions from "@core/state/actions/menu.actions";
import * as MenuSelectors from "@core/state/selectors/menu.selectors"
import {Menu} from "@model/menu/menu";
import {Observable, of} from "rxjs";
import {MatTooltip} from "@angular/material/tooltip";
import {TokenService} from "@services/token/token.service";
import {UserSignUpResponse, UserType} from "@model/user/user";
import {MatChip} from "@angular/material/chips";
import {NotificationService} from "@services/notification/notification.service";

@Component({
  selector: 'app-content-layout',
  standalone: true,
  imports: [MatSidenavModule, MatNavList, MatToolbar, MatListItem, MatIcon, NgClass, NgIf, RouterOutlet, AsyncPipe, NgForOf, RouterLink, MatTooltip, MatChip],
  templateUrl: './content-layout.component.html',
  styleUrl: './content-layout.component.css'
})
export class ContentLayoutComponent implements OnInit{
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  isExpanded = true;
  isShowing = false;
  userInfo!: UserSignUpResponse;
  menus$ : Observable<Menu[]> = of([]);

  constructor( private readonly store: Store, private router: Router, private tokenService: TokenService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.store.dispatch(MenuActions.loadMenu());
    this.menus$ = this.store.select(MenuSelectors.getMenus);
    this.userInfo = this.tokenService.getUserInfo();
    this.notificationService.getNewNotification().subscribe(d => {
      console.log(d, this.userInfo.id)
      if(this.userInfo.role === UserType.Employee && this.userInfo.id === d.userId){
        alert(`Your leave has been ${d.status}`)
      }
    })
  }
  logout(){
    localStorage.removeItem("leave_application")
    this.router.navigate(["/"])
  }
}
