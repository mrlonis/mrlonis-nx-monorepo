import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Character, CharacterService, ImageApiService, SpringDataRestResponse } from '../../shared';

@Component({
  selector: 'mrlonis-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {
  characters?: Observable<SpringDataRestResponse<Character>>;

  constructor(private characterService: CharacterService, public imageApiService: ImageApiService) {}

  ngOnInit(): void {
    this.characters = this.characterService.getCollection(0, 10, new HttpParams());
    this.characterService.getCollection(0, 10, new HttpParams()).subscribe((response) => {
      console.log(response);
      // this.characters = response;
    });
  }
}
