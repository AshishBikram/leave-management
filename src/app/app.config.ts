import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {CommonModule} from "@angular/common";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HttpClientInterceptor} from "@core/interceptor/http-client.interceptor";
import {StoreModule} from "@ngrx/store";
import {metaReducers, reducers} from "@state/reducers";
import {EffectsModule} from "@ngrx/effects";
import {MenusEffects} from "@state/effects/menu.effects";
import {LeaveTypeEffects} from "@state/effects/leave-type.effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {UserEffects} from "@state/effects/user.effects";
import {LeaveAllocationEffects} from "@state/effects/leave-allocation.effects";
import {MatNativeDateModule} from "@angular/material/core";
import {LeaveRequestEffects} from "@state/effects/leave-request.effects";
import {LeaveAllocationBalanceEffects} from "@state/effects/leave-balance.effects";
import {provideCharts, withDefaultRegisterables} from "ng2-charts";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideCharts(withDefaultRegisterables()),
    importProvidersFrom(
      CommonModule,
      HttpClientModule,
      MatNativeDateModule,
      StoreModule.forRoot(reducers,  { metaReducers }),
      StoreDevtoolsModule.instrument(),
      EffectsModule.forRoot([MenusEffects, LeaveTypeEffects, UserEffects, LeaveAllocationEffects, LeaveRequestEffects, LeaveAllocationBalanceEffects])
    ),
    {provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi:true},
    provideAnimationsAsync()]
};
