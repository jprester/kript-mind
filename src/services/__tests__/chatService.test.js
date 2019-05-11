import { checkForErrors } from "../chatService";

test('checkForErrors function should return "The message is empty" string if we dont pass anything', () => {
  const expected = "The message is empty.";
  const result = checkForErrors();

  expect(result).toEqual(expected);
});

test('checkForErrors function should return "Please write text" string if we dont pass text', () => {
  const expected = "Please write text.";
  const result = checkForErrors(3);

  expect(result).toEqual(expected);
});

test('checkForErrors function should return "Please dont use forbidden characters. (/,*, +, `, {, (, < ....) " string if we pass forbidden characters', () => {
  const expected = "Please write text.";
  const result = checkForErrors(3);

  expect(result).toEqual(expected);
});

test('checkForErrors function should return "Messages needs to have more than 6 and less than 180 characters.', () => {
  const expected = "Messages needs to have more than 6 and less than 180 characters.";
  const result = checkForErrors("Hello");

  expect(result).toEqual(expected);
});
