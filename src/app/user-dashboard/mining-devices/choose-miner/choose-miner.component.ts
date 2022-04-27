import { HttpClient } from '@angular/common/http';
import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { DashboardService } from '../../user-dashboard.service';

@Component({
  selector: 'app-choose-miner',
  templateUrl: './choose-miner.component.html',
  styleUrls: ['./choose-miner.component.scss'],
})
export class ChooseMinerComponent implements OnInit {
  constructor(
    private dashboard: DashboardService,
    private http: HttpClient,
    private sharedSerivce: SharedService
  ) {}

  miners: any = [];
  miners2 = new Array();
  miners3 = new Array();

  buyAsic(n: any) {
    this.dashboard.buyAsic(n[0]).subscribe((res: any) => {
      console.log('buying Asic' + n[0]);
    });
    ///this is to display the notification
    this.sharedSerivce.sentMessage.next({
      message:
        'the ASIC  has been added successfully wait for the confirmation',
      error: false,
    });
  }

  ngOnInit() {
    this.sharedSerivce.isLoading.next(true);
    this.dashboard.getAsicBTCDevicesContractPlans().subscribe((res: any) => {
      this.miners2 = res;
      this.miners = this.miners2;
      this.sharedSerivce.isLoading.next(false);
      // this.dashboard.getAsicETHDevicesContractPlans().subscribe((res: any) => {
      //   this.miners3 = res;
      //   this.miners.push(...this.miners3);
      //   console.log(this.miners);
      // });
    });
  }
}
