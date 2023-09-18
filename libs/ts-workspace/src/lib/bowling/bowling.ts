export function scoreGameTs(game: number[]): number {
  // Create our list of 10 frames
  const frames: number[][] = [];

  for (let i = 0; i < game.length; i += 2) {
    let newFrame: number[];

    const frameSum = game[i] + game[i + 1];
    if (i === 18 && (frameSum == 10 || frameSum == 20)) {
      newFrame = [frameSum, game[i + 2]];
      i++; // Skip the next roll since we are in the 10th frame
    } else if (game[i] === 10) {
      newFrame = [frameSum, game[i + 2], game[i + 2] === 10 ? game[i + 4] : game[i + 3]];
    } else if (frameSum === 10) {
      newFrame = [frameSum, game[i + 2]];
    } else {
      newFrame = [frameSum];
    }

    // Push a new element to the end of array
    frames.push(newFrame);
  }

  // Now calculate our total score over all frames
  // We can use flat() if targeting ES2019+
  return frames.flat().reduce(function (score1, score2) {
    return score1 + score2;
  });
}

export function scoreGameTs2(game: number[]): number {
  // Create our list of 10 frames
  const frames: number[][] = [];

  for (let i = 0; i < game.length; i += 2) {
    let newFrame: number[];

    const frameSum = game[i] + game[i + 1];
    if (i === 18 && (frameSum == 10 || frameSum == 20)) {
      newFrame = [frameSum, game[i + 2]];
      i++; // Skip the next roll since we are in the 10th frame
    } else if (game[i] === 10) {
      newFrame = [frameSum, game[i + 2], game[i + 2] === 10 ? game[i + 4] : game[i + 3]];
    } else if (frameSum === 10) {
      newFrame = [frameSum, game[i + 2]];
    } else {
      newFrame = [frameSum];
    }

    // Push a new element to the end of array
    frames.push(newFrame);
  }

  // Now calculate our total score over all frames
  return frames
    .reduce(function (frame1, frame2) {
      return frame1.concat(frame2);
    })
    .reduce(function (score1, score2) {
      return score1 + score2;
    });
}

export function scoreGameTs3(game: number[]): number {
  let score = 0;
  // Create our list of 10 frames
  const frames: number[][] = [];

  for (let i = 0; i < game.length; i += 2) {
    let newFrame: number[];

    const frameSum = game[i] + game[i + 1];
    if (i === 18) {
      if (frameSum == 10 || frameSum == 20) {
        newFrame = [frameSum, game[i + 2]];
        i++; // Skip the next roll since we are in the 10th frame
      } else {
        newFrame = [frameSum];
      }
    } else if (game[i] === 10) {
      if (game[i + 2] === 10) {
        newFrame = [frameSum, game[i + 2], game[i + 4]];
      } else {
        newFrame = [frameSum, game[i + 2], game[i + 3]];
      }
    } else if (frameSum === 10) {
      newFrame = [frameSum, game[i + 2]];
    } else {
      newFrame = [frameSum];
    }

    // Push a new element to the end of array
    frames.push(newFrame);
  }

  // Now calculate our total score over all frames
  while (frames.length > 0) {
    // Remove the first frame from the array so we can process it
    const curFrame = frames.shift();
    if (curFrame !== undefined) {
      while (curFrame.length > 0) {
        const potentialScore = curFrame.shift();
        if (potentialScore !== undefined) {
          score += potentialScore;
        }
      }
    }
  }

  return score;
}
