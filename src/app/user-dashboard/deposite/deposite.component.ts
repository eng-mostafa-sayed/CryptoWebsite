import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { DashboardService } from '../user-dashboard.service';

@Component({
  selector: 'app-deposite',
  templateUrl: './deposite.component.html',
  styleUrls: ['./deposite.component.scss'],
})
export class DepositeComponent implements OnInit {
  crypto = true;
  cryptoTapOpend = 'tap1';
  withdrawForm: FormGroup;

  waitingTime = 1200;

  _balance_btc: any;
  _balance_eth: any;
  _balance_rvn: any;
  _balance_ltct: any;
  UserData: any;
  balances: any;
  constructor(
    private sharedSerivce: SharedService,
    private dashboardd: DashboardService
  ) {}

  async ngOnInit() {
    this.sharedSerivce.isLoading.next(true);

    // this.UserData = this.authServics.UserData();
    this.dashboardd.userData().subscribe({
      next: (res) => {
        // console.log(res);
        this.UserData = res;
        this._balance_btc = this.UserData.balance.btc;
        this._balance_eth = this.UserData.balance.eth;
        this._balance_ltct = this.UserData.balance.ltct;
        this._balance_rvn = this.UserData.balance.rvn;
        // this.sharedSerivce.isLoading.next(false);
      },
      error: (err) => {
        console.log(err);
        //  this.sharedSerivce.isLoading.next(false);
      },
    });
    setTimeout(() => {
      this.balances = [
        {
          name: 'BTC',
          value: this._balance_btc ? this._balance_btc.toFixed(8) : '0',
        },
        {
          name: 'ETH',
          value: this._balance_eth ? this._balance_eth.toFixed(8) : '0',
        },
        {
          name: 'RVN',
          value: this._balance_rvn ? this._balance_rvn.toFixed(8) : '0',
        },
        {
          name: 'LTCT',
          value: this._balance_ltct ? this._balance_ltct.toFixed(8) : '0',
        },
      ];
    }, 1200);

    ////////////////////////////////////////////////////////////
    this.withdrawForm = new FormGroup({
      address: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(32),
          Validators.maxLength(32),
        ],
      }),
      amount: new FormControl(null, {
        validators: [Validators.required, Validators.pattern(/^[0-9]+$/)],
      }),
    });
    setTimeout(() => {
      this.sharedSerivce.isLoading.next(false);
    }, this.waitingTime + 200);
  }
  onWithdraw() {}
  cryptoPlansTap1() {
    this.cryptoTapOpend = 'tap1';
  }
  cryptoPlansTap2() {
    this.cryptoTapOpend = 'tap2';
  }
  cryptoPlansTap3() {
    this.cryptoTapOpend = 'tap3';
  }
  cryptoPlansTap4() {
    this.cryptoTapOpend = 'tap4';
  }
  //to do https://stackoverflow.com/questions/49102724/angular-5-copy-to-clipboard
}
