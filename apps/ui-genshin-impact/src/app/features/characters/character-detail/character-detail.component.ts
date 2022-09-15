import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character, CharacterService, ImageApiService } from '../../../shared';

@Component({
  selector: 'mrlonis-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
})
export class CharacterDetailComponent implements OnInit {
  character?: Character;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    public imageApiService: ImageApiService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const name = params.get('name');
      if (name !== null) {
        this.characterService.getCollection(0, 1, new HttpParams().set('name', name)).subscribe((response) => {
          if (response.page.totalElements == 1) {
            this.character = response._embedded.data[0];
          }
        });
      }
    });
  }
}
