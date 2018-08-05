export type EntityState<T> = {
  loaders: {
    [queryKey: string]: boolean,
  },
  errors: {
    [queryKey: string]: Object,
  },
  items: {
    [id: string]: T,
  },
  queries: {
    [queryKey: string]: string[],
  },
};

export default function createInitialState<T>(): EntityState<T> {
  return {
    loaders: {},
    errors: {},
    items: {},
    queries: {},
  };
}
