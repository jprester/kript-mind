import { checkforErrors } from "../chatService";

test('checkforErrors function should return "The message is empty" string if we dont pass anything', () => {
  const expected = "The message is empty.";
  const result = checkforErrors();

  expect(result).toEqual(expected);
});

test('checkforErrors function should return "Please write text" string if we dont pass text', () => {
  const expected = "Please write text.";
  const result = checkforErrors(3);

  expect(result).toEqual(expected);
});

test('checkforErrors function should return "Please dont use forbidden characters. (/,*, +, `, {, (, < ....) " string if we pass forbidden characters', () => {
  const expected = "Please write text.";
  const result = checkforErrors(3);

  expect(result).toEqual(expected);
});

test('checkforErrors function should return "Messages needs to have more than 6 and less than 180 characters.', () => {
  const expected = "Messages needs to have more than 6 and less than 180 characters.";
  const result = checkforErrors("Hello");

  expect(result).toEqual(expected);
});
