import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Balance } from '../../user-dashboard/balance.model';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  @Input() leftTitle: string;
  @Input() topTitle: string;
  // @Input() miningSpeed: { BTC: string; ETH: string; RVN: string; LTCT: string };
  // @Input() plans: string;
  // @Input() mined: string;
  // @Input() currencyBalance: string;
  // @Input() minWithdraw: string;
  @Input() BTCbalance: Balance;
  @Input() ETHbalance: Balance;
  @Input() RVNbalance: Balance;
  @Input() LTCTbalance: Balance;

  constructor() {}

  ngOnInit(): void {}
}
