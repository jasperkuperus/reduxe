import createReducer from '../src/reducer';

describe('Reducer', () => {
  it('should have correct initial state', () => {
    const reducer = createReducer<string>();
    const state = reducer(undefined, { type: 'some-unknown-action' });

    expect(Object.keys(state).length).toEqual(4);
    expect(state.loaders).toEqual({});
    expect(state.errors).toEqual({});
    expect(state.items).toEqual({});
    expect(state.queries).toEqual({});
  });
});
