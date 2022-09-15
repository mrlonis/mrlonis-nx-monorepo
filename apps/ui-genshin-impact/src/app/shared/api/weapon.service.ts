import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ApiConfigProvider, ApiService, API_CONFIG_TOKEN } from './base';
import { Weapon } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class WeaponService extends ApiService<Weapon> {
  constructor(http: HttpClient, @Inject(API_CONFIG_TOKEN) apiConfig: ApiConfigProvider) {
    super(http, 'rarity', apiConfig);
  }
}
