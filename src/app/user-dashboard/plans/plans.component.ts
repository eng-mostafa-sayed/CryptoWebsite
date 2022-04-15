import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Customer, Representative } from './customer';
import { CustomerService } from './customerservice';
import { DashboardService } from '../user-dashboard.service';
import { of } from 'rxjs';

export interface Plan {
  date: string | any;
  name: string;
  total: number;
  hashPower: number;
  expire: string;
}

let expiredPlanData: Plan[] = [
  {
    date: '',
    name: 'Loading...',
    total: 0,
    hashPower: 0,
    expire: '',
  },
];

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
})
export class PlansComponent implements AfterViewInit, OnInit {
  /////////////////////////////////////////////// i added this to manupulate the graph Data
  btcMiningDetails = new Array(12, 51, 62, 33, 21, 62, 45, 50, 30);
  ethMiningDetails = new Array(10, 20, 20, 20, 50, 10, 40, 50, 30);
  stxMiningDetails = new Array(15, 20, 24, 30, 40, 62, 45, 50, 30);
  rvnMiningDetails = new Array(80, 70, 50, 30, 80, 50, 30, 50, 30);
  ////////////////////////////////////////////// i added this to make the color &Data of graph as constant
  graphColor: string = 'rgba(255, 73, 128, 1)';
  graphBackground: string = 'rgba(255, 73, 128, 0.2)';
  graphData = new Array(
    'Mar 1',
    'Mar 2',
    'Mar 3',
    'Mar 4',
    'Mar 5',
    'Mar 6',
    'Mar 7',
    'Mar 8',
    'Mar 9'
  );
  graphTension = 0.4;
  ////////////////////////////////////////////// i added this to make the color of BasicOptioBackground as constant
  basicOptionBackground: string = 'rgba(29, 26, 39, 0.6)';
  //////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  activePlanData2: any = new Array();
  element: object;
  private i: number = 0;
  ///////////////////////////////////////////////////////////////////
  activePlanData = [
    {
      date: '',
      name: 'Loading...',
      total: 0,
      hashPower: 0,
      expire: '',
    },
  ];
  expiredPlanData = expiredPlanData;
  _activePlans: any = sessionStorage.getItem('activePlans');
  /////////////////////////////////////////////////////////////////
  minedChartTapOpend = 'tap1';
  tap1Data: any;
  tap2Data: any;
  tap3Data: any;
  tap4Data: any;
  basicOptions: any;
  displayedColumns = [
    { name: 'date', field: 'date' },
    { name: 'name', field: 'name' },
    { name: 'total', field: 'total' },
    { name: 'hashPower', field: 'hashPower' },
    { name: 'expire', field: 'expire' },
  ];
  activeHash: { crypto: string; plans: string; speed: string }[] = [
    {
      crypto: 'BTC ',
      plans: this._activePlans,
      speed: '23 580',
    },
    {
      crypto: 'ETH ',
      plans: this._activePlans,
      speed: '23 580',
    },
    {
      crypto: 'RVN ',
      plans: '0',
      speed: '0',
    },
    {
      crypto: 'STX ',
      plans: '0',
      speed: '0',
    },
  ];
  activePlanDataLength: number = this.activePlanData.length;
  expiredPlanDataLength: number = expiredPlanData.length;

  dataSourceActive = new MatTableDataSource(this.activePlanData);
  dataSourceExpired = new MatTableDataSource(expiredPlanData);

  @ViewChild('activePaginator') activePaginator: MatPaginator;
  @ViewChild('expiredPaginator') expiredPaginator: MatPaginator;
  @ViewChild('activeSort') activeSort: MatSort;
  @ViewChild('expiredSort') expiredSort: MatSort;

  constructor(
    private customerService: CustomerService,
    private http: HttpClient,
    private dashboard: DashboardService
  ) {
    /////////////////////////////
    ///////////////////////////
  }
  ngOnInit(): void {
    ///////////////////////////////////get the active plans from user-dashboard-services
    this.dashboard.getPlans().subscribe((res) => {
      this.activePlanData2.push(res);
      console.log(this.activePlanData2);
      this.activePlanData = [];
      this.expiredPlanData = [];
      for (this.i = 0; this.i < this.activePlanData2[0].length; this.i++) {
        //////////////////////////////////////////////////////chech if the plan active or not active
        if (this.activePlanData2[0][this.i].planStatus) {
          this.activePlanData.push({
            date: this.activePlanData2[0][this.i].startDate,
            name: this.activePlanData2[0][this.i].cryptoName,
            total: this.activePlanData2[0][this.i].totalMined.toFixed(8),
            hashPower: this.activePlanData2[0][this.i].hashPower,
            expire: this.activePlanData2[0][this.i].endDate,
          });
        } else {
          ///////////////////////////////here the insertion inside the expiredPlanData array
          this.expiredPlanData.push({
            date: this.activePlanData2[0][this.i].startDate,
            name: this.activePlanData2[0][this.i].cryptoName,
            total: this.activePlanData2[0][this.i].totalMined.toFixed(8),
            hashPower: this.activePlanData2[0][this.i].hashPower,
            expire: this.activePlanData2[0][this.i].endDate,
          });
        }
      }
    });

    ////////////////////////////////////////dummy data for active plans

    this.dataSourceActive.filterPredicate = function (
      data,
      filter: string
    ): boolean {
      return data.name.toLowerCase().includes(filter);
    };
    this.dataSourceExpired.filterPredicate = function (
      data,
      filter: string
    ): boolean {
      return data.name.toLowerCase().includes(filter);
    };

    // this.dataSourceActive.paginator = this.activePaginator;
    // this.dataSourceActive.sort = this.activeSort;
    // this.dataSourceExpired.paginator = this.expiredPaginator;
    // this.dataSourceExpired.sort = this.expiredSort;

    this.tap1Data = {
      labels: this.graphData,
      datasets: [
        {
          label: '',
          data: this.btcMiningDetails,
          fill: true,
          borderColor: this.graphColor,
          tension: this.graphTension,
          backgroundColor: this.graphBackground,
        },
      ],
    };
    this.tap2Data = {
      labels: this.graphData,
      datasets: [
        {
          label: '',
          data: this.ethMiningDetails,
          fill: true,
          borderColor: String(this.graphColor),
          tension: this.graphTension,
          backgroundColor: this.graphBackground,
        },
      ],
    };
    this.tap3Data = {
      labels: this.graphData,
      datasets: [
        {
          label: '',
          data: this.rvnMiningDetails,
          fill: true,
          borderColor: this.graphColor,
          tension: this.graphTension,
          backgroundColor: this.graphBackground,
        },
      ],
    };
    this.tap4Data = {
      labels: this.graphData,
      datasets: [
        {
          label: '',
          data: this.stxMiningDetails,
          fill: true,
          borderColor: this.graphColor,
          tension: this.graphTension,
          backgroundColor: this.graphBackground,
        },
      ],
    };
    this.basicOptions = {
      plugins: {
        tooltip: {
          backgroundColor: this.basicOptionBackground,
        },
        legend: {
          display: false,
          labels: {
            boxWidth: 0,
            boxHeight: 0,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#ebedef',
          },
          grid: {
            color: 'rgba(255,255,255,0.2)',
          },
        },
        y: {
          ticks: {
            color: '#ebedef',
          },
          grid: {
            color: 'rgba(255,255,255,0.2)',
          },
        },
      },
    };
  }

  minedChartTap1() {
    this.minedChartTapOpend = 'tap1';
  }
  minedChartTap2() {
    this.minedChartTapOpend = 'tap2';
  }
  minedChartTap3() {
    this.minedChartTapOpend = 'tap3';
  }
  minedChartTap4() {
    this.minedChartTapOpend = 'tap4';
  }

  ngAfterViewInit() {
    this.dataSourceActive.sortingDataAccessor = (item: any, property: any) => {
      switch (property) {
        case 'date':
          return item.date;
        default:
          return item[property];
      }
    };
    this.dataSourceActive.paginator = this.activePaginator;
    this.dataSourceActive.sort = this.activeSort;
    this.dataSourceExpired.paginator = this.expiredPaginator;
    this.dataSourceExpired.sort = this.expiredSort;
    this.dataSourceActive.sortingDataAccessor = (item: any, property: any) => {
      switch (property) {
        case 'fromDate':
          return item.fromDate;
        default:
          return item[property];
      }
    };
  }

  applyFilterOnActive(event: Event) {
    const activeFilterValue = (event.target as HTMLInputElement).value;
    this.dataSourceActive.filter = activeFilterValue.trim().toLowerCase();

    if (this.dataSourceActive.paginator) {
      this.dataSourceActive.paginator.firstPage();
    }
  }
  applyFilterOnExpired(event: Event) {
    const expiredFilterValue = (event.target as HTMLInputElement).value;
    this.dataSourceExpired.filter = expiredFilterValue.trim().toLowerCase();

    if (this.dataSourceExpired.paginator) {
      this.dataSourceExpired.paginator.firstPage();
    }
  }
}
function newObj(newObj: any) {
  throw new Error('Function not implemented.');
}
