import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ScaleType } from '@swimlane/ngx-charts';
import { Fibonacci } from '@mrlonis/interview-typescript-workspace';

@Component({
  selector: 'mrlonis-function-testing',
  templateUrl: './function-testing.component.html',
  styleUrls: ['./function-testing.component.scss'],
})
export class FunctionTestingComponent implements OnInit {
  data: { name: string; series: { name: string; value: number }[] }[] = [];
  view: [number, number] = [700, 300];

  // options
  legend = true;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Fibonacci Number';
  yAxisLabel = 'Time in Milliseconds';
  timeline = true;

  colorScheme = {
    name: '',
    selectable: true,
    group: ScaleType.Linear,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  run = 1;
  maxInput = new FormControl(30, { nonNullable: true });

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    console.log('FunctionTestingComponent: constructor(): Starting...');
    // Object.assign(this, { multi });
  }

  ngOnInit(): void {
    this.runTest();
  }

  runTest(): void {
    console.log('FunctionTestingComponent: runTest(): Starting...');
    const newData: { name: string; series: { name: string; value: number }[] }[] = [];
    for (let i = 0; i < this.data.length; i++) {
      newData.push(this.data[i]);
    }

    const fibonacci = new Fibonacci(false);
    const series = [];

    for (let i = 0; i < this.maxInput.value; i++) {
      const startTime = new Date().getTime();
      fibonacci.getFibonacci(i);
      const endTime = new Date().getTime();
      const timeDiff = endTime - startTime;

      series.push({
        name: i.toString(),
        value: timeDiff,
      });
    }

    newData.push({
      name: `Run ${this.run}`,
      series: series,
    });
    this.run = this.run + 1;

    this.data = newData;

    console.log('FunctionTestingComponent: runTest(): Finished!');
    console.log(this.data);

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
