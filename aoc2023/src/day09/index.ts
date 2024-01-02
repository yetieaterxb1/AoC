import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split("\n")
    .filter((line) => line !== "");

  const yValues = input.map((line) => line.split(" ").map((value) => +value));

  const lagrange = (x, xValues, yValues) => {
    let lagrangePol = 0;
    for (let i = 0; i < xValues.length; i++) {
      let basicsPol = 1;
      for (let j = 0; j < xValues.length; j++) {
        if (i !== j) {
          basicsPol *= (x - xValues[j]) / (xValues[i] - xValues[j]);
        }
      }
      lagrangePol += basicsPol * yValues[i];
    }
    return lagrangePol;
  };

  const n = yValues[0].length;

  const xValues = new Array(n).fill(0).map((_, i) => i);

  const nextLagranged = yValues.map((values) => lagrange(n, xValues, values));
  const previousLagranged = yValues.map((values) =>
    lagrange(-1, xValues, values),
  );

  const first = nextLagranged.reduce((acc, value) => acc + value, 0);
  // const second = previousLagranged.reduce((acc, value) => acc + value, 0);

  return Math.round(first);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split("\n")
    .filter((line) => line !== "");

  const yValues = input.map((line) => line.split(" ").map((value) => +value));

  const lagrange = (x, xValues, yValues) => {
    let lagrangePol = 0;
    for (let i = 0; i < xValues.length; i++) {
      let basicsPol = 1;
      for (let j = 0; j < xValues.length; j++) {
        if (i !== j) {
          basicsPol *= (x - xValues[j]) / (xValues[i] - xValues[j]);
        }
      }
      lagrangePol += basicsPol * yValues[i];
    }
    return lagrangePol;
  };

  const n = yValues[0].length;

  const xValues = new Array(n).fill(0).map((_, i) => i);

  const nextLagranged = yValues.map((values) => lagrange(n, xValues, values));
  const previousLagranged = yValues.map((values) =>
    lagrange(-1, xValues, values),
  );

  const second = previousLagranged.reduce((acc, value) => acc + value, 0);

  return Math.round(second);
};

run({
  part1: {
    tests: [
      {
        input: `
      10  13  16  21  30  45  68
        3   3   5   9  15  23
          0   2   4   6   8
            2   2   2   2
              0   0   0
              `,
        expected: 68,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
