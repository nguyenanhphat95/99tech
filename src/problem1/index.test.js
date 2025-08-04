const { sum_to_n_a, sum_to_n_b, sum_to_n_c } = require('./index');

describe('sum_to_n_a', () => {
  test('should return 1 for n=1', () => {
    expect(sum_to_n_a(1)).toBe(1);
  });
  test('should return 6 for n=3', () => {
    expect(sum_to_n_a(3)).toBe(6);
  });
  test('should return 55 for n=10', () => {
    expect(sum_to_n_a(10)).toBe(55);
  });
});

describe('sum_to_n_b', () => {
  test('should return 1 for n=1', () => {
    expect(sum_to_n_b(1)).toBe(1);
  });
  test('should return 6 for n=3', () => {
    expect(sum_to_n_b(3)).toBe(6);
  });
  test('should return 55 for n=10', () => {
    expect(sum_to_n_b(10)).toBe(55);
  });
});

describe('sum_to_n_c', () => {
  test('should return 1 for n=1', () => {
    expect(sum_to_n_c(1)).toBe(1);
  });
  test('should return 6 for n=3', () => {
    expect(sum_to_n_c(3)).toBe(6);
  });
  test('should return 55 for n=10', () => {
    expect(sum_to_n_c(10)).toBe(55);
  });
});
