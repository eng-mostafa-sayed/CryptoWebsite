import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Balance } from './balance.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  api: string =
    'https://cominer.herokuapp.com/api/user/getUserData?key=c3fe929c35dd0cbcc8f062bb60e9d2ce7d14be21513d07c53e370d81ba9de4a4';
  accessToken: any = sessionStorage.getItem('accessToken');

  //to store the user data
  obj: any;
  //to stor the currency data
  btcPriceObj: any = { USD: 0.0 };
  ethPriceObj: any = { USD: 0.0 };
  rvnPriceObj: any = { USD: 0.0 };
  LTCTPriceObj: any = { USD: 0.0 };

  //currencies APIs
  btcAPI: any =
    'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD&api_key=43b6539c4d7f1fefd865f2580d4bd3fad07816ccca445c1055359ccdf57f0bf9';
  ethAPI: any =
    'https://min-api.cryptocompare.com/data/price?fsym=Eth&tsyms=USD&api_key=43b6539c4d7f1fefd865f2580d4bd3fad07816ccca445c1055359ccdf57f0bf9';
  rvnAPI: any =
    'https://min-api.cryptocompare.com/data/price?fsym=rvn&tsyms=USD&api_key=43b6539c4d7f1fefd865f2580d4bd3fad07816ccca445c1055359ccdf57f0bf9';
  LTCTAPI =
    'https://min-api.cryptocompare.com/data/price?fsym=LTCT&tsyms=USD&api_key=43b6539c4d7f1fefd865f2580d4bd3fad07816ccca445c1055359ccdf57f0bf9';

  ///part of the userData() function to get the user data from the backend
  header: any = {
    headers: new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.accessToken}`
    ),
  };
  requestHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'text/plain',
      Authorization: `Bearer ${this.accessToken}`,
    }),
  };

  async userData() {
    await this.http.get<any>(this.api, this.header).subscribe({
      next: (res) => {
        this.obj = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  /////external api to get the price of the currencies
  getPriceOfBitcoin() {
    return this.http.get<any>(this.btcAPI);
  }
  getPriceOfEth() {
    return this.http.get<any>(this.ethAPI);
  }
  getPriceOfRVN() {
    return this.http.get<any>(this.rvnAPI);
  }
  getPriceOfLTCT() {
    return this.http.get<any>(this.LTCTAPI);
  }

  balances$ = new Subject<Balance[]>();
  constructor(private http: HttpClient) {}

  updateBalances() {
    this.balances$.next([
      {
        currency: 'BTC',
        currencyBalance: this.obj.balance.btc,
        plans: this.obj.activePlans,
        devices: this.obj.devices,
        price: Number(this.btcPriceObj),
        miningSpeed: '3,230',
        mined: 0.000003,
        minWithdraw: 0.00005,
      },
      {
        currency: 'ETH',
        currencyBalance: this.obj.balance.eth,
        plans: this.obj.activePlans,
        devices: this.obj.devices,
        price: this.btcPriceObj,
        miningSpeed: '8,299',
        mined: 0.00999,
        minWithdraw: 0.0021879,
      },
      {
        currency: 'RVN',
        currencyBalance: 0.0,
        plans: this.obj.activePlans,
        devices: this.obj.devices,
        price: this.rvnPriceObj,
        miningSpeed: '2,222',
        mined: 0.0,
        minWithdraw: 0.000011,
      },
      {
        currency: 'LTCT',
        currencyBalance: 0.0,
        plans: this.obj.activePlans,
        devices: this.obj.devices,
        price: this.LTCTPriceObj,
        miningSpeed: '9,299',
        mined: 0.0,
        minWithdraw: 0.000099,
      },
    ]);
  }
  ////////////////////////////hashrate plans page
  getPlans() {
    return this.http.get<any>(
      'https://cominer.herokuapp.com/api/plan/x/contract?key=c3fe929c35dd0cbcc8f062bb60e9d2ce7d14be21513d07c53e370d81ba9de4a4',
      this.header
    );
  }
  /////////////////////////////////////////////////////////// buy hasherate plans page
  ////////////the generic function
  getHashrateContractPlans(Currency: string, planType: string) {
    return this.http.get<any>(
      `https://cominer.herokuapp.com/api/plan?cryptoName=${Currency}&planType=${planType}&key=c3fe929c35dd0cbcc8f062bb60e9d2ce7d14be21513d07c53e370d81ba9de4a4`,
      this.header
    );
  }
  //////////customized functions
  get_BTC_Long_HashrateContractPlans() {
    return this.getHashrateContractPlans('BTC', 'long');
  }
  get_BTC_Short_HashrateContractPlans() {
    return this.getHashrateContractPlans('BTC', 'short');
  }
  get_ETH_Long_HashrateContractPlans() {
    return this.getHashrateContractPlans('ETH', 'long');
  }
  get_ETH_Short_HashrateContractPlans() {
    return this.getHashrateContractPlans('ETH', 'short');
  }
  get_RVN_Long_HashrateContractPlans() {
    return this.getHashrateContractPlans('RVN', 'long');
  }
  get_RVN_Short_HashrateContractPlans() {
    return this.getHashrateContractPlans('RVN', 'short');
  }
  get_LTCT_Long_HashrateContractPlans() {
    return this.getHashrateContractPlans('LTCT', 'long');
  }
  get_LTCT_Short_HashrateContractPlans() {
    return this.getHashrateContractPlans('LTCT', 'short');
  }

  ///////////////////////////////////////////////////mining devices page get data from asic contract(my contracts )

  getMyAsicDevices() {
    return this.http.get<any>(
      'https://cominer.herokuapp.com/api/asic/x/contract?key=c3fe929c35dd0cbcc8f062bb60e9d2ce7d14be21513d07c53e370d81ba9de4a4',
      this.header
    );
  }
  ///////////////////////////////////////////////////////////////mining devices page get data from asics(which i can join)

  getAsicBTCDevicesContractPlans() {
    return this.http.get<any>(
      'https://cominer.herokuapp.com/api/asic?cryptoName=BTC&key=c3fe929c35dd0cbcc8f062bb60e9d2ce7d14be21513d07c53e370d81ba9de4a4',
      this.header
    );
  }
  getAsicETHDevicesContractPlans() {
    return this.http.get<any>(
      'https://cominer.herokuapp.com/api/asic?cryptoName=ETH&key=c3fe929c35dd0cbcc8f062bb60e9d2ce7d14be21513d07c53e370d81ba9de4a4',
      this.header
    );
  }

  /////////////////////////////////////buy plan dummy method
  buyplanAPI =
    'https://cominer.herokuapp.com/api/plan/x/contract/add?key=c3fe929c35dd0cbcc8f062bb60e9d2ce7d14be21513d07c53e370d81ba9de4a4';
  buyPlan(plan_id: String) {
    return this.http.post<any>(
      this.buyplanAPI,
      {
        planID: plan_id,
        currency: 'ETH',
      },
      this.header
    );
  }

  ///////////////////////////////////////buy asic dummy
  buyAsic(asic_id: String) {
    return this.http.post<any>(
      'https://cominer.herokuapp.com/api/asic/x/contract/add?key=c3fe929c35dd0cbcc8f062bb60e9d2ce7d14be21513d07c53e370d81ba9de4a4',
      {
        asicID: asic_id,
        currency: 'ETH',
      },
      this.header
    );
  }
}
