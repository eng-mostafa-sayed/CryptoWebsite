import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-miners',
  templateUrl: './miners.component.html',
  styleUrls: ['./miners.component.scss'],
})
export class MinersComponent implements OnInit {
  dropCollapsed = false;
  selected = 'all';
  saveStatus = true;
  miners = [
    {
      name: 'Antminer L7 9500Mh ',
      date: '12 Jan 2022 - 12:00PM',
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
      date: '12 Jan 2022 - 12:00PM',
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
      date: '12 Jan 2022 - 12:00PM',
      icon: '',
      crypto: 'BTC (Bitcoin)',
      crypto2: 'ETH (Ethereum)',
      algorithm: 'SHA-256',
      power: '23 580 GH/S      ',
      unitPrice: '12,000',
      profitability: 143,
      price: 1122.69,
    },
    {
      name: 'Antminer L7 9500Mh ',
      date: '12 Jan 2022 - 12:00PM',
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
      name: 'Antminer L7 9500Mh ',
      date: '12 Jan 2022 - 12:00PM',
      icon: '',
      crypto: 'BTC (Bitcoin)',
      crypto2: 'ETH (Ethereum)',
      algorithm: 'SHA-256',
      power: '23 580',
      profitability: 143,
      unitPrice: '12,000',
      price: 112.69,
    },
  ];
  constructor() {}

  ngOnInit(): void {}
  public onSaveStatusChanged(value: boolean) {
    this.saveStatus = value;
  }
}
