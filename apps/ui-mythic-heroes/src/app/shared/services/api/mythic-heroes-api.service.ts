import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Faction, MythicHero, Rarity, Type } from '../../types';
import { ApiConfigProvider, ApiService, API_CONFIG_TOKEN } from './base';

@Injectable({
  providedIn: 'root',
})
export class MythicHeroesApiService extends ApiService<{
  mythicHero: MythicHero;
  faction: Faction;
  rarity: Rarity;
  type: Type;
}> {
  constructor(http: HttpClient, @Inject(API_CONFIG_TOKEN) config: ApiConfigProvider) {
    super(http, config);
  }
}
