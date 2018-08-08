import createInitialState, { EntityState } from './initialState';

export default function createReducer<T>() {
  return function reducer(state: EntityState<T> = createInitialState<T>(), action: any) {
    switch (action.type) {
      default:
        return state;
    }
  }
}
