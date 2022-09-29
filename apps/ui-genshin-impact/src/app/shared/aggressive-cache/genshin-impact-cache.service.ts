import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AggressiveCache, AggressiveCacheInvalidator } from '@mrlonis/ngx-mrlonis-shared';
import { ArtifactSet, Character, Element, Weapon } from '@mrlonis/types-mrlonis';
import { map } from 'rxjs/operators';
import { GenshinImpactApiService } from '../api';

@Injectable({ providedIn: 'root' })
export class GenshinImpactAggressiveCache extends AggressiveCache<{
  character: Character;
  element: Element;
  weapon: Weapon;
  artifactSet: ArtifactSet;
}> {
  constructor(genshinImpactApi: GenshinImpactApiService, invalidator: AggressiveCacheInvalidator) {
    super(
      {
        character: {
          service: (params) => {
            return genshinImpactApi.getCollection('character', params);
          },
          getAll: true,
          getBy: {
            match: (entity: Character) => {
              if (entity.id == undefined) {
                return [];
              }
              return [new HttpParams().set('id', entity.id)];
            },
            directRequest: (httpParams: HttpParams) => genshinImpactApi.getSingle('character', httpParams),
          },
          collectBy: {
            directRequest: (httpParams: HttpParams) =>
              genshinImpactApi.getCollection('character', httpParams).pipe(
                map((response) => {
                  return response._embedded.data;
                })
              ),
          },
        },
        element: {
          service: (params) => {
            return genshinImpactApi.getCollection('element', params);
          },
          getAll: true,
          getBy: {
            match: (entity: Element) => {
              if (entity.id == undefined) {
                return [];
              }
              return [new HttpParams().set('id', entity.id)];
            },
            directRequest: (httpParams: HttpParams) => genshinImpactApi.getSingle('element', httpParams),
          },
        },
        weapon: {
          service: (params) => {
            return genshinImpactApi.getCollection('weapon', params);
          },
          getAll: true,
          getBy: {
            match: (entity: Weapon) => {
              if (entity.id == undefined) {
                return [];
              }
              return [new HttpParams().set('id', entity.id)];
            },
            directRequest: (httpParams: HttpParams) => genshinImpactApi.getSingle('weapon', httpParams),
          },
        },
        artifactSet: {
          service: (params) => {
            return genshinImpactApi.getCollection('artifactSet', params);
          },
          getAll: true,
          getBy: {
            match: (entity: ArtifactSet) => {
              if (entity.id == undefined) {
                return [];
              }
              return [new HttpParams().set('id', entity.id)];
            },
            directRequest: (httpParams: HttpParams) => genshinImpactApi.getSingle('artifactSet', httpParams),
          },
        },
      },
      invalidator
    );
  }
}
