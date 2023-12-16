import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

/**
 * The Elf would first like to know which games would have been possible if the bag contained
 * only 12 red cubes, 13 green cubes, and 14 blue cubes?
 */

function removeSpecialAfterWord(text: string) {
  return text.replace(/\b(\w+)\W+/g, "$1");
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const parsedInput = input.split("\n");
  const parsedLine = (line: string) => {
    return line.split(":").map((section) => section.split(/[;," "]/));
  };

  let answer = 0;

  for (let i = 0; i < parsedInput.length; i++) {
    const element = parsedInput[i];
    const line = parsedLine(element);

    const [bag, contains] = line;
    const bagNumber = bag[1];

    let shouldAdd = true;

    for (let k = 0; k < contains.length; k++) {
      if (
        (parseInt(contains[k]) > 12 && contains[k + 1] === "red") ||
        (parseInt(contains[k]) > 13 && contains[k + 1] === "green") ||
        (parseInt(contains[k]) > 14 && contains[k + 1] === "blue")
      ) {
        shouldAdd = false;
      }
    }

    if (shouldAdd) answer = answer + parseInt(bagNumber);

    // 12 red cubes, 13 green cubes, and 14 blue cubes
  }

  return answer;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
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
