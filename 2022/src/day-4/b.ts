import { readData } from '../utils';
import chalk from 'chalk';

export async function day4b(dataPath?: string) {
  const data = await readData(dataPath);
  let count = 0;

  for (let i = 0; i < data.length; i++) {
    const splitNumbers = data[i].match(/(?:\d+\.)?\d+/g);

    if (
      (Number(splitNumbers[0]) <= Number(splitNumbers[2]) &&
        Number(splitNumbers[1]) >= Number(splitNumbers[2])) ||
      (Number(splitNumbers[0]) >= Number(splitNumbers[2]) &&
        Number(splitNumbers[0]) <= Number(splitNumbers[3]))
    ) {
      count = count + 1;
    }
  }

  return count;
}

// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day4b().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
