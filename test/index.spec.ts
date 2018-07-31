import { hi } from '../src';

describe('hi', () => {
  it('should return a greeting', () => {
    expect(hi('mister')).toEqual('Hi mister!');
  });
});
