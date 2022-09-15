import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { BaseResource, SpringDataRestResponse } from '../../../types';
import { IApiService } from '../../api';
import { AggressiveCacheInvalidator } from './aggressive-cache-invalidator.service';
import { AggressiveCache } from './aggressive-cache.service';

interface ExampleResource extends BaseResource {
  id: string;
  name: string;
  imageUrl: string;
  version: string;
}

type ExampleServiceIndex = { example: ExampleResource };

@Injectable()
class ExampleService implements IApiService<ExampleServiceIndex> {
  singleRequests = 0;
  collectionRequests = 0;
  total = 5; //imageUrl happens in this order: A, B, A, B, A; expected counts are A:3, B:2.

  public get apiUrl(): string {
    return 'http://fake-url.com';
  }

  public get baseUrl(): string {
    return `${this.apiUrl}/example`;
  }

  getCollection<ATTR extends keyof ExampleServiceIndex>(
    route: ATTR,
    params: HttpParams = new HttpParams()
  ): Observable<SpringDataRestResponse<ExampleServiceIndex[ATTR]>> {
    const pageSizeParam = params.get('size');
    let pageSize = 1;
    if (pageSizeParam != null) {
      pageSize = parseInt(pageSizeParam);
    }

    let collection: ExampleResource[] = [];

    const version = `collection ${++this.collectionRequests}`;
    for (let num = 0; num < this.total; num++) {
      const id = `${num}`;

      const entityImageUrl = ['A', 'B'][num % 2];
      const collectImageUrl = params.get('imageUrl');

      const entityName = id + ' name';
      const collectName = params.get('name');

      const collectVersion = params.get('version');

      if (
        (collectImageUrl == undefined || collectImageUrl == entityImageUrl) &&
        (collectName == undefined || collectName == entityName) &&
        (collectVersion == undefined || collectVersion == version)
      ) {
        collection.push({
          id: id,
          name: entityName,
          version: version,
          imageUrl: entityImageUrl,
          _links: {
            self: {
              href: '',
            },
            item: {
              href: '',
            },
          },
        });
      }
    }

    const totalLength = collection.length;
    collection = collection.slice(0, pageSize);
    const bundle: SpringDataRestResponse<ExampleResource> = {
      _embedded: {
        data: collection,
      },
      _links: {
        self: {
          href: '',
        },
        profile: {
          href: '',
        },
        search: {
          href: '',
        },
      },
      page: {
        size: totalLength,
        totalElements: totalLength,
        totalPages: 1,
        number: 1,
      },
    };
    return of(bundle).pipe(delay(300));
  }

  getSingle<ATTR extends keyof ExampleServiceIndex>(
    route: ATTR,
    httpParams: HttpParams
  ): Observable<ExampleServiceIndex[ATTR]> {
    const id = httpParams.get('id');
    if (id == null || id == '') {
      return throwError(() => new Error('not found'));
    }
    const ver = `single ${++this.singleRequests}`;
    const almost: ExampleResource = {
      id: id,
      name: id + ' name',
      imageUrl: ['A', 'B'][+id % 2],
      version: ver,
      _links: {
        self: {
          href: '',
        },
        item: {
          href: '',
        },
      },
    };
    return of(almost).pipe(delay(300));
  }

  getImageUrl(imageUrlSuffix: string): string {
    return `${this.apiUrl}/images/${imageUrlSuffix}`;
  }

  log(message: string): void {
    console.log(`ApiService: log(): ${message}`);
  }
}

@Injectable()
class AggressiveCacheExample extends AggressiveCache<{
  example: ExampleResource;
}> {
  constructor(service: ExampleService, invalidator: AggressiveCacheInvalidator) {
    super(
      {
        example: {
          service: (params) => service.getCollection('example', params),
          getAll: true,
          getBy: {
            match: (entry: ExampleResource) => [
              new HttpParams().set('id', entry.id),
              new HttpParams().set('ident', entry.id),
              new HttpParams().set('name', entry.name),
            ],
            directRequest: (httpParams: HttpParams) => service.getSingle('example', httpParams),
          },
          countBy: {
            match: (entry: ExampleResource) => {
              return [new HttpParams().set('imageUrl', entry.imageUrl), new HttpParams().set('version', entry.version)];
            },
            directRequest: (httpParams: HttpParams) => {
              return service.getCollection('example', httpParams.set('size', 1)).pipe(map((x) => x.page.totalElements ?? 0));
            },
          },
          collectBy: {
            match: (entry: ExampleResource) => {
              return [new HttpParams().set('imageUrl', entry.imageUrl), new HttpParams().set('version', entry.version)];
            },
            directRequest: (httpParams: HttpParams) =>
              service.getCollection('example', httpParams.set('size', 100)).pipe(map((x) => x._embedded.data.map((y) => y))),
          },
        },
      },
      invalidator
    );
  }
}

describe('AggressiveCache', () => {
  let service: ExampleService;
  let cache: AggressiveCacheExample;
  let invalidator: AggressiveCacheInvalidator;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExampleService, AggressiveCacheExample, AggressiveCacheInvalidator],
    });
    cache = TestBed.inject(AggressiveCacheExample);
    invalidator = TestBed.inject(AggressiveCacheInvalidator);
    service = TestBed.inject(ExampleService);
  });

  describe('setup', () => {
    it('should be created', () => {
      expect(cache).toBeTruthy();
    });
  });

  describe('getBy', () => {
    it('should forward errors', (done) => {
      cache.getBy('example', new HttpParams().set('id', '')).subscribe({
        next: () => {
          fail('should not complete normally');
          done();
        },
        error: (err: Error) => {
          expect(err.message).toEqual('not found');
          done();
        },
      });
    });

    it('should get by imageUrl', fakeAsync(() => {
      cache.getBy('example', new HttpParams().set('id', '4')).subscribe((data) => {
        expect(data).toEqual({
          id: '4',
          name: '4 name',
          imageUrl: 'A',
          version: 'single 1',
          _links: {
            self: {
              href: '',
            },
            item: {
              href: '',
            },
          },
        });
      });
      /** We know it is caching because the version isn't incremented */
      cache.getBy('example', new HttpParams().set('id', '4')).subscribe((data) => {
        expect(data).toEqual({
          id: '4',
          name: '4 name',
          imageUrl: 'A',
          version: 'single 1',
          _links: {
            self: {
              href: '',
            },
            item: {
              href: '',
            },
          },
        });
      });
      /** We know it ISN'T cached because the version DID incremented */
      cache.getBy('example', new HttpParams().set('id', '3')).subscribe((data) => {
        expect(data).toEqual({
          id: '3',
          name: '3 name',
          imageUrl: 'B',
          version: 'single 2',
          _links: {
            self: {
              href: '',
            },
            item: {
              href: '',
            },
          },
        });
      });
      /** We know it is caching because the version isn't incremented */
      cache.getBy('example', new HttpParams().set('id', '3')).subscribe((data) => {
        expect(data).toEqual({
          id: '3',
          name: '3 name',
          imageUrl: 'B',
          version: 'single 2',
          _links: {
            self: {
              href: '',
            },
            item: {
              href: '',
            },
          },
        });
      });
      tick(1000);
    }));

    it('should get by multiple properties', fakeAsync(() => {
      cache.getBy('example', new HttpParams().set('id', '4').set('ident', '4')).subscribe((data) => {
        expect(data).toEqual({
          id: '4',
          name: '4 name',
          imageUrl: 'A',
          version: 'single 1',
          _links: {
            self: {
              href: '',
            },
            item: {
              href: '',
            },
          },
        });
      });
      tick(400);
    }));

    it('should only make one request to the server with multiple subsequent lookups', fakeAsync(() => {
      //multiple requests come in before the response comes back from the server
      cache.getBy('example', new HttpParams().set('id', '4')).subscribe((data) => {
        expect(data).toEqual({
          id: '4',
          name: '4 name',
          imageUrl: 'A',
          version: 'single 1',
          _links: {
            self: {
              href: '',
            },
            item: {
              href: '',
            },
          },
        });
      });
      cache.getBy('example', new HttpParams().set('id', '4')).subscribe((data) => {
        expect(data).toEqual({
          id: '4',
          name: '4 name',
          imageUrl: 'A',
          version: 'single 1',
          _links: {
            self: {
              href: '',
            },
            item: {
              href: '',
            },
          },
        });
      });

      setTimeout(() => {
        //multiple requests come in after the response comes back from the server
        cache.getBy('example', new HttpParams().set('id', '4')).subscribe((data) => {
          expect(data).toEqual({
            id: '4',
            name: '4 name',
            imageUrl: 'A',
            version: 'single 1',
            _links: {
              self: {
                href: '',
              },
              item: {
                href: '',
              },
            },
          });
        });

        cache.getBy('example', new HttpParams().set('id', '4')).subscribe((data) => {
          expect(data).toEqual({
            id: '4',
            name: '4 name',
            imageUrl: 'A',
            version: 'single 1',
            _links: {
              self: {
                href: '',
              },
              item: {
                href: '',
              },
            },
          });
        });
      }, 400);
      tick(800);
      //version is always 1.
    }));
  });

  describe('getAll', () => {
    it('should get all', fakeAsync(() => {
      cache.getAll('example').subscribe((data) => {
        expect(data.length).toEqual(5);
      });
      tick(400);
    }));

    it('should have cached getAll after it witnesses a complete getCollection', fakeAsync(() => {
      cache
        .informCacheOnResponse('example', service.getCollection('example', new HttpParams().set('size', 10)))
        .subscribe(() => {
          cache.getAll('example').subscribe((data) => {
            expect(data[0].version).toEqual('collection 1');
          });
        });
      tick(1200);
    }));

    it('should not have cached getAll after it witnesses an incomplete getCollection', fakeAsync(() => {
      cache
        .informCacheOnResponse('example', service.getCollection('example', new HttpParams().set('size', 3)))
        .subscribe(() => {
          cache.getAll('example').subscribe((data) => {
            expect(data[0].version).toEqual('collection 2');
            //collection 1 was the initial request; getAll remade it because not enough elements were retrieved.
          });
        });
      tick(1200);
    }));
  });

  describe('countAll', () => {
    it('should count all', fakeAsync(() => {
      cache.countAll('example').subscribe((data) => {
        expect(data).toEqual(5);
      });
      tick(400);
    }));
  });

  describe('countBy', () => {
    it('should count by imageUrl', fakeAsync(() => {
      cache.countBy('example', new HttpParams().set('imageUrl', 'A')).subscribe((data) => {
        expect(data).toEqual(3);
      });
      cache.countBy('example', new HttpParams().set('imageUrl', 'B')).subscribe((data) => {
        expect(data).toEqual(2);
      });
      cache.countBy('example', new HttpParams().set('imageUrl', 'C')).subscribe((data) => {
        expect(data).toEqual(0);
      });
      tick(400);
    }));
  });

  describe('collectBy', () => {
    it('should collect by imageUrl', fakeAsync(() => {
      const params = new HttpParams().set('imageUrl', 'A');
      cache.collectBy('example', params).subscribe((data) => {
        expect(data.length).toEqual(3);
        expect(data[0].version).toEqual('collection 1');
      });
      tick(400);
      // We know it is caching because the collection isn't incrementing
      cache.collectBy('example', params).subscribe((data) => {
        expect(data.length).toEqual(3);
        expect(data[0].version).toEqual('collection 1');
      });
      tick(400);
      /**
       * Try with new HttpParams
       * Should work since properties are the same
       * and added in the same order
       */
      const params2 = new HttpParams().set('imageUrl', 'A');
      cache.collectBy('example', params2).subscribe((data) => {
        expect(data.length).toEqual(3);
        expect(data[0].version).toEqual('collection 1');
      });
      tick(400);
      /**
       * Try with new imageUrl value.
       * Version collection should increment since it was never cached
       */
      const params3 = new HttpParams().set('imageUrl', 'B');
      cache.collectBy('example', params3).subscribe((data) => {
        expect(data.length).toEqual(2);
        expect(data[0].version).toEqual('collection 2');
      });
      tick(400);
    }));

    it('should collect by multiple properties', fakeAsync(() => {
      const params = new HttpParams().set('imageUrl', 'A').set('version', 'collection 1');
      cache.collectBy('example', params).subscribe((data) => {
        expect(data.length).toEqual(3);
      });
      tick(400);
      // Override collectBy function returns 1 entity when the value is stored in cache
      cache.collectBy('example', params).subscribe((data) => {
        expect(data.length).toEqual(3);
      });
      tick(400);
      // Try with new HttpParams
      // Should work since properties are the same
      // and added in the same order
      const params2 = new HttpParams().set('imageUrl', 'A').set('version', 'collection 1');
      cache.collectBy('example', params2).subscribe((data) => {
        expect(data.length).toEqual(3);
      });
      tick(400);
      // Try with new HttpParams
      // Will Return 0 because since the httpparams are in a different order, this is a new collection
      // The new collection version will be collection 2
      const params3 = new HttpParams().set('version', 'collection 1').set('imageUrl', 'A');
      cache.collectBy('example', params3).subscribe((data) => {
        expect(data.length).toEqual(0);
      });
      tick(400);
    }));
  });

  describe('invalidator', () => {
    it('should clear cached values', fakeAsync(() => {
      cache.getBy('example', new HttpParams().set('id', '4')).subscribe((data) => {
        expect(data).toEqual({
          id: '4',
          name: '4 name',
          imageUrl: 'A',
          version: 'single 1',
          _links: {
            self: {
              href: '',
            },
            item: {
              href: '',
            },
          },
        });
      });
      invalidator.invalidate('example');
      cache.getBy('example', new HttpParams().set('id', '4')).subscribe((data) => {
        expect(data).toEqual({
          id: '4',
          name: '4 name',
          imageUrl: 'A',
          version: 'single 2',
          _links: {
            self: {
              href: '',
            },
            item: {
              href: '',
            },
          },
        });
      });
      tick(800);
    }));
  });

  describe('informCacheOnResponse', () => {
    describe('getBy', () => {
      it('should have cached any values that it witnesses in a getCollection', fakeAsync(() => {
        cache
          .informCacheOnResponse('example', service.getCollection('example', new HttpParams().set('size', 3)))
          .subscribe();
        setTimeout(() => {
          // 2 is cached by id
          cache.getBy('example', new HttpParams().set('id', '2')).subscribe((data) => {
            expect(data).toEqual({
              id: '2',
              name: '2 name',
              imageUrl: 'A',
              version: 'collection 1',
              _links: {
                self: {
                  href: '',
                },
                item: {
                  href: '',
                },
              },
            });
          });
          /**
           *  2 is cached by ident
           *
           * We know this is from informCacheOnResponse, because the service getSingle will throw
           * an error if the HttpParams doesn't have an id set
           */
          cache.getBy('example', new HttpParams().set('ident', '2')).subscribe((data) => {
            expect(data).toEqual({
              id: '2',
              name: '2 name',
              imageUrl: 'A',
              version: 'collection 1',
              _links: {
                self: {
                  href: '',
                },
                item: {
                  href: '',
                },
              },
            });
          });
          //4 is not cached
          cache.getBy('example', new HttpParams().set('id', '4')).subscribe((data) => {
            expect(data).toEqual({
              id: '4',
              name: '4 name',
              imageUrl: 'A',
              version: 'single 1',
              _links: {
                self: {
                  href: '',
                },
                item: {
                  href: '',
                },
              },
            });
          });
          /**
           *  4 is NOT cached by ident
           *
           * We know this is not cache in informCacheOnResponse, because the service getSingle will throw
           * an error if the HttpParams doesn't have an id set
           */
          cache.getBy('example', new HttpParams().set('ident', '4')).subscribe({
            next: () => {
              fail('should not complete normally');
            },
            error: (err: Error) => {
              expect(err.message).toEqual('not found');
            },
          });
        }, 400);
        tick(800);
      }));
    });

    describe('countAll', () => {
      it('should have cached count after it witnesses a getCollection', fakeAsync(() => {
        cache
          .informCacheOnResponse('example', service.getCollection('example', new HttpParams().set('size', 3)))
          .subscribe(() => {
            cache.countAll('example').subscribe((data) => {
              expect(data).toEqual(5);
              service.getCollection('example', new HttpParams().set('size', 3)).subscribe((y) => {
                expect(y._embedded.data[0].version).toEqual('collection 2');
                //this is collection 2: collection 1 was the first innerservice.getCollection().
                //if the total count wasn't cached, it would be collection 3, because it would make a getCollection count.
              });
            });
          });
        tick(800);
      }));
    });

    describe('countBy', () => {
      it('should have cached counts after it witnesses a complete getCollection', fakeAsync(() => {
        cache
          .informCacheOnResponse('example', service.getCollection('example', new HttpParams().set('size', 10)))
          .subscribe(() => {
            cache.countBy('example', new HttpParams().set('imageUrl', 'A')).subscribe((data) => {
              expect(data).toEqual(3);
            });
            cache.countBy('example', new HttpParams().set('imageUrl', 'B')).subscribe((data) => {
              expect(data).toEqual(2);
            });
            cache.countBy('example', new HttpParams().set('version', 'collection 1')).subscribe((data) => {
              expect(data).toEqual(5);
            });
            cache.countBy('example', new HttpParams().set('imageUrl', 'C')).subscribe((data) => {
              expect(data).toEqual(0);
            });
            setTimeout(() => {
              service.getCollection('example', new HttpParams().set('size', 3)).subscribe((y) => {
                /**
                 * This is collection 3: collection 1 was the first innerservice.getCollection().
                 * Collection 2 was the cache.countBy imageUrl C since the original getCollection returned no elements of imageUrl C
                 * if the counts weren't cached, it would be collection 5, because it would make a getCollection for each count.
                 */
                expect(y._embedded.data[0].version).toEqual('collection 3');
              });
            }, 1000);
          });
        tick(2000);
      }));

      it('should not have cached counts after it witnesses an incomplete getCollection', fakeAsync(() => {
        cache
          .informCacheOnResponse('example', service.getCollection('example', new HttpParams().set('size', 3)))
          .subscribe(() => {
            cache.countBy('example', new HttpParams().set('imageUrl', 'A')).subscribe((data) => {
              expect(data).toEqual(3);
            });
            cache.countBy('example', new HttpParams().set('imageUrl', 'B')).subscribe((data) => {
              expect(data).toEqual(2);
            });
            cache.countBy('example', new HttpParams().set('imageUrl', 'C')).subscribe((data) => {
              expect(data).toEqual(0);
            });
            setTimeout(() => {
              service.getCollection('example', new HttpParams().set('size', 3)).subscribe((y) => {
                expect(y._embedded.data[0].version).toEqual('collection 5');
              });
            }, 400);
          });
        tick(1200);
      }));
    });

    describe('collectBy', () => {
      it('should have cached counts after it witnesses a complete getCollection', fakeAsync(() => {
        cache
          .informCacheOnResponse('example', service.getCollection('example', new HttpParams().set('size', 10)))
          .subscribe(() => {
            cache.collectBy('example', new HttpParams().set('imageUrl', 'A')).subscribe((data) => {
              expect(data.length).toEqual(3);
              expect(data[0].version).toEqual('collection 1');
            });
            cache.collectBy('example', new HttpParams().set('imageUrl', 'B')).subscribe((data) => {
              expect(data.length).toEqual(2);
              expect(data[0].version).toEqual('collection 1');
            });
            cache.collectBy('example', new HttpParams().set('version', 'collection 1')).subscribe((data) => {
              expect(data.length).toEqual(5);
              expect(data[0].version).toEqual('collection 1');
            });
            cache.collectBy('example', new HttpParams().set('imageUrl', 'C')).subscribe((data) => {
              expect(data.length).toEqual(0);
            });
            setTimeout(() => {
              service.getCollection('example', new HttpParams().set('size', 3)).subscribe((y) => {
                /**
                 * This is collection 3: collection 1 was the first innerservice.getCollection().
                 * Collection 2 was the cache.countBy imageUrl C since the original getCollection returned no elements of imageUrl C
                 * if the counts weren't cached, it would be collection 5, because it would make a getCollection for each count.
                 */
                expect(y._embedded.data[0].version).toEqual('collection 3');
              });
            }, 1000);
          });
        tick(2000);
      }));
    });
  });
});
