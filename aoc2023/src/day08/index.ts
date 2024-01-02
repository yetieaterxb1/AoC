import run from "aocrunner";

//ts-ignore-file

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.split("\n");

  const directions = lines[0].split("");

  let options = {};

  for (let i = 2; i <= lines.length - 1; i++) {
    const line = lines[i];
    const [from, to] = line.split(" = ");

    const toMap = to.split(",");

    options[from] = [
      toMap[0].replace(/[^a-zA-Z]+/g, ""),
      toMap[1].replace(/[^a-zA-Z]+/g, ""),
    ];
  }

  let current = "AAA";
  let counter = 0;
  for (let i = 0; i < directions.length + 1; i++) {
    if (i === directions.length) {
      i = 0;
    }

    if (directions[i] === "L") {
      current = options[current][0];
    }

    if (directions[i] === "R") {
      current = options[current][1];
    }
    counter++;

    if (current === "ZZZ") {
      break;
    }
  }

  return counter;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n");
  const moves = input[0].replace(/L/g, "0").replace(/R/g, "1").split("");
  const nodes = {};
  const current = [];
  for (const line of input.slice(2)) {
    const node = line.split(" = ");
    nodes[node[0]] = JSON.parse(
      node[1].replace("(", '["').replace(")", '"]').replace(", ", '", "'),
    );
    if (node[0].endsWith("A")) current.push(node[0]);
  }
  const result = Array(current.length).fill(0);

  for (let i = 0; i < current.length; i++) {
    while (!current[i].endsWith("Z")) {
      for (const move of moves) {
        current[i] = nodes[current[i]][move];
        result[i]++;
        if (current[i].endsWith("Z")) break;
      }
    }
  }

  function lcm(...numbers) {
    return numbers.reduce((a, b) => (a * b) / gcd(a, b));
  }

  function gcd(...numbers) {
    return numbers.reduce((a, b) => {
      while (b) {
        const t = b;
        b = a % b;
        a = t;
      }
      return a;
    });
  }

  return lcm(...result);
};

run({
  part1: {
    tests: [
      {
        input: `
        LLR

        AAA = (BBB, BBB)
        BBB = (AAA, ZZZ)
        ZZZ = (ZZZ, ZZZ)
        `,
        expected: 6,
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
