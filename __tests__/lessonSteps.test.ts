import { lessons, questions } from '@/data/seedContent';
import { buildLessonSteps, getLessonStepCountLabel } from '@/features/curriculum/lessonSteps';

describe('bite-sized lesson step planning', () => {
  test('turns each lesson into a Duolingo-style step quest', () => {
    const lesson = lessons[0];
    const lessonQuestions = questions.filter((question) => question.lessonId === lesson.id);
    const steps = buildLessonSteps(lesson, lessonQuestions);

    expect(steps[0].type).toBe('intro');
    expect(steps.some((step) => step.type === 'idea')).toBe(true);
    expect(steps.some((step) => step.type === 'example')).toBe(true);
    expect(steps.some((step) => step.type === 'ai_age')).toBe(true);
    expect(steps.some((step) => step.type === 'question')).toBe(true);
    expect(steps.some((step) => step.type === 'reflection')).toBe(true);
    expect(steps[steps.length - 1].type).toBe('takeaway');
    expect(steps.length).toBeGreaterThanOrEqual(6);
  });

  test('provides a learner-friendly step count label', () => {
    const lesson = lessons[0];
    const label = getLessonStepCountLabel(lesson, questions.filter((question) => question.lessonId === lesson.id));
    expect(label).toContain('bite-sized steps');
  });
});
