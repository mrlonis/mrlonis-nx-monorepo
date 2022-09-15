import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import * as luminarchShadowarch from '../../../../assets/test-data/faction/Luminarch_&_Shadowarch.json';
import * as lucifer from '../../../../assets/test-data/mythicHero/Lucifer.json';
import * as urRarity from '../../../../assets/test-data/rarity/UR.json';
import * as fighter from '../../../../assets/test-data/type/Fighter.json';
import { ApiConfigProvider, API_CONFIG_TOKEN, Faction, MythicHero, Rarity, Type } from '../../../shared';
import { HeroDetailComponent } from './hero-detail.component';

const testApiUrl = 'http://fake-url.coms/api';
const testMythicHero: MythicHero = <MythicHero>lucifer;
const testFaction: Faction = <Faction>luminarchShadowarch;
const testRarity: Rarity = <Rarity>urRarity;
const testType: Type = <Type>fighter;

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroDetailComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: API_CONFIG_TOKEN,
          useValue: {
            apiUrl: testApiUrl,
          } as ApiConfigProvider,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: testMythicHero.id }),
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test http client testing', () => {
    // Check MythicHero Call
    let request = httpTestingController.expectOne(`${testApiUrl}/mythicHero/${testMythicHero.id}`);
    expect(request.request.method).toEqual('GET');
    request.flush(testMythicHero);

    // Check Faction Call
    request = httpTestingController.expectOne(`${testApiUrl}/faction/${testMythicHero.factionId}`);
    expect(request.request.method).toEqual('GET');
    request.flush(testFaction);

    // Check Rarity Call
    request = httpTestingController.expectOne(`${testApiUrl}/rarity/${testMythicHero.rarityId}`);
    expect(request.request.method).toEqual('GET');
    request.flush(testRarity);

    // Check Type Call
    request = httpTestingController.expectOne(`${testApiUrl}/type/${testMythicHero.typeId}`);
    expect(request.request.method).toEqual('GET');
    request.flush(testType);

    // Assert No Remaining Calls
    httpTestingController.verify();
  });
});
