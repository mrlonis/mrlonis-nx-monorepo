export class StorageServiceBase {
  constructor(protected readonly storage: Storage) {}

  get<T = unknown>(key: string, defaultValue: T | null = null): T | null {
    if (this.storage) {
      const item = this.storage.getItem(key);
      if (item != null) {
        return JSON.parse(item) as T;
      }
      return defaultValue;
    }

    return null;
  }

  set<T = unknown>(key: string, value: T): boolean {
    if (this.storage) {
      this.storage.setItem(key, JSON.stringify(value));

      return true;
    }

    return false;
  }

  remove(key: string): boolean {
    if (this.storage) {
      this.storage.removeItem(key);

      return true;
    }

    return false;
  }

  get isSupported(): boolean {
    return !!this.storage;
  }
}
