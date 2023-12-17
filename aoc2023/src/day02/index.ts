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
  const parsedInput = input.split("\n");
  const parsedLine = (line: string) => {
    return line.split(":").map((section) => section.split(/[;," "]/));
  };

  let answer = 0;

  for (let i = 0; i < parsedInput.length; i++) {
    const element = parsedInput[i];
    const line = parsedLine(element);
    // console.log(line);

    const [bag, contains] = line;

    let colors = { red: undefined, green: undefined, blue: undefined };
    for (let k = 0; k < contains.length; k++) {
      if (
        parseInt(contains[k]) &&
        contains[k + 1] === "red" &&
        (colors.red == undefined || parseInt(contains[k]) > colors.red)
      )
        colors.red = parseInt(contains[k]);

      if (
        parseInt(contains[k]) &&
        contains[k + 1] === "green" &&
        (colors.green == undefined || parseInt(contains[k]) > colors.green)
      )
        colors.green = parseInt(contains[k]);

      if (
        parseInt(contains[k]) &&
        contains[k + 1] === "blue" &&
        (colors.blue == undefined || parseInt(contains[k]) > colors.blue)
      )
        colors.blue = parseInt(contains[k]);
    }
    const numToAdd =
      (colors.red ?? 0) * (colors.green ?? 0) * (colors.blue ?? 0);
    // console.log(numToAdd);
    answer = answer + numToAdd;
    // console.log(answer);
    // console.log(colors);
    // 12 red cubes, 13 green cubes, and 14 blue cubes
  }

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
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: "2286",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
