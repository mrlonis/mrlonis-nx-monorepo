import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Inject, Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Faction, SpringDataRestResponse } from '@mrlonis/types-mrlonis';
import * as allFactions from '../../../assets/test-data/faction/All.json';
import { ApiConfigProvider, ApiService, API_CONFIG_TOKEN } from './api.service';

const testApiUrl = 'http://fake-url.coms';

class Example {
  resourceType = 'Example';
  id = '';
  name = '';
  imageUrl = '';
  _links = { self: { href: '' }, item: { href: '' } };
}

@Injectable({
  providedIn: 'root',
})
class TestApiService extends ApiService<{
  example: Example;
}> {
  constructor(http: HttpClient, @Inject(API_CONFIG_TOKEN) config: ApiConfigProvider) {
    super(http, config);
  }
}

describe('ApiService', () => {
  let apiService: TestApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: API_CONFIG_TOKEN, useValue: { apiUrl: testApiUrl } as ApiConfigProvider }],
    });

    apiService = TestBed.inject(TestApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should getCollection', () => {
    const testData = allFactions as SpringDataRestResponse<Faction>;
    apiService.getCollection('example').subscribe((data) => expect(data).toEqual(testData));
    const req = httpTestingController.expectOne('http://fake-url.coms/example?page=0&size=20');
    expect(req.request.method).toEqual('GET');
    req.flush(testData);

    httpTestingController.verify();
  });
});
