import { Injectable } from '@angular/core';
import { StorageServiceBase } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService extends StorageServiceBase {
  constructor() {
    super(window.localStorage);
  }
}
