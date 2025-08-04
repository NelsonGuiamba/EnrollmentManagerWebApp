export function getObjectWithKey<T, K extends keyof T>(
  array: T[],
  key: K,
  value: T[K]
): T | undefined {
  for (const obj of array) {
    if (obj[key] === value) {
      return obj;
    }
  }
  return undefined;
}
function updateOrInsert<T, K extends keyof T>(
  array: T[],
  key: K,
  value: T[K],
  newObject: T
): void {
  const index = array.findIndex(obj => obj[key] === value);
  if (index !== -1) {
    array[index] = newObject; // sobrescreve totalmente
  } else {
    array.push(newObject); // insere
  }
}


function getClassname(clas: number) {
  const classes = ['First', 'Second', 'Third', 'Forth', "Fifth"]
  return classes[clas % classes.length]
}

