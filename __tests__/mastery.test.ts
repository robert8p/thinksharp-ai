import { lessons, questions } from '@/data/seedContent';
import { calculateQuestionScore, isLessonMastered, isModuleMastered, updateSkillScore } from '@/features/progress/mastery';

describe('mastery logic', () => {
  test('calculates question score', () => {
    const selected = questions.slice(0, 2);
    const answers = {
      [selected[0].id]: selected[0].correctAnswer,
      [selected[1].id]: 'wrong'
    };
    expect(calculateQuestionScore(selected, answers)).toBe(50);
  });

  test('lesson mastery requires threshold', () => {
    const lesson = lessons[0];
    expect(isLessonMastered(lesson, { lessonId: lesson.id, score: 84, completedAt: new Date().toISOString(), answers: {} })).toBe(false);
    expect(isLessonMastered(lesson, { lessonId: lesson.id, score: 85, completedAt: new Date().toISOString(), answers: {} })).toBe(true);
  });

  test('module completion requires required lessons and assessment threshold', () => {
    const moduleLessons = lessons.filter((lesson) => lesson.moduleId === 'm1-foundations');
    const attempts = moduleLessons.map((lesson) => ({ lessonId: lesson.id, score: 90, completedAt: new Date().toISOString(), answers: {} }));
    expect(isModuleMastered(moduleLessons, attempts, 84)).toBe(false);
    expect(isModuleMastered(moduleLessons, attempts, 85)).toBe(true);
  });

  test('skill score update stays bounded and moves toward result', () => {
    expect(updateSkillScore(40, 100, 3)).toBeGreaterThan(40);
    expect(updateSkillScore(95, 0, 5)).toBeGreaterThanOrEqual(0);
    expect(updateSkillScore(99, 100, 5)).toBeLessThanOrEqual(100);
  });
});
