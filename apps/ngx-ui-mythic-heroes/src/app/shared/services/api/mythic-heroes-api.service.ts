import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ApiConfigProvider, ApiService, API_CONFIG_TOKEN } from '@mrlonis/ngx-mrlonis-shared';
import { Faction, MythicHero, Rarity, Type } from '@mrlonis/types';

@Injectable({
  providedIn: 'root'
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
