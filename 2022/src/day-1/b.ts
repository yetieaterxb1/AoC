import { readData } from '../utils';
import chalk from 'chalk';

export async function day1b(dataPath?: string) {
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

  const combinedArray: number[] = [];

  list.map((calorieArray) => {
    const currentCount = calorieArray.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);

    combinedArray.push(currentCount);
  });
  const sortedArray = combinedArray.sort((a, b) => b - a);
  console.log(sortedArray);

  return sortedArray.slice(0, 3).reduce((acc, val) => acc + val);
}

// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day1b().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
