import run from "aocrunner";

function parseInput(input: string) {
  const lines = input.split("\n");
  const times = lines[0].match(/[^ ]+/g);
  const distances = lines[1].match(/[^ ]+/g);

  if (!times || !distances) throw new Error("Invalid input");

  return [times, distances];
}

function solutions(stringTime: string, stringDistance: string) {
  const time = parseInt(stringTime);
  const distance = parseInt(stringDistance);

  let numOfSolutions = 0;

  for (let i = 0; i <= time; i++) {
    const speed = i;

    if ((time - i) * speed > distance) numOfSolutions++;
  }

  return numOfSolutions;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  input[0]?.shift();
  input[1]?.shift();

  let total = 1;

  for (let i = 0; i < input[0].length; i++) {
    total *= solutions(input[0][i], input[1][i]);
  }
  return total;
};

const part2 = (rawInput: string) => {
  function parseInput(input: string) {
    const lines = input.split("\n");
    const times = lines[0];
    const distances = lines[1];

    if (!times || !distances) throw new Error("Invalid input");

    return [times, distances];
  }
  const input = parseInput(rawInput);

  const newTime = input[0].replace(/[^\d]/g, "");
  const newDistance = input[1].replace(/[^\d]/g, "");

  return solutions(newTime, newDistance);
};

run({
  part1: {
    tests: [
      {
        input: `
        Time:      7  15   30
        Distance:  9  40  200
      `,
        expected: 288,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        Time:      7  15   30
        Distance:  9  40  200
      `,
        expected: 71503,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
