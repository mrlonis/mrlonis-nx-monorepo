import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ApiConfigProvider, ApiService, API_CONFIG_TOKEN } from './base';
import { Element } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class ElementService extends ApiService<Element> {
  constructor(http: HttpClient, @Inject(API_CONFIG_TOKEN) apiConfig: ApiConfigProvider) {
    super(http, 'elements', apiConfig);
  }
}
