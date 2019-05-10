import { checkScore } from "../../../CasinoBlackJack/utils/utils";

const generateSampleHand = values => values.map(value => ({ value }));

test("should give 7 for 3 and 4", () => {
  const hand = generateSampleHand([3, 4]);
  const score = checkScore(hand);
  expect(score).toBe(7);
});
test("should give 16 for J and 6", () => {
  const hand = generateSampleHand(["J", 6]);
  const score = checkScore(hand);
  expect(score).toBe(16);
});
test("should give BLACKJACK for 10 and A", () => {
  const hand = generateSampleHand(["A", 10]);
  const score = checkScore(hand);
  expect(score).toBe("BLACKJACK");
});
test("should give BLACKJACK for Q and A", () => {
  const hand = generateSampleHand(["A", "Q"]);
  const score = checkScore(hand);
  expect(score).toBe("BLACKJACK");
});
test("should give BURST for 10, 5 and 7", () => {
  const hand = generateSampleHand([5, 7, 10]);
  const score = checkScore(hand);
  expect(score).toBe("BURST");
});
test("should give BURST for 6, J and K", () => {
  const hand = generateSampleHand([6, "J", "K"]);
  const score = checkScore(hand);
  expect(score).toBe("BURST");
});
test("should give soft 14 for A and 3", () => {
  const hand = generateSampleHand(["A", 3]);
  const score = checkScore(hand);
  expect(score).toBe("soft 14");
});
test("should give 14 for A, 3 and 10", () => {
  const hand = generateSampleHand(["A", 3, 10]);
  const score = checkScore(hand);
  expect(score).toBe(14);
});
