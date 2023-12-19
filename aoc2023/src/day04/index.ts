import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = rawInput.split("\n");

  let answer = 0;

  for (let i = 0; i < input.length; i++) {
    let winningCount = 0;

    input[i] = input[i].split(":");
    input[i] = input[i].pop(input[i][0]);
    input[i] = input[i].split("|");
    input[i] = [input[i][0].split(" "), input[i][1].split(" ")];

    for (let j = 0; j < input[i][1].length; j++) {
      if (parseInt(input[i][1][j]) && input[i][0].includes(input[i][1][j])) {
        winningCount === 0
          ? (winningCount = 1)
          : (winningCount = winningCount * 2);
      }

      if (j === input[i][1].length - 1) {
        answer = answer + winningCount;
      }
    }
  }

  return answer;
};

const part2 = (rawInput: string) => {
  const games = parseInput(rawInput).split("\n");
  let points = 0;
  let cards = [];

  for (let i = 0; i < games.length; i++) {
    let gameData = games[i].substring(games[i].indexOf(":") + 1);
    let parts = gameData.split("|");
    let winningNumbers = parts[0].trim().split(" ");
    let winningLookup = {};
    let count = 0;
    for (let j = 0; j < winningNumbers.length; j++) {
      // Unlike the training data, input data has extra spaces between numbers
      if (winningNumbers[j] == "") {
        continue;
      }
      let number = Number(winningNumbers[j]);
      winningLookup[number] = true;
    }
    let myNumbers = parts[1].trim().split(" ");
    for (let j = 0; j < myNumbers.length; j++) {
      let number = Number(myNumbers[j]);
      if (winningLookup[number]) {
        count++;
      }
    }

    cards.push({ name: i, matches: count, processed: false });
    if (count > 0) {
      points = points + 2 ** (count - 1);
    }
  }

  console.log(`Part 1: ${points} points`);

  let index = 0;
  while (index < cards.length) {
    let name = cards[index].name;
    for (let i = 0; i < cards[index].matches; i++) {
      cards.push({
        name: cards[name + i + 1].name,
        matches: cards[name + i + 1].matches,
        processed: false,
      });
    }
    cards[index].processed = true;
    index++;
  }

  return cards.length;
};

run({
  part1: {
    tests: [
      {
        input: `
        Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
        Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
        Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
        Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
        Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
        Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
        `,
        expected: "13",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
        Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
        Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
        Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
        Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
        Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
        `,
        expected: "30",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
