import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mrlonis-example-component',
  templateUrl: './example-component.component.html',
  styleUrls: ['./example-component.component.scss'],
})
export class ExampleComponentComponent implements OnInit {
  constructor() {
    console.log('ExampleComponentComponent: constructor(): Starting...');
  }

  ngOnInit(): void {
    console.log('ExampleComponentComponent: ngOnInit(): Starting...');
  }
}
