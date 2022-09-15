import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiConfigProvider, API_CONFIG_TOKEN } from './base';

@Injectable({
  providedIn: 'root',
})
export abstract class ImageApiService {
  createdTime: Date = new Date();

  constructor(public http: HttpClient, @Inject(API_CONFIG_TOKEN) private config: ApiConfigProvider) {}

  public get apiUrl(): string {
    const value = this.config.apiUrl;
    if (!value) {
      throw new Error('apiUrl has not been configured yet');
    }
    return value;
  }

  public onError: Subject<string> = new Subject();

  public get baseUrl(): string {
    return `${this.apiUrl}/images`;
  }

  getImageUrl(imageRoute: string): string {
    return `${this.baseUrl}/${imageRoute}`;
  }
}
