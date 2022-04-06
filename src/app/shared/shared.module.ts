import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { TabsComponent } from './tabs/tabs.component';
import { TimelineChartComponent } from './timeline-chart/timeline-chart.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ChartModule } from 'primeng/chart';
import { CustomTapsComponent } from './custom-taps/custom-taps.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SpinnerComponent,
    TabsComponent,
    TimelineChartComponent,
    CustomTapsComponent,
  ],
  exports: [
    HeaderComponent,
    SpinnerComponent,
    TabsComponent,
    TimelineChartComponent,
    ChartModule,
    CustomTapsComponent,
  ],
  imports: [CommonModule, MatTabsModule],
})
export class SharedModule {}
