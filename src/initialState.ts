export interface EntityState<T> {
  errors: {
    [queryKey: string]: object,
  };
  items: {
    [id: string]: T,
  };
  loaders: {
    [queryKey: string]: boolean,
  };
  queries: {
    [queryKey: string]: string[],
  };
}

export default function createInitialState<T>(): EntityState<T> {
  return {
    errors: {},
    items: {},
    loaders: {},
    queries: {},
  };
}
