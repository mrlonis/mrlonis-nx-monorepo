import { scoreGameTypeScript, scoreGameTypeScript2, scoreGameTypeScript3 } from './bowling';
import { scoreGame } from './bowling-js';

describe('typescriptWorkspace', () => {
  const game1 = [9, 0, 3, 5, 6, 1, 3, 6, 8, 1, 5, 3, 2, 5, 8, 0, 7, 1, 8, 1];
  const game2 = [9, 0, 3, 7, 6, 1, 3, 7, 8, 1, 5, 5, 0, 10, 8, 0, 7, 3, 8, 2, 8];
  const game3 = [10, 0, 3, 7, 6, 1, 10, 0, 10, 0, 10, 0, 2, 8, 9, 0, 7, 3, 10, 10, 10];

  it('should score games - TypeScript', () => {
    let result: number = scoreGameTypeScript(game1);
    expect(result).toEqual(82);

    result = scoreGameTypeScript(game2);
    expect(result).toEqual(131);

    result = scoreGameTypeScript(game3);
    expect(result).toEqual(193);
  });

  it('should score games - TypeScript 2', () => {
    let result: number = scoreGameTypeScript2(game1);
    expect(result).toEqual(82);

    result = scoreGameTypeScript2(game2);
    expect(result).toEqual(131);

    result = scoreGameTypeScript2(game3);
    expect(result).toEqual(193);
  });

  it('should score games - TypeScript 3', () => {
    let result: number = scoreGameTypeScript3(game1);
    expect(result).toEqual(82);

    result = scoreGameTypeScript3(game2);
    expect(result).toEqual(131);

    result = scoreGameTypeScript3(game3);
    expect(result).toEqual(193);
  });

  it('should score games - JavaScript', () => {
    let result: number = scoreGame(game1) as number;
    expect(result).toEqual(82);

    result = scoreGame(game2) as number;
    expect(result).toEqual(131);

    result = scoreGame(game3) as number;
    expect(result).toEqual(193);
  });
});
