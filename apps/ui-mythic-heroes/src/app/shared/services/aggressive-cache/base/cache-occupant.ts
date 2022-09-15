import { Observable } from 'rxjs';
import { BaseResource } from '../../../types';

// Used by aggressive cache internally
export interface CacheOccupant<T extends BaseResource> {
  all?: Observable<T[]>;
  count?: Observable<number>;
  lastEntry?: T[];
  getBy: Map<string, Observable<T>>;
  countBy: Map<string, CountByCacheOccupant>;
  collectBy: Map<string, CollectByCacheOccupant<T>>;
}

export interface CountByCacheOccupant {
  complete: boolean;
  map: Observable<number>;
}

export interface CollectByCacheOccupant<T extends BaseResource> {
  complete: boolean;
  map: Observable<T[]>;
}
