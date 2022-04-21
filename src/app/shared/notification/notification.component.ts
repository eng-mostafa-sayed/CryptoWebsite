import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  message: string;

  constructor(private shared: SharedService) {}

  ngOnInit(): void {
    this.shared.sentMessage.subscribe((message: string) => {
      this.message = message;
      setTimeout(() => {
        this.shared.sentMessage.next('');
      }, 2500);
    });
  }
  closeNotif() {
    this.shared.sentMessage.next('');
  }
}
