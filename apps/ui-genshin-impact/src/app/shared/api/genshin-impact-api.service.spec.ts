import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiConfigProvider, API_CONFIG_TOKEN } from '@mrlonis-nx-angular-monorepo/ngx-mrlonis-shared';
import { Element, SpringDataRestResponse } from '@mrlonis-nx-angular-monorepo/types-mrlonis';
import * as allFactions from '../../../assets/test-data/element/All.json';
import { GenshinImpactApiService } from './genshin-impact-api.service';

const testApiUrl = 'http://fake-url.coms';

describe('GenshinImpactApiService', () => {
  let apiService: GenshinImpactApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: API_CONFIG_TOKEN, useValue: { apiUrl: testApiUrl } as ApiConfigProvider }],
    });

    apiService = TestBed.inject(GenshinImpactApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should getCollection', () => {
    const testData = allFactions as SpringDataRestResponse<Element>;
    apiService.getCollection('element').subscribe((data) => expect(data).toEqual(testData));
    const req = httpTestingController.expectOne('http://fake-url.coms/element?page=0&size=20');
    expect(req.request.method).toEqual('GET');
    req.flush(testData);

    httpTestingController.verify();
  });
});
