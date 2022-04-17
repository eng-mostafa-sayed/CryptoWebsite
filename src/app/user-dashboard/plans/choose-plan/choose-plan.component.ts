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

  plans = new Array();
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
  // buyShortPlanETH(n: any) {
  //   console.log('buy ETH short plan');
  //   this.dashboard
  //     .buyPlan(
  //       this.plans[1]._id ? this.plans[1]._id : '6259ff1592fa2a9620d9543e'
  //     )
  //     .subscribe((res: any) => {});
  // }
  // buyShortPlanRVN(n: any) {
  //   console.log('buying rvn short plan');
  //   this.dashboard
  //     .buyPlan(
  //       this.plans[2]._id ? this.plans[2]._id : '6259ff1f92fa2a9620d95440'
  //     )
  //     .subscribe((res: any) => {});
  // }
  // buyShortPlanSTX(n: any) {
  //   console.log('buying stx short plan');
  //   this.dashboard.buyPlan(n).subscribe((res: any) => {});
  // }
  // buyLongPlanBTC(n: any) {
  //   console.log('buying Bitcion Long plan');
  //   this.dashboard.buyPlan(n).subscribe((res: any) => {});
  // }
  // buyLongPlanETH(n: any) {
  //   console.log('buying eth long plan');
  //   this.dashboard.buyPlan(n).subscribe((res: any) => {});
  // }
  // buyLongPlanRVN(n: any) {
  //   console.log('buying rvn long plan');
  //   this.dashboard.buyPlan(n).subscribe((res: any) => {});
  // }
  // buyLongPlanSTX(n: any) {
  //   console.log('buying stx long plan');
  //   this.dashboard.buyPlan(n).subscribe((res: any) => {});
  // }

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
          crypto: `${res.plans[i].cryptoName}`,
          power: res.PlansHashPower[1][i],
          pricePer: '',
          profitability: `${res.plans[i].profitability}`,
          price: `${res.plans[i].price}`,
        };
        console.log(ele);
        this.plans.push(ele);
      }
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
