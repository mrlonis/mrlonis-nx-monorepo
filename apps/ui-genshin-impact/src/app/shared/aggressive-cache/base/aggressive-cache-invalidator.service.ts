import { Injectable } from '@angular/core';

/**
 * AggressiveCacheInvalidator is responsible for invalidating the caches on a relevant PUT or POST request.
 *    the aggressive cache constructor needs a copy of this, so just inject it and pass it in when inheriting.
 */
@Injectable({
  providedIn: 'root',
})
export class AggressiveCacheInvalidator {
  caches: Array<{ invalidate(key: string): void }> = [];
  register(cache: { invalidate(key: string): void }): void {
    this.caches.push(cache);
  }
  invalidate(key: string): void {
    this.caches.forEach((x) => {
      x.invalidate(key);
    });
  }
}
