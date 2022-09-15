import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { BaseResource } from '../../..//types';
import { MythicHeroesApiService } from '../../../services';

@Component({
  standalone: true,
  selector: 'mrlonis-base-resource-display',
  styleUrls: ['base-resource-display.component.scss'],
  templateUrl: 'base-resource-display.component.html',
  imports: [CommonModule, MatProgressSpinnerModule, RouterModule],
})
export class BaseResourceDisplayComponent implements OnInit {
  @Input() data: BaseResource | null;

  imageUrl = '';
  name = '';
  id = '';

  constructor(private api: MythicHeroesApiService) {
    this.data = null;
  }

  ngOnInit() {
    if (this.data != null) {
      this.imageUrl = this.data.imageUrl;
      this.name = this.data.name;
      this.id = this.data.id;
    }
  }

  getImageUrl(): string {
    return this.api.getImageUrl(this.imageUrl);
  }
}
