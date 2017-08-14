import { Yow } from '../src/yow';

test('Should greet with message', () => {
  const greeter = new Yow('friend');
  expect(greeter.greet()).toBe('Bonjour, friend!');
});
