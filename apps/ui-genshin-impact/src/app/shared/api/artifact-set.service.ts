import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ApiConfigProvider, ApiService, API_CONFIG_TOKEN } from './base';
import { ArtifactSet } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class ArtifactSetService extends ApiService<ArtifactSet> {
  constructor(http: HttpClient, @Inject(API_CONFIG_TOKEN) apiConfig: ApiConfigProvider) {
    super(http, 'type', apiConfig);
  }
}
