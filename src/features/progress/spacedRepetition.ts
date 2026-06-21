import { ReviewItem } from '@/types';

const intervals = [0, 2, 7, 21];

export function addDays(date: Date, days: number): Date {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

export function scheduleReview(previous: Pick<ReviewItem, 'intervalDays'> | undefined, correct: boolean, now = new Date()): Pick<ReviewItem, 'dueAt' | 'intervalDays' | 'lastResult'> {
  if (!correct) {
    return {
      dueAt: addDays(now, 0).toISOString(),
      intervalDays: 0,
      lastResult: 'incorrect'
    };
  }

  const previousInterval = previous?.intervalDays ?? -1;
  const currentIndex = intervals.indexOf(previousInterval);
  const nextInterval = intervals[Math.min(intervals.length - 1, currentIndex + 1)] ?? 2;
  return {
    dueAt: addDays(now, nextInterval).toISOString(),
    intervalDays: nextInterval,
    lastResult: 'correct'
  };
}

export function isReviewDue(item: Pick<ReviewItem, 'dueAt'>, now = new Date()): boolean {
  return new Date(item.dueAt).getTime() <= now.getTime();
}
