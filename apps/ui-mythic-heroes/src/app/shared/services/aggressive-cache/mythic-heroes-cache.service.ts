import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Faction, MythicHero, Rarity, Type } from '../../types';
import { MythicHeroesApiService } from '../api';
import { AggressiveCache, AggressiveCacheInvalidator } from './base';

@Injectable({
  providedIn: 'root',
})
export class MythicHeroesAggressiveCache extends AggressiveCache<{
  mythicHero: MythicHero;
  faction: Faction;
  type: Type;
  rarity: Rarity;
}> {
  constructor(api: MythicHeroesApiService, invalidator: AggressiveCacheInvalidator) {
    super(
      {
        mythicHero: {
          service: (params) => {
            return api.getCollection('mythicHero', params);
          },
          getAll: true,
          getBy: {
            match: (entity: MythicHero) => {
              if (entity.id == undefined) {
                return [];
              }
              return [new HttpParams().set('id', entity.id)];
            },
            directRequest: (httpParams: HttpParams) => api.getSingle('mythicHero', httpParams),
          },
          collectBy: {
            directRequest: (httpParams: HttpParams) =>
              api.getCollection('mythicHero', httpParams.set('page', 0).set('size', 300)).pipe(
                map((response) => {
                  return response._embedded.data;
                })
              ),
          },
        },
        faction: {
          service: (params) => {
            return api.getCollection('faction', params);
          },
          getAll: true,
          getBy: {
            match: (entity: Faction) => {
              if (entity.id == undefined) {
                return [];
              }
              return [new HttpParams().set('id', entity.id)];
            },
            directRequest: (httpParams: HttpParams) => api.getSingle('faction', httpParams),
          },
        },
        type: {
          service: (params) => {
            return api.getCollection('type', params);
          },
          getAll: true,
          getBy: {
            match: (entity: Type) => {
              if (entity.id == undefined) {
                return [];
              }
              return [new HttpParams().set('id', entity.id)];
            },
            directRequest: (httpParams: HttpParams) => api.getSingle('type', httpParams),
          },
        },
        rarity: {
          service: (params) => {
            return api.getCollection('rarity', params);
          },
          getAll: true,
          getBy: {
            match: (entity: Rarity) => {
              if (entity.id == undefined) {
                return [];
              }
              return [new HttpParams().set('id', entity.id)];
            },
            directRequest: (httpParams: HttpParams) => api.getSingle('rarity', httpParams),
          },
        },
      },
      invalidator
    );
  }
}
