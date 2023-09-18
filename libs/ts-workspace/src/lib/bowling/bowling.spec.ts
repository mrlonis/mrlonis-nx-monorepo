import { scoreGameTs, scoreGameTs2, scoreGameTs3 } from './bowling';
import { scoreGame, scoreGame2, scoreGame3 } from './bowling-js';

describe('score bowling games', () => {
  const game1 = [9, 0, 3, 5, 6, 1, 3, 6, 8, 1, 5, 3, 2, 5, 8, 0, 7, 1, 8, 1];
  const game2 = [9, 0, 3, 7, 6, 1, 3, 7, 8, 1, 5, 5, 0, 10, 8, 0, 7, 3, 8, 2, 8];
  const game3 = [10, 0, 3, 7, 6, 1, 10, 0, 10, 0, 10, 0, 2, 8, 9, 0, 7, 3, 10, 10, 10];

  it('should score games - TypeScript', () => {
    let result: number = scoreGameTs(game1);
    expect(result).toEqual(82);

    result = scoreGameTs(game2);
    expect(result).toEqual(131);

    result = scoreGameTs(game3);
    expect(result).toEqual(193);
  });

  it('should score games - TypeScript 2', () => {
    let result: number = scoreGameTs2(game1);
    expect(result).toEqual(82);

    result = scoreGameTs2(game2);
    expect(result).toEqual(131);

    result = scoreGameTs2(game3);
    expect(result).toEqual(193);
  });

  it('should score games - TypeScript 3', () => {
    let result: number = scoreGameTs3(game1);
    expect(result).toEqual(82);

    result = scoreGameTs3(game2);
    expect(result).toEqual(131);

    result = scoreGameTs3(game3);
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

  it('should score games - JavaScript 2', () => {
    let result: number = scoreGame2(game1) as number;
    expect(result).toEqual(82);

    result = scoreGame2(game2) as number;
    expect(result).toEqual(131);

    result = scoreGame2(game3) as number;
    expect(result).toEqual(193);
  });

  it('should score games - JavaScript 3', () => {
    let result: number = scoreGame3(game1);
    expect(result).toEqual(82);

    result = scoreGame3(game2);
    expect(result).toEqual(131);

    result = scoreGame3(game3);
    expect(result).toEqual(193);
  });
});
