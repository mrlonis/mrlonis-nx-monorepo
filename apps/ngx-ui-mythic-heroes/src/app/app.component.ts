import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationComponentComponent } from './shared';

@Component({
  standalone: true,
  selector: 'mrlonis-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, NavigationComponentComponent],
})
export class AppComponent {
  pageTitle = 'demo-mythic-heroes-angular';
}
