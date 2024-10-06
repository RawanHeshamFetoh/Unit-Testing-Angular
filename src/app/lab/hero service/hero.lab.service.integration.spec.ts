
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HeroServiceForLab } from './hero.lab.service';
import { Hero } from '../../hero';

describe("3-hero service (http) integration testing:", () => {

  let service: HeroServiceForLab;
  let httpTesting: HttpTestingController;
  const heroesUrl = 'http://localhost:3000/heroes';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        HeroServiceForLab
      ],
    });

    httpTesting = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HeroServiceForLab);
  });

  it('getHeroes function: send request and receive response successfully', () => {
    const mockHeroes: Hero[] = [
      { id: 1, name: 'Superman', strength: 100 },
      { id: 2, name: 'Batman', strength: 85 },
    ];

    service.getHeroes().subscribe({
      next: (data) => {
        expect(data.length).toBe(2);
        expect(data).toEqual(mockHeroes);
      },
    });

    const testReq = httpTesting.expectOne(heroesUrl);
    expect(testReq.request.method).toBe('GET');

    testReq.flush(mockHeroes);
  });

  it('updateHero function: send request and receive response successfully', () => {
    const mockHero: Hero = { id: 1, name: 'Superman', strength: 100 };

    service.updateHero(mockHero).subscribe({
      next: (data) => {
        expect(data).toEqual(mockHero);
      },
    });

    const testReq = httpTesting.expectOne(heroesUrl);
    expect(testReq.request.method).toBe('PUT');
    expect(testReq.request.body).toEqual(mockHero);

    testReq.flush(mockHero);
  });

  afterEach(() => {
    httpTesting.verify();
  });
});

