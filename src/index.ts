import createInitialState from './initialState';

export function hi(name: string) {
  return `Hi ${name}!`;
}

const initialState = createInitialState<string>();

// tslint:disable-next-line:no-console
console.log(hi('mister'), initialState);
