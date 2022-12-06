import { readData } from '../utils';
import chalk from 'chalk';

export async function day1a(dataPath?: string) {
  const data = await readData(dataPath);
  const arrayConverter = (data: string[]): number[][] => {
    const newArr = [[]];
    for (const line of data) {
      if (line === '') {
        newArr.push([]);
      } else newArr[newArr.length - 1].push(+line);
    }
    return newArr;
  };

  const list = arrayConverter(data);

  let elfNumber = 1;
  let calorieCount = 0;
  let elf = 1;

  list.map((calorieArray) => {
    const currentCount = calorieArray.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);

    if (currentCount > calorieCount) {
      calorieCount = currentCount;
      elf = elfNumber;
    }
    elfNumber++;
  });

  return calorieCount;
}

// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day1a().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
