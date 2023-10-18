import mut from './module.js'; // MUT = Module Under Test

test('Testing sum -- success', () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});

test('Testing sum -- fail', () => {
    const expected = 32;
    const got = mut.sum(12, 18);
    expect(got).not.toBe(expected);
  });

test('Testing div -- success', () => {
    const expected = 2;
    const got = mut.div(12, 6);
    expect(got).toBe(expected);
})

test('Testing div -- fail', () => {
    const expected = 1;
    const got = mut.div(12, 6);
    expect(got).not.toEqual(expected);
})

test('Testing containsNumber -- success', () => {
    const text = 'asdja 3 as'
    const got = mut.containsNumbers(text);
    expect(got).toBeTruthy();
})

test('Testing containsNumber -- success', () => {
    const text = 'asdjaas'
    const got = mut.containsNumbers(text);
    expect(got).toBeFalsy();
})

test('Testing containsNumber -- fail', () => {
    const text = 'asdjaas'
    const got = mut.containsNumbers(text);
    expect(got).toBeFalsy();
})

test('Testing containsNumber -- success', () => {
    const text = ' '
    const got = mut.containsNumbers(text);
    expect(got).toBeTruthy();
})

