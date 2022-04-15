import { HttpClient } from '@angular/common/http';
import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../user-dashboard.service';

@Component({
  selector: 'app-choose-miner',
  templateUrl: './choose-miner.component.html',
  styleUrls: ['./choose-miner.component.scss'],
})
export class ChooseMinerComponent implements OnInit {
  miners: any = [
    {
      name: 'Loading...',
      icon: '',
      crypto: 'Loading...',
      algorithm: 'Loading...',
      power: 'Loading...',
      Hostfees: 'Loading...',
      price: 0,
    },
  ];
  miners2: any = [];

  buyAsic() {
    this.dashboard.buyAsic('621a3e91b017345a2649748416').subscribe((res) => {
      console.log('buying Asic');
    });
  }

  constructor(private dashboard: DashboardService, private http: HttpClient) {}

  ngOnInit() {
    this.dashboard.getAsicDevicesContractPlans().subscribe((res: any) => {
      //console.log(res);
      this.miners2 = res;
      this.miners = this.miners2;
      //console.log(this.miners);
    });
  }
}
