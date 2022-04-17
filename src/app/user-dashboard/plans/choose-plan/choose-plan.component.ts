import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DashboardService } from '../../user-dashboard.service';

@Component({
  selector: 'app-choose-plan',
  templateUrl: './choose-plan.component.html',
  styleUrls: ['./choose-plan.component.scss'],
})
export class ChoosePlanComponent implements OnInit {
  short = true;
  btc: any = true;
  shortPlansOpend = 'tap1';
  longPlansOpend = 'tap1';
  tap1Data: any;
  tap2Data: any;
  tap3Data: any;
  tap4Data: any;

  /////////////////////////////////////initial data/////////////////////////////////////////////
  shortPlans = [
    {
      id: '0',
      type: 'loading...',
      icon: '',
      crypto: 'loading...',
      power: 'loading...',
      pricePer: 'loading...',
      profitability: 'loading...',
      price: 0,
    },
  ];
  longPlans = [
    {
      id: '0',
      type: 'loading...',
      icon: '',
      crypto: 'loading...',
      power: 'loading...',
      pricePer: 'loading...',
      profitability: 'loading...',
      price: 0,
    },
  ];

  BTCPlansLong = new Array();
  BTCPlansShort = new Array();
  ETHPlansLong = new Array();
  ETHPlansShort = new Array();
  RVNPlansLong = new Array();
  RVNPlansShort = new Array();
  STXPlansLong = new Array();
  STXPlansShort = new Array();
  constructor(private http: HttpClient, private dashboard: DashboardService) {}
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////here is buy  plan button
  //////////////////////////// each tab has its buttons even short or long and BTC or ETH or RVN or STX
  buying(n: any) {
    console.log('buy Bitcion short plan');
    this.dashboard.buyPlan(n[0]).subscribe((res: any) => {
      console.log(n[0]);
    });
  }

  /////here is general buy plan method

  //////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit(): void {
    this.dashboard.getHashrateContractPlans().subscribe((res: any) => {
      console.log(res);
      for (let i = 0; i < res.plans.length; i++) {
        const ele = {
          id: res.plans[i]._id,
          type: `${res.plans[i].planName} Miners`,
          icon: '',
          avilability: res.plans[i].availability,
          duration: res.plans[i].planDuration,
          crypto: `${res.plans[i].cryptoName}`,
          power: res.PlansHashPower[1][i],
          pricePer: '',
          profitability: `${res.plans[i].profitability}`,
          price: `${res.plans[i].price}`,
        };
        if (res.plans[i].planType == 'long') {
          if (res.plans[i].cryptoName == 'BTC') {
            this.BTCPlansLong.push(ele);
          } else if (res.plans[i].cryptoName == 'ETH') {
            this.ETHPlansLong.push(ele);
          } else if (res.plans[i].cryptoName == 'RVN') {
            this.RVNPlansLong.push(ele);
          } else if (res.plans[i].cryptoName == 'STX') {
            this.STXPlansLong.push(ele);
          }
        } else if (res.plans[i].planType == 'short') {
          if (res.plans[i].cryptoName == 'BTC') {
            this.BTCPlansShort.push(ele);
          } else if (res.plans[i].cryptoName == 'ETH') {
            this.ETHPlansShort.push(ele);
          } else if (res.plans[i].cryptoName == 'RVN') {
            this.RVNPlansShort.push(ele);
          } else if (res.plans[i].cryptoName == 'STX') {
            this.STXPlansShort.push(ele);
          }
        }
      }
    });
  }

  shortPlansTap1() {
    this.shortPlansOpend = 'tap1';
  }
  shortPlansTap2() {
    this.shortPlansOpend = 'tap2';
  }
  shortPlansTap3() {
    this.shortPlansOpend = 'tap3';
  }
  shortPlansTap4() {
    this.shortPlansOpend = 'tap4';
  }
  longPlansTap1() {
    this.longPlansOpend = 'tap1';
  }
  longPlansTap2() {
    this.longPlansOpend = 'tap2';
  }
  longPlansTap3() {
    this.longPlansOpend = 'tap3';
  }
  longPlansTap4() {
    this.longPlansOpend = 'tap4';
  }
}
