import { Component, OnInit } from '@angular/core';
import { ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'mrlonis-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  multi = [
    {
      name: 'Germany',
      series: [
        {
          name: '1990',
          value: 62000000,
        },
        {
          name: '2010',
          value: 73000000,
        },
        {
          name: '2011',
          value: 89400000,
        },
      ],
    },
    {
      name: 'USA',
      series: [
        {
          name: '1990',
          value: 250000000,
        },
        {
          name: '2010',
          value: 309000000,
        },
        {
          name: '2011',
          value: 311000000,
        },
      ],
    },
    {
      name: 'France',
      series: [
        {
          name: '1990',
          value: 58000000,
        },
        {
          name: '2010',
          value: 50000020,
        },
        {
          name: '2011',
          value: 58000000,
        },
      ],
    },
    {
      name: 'UK',
      series: [
        {
          name: '1990',
          value: 57000000,
        },
        {
          name: '2010',
          value: 62000000,
        },
      ],
    },
  ];
  view: [number, number] = [700, 300];

  // options
  legend = true;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Year';
  yAxisLabel = 'Population';
  timeline = true;

  colorScheme = {
    name: '',
    selectable: true,
    group: ScaleType.Linear,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  constructor() {
    console.log('LineChartComponent: constructor(): Starting...');
    // Object.assign(this, { multi });
  }

  ngOnInit(): void {
    console.log('LineChartComponent: ngOnInit(): Starting...');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
