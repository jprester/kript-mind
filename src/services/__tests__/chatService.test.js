import { chatService } from "../chatService";

test('chatService function should return orignal message if the passed string does not satisfy the condition', () => {
  const msg = "blabla";
  const expected = "blabla";
  const result = chatService(msg)

  expect(result).toEqual(expected)
})

test('chatService function should return "nothing" if we passed "something" ', () => {
  const msg = "something";
  const expected = "nothing";
  const result = chatService(msg)

  expect(result).toEqual(expected)
})
