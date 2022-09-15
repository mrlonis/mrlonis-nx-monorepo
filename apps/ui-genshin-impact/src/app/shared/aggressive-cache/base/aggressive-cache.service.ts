import { HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, mergeMap, shareReplay, tap } from 'rxjs/operators';
import { BaseResource, SpringDataRestResponse } from '../../api/interfaces';
import { AggressiveCacheInvalidator } from './aggressive-cache-invalidator.service';
import { CacheOccupant } from './cache-occupant';
import { CacheSlot, CollectBySlot, GetBySlot } from './cache-slot';

/**
 * Types is a dictionary of all the types of resources the cache should manage.
 * It is very important that they keys match a certain name scheme, so that the invalidator can find the entries
 *    that need to be invalidated when PUT or POST requests go out resources managed by the cache.
 * The key of the object should be the same as the resource's url segment in the api.
 *    example: Endpoint -> endpoint,  Provider Role -> practitioner role
 * An exception is made for organizations, because there are so many specific types of organization.
 *    For organizations, the scheme is 'organization/{{org-type}}' where org-type is the
 *    type of the object as it appears in the json.
 */
export abstract class AggressiveCache<Types extends { [key: string]: BaseResource }> {
  readonly MAX_ENTRIES = 300;

  protected _cache: {
    [key in keyof Types]: undefined | CacheOccupant<Types[key]>;
  } = {} as { [key in keyof Types]: undefined };

  constructor(
    readonly features: {
      [key in keyof Types]: CacheSlot<Types[key]>;
    },
    invalidator: AggressiveCacheInvalidator
  ) {
    invalidator.register(this);
  }

  /**
   * Invalidates the cache for a certain key.
   *
   * @param key Key in cache to invalidate
   */
  invalidate(key: string): void {
    delete this._cache[key];
  }

  /**
   * Ensures that the internal cache has a CacheOccupant for a given key
   *
   * @param key The key to check
   * @returns The CacheOccupant for the given key whether it exists or was just created
   */
  protected enforceEntry<ATTR extends keyof Types>(key: ATTR): CacheOccupant<Types[ATTR]> {
    const existingCacheOccupant: CacheOccupant<Types[ATTR]> | undefined = this._cache[key];
    if (existingCacheOccupant == undefined) {
      const defaultCacheOccupant: CacheOccupant<Types[ATTR]> = {
        all: undefined,
        count: undefined,
        lastEntry: undefined,
        getBy: new Map<string, Observable<Types[ATTR]>>(),
        countBy: new Map<string, { complete: boolean; map: Observable<number> }>(),
        collectBy: new Map<string, { complete: boolean; map: Observable<Array<Types[ATTR]>> }>(),
      };
      this._cache[key] = defaultCacheOccupant;
      return defaultCacheOccupant;
    }
    return existingCacheOccupant;
  }

  /**
   * This function is called by informCacheOnResponse to process the response of the request
   *
   * @param key The key of the entity being analyzed
   * @param result The collection bundle result from the informCacheOnResponse request
   * @returns The CacheOccupant for the given key
   */
  private informCache<ATTR extends keyof Types>(
    key: ATTR,
    result: SpringDataRestResponse<Types[ATTR]>
  ): CacheOccupant<Types[ATTR]> {
    const cacheOccupant: CacheOccupant<Types[ATTR]> = this.enforceEntry(key);
    const cacheSlot: CacheSlot<Types[ATTR]> = this.features[key];

    if (
      cacheOccupant.lastEntry != undefined &&
      result.page.totalElements != result._embedded.data.length &&
      result.page.totalElements == cacheOccupant.lastEntry.length
    ) {
      result._embedded.data = cacheOccupant.lastEntry;
    }

    if (result.page.totalElements == undefined) {
      /**
       * all observables here have shareReplay() (or are of()), which has reference counting for subscribers.
       * the following line is safe, and just checks if there is a value stored at the moment
       */
      if (cacheOccupant.count != undefined) {
        cacheOccupant.count
          .subscribe((x) => {
            result.page.totalElements = x;
          })
          .unsubscribe();
      }
    }

    if (
      cacheSlot.getAll &&
      (result.page.totalElements == result._embedded.data.length || result._embedded.data.length >= this.MAX_ENTRIES)
    ) {
      cacheOccupant.all = of(result._embedded.data);
    }

    if (result.page.totalElements != undefined) {
      cacheOccupant.count = of(result.page.totalElements);
    } else {
      if (cacheOccupant.lastEntry == undefined || cacheOccupant.lastEntry.length < result._embedded.data.length) {
        cacheOccupant.lastEntry = result._embedded.data;
      }
    }

    // Process getBy
    if (cacheSlot.getBy != undefined) {
      const cacheSlotGetBy: GetBySlot<Types[ATTR]> = cacheSlot.getBy;

      result._embedded.data.forEach((element) => {
        cacheSlotGetBy.match(element).forEach((val) => {
          cacheOccupant.getBy.set(val.toString(), of(element));
        });
      });
    }

    if (result.page.totalElements == result._embedded.data.length || result._embedded.data.length >= this.MAX_ENTRIES) {
      // Process Count By
      if (cacheSlot.countBy != undefined) {
        const cacheSlotCountBy = cacheSlot.countBy;

        const rowCountBy: Map<string, number> = new Map<string, number>();
        result._embedded.data.forEach((element) => {
          cacheSlotCountBy.match(element).forEach((val) => {
            if (val != undefined) {
              rowCountBy.set(val.toString(), 1 + (rowCountBy.get(val.toString()) ?? 0));
            }
          });
        });

        rowCountBy.forEach((count, key2) => {
          cacheOccupant.countBy.set(key2, { complete: true, map: of(count) });
        });
      }

      // Process Collect By
      if (cacheSlot.collectBy != undefined) {
        const collectBy: CollectBySlot<Types[ATTR]> = cacheSlot.collectBy;

        if (collectBy.match != undefined) {
          const valueMatch = collectBy.match;

          const rowCollectBy: Map<string, Array<Types[ATTR]>> = new Map<string, Array<Types[ATTR]>>();
          result._embedded.data.forEach((element) => {
            valueMatch(element).forEach((val) => {
              if (val != undefined) {
                let array = rowCollectBy.get(val.toString());
                if (array == undefined) {
                  array = [];
                }

                array.push(element);
                rowCollectBy.set(val.toString(), array);
              }
            });
          });

          rowCollectBy.forEach((collection, key2) => {
            cacheOccupant.collectBy.set(key2, {
              complete: true,
              map: of(collection),
            });
          });
        }
      }
    }

    return cacheOccupant;
  }

  /**
   * informCacheOnResponse wraps an observable for a certain resource type, so that the results of that request can
   * be used to populate the cache, in addition to the request's original purpose
   *
   * VERY IMPORTANT
   *
   * Do NOT informCacheOnResponse if there is a filter applied beyond the purpose of the cache.
   *
   * For example, if the cache is meant to store the locations located under a specific practice,
   * and the user goes to the locations list and filters the responses for just the ones with a specific name,
   * informCacheOnResponse would be inappropriate there, because it would erroneously see that it got all locations,
   * when in fact it only got locations with a specific name.
   *
   * The cache would then give bad results for getAll, countAll, and countBy.
   *
   * @param key The key of the collection being observed
   * @param observable The observable collection to operate on
   * @returns The original observable collection
   */
  informCacheOnResponse<ATTR extends keyof Types>(
    key: ATTR,
    observable: Observable<SpringDataRestResponse<Types[ATTR]>>
  ): Observable<SpringDataRestResponse<Types[ATTR]>> {
    return observable.pipe(
      tap((result) => {
        this.informCache(key, result);
      })
    );
  }

  /**
   * Tries to get a complete list of a certain resource.
   * This is not a paged getCollection- it is meant for resources that don't have very many elements,
   *    like ones that would show up as options in a dropdown.
   * Should only be called on resources that have getAll:true
   *
   * @param key The key of the resource being collected
   * @returns The observable array of entities for the request
   */
  getAll<ATTR extends keyof Types>(key: ATTR): Observable<Array<Types[ATTR]>> {
    const cacheValue = this._cache[key]?.all;
    if (cacheValue != undefined) {
      return cacheValue;
    }
    const cacheOccupant = this.enforceEntry(key);
    const cacheSlot = this.features[key];
    const params = new HttpParams();

    if (cacheSlot.service == undefined) {
      throw 'Cannot get all of resources of this type.';
    }

    cacheOccupant.all = cacheSlot.service(0, this.MAX_ENTRIES, params).pipe(
      mergeMap((result) => {
        return this.informCache(key, result).all ?? [];
      }),
      shareReplay(1)
    );
    return cacheOccupant.all;
  }

  /**
   * Gets a resource by that matches by a certain attribute.
   * Should only be called on resources that a relevant getBy entry.
   *
   * @param key The key of the resource being requested
   * @param httpParams The HttpParams to get by
   * @returns The observable entity result
   */
  getBy<ATTR extends keyof Types>(key: ATTR, httpParams: HttpParams): Observable<Types[ATTR]> {
    const httpParamsString = httpParams.toString();

    const currentCacheValue = this._cache[key]?.getBy?.get(httpParamsString);
    if (currentCacheValue != undefined) {
      return currentCacheValue;
    }

    const cacheSlot = this.features[key];
    if (cacheSlot.getBy == undefined) {
      throw 'Cannot Get By on this type of resource';
    }

    const cacheOccupant = this.enforceEntry(key);
    if (cacheOccupant.getBy == undefined) {
      cacheOccupant.getBy = new Map<string, Observable<Types[ATTR]>>();
    }

    const returnValue = cacheSlot.getBy.directRequest(httpParams).pipe(shareReplay(1));
    cacheOccupant.getBy.set(httpParamsString, returnValue);
    return returnValue;
  }

  /**
   * Gets a collection of a resource by that matches by a certain attribute.
   * Should only be called on resources that a relevant collectBy entry.
   *
   * @param key The key of the resource being collected by
   * @param httpParams The HttpParams to collect by
   * @returns The observable array of entities for the collect by
   */
  collectBy<ATTR extends keyof Types>(key: ATTR, httpParams: HttpParams): Observable<Array<Types[ATTR]>> {
    const httpParamsString = httpParams.toString();

    const currentCacheValue = this._cache[key]?.collectBy?.get(httpParamsString);
    if (currentCacheValue != undefined && (currentCacheValue.map != undefined || currentCacheValue.complete)) {
      return currentCacheValue.map ?? of([]);
    }

    const cacheSlot = this.features[key];
    if (cacheSlot.collectBy == undefined) {
      throw 'Cannot collect by on resources of this type';
    }

    const cacheOccupant = this.enforceEntry(key);
    if (cacheOccupant.collectBy == undefined) {
      cacheOccupant.collectBy = new Map<string, { complete: boolean; map: Observable<Array<Types[ATTR]>> }>();
    }
    if (cacheOccupant.collectBy.get(httpParamsString) == undefined) {
      cacheOccupant.collectBy.set(httpParamsString, {
        complete: false,
        map: new Observable<Array<Types[ATTR]>>(),
      });
    }

    const returnValue = cacheSlot.collectBy.directRequest(httpParams).pipe(shareReplay(1));
    cacheOccupant.collectBy.set(httpParamsString, {
      complete: true,
      map: returnValue,
    });
    return returnValue;
  }

  /**
   * Returns an accurate count of all resources of a specified type.
   *
   * @param key The key of the resource being Counted
   * @returns The observable number result of the request
   */
  countAll(key: keyof Types): Observable<number> {
    const cacheValue = this._cache[key]?.count;
    if (cacheValue != undefined) {
      return cacheValue;
    }

    const cacheSlot = this.features[key];
    if (cacheSlot.service == undefined) {
      throw 'Cannot count all of resources of this type.';
    }

    const cacheOccupant = this.enforceEntry(key);
    cacheOccupant.count = cacheSlot.service(0, 100, new HttpParams()).pipe(
      map((x) => x.page.totalElements ?? 0),
      shareReplay(1)
    );

    return cacheOccupant.count;
  }

  /**
   * Counts resources whose attribute matches a specified value.
   * Should only be called on resources that a relevant countBy entry.
   *
   * @param key The key of the resource being counted
   * @param httpParams The HttpParams to CountBy
   * @returns The Observable number result of the count
   */
  countBy(key: keyof Types, httpParams: HttpParams): Observable<number> {
    const httpParamsString = httpParams.toString();

    const cacheSlot = this.features[key];
    if (cacheSlot.countBy == undefined || cacheSlot.service == undefined) {
      throw 'Cannot count by on resources of this type';
    }

    const cacheOccupant = this.enforceEntry(key);
    const cacheOccupantCountBy = cacheOccupant.countBy;
    if (cacheOccupantCountBy != undefined) {
      const getVal = cacheOccupantCountBy.get(httpParamsString);
      if (getVal !== undefined) {
        if (getVal.map != undefined || getVal.complete) {
          return getVal.map;
        } else if (getVal.map == undefined) {
          cacheOccupant.countBy.set(httpParamsString, { complete: false, map: of(0) });
        }
      } else {
        cacheOccupant.countBy.set(httpParamsString, { complete: false, map: of(0) });
      }
    } else {
      cacheOccupant.countBy = new Map<string, { complete: boolean; map: Observable<number> }>();
    }

    if (cacheSlot.countBy.directRequest == undefined) {
      const params = new HttpParams();

      if (cacheSlot.service == undefined) {
        throw 'Cannot count resources of this type.';
      }

      const returnValue = cacheSlot.service(0, this.MAX_ENTRIES, params).pipe(
        mergeMap((result) => {
          console.log(
            'The cache was forced to get all of a resource in order to count occurrences. ' +
              'In the future, this should be unsupported behavior. ' +
              'For now, this is sometimes unavoidable, because we cannot yet filter by extension.'
          );
          const ret = this.informCache(key, result).countBy?.get(httpParamsString)?.map;
          if (ret != undefined) {
            return ret ?? of(0);
          }
          return of(this.MAX_ENTRIES);
        }),
        shareReplay(1)
      );
      cacheOccupant.countBy.set(httpParamsString, {
        complete: true,
        map: returnValue,
      });
      return returnValue;
    } else {
      const returnValue = cacheSlot.countBy.directRequest(httpParams).pipe(shareReplay(1));
      cacheOccupant.countBy.set(httpParamsString, {
        complete: true,
        map: returnValue,
      });
      return returnValue;
    }
  }
}
