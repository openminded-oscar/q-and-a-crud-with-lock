export const splitArray = (arr: any[], limit: number) => {
  const amount = (arr.length) / limit + 1;
  const arrays = [];
  for (let i = 0; i < amount; i++) {
    const offset = limit * i;
    const arrPart = arr.slice(offset, i * (limit + 1));
    arrays.push(arrPart);
  }
};
const arrays = splitArray([1, 2, 3], 2);
console.log(JSON.stringify(arrays));
