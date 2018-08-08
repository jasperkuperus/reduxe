import { createStore } from 'redux'
import TestEntity from './TestEntity';
import createReducer from '../src/reducer';

describe('Reducer', () => {
  let store;
  beforeEach(() => {
    store = createStore(createReducer<TestEntity>());
  });

  it('should have correct initial state', () => {
    const state = store.getState();

    expect(Object.keys(state).length).toEqual(4);
    expect(state.loaders).toEqual({});
    expect(state.errors).toEqual({});
    expect(state.items).toEqual({});
    expect(state.queries).toEqual({});
  });
});
