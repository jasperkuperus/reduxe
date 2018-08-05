import createInitialState from '../src/initialState';

describe('initialState', () => {
  it('should have all expected fields', () => {
    const initialState = createInitialState<string>();

    expect(Object.keys(initialState).length).toEqual(4);
    expect(initialState.loaders).toEqual({});
    expect(initialState.errors).toEqual({});
    expect(initialState.items).toEqual({});
    expect(initialState.queries).toEqual({});
  });
});
