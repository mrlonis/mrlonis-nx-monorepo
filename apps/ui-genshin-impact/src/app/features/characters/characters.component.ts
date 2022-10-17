import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Character, SpringDataRestResponse } from '@mrlonis/types-mrlonis';
import { GenshinImpactApiService } from '../../shared';

@Component({
  selector: 'mrlonis-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {
  characters?: Observable<SpringDataRestResponse<Character>>;

  constructor(public genshinImpactApi: GenshinImpactApiService) {}

  ngOnInit(): void {
    this.characters = this.genshinImpactApi.getCollection('character', new HttpParams());
    this.genshinImpactApi.getCollection('character', new HttpParams()).subscribe((response) => {
      console.log(response);
      // this.characters = response;
    });
  }
}
