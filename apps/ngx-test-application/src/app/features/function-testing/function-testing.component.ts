import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ScaleType } from '@swimlane/ngx-charts';
import { Fibonacci } from '@mrlonis/ts-workspace';

export interface SeriesData {
  name: string;
  value: number;
}

export interface LineGraphData {
  name: string;
  series: SeriesData[];
}

export interface FunctionToTest {
  name: string;
  xAxisLabel: string;
  yAxisLabel: string;
  runTest: (data: LineGraphData[], run: number) => LineGraphData[];
  runCacheTest: ((data: LineGraphData[], run: number) => LineGraphData[]) | null;
}

function _coreFibonacciRunTest(data: LineGraphData[], run: number, fibonacci: Fibonacci): LineGraphData[] {
  const newData: LineGraphData[] = [];
  for (let i = 0; i < data.length; i++) {
    newData.push(data[i]);
  }

  const series: SeriesData[] = [];
  for (let i = 0; i < 30; i++) {
    const startTime = new Date().getTime();
    fibonacci.getFibonacci(i);
    const endTime = new Date().getTime();
    const timeDiff = endTime - startTime;

    series.push({
      name: i.toString(),
      value: timeDiff
    });
  }

  newData.push({
    name: `Run ${run}`,
    series: series
  });

  return newData;
}

function fibonacciRunTest(data: LineGraphData[], run: number): LineGraphData[] {
  console.log('fibonacciRunTest(): Starting...');
  return _coreFibonacciRunTest(data, run, new Fibonacci(false));
}

function fibonacciRunCacheTest(data: LineGraphData[], run: number): LineGraphData[] {
  console.log('fibonacciRunCacheTest(): Starting...');
  return _coreFibonacciRunTest(data, run, new Fibonacci(true));
}

@Component({
  selector: 'mrlonis-function-testing',
  templateUrl: './function-testing.component.html',
  styleUrls: ['./function-testing.component.scss']
})
export class FunctionTestingComponent implements OnInit {
  data: LineGraphData[] = [];
  cacheData: LineGraphData[] = [];
  view: [number, number] = [700, 300];

  // graph options
  legend = true;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  timeline = true;
  colorScheme = {
    name: '',
    selectable: true,
    group: ScaleType.Linear,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  // custom variables
  run = 1;
  functions: FunctionToTest[] = [
    {
      name: 'Fibonacci',
      xAxisLabel: 'Fibonacci Number',
      yAxisLabel: 'Time in Milliseconds',
      runTest: fibonacciRunTest,
      runCacheTest: fibonacciRunCacheTest
    }
  ];
  activeFunction = new FormControl<FunctionToTest>(this.functions[0], { nonNullable: true });

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    console.log('FunctionTestingComponent: constructor(): Starting...');
  }

  ngOnInit(): void {
    this.runTest();
  }

  runTest(): void {
    this.data = this.activeFunction.value.runTest(this.data, this.run);
    if (this.activeFunction.value.runCacheTest !== null) {
      this.cacheData = this.activeFunction.value.runCacheTest(this.cacheData, this.run);
    }
    this.run = this.run + 1;
    this.changeDetectorRef.detectChanges();
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

  handleButtonClick(): void {
    this.runTest();
  }
}
