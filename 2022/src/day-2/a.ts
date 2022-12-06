import { readData } from '../utils';
import chalk from 'chalk';

export async function day2a(dataPath?: string) {
  const data = await readData(dataPath);

  let total = 0;

  for (let i = 0; i < data.length; i++) {
    const elfLetter = data[i][0];
    const yourLetter = data[i][data[i].length - 1];

    if (elfLetter === 'A') {
      if (yourLetter === 'X') {
        total = total + 4;
      }
      if (yourLetter === 'Y') {
        total = total + 8;
      }
      if (yourLetter === 'Z') {
        total = total + 3;
      }
    }
    if (elfLetter === 'B') {
      if (yourLetter === 'X') {
        total = total + 1;
      }
      if (yourLetter === 'Y') {
        total = total + 5;
      }
      if (yourLetter === 'Z') {
        total = total + 9;
      }
    }
    if (elfLetter === 'C') {
      if (yourLetter === 'X') {
        total = total + 7;
      }
      if (yourLetter === 'Y') {
        total = total + 2;
      }
      if (yourLetter === 'Z') {
        total = total + 6;
      }
    }
  }
  return total;
}

// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day2a().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
