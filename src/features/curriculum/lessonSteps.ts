import { Lesson, LessonContentBlock, Question } from '@/types';

export type LessonStep =
  | {
      id: string;
      type: 'intro';
      title: string;
      body: string;
      emoji: string;
      coach: string;
    }
  | {
      id: string;
      type: 'idea';
      title: string;
      body: string;
      emoji: string;
      biteLabel: string;
    }
  | {
      id: string;
      type: 'example';
      title: string;
      body: string;
      emoji: string;
      biteLabel: string;
    }
  | {
      id: string;
      type: 'ai_age';
      title: string;
      body: string;
      emoji: string;
      biteLabel: string;
    }
  | {
      id: string;
      type: 'question';
      title: string;
      emoji: string;
      biteLabel: string;
      question: Question;
    }
  | {
      id: string;
      type: 'reflection';
      title: string;
      body: string;
      emoji: string;
      biteLabel: string;
    }
  | {
      id: string;
      type: 'takeaway';
      title: string;
      body: string;
      emoji: string;
      biteLabel: string;
    };

function makeContentSteps(block: LessonContentBlock, lessonId: string, index: number): LessonStep[] {
  const safeIndex = index + 1;
  const steps: LessonStep[] = [
    {
      id: `${lessonId}-idea-${safeIndex}`,
      type: 'idea',
      title: block.heading,
      body: block.body,
      emoji: '💡',
      biteLabel: 'Learn the move'
    }
  ];

  if (block.example) {
    steps.push({
      id: `${lessonId}-example-${safeIndex}`,
      type: 'example',
      title: 'See it in real life',
      body: block.example,
      emoji: '👀',
      biteLabel: 'Example'
    });
  }

  if (block.aiAgeWhy) {
    steps.push({
      id: `${lessonId}-ai-age-${safeIndex}`,
      type: 'ai_age',
      title: 'Why this matters now',
      body: block.aiAgeWhy,
      emoji: '🤖',
      biteLabel: 'AI-age warning'
    });
  }

  if (block.reflectionPrompt) {
    steps.push({
      id: `${lessonId}-reflection-${safeIndex}`,
      type: 'reflection',
      title: 'Make it yours',
      body: block.reflectionPrompt,
      emoji: '🪞',
      biteLabel: 'Real-world transfer'
    });
  }

  return steps;
}

export function buildLessonSteps(lesson: Lesson, lessonQuestions: Question[]): LessonStep[] {
  const contentSteps = lesson.content.flatMap((block, index) => makeContentSteps(block, lesson.id, index));
  const questionSteps: LessonStep[] = lessonQuestions.map((question, index) => ({
    id: `${lesson.id}-question-${question.id}`,
    type: 'question',
    title: `Quick check ${index + 1}`,
    emoji: '🎯',
    biteLabel: 'Active practice',
    question
  }));

  return [
    {
      id: `${lesson.id}-intro`,
      type: 'intro',
      title: lesson.title,
      body: lesson.summary,
      emoji: '🌱',
      coach: 'Tiny steps. Instant feedback. You only finish when you prove the thinking move.'
    },
    ...contentSteps,
    ...questionSteps,
    {
      id: `${lesson.id}-takeaway`,
      type: 'takeaway',
      title: 'Tiny takeaway',
      body: `Today’s move: ${lesson.summary} Look for this once in real life today.`,
      emoji: '🏁',
      biteLabel: 'Lock it in'
    }
  ];
}

export function getLessonStepCountLabel(lesson: Lesson, lessonQuestions: Question[]): string {
  const steps = buildLessonSteps(lesson, lessonQuestions);
  return `${steps.length} bite-sized steps`;
}
