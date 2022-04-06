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
      type: 'loading...',
      icon: '',
      crypto: 'loading...',
      power: 'loading...',
      pricePer: 'loading...',
      profitability: 'loading...',
      price: 0,
    },
  ];

  plans = new Array();
  constructor(private http: HttpClient, private dashboard: DashboardService) {}
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////here is buy  plan button
  //////////////////////////// each tab has its buttons even short or long and BTC or ETH or RVN or STX
  buyShortPlanBTC() {
    console.log('buy Bitcion short plan');
    this.dashboard.buyPlan('6241fac32e9d176352ea9419').subscribe((res: any) => {
      //console.log(res);
    });
  }
  buyShortPlanETH() {
    console.log('buy eth short plan');
  }
  buyShortPlanRVN() {
    console.log('buying rvn short plan');
    //planID: string = '6241fac32e9d176352ea9419';
    this.dashboard.buyPlan('6241fac32e9d176352ea9419').subscribe((res: any) => {
      //console.log(res);
    });
  }
  buyShortPlanSTX() {
    console.log('buying stx short plan');
    this.dashboard.buyPlan('6241fac32e9d176352ea9419').subscribe((res: any) => {
      //console.log(res);
    });
  }
  buyLongPlanBTC() {
    console.log('buying Bitcion Long plan');
    this.dashboard.buyPlan('6241fac32e9d176352ea9419').subscribe((res: any) => {
      //console.log(res);
    });
  }
  buyLongPlanETH() {
    console.log('buying eth long plan');
    this.dashboard.buyPlan('6241fac32e9d176352ea9419').subscribe((res: any) => {
      //console.log(res);
    });
  }
  buyLongPlanRVN() {
    console.log('buying rvn long plan');
    this.dashboard.buyPlan('6241fac32e9d176352ea9419').subscribe((res: any) => {
      //console.log(res);
    });
  }
  buyLongPlanSTX() {
    console.log('buying stx long plan');
    this.dashboard.buyPlan('6241fac32e9d176352ea9419').subscribe((res: any) => {
      //console.log(res);
    });
  }

  /////here is general buy plan method

  //////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit(): void {
    this.dashboard.getHashrateContractPlans().subscribe((res: any) => {
      console.log(res);
      for (let i = 0; i < res.plans.length; i++) {
        const ele = {
          type: `${res.plans[i].planName} Miners`,
          icon: '',
          crypto: `${res.plans[i].cryptoName}`,
          power: res.PlansHashPower[1].toFixed(6),
          pricePer: '',
          profitability: `${res.plans[i].profitability}`,
          price: `${res.plans[i].price}`,
        };
        console.log(ele);
        this.plans.push(ele);
      }
      //console.log(this.plans);
      this.shortPlans = [];
      this.shortPlans = this.plans;
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
