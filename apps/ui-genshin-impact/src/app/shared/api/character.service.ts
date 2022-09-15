import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ApiConfigProvider, ApiService, API_CONFIG_TOKEN } from './base';
import { Character } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class CharacterService extends ApiService<Character> {
  constructor(http: HttpClient, @Inject(API_CONFIG_TOKEN) apiConfig: ApiConfigProvider) {
    super(http, 'characters', apiConfig);
  }
}
