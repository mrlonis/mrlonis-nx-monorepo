import { Test } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService]
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Welcome to nx-angular-tutorial-api!"', () => {
      expect(service.getData()).toEqual([{ title: 'Todo 1' }, { title: 'Todo 2' }]);
    });
  });
});
