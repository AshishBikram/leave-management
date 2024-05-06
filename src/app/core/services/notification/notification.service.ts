import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import {Notification} from "@model/notification/notification";


@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  public notification$: BehaviorSubject<Notification> = new BehaviorSubject({});
  constructor() {}

  socket = io('http://localhost:3200');

  public sendNotification(notification: Notification) {
    this.socket.emit('notification', notification);
  }

  public getNewNotification = () => {
    this.socket.on('notification', (notification: Notification) =>{
      console.log(notification);
      this.notification$.next(notification);
    });

    return this.notification$.asObservable();
  };
}
