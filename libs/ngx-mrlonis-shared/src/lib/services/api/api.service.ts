/* eslint-disable import/no-deprecated */
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseResource, SpringDataRestResponse } from '@mrlonis/types';

export interface ApiConfigProvider {
  apiUrl?: string;
}

export const API_CONFIG_TOKEN = new InjectionToken<ApiConfigProvider>('api.config');

export interface IApiService<T extends { [key: string]: BaseResource }> {
  get apiUrl(): string;
  getCollection<ATTR extends keyof T>(route: ATTR, params: HttpParams): Observable<SpringDataRestResponse<T[ATTR]>>;
  getSingle<ATTR extends keyof T>(route: ATTR, httpParams: HttpParams): Observable<T[ATTR]>;
  getImageUrl(imageUrlSuffix: string): string;
}

export abstract class ApiService<T extends { [key: string]: BaseResource }> implements IApiService<T> {
  defaultPageSize = 20;
  constructor(
    private http: HttpClient,
    private config: ApiConfigProvider
  ) {}

  public get apiUrl(): string {
    const value = this.config.apiUrl;
    if (!value) {
      throw new Error('apiUrl has not been configured yet');
    }
    return value;
  }

  public onError: Subject<string> = new Subject();

  _determineUrl(route: string | number | symbol, params: HttpParams): string {
    const baseUrl = `${this.apiUrl}/${String(route)}`;
    let url = baseUrl;
    if (params.has('name')) {
      url = baseUrl + '/search/findBy';
    }
    if (params.has('factionName')) {
      url = baseUrl + '/search/findBy';
    }
    if (params.has('rarityName')) {
      url = baseUrl + '/search/findBy';
    }
    if (params.has('typeName')) {
      url = baseUrl + '/search/findBy';
    }
    return url;
  }

  getCollection<ATTR extends keyof T>(
    route: ATTR,
    params: HttpParams = new HttpParams()
  ): Observable<SpringDataRestResponse<T[ATTR]>> {
    if (!params.has('page')) {
      params = params.set('page', 0);
    }
    if (!params.has('size')) {
      params = params.set('size', String(this.defaultPageSize));
    }

    const url = this._determineUrl(route, params);
    return this.http.get<SpringDataRestResponse<T[ATTR]>>(url, { params }).pipe(
      map((response: SpringDataRestResponse<T[ATTR]>) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        this.onError.next(error.message);
        return throwError(() => error);
      })
    );
    // return this.http.get<SpringDataRestResponse<T[ATTR]>>(url, { params });
  }

  getSingle<ATTR extends keyof T>(route: ATTR, httpParams: HttpParams): Observable<T[ATTR]> {
    const baseUrl = `${this.apiUrl}/${String(route)}`;

    const id = httpParams.get('id');
    if (id != null && id != '') {
      return this.http.get<T[ATTR]>(`${baseUrl}/${id}`).pipe(
        // tap(() => this.log(`retrieved single=${baseUrl}/${id}`)),
        map((response: T[ATTR]) => {
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          this.onError.next(error.message);
          return throwError(() => error);
        })
      );
    }

    return this.http.get<SpringDataRestResponse<T[ATTR]>>(`${baseUrl}/search/findBy`, { params: httpParams }).pipe(
      map((response: SpringDataRestResponse<T[ATTR]>) => {
        if (response._embedded.data.length != 1) {
          throwError(
            () => new Error(`Entry length is supposed to be 1! Length was instead ${response._embedded.data.length}`)
          );
        }
        return response._embedded.data[0];
      }),
      catchError((error: HttpErrorResponse) => {
        this.onError.next(error.message);
        return throwError(() => error);
      })
    );
  }

  getImageUrl(imageUrlSuffix: string): string {
    return `${this.apiUrl}/images/${imageUrlSuffix}`;
  }
}
