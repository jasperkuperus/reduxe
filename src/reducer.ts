import createInitialState, { EntityState } from './initialState';

export default function createReducer<T>() {
  return function reducer(state: EntityState<T> = createInitialState<T>(), action: any) {
    switch (action.type) {
      case 'ADD_ENTITY':
        return {
          ...state,
          items: {
            ...state.items,
            [action.entity.id]: action.entity,
          },
        };

      default:
        return state;
    }
  };
}
