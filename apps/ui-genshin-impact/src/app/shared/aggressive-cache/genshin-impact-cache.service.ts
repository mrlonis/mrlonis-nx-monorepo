import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  ArtifactSet,
  ArtifactSetService,
  Character,
  CharacterService,
  Element,
  ElementService,
  Weapon,
  WeaponService,
} from '../api';
import { AggressiveCache, AggressiveCacheInvalidator } from './base';

@Injectable({ providedIn: 'root' })
export class GenshinImpactAggressiveCache extends AggressiveCache<{
  character: Character;
  element: Element;
  weapon: Weapon;
  artifactSet: ArtifactSet;
}> {
  constructor(
    characterService: CharacterService,
    elementService: ElementService,
    weaponService: WeaponService,
    artifactSetService: ArtifactSetService,
    invalidator: AggressiveCacheInvalidator
  ) {
    super(
      {
        character: {
          service: (index, page, params) => {
            return characterService.getCollection(index, page, params);
          },
          getAll: true,
          getBy: {
            match: (entity: Character) => {
              if (entity.id == undefined) {
                return [];
              }
              return [new HttpParams().set('id', entity.id)];
            },
            directRequest: (httpParams: HttpParams) => characterService.getSingle(httpParams.get('id') ?? ''),
          },
          collectBy: {
            directRequest: (httpParams: HttpParams) =>
              characterService.getCollection(0, 300, httpParams).pipe(
                map((response) => {
                  return response._embedded.data;
                })
              ),
          },
        },
        element: {
          service: (index, page, params) => {
            return elementService.getCollection(index, page, params);
          },
          getAll: true,
          getBy: {
            match: (entity: Element) => {
              if (entity.id == undefined) {
                return [];
              }
              return [new HttpParams().set('id', entity.id)];
            },
            directRequest: (httpParams: HttpParams) => elementService.getSingle(httpParams.get('id') ?? ''),
          },
        },
        weapon: {
          service: (index, page, params) => {
            return weaponService.getCollection(index, page, params);
          },
          getAll: true,
          getBy: {
            match: (entity: Weapon) => {
              if (entity.id == undefined) {
                return [];
              }
              return [new HttpParams().set('id', entity.id)];
            },
            directRequest: (httpParams: HttpParams) => weaponService.getSingle(httpParams.get('id') ?? ''),
          },
        },
        artifactSet: {
          service: (index, page, params) => {
            return artifactSetService.getCollection(index, page, params);
          },
          getAll: true,
          getBy: {
            match: (entity: ArtifactSet) => {
              if (entity.id == undefined) {
                return [];
              }
              return [new HttpParams().set('id', entity.id)];
            },
            directRequest: (httpParams: HttpParams) => artifactSetService.getSingle(httpParams.get('id') ?? ''),
          },
        },
      },
      invalidator
    );
  }
}
