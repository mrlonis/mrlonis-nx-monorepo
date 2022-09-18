import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ApiConfigProvider, ApiService, API_CONFIG_TOKEN } from '@mrlonis-nx-angular-monorepo/ngx-mrlonis-shared';
import { ArtifactSet, Character, Element, Weapon } from '@mrlonis-nx-angular-monorepo/types-mrlonis';

@Injectable({
  providedIn: 'root',
})
export class GenshinImpactApiService extends ApiService<{
  artifactSet: ArtifactSet;
  character: Character;
  element: Element;
  weapon: Weapon;
}> {
  constructor(http: HttpClient, @Inject(API_CONFIG_TOKEN) config: ApiConfigProvider) {
    super(http, config);
  }
}
