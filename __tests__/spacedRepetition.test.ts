import { isReviewDue, scheduleReview } from '@/features/progress/spacedRepetition';

describe('spaced repetition', () => {
  const now = new Date('2026-06-19T08:00:00.000Z');

  test('incorrect answers reset to same-day review', () => {
    const review = scheduleReview({ intervalDays: 7 }, false, now);
    expect(review.intervalDays).toBe(0);
    expect(isReviewDue(review, now)).toBe(true);
  });

  test('correct answers progress through 0, 2, 7, 21 day intervals', () => {
    expect(scheduleReview(undefined, true, now).intervalDays).toBe(0);
    expect(scheduleReview({ intervalDays: 0 }, true, now).intervalDays).toBe(2);
    expect(scheduleReview({ intervalDays: 2 }, true, now).intervalDays).toBe(7);
    expect(scheduleReview({ intervalDays: 7 }, true, now).intervalDays).toBe(21);
    expect(scheduleReview({ intervalDays: 21 }, true, now).intervalDays).toBe(21);
  });
});
