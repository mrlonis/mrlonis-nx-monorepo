import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'mrlonis-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  imports: [MatCardModule],
})
export class WelcomeComponent {
  public pageTitle = 'Welcome';
  public pageSubTitle = '';
}
