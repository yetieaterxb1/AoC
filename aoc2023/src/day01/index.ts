import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const parsedInput = input.split("\n");

  let answer = 0;

  for (let i = 0; i < parsedInput.length; i++) {
    const element = parsedInput[i];
    let firstNum = "";
    let lastNum = "";

    for (let k = 0; k <= element.length; k++) {
      if (k === element.length) {
        const newNum = firstNum + lastNum;
        answer = answer + parseInt(newNum);
        firstNum = "";
        lastNum = "";
      }
      const item = element[k];

      if (item && item.toUpperCase() === item.toLowerCase()) {
        firstNum.length ? (lastNum = item) : (firstNum = item);
        lastNum = item;
      }
    }
  }

  return answer;
};

function extractNumbers(data) {
  const copy = {
    one: "o1e",
    two: "t2o",
    three: "t3e",
    four: "f4r",
    five: "f5e",
    six: "s6x",
    seven: "s7n",
    eight: "e8t",
    nine: "n9e",
  };

  Object.keys(copy).forEach((key) => {
    data = data.replaceAll(key, copy[key]);
  });

  return data.split("\n");
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const parsedInput = extractNumbers(input);

  let answer = 0;

  for (let i = 0; i < parsedInput.length; i++) {
    const element = parsedInput[i];
    let firstNum = "";
    let lastNum = "";

    for (let k = 0; k <= element.length; k++) {
      if (k === element.length) {
        const newNum = firstNum + lastNum;
        answer = answer + parseInt(newNum);
        firstNum = "";
        lastNum = "";
      }
      const item = element[k];

      if (item && item.toUpperCase() === item.toLowerCase()) {
        firstNum.length ? (lastNum = item) : (firstNum = item);
        lastNum = item;
      }
    }
  }

  // zoneight234
  // answer 14

  // [z, o, n, e, i, g, h, t, 2, 3, 4]
  // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return answer;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
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
