import { Component, OnInit } from '@angular/core';
import { ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'mrlonis-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  standalone: false
})
export class BarChartComponent implements OnInit {
  single = [
    {
      name: 'Germany',
      value: 8940000
    },
    {
      name: 'USA',
      value: 5000000
    },
    {
      name: 'France',
      value: 7200000
    }
  ];
  multi = [
    {
      name: 'Germany',
      series: [
        {
          name: '2010',
          value: 7300000
        },
        {
          name: '2011',
          value: 8940000
        }
      ]
    },

    {
      name: 'USA',
      series: [
        {
          name: '2010',
          value: 7870000
        },
        {
          name: '2011',
          value: 8270000
        }
      ]
    },

    {
      name: 'France',
      series: [
        {
          name: '2010',
          value: 5000002
        },
        {
          name: '2011',
          value: 5800000
        }
      ]
    }
  ];

  view: [number, number] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    name: '',
    selectable: true,
    group: ScaleType.Linear,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {
    console.log('BarChartComponent: constructor(): Starting...');
  }

  ngOnInit(): void {
    console.log('BarChartComponent: ngOnInit(): Starting...');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelect(event: any) {
    console.log(event);
  }
}
