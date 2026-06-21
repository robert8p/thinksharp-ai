import { lessons, questions } from '@/data/seedContent';
import { defaultSkillScores } from '@/features/progress/mastery';
import { recommendDailyTraining, weakestSkill } from '@/features/dailyTraining/recommendation';

const scores = { ...defaultSkillScores, ai_literacy: 12, logic: 50 };

describe('daily training recommendation', () => {
  test('chooses weakest or goal-adjacent skill', () => {
    expect(weakestSkill(scores)).toBe('ai_literacy');
  });

  test('prioritises due reviews over normal lesson path', () => {
    const recommendation = recommendDailyTraining({
      scores,
      lessons,
      questions,
      completedLessonIds: [],
      reviewItems: [{ id: 'r1', questionId: questions[0].id, dueAt: new Date('2020-01-01').toISOString(), intervalDays: 0, lastResult: 'incorrect' }]
    });
    expect(recommendation.mode).toBe('review');
  });
});
