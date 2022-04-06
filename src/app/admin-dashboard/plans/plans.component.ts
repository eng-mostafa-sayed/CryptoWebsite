import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
})
export class PlansComponent implements OnInit {
  dropCollapsed = false;
  selected = 'all';
  miners = [
    {
      name: 'Antminer L7 9500Mh ',
      date: '12 Jan 2022 - 12:00PM',
      icon: '',
      crypto: 'BTC (Bitcoin)',
      crypto2: 'ETH (Ethereum)',
      power: '23 580',
      pricePer: '23 580',
      profitability: 143,
      price: 500,
    },
    {
      name: 'Antminer E9',
      date: '12 Jan 2022 - 12:00PM',
      icon: '',
      crypto: 'BTC (Bitcoin)',
      crypto2: 'ETH (Ethereum)',
      power: '23 580 GH/S',
      pricePer: '23 580',
      unitPrice: '12,000',
      price: 500,
    },
    {
      name: 'Antminer S19 Pro',
      date: '12 Jan 2022 - 12:00PM',
      icon: '',
      crypto: 'BTC (Bitcoin)',
      crypto2: 'ETH (Ethereum)',
      power: '23 580 GH/S      ',
      pricePer: '23 580',
      unitPrice: '12,000',
      price: 500,
    },
  ];
  constructor() {}

  ngOnInit(): void {}
  checkType(miner: any) {
    if (miner.name.includes('BTC') && this.selected == 'tap1') {
      return true;
    } else if (miner.name.includes('ETH') && this.selected == 'tap2') {
      return true;
    } else if (miner.name.includes('RVN') && this.selected == 'tap3') {
      return true;
    } else if (miner.name.includes('STX') && this.selected == 'tap4') {
      return true;
    } else if (this.selected == 'all') {
      return true;
    }
  }
}
