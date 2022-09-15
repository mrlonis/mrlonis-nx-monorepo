import { LocalStorageService } from './local-storage.service';
import { setupTests } from './storage.service.spec';

describe('LocalStorageService', () => {
  setupTests<LocalStorageService>(LocalStorageService, 'local storage');
});
