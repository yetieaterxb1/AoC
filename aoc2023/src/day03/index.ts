import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const grid = input.split(/\n/g).map((line) => line.split(""));
  let sum = 0;

  for (let y = 0; y < grid.length; y++) {
    let currentNumber = "",
      checkNumber = false,
      nearSymbol = false;

    for (let x = 0; x < grid[y].length; x++) {
      // if current spot is a number and we aren't checking them yet, start checking
      if (grid[y][x].match(/[0-9]/) && !checkNumber) {
        checkNumber = true;
        currentNumber = "";
        nearSymbol = false;
      }

      // if we find a non-number or at end of the row, stop checking and add to sum if needed
      if (
        (x == grid[y].length - 1 || !grid[y][x].match(/[0-9]/)) &&
        checkNumber
      ) {
        if (nearSymbol)
          sum += parseInt(
            currentNumber + (grid[y][x].match(/[0-9]/) ? grid[y][x] : ""),
          );
        checkNumber = false;
      }

      // if we are checking for numbers, add current spot to number and check for symbols around it
      if (checkNumber) {
        currentNumber += grid[y][x];

        // check for symbol around current spot
        for (let j = -1; j <= 1; j++) {
          for (let i = -1; i <= 1; i++) {
            if (i == 0 && j == 0) continue;
            if (
              y + j < 0 ||
              y + j >= grid.length ||
              x + i < 0 ||
              x + i >= grid[y].length
            )
              continue;

            // anything that is not a number or . is a symbol
            if (!grid[y + j][x + i].match(/[0-9.]/)) nearSymbol = true;
          }
        }
      }
    }
  }

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split(/\n/g);
  const numCols = input[0].length;
  const array = input.map((i) => i.split(""));

  const checkItem = (rowIdx: number, startIdx: number, endIdx: number) => {
    if (startIdx > 0 && array[rowIdx][startIdx - 1] === "*")
      return `${rowIdx},${startIdx - 1}`;

    if (endIdx < numCols - 1 && array[rowIdx][endIdx + 1] === "*")
      return `${rowIdx},${endIdx + 1}`;

    for (let i = startIdx - 1; i <= endIdx + 1; i++) {
      if (i >= 0 && i < numCols) {
        if (rowIdx > 0 && array[rowIdx - 1][i] === "*")
          return `${rowIdx - 1},${i}`;
        else if (rowIdx < input.length - 2 && array[rowIdx + 1][i] === "*")
          return `${rowIdx + 1},${i}`;
      }
    }
  };

  const gearRatios: { [key: string]: number[] } = input.reduce(
    (gearRatios, row, idx) => {
      ([...row.matchAll(/\d+/g)] || []).forEach((match) => {
        const num = Number(match[0]);
        const startIdx = match.index ?? -1;
        const endIdx = startIdx + match[0].length - 1;

        const key = checkItem(idx, startIdx, endIdx);
        if (key) {
          gearRatios = {
            ...gearRatios,
            [key]: [...(gearRatios[key] || []), num],
          };
        }
      });

      return gearRatios;
    },
    {} as { [key: string]: number[] },
  );

  const sum = Object.values(gearRatios)
    .filter((values) => values.length === 2)
    .reduce((sum, gear) => sum + gear[0] * gear[1], 0);

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `
        467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..
        `,
        expected: "4361",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..`,
        expected: "467835",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
