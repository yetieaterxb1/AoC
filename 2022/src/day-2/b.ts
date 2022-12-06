import { readData } from '../utils';
import chalk from 'chalk';

export async function day2b(dataPath?: string) {
  const data = await readData(dataPath);

  let total = 0;

  for (var i = 0; i < data.length; i++) {
    let elfLetter = data[i][0];
    let yourLetter = data[i][data[i].length - 1];

    if (elfLetter === 'A') {
      //1
      if (yourLetter === 'X') {
        total = total + 3; //0 + 3
      }
      if (yourLetter === 'Y') {
        total = total + 4; //3 + 1
      }
      if (yourLetter === 'Z') {
        total = total + 8; //6 + 2
      }
    }
    if (elfLetter === 'B') {
      if (yourLetter === 'X') {
        total = total + 1; //0 + 1
      }
      if (yourLetter === 'Y') {
        total = total + 5; //3 + 2
      }
      if (yourLetter === 'Z') {
        total = total + 9; //6 + 3
      }
    }
    if (elfLetter === 'C') {
      if (yourLetter === 'X') {
        total = total + 2; //0 + 2
      }
      if (yourLetter === 'Y') {
        total = total + 6; //3 + 3
      }
      if (yourLetter === 'Z') {
        total = total + 7; //6 + 1
      }
    }
  }

  return total;
}

// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day2b().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
