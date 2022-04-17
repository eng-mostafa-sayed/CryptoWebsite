import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss'],
})
export class WithdrawComponent implements OnInit {
  crypto = true;
  cryptoTapOpend = 'tap1';
  withdrawForm: FormGroup;

  balances = [
    {
      name: 'BTC',
      value: sessionStorage.getItem('balance_btc'),
    },
    {
      name: 'ETH',
      value: sessionStorage.getItem('balance_eth'),
    },
    {
      name: 'RVN',
      value: '0',
    },
    {
      name: 'LTCT',
      value: '0',
    },
  ];
  constructor() {}

  ngOnInit(): void {
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
}
