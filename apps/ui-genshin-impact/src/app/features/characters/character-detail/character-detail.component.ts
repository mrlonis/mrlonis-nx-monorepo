import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from '@mrlonis-nx-angular-monorepo/types-mrlonis';
import { GenshinImpactApiService } from '../../../shared';

@Component({
  selector: 'mrlonis-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
})
export class CharacterDetailComponent implements OnInit {
  character?: Character;

  constructor(private route: ActivatedRoute, public genshinImpactApi: GenshinImpactApiService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const name = params.get('name');
      if (name !== null) {
        this.genshinImpactApi.getCollection('character', new HttpParams().set('name', name)).subscribe((response) => {
          if (response.page.totalElements == 1) {
            this.character = response._embedded.data[0];
          }
        });
      }
    });
  }
}
