import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../user-dashboard.service';

@Component({
  selector: 'app-choose-miner',
  templateUrl: './choose-miner.component.html',
  styleUrls: ['./choose-miner.component.scss'],
})
export class ChooseMinerComponent implements OnInit {
  miners = [
    {
      name: 'Antminer L7 9500Mh ',
      icon: '',
      crypto: 'BTC (Bitcoin)',
      crypto2: 'ETH (Ethereum)',
      algorithm: 'SHA-256',
      power: '23 580',
      profitability: 143,
      unitPrice: '12,000',
      price: 112.69,
    },
    {
      name: 'Antminer E9',
      icon: '',
      crypto: 'BTC (Bitcoin)',
      crypto2: 'ETH (Ethereum)',
      algorithm: 'SHA-256',
      power: '23 580 GH/S',
      unitPrice: '12,000',
      profitability: 143,
      price: 1112.69,
    },
    {
      name: 'Antminer S19 Pro',
      icon: '',
      crypto: 'BTC (Bitcoin)',
      crypto2: 'ETH (Ethereum)',
      algorithm: 'SHA-256',
      power: '23 580 GH/S      ',
      unitPrice: '12,000',
      profitability: 143,
      price: 1122.69,
    },
  ];
  miners2 = [
    {
      name: 'TEST',
      icon: '',
      crypto: 'TEST',
      crypto2: 'TEST',
      algorithm: 'TEST',
      power: 'TEST',
      profitability: 0,
      unitPrice: 'TEST',
      price: 0,
    },
  ];

  buyAsic() {
    this.dashboard.buyAsic('621a3e91b017345a2649748416').subscribe((res) => {
      console.log('buying Asic');
    });
  }

  constructor(private dashboard: DashboardService, private http: HttpClient) {}

  ngOnInit() {
    this.dashboard.getAsicDevicesContractPlans().subscribe((res) => {
      console.log(res);
      //////////////////////////////////////////////////////////////////////////////////sad Error here it cannot know what is asic
      for (let i = 0; i < 3; i++) {
        const ele = {
          name: 'TEST',
          icon: '',
          crypto: 'TEST',
          crypto2: 'TEST',
          algorithm: 'TEST',
          power: 'TEST',
          profitability: 0,
          unitPrice: 'TEST',
          price: 0,
        };
        console.log(ele);
        //this.miners2.push(ele);
      }
      // this.miners = [];
      // this.miners = this.miners2;
    });
  }
}
