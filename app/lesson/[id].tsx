import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { CoachBubble } from '@/components/CoachBubble';
import { OptionCard } from '@/components/OptionCard';
import { ProgressBar } from '@/components/ProgressBar';
import { Screen } from '@/components/Screen';
import { buildLessonSteps, LessonStep } from '@/features/curriculum/lessonSteps';
import { lessons, questions, useAppStore } from '@/features/app/store';
import { isAnswerCorrect } from '@/features/progress/mastery';
import { track } from '@/lib/analytics';
import { colors, radii, spacing } from '@/theme/theme';

function StepShell({ step, stepNumber, totalSteps, children }: { step: LessonStep; stepNumber: number; totalSteps: number; children: ReactNode }) {
  return (
    <Card playful={step.type === 'question'} style={styles.stepCard}>
      <View style={styles.stepTopRow}>
        <View style={styles.emojiBadge}><AppText style={styles.emoji}>{step.emoji}</AppText></View>
        <View style={{ flex: 1 }}>
          {'biteLabel' in step && <AppText variant="small" style={styles.biteLabel}>{step.biteLabel}</AppText>}
          <AppText variant="h2">{step.title}</AppText>
        </View>
        <View style={styles.stepPill}><AppText variant="small">{stepNumber}/{totalSteps}</AppText></View>
      </View>
      {children}
    </Card>
  );
}

function LessonStepBody({
  step,
  answer,
  revealed,
  onAnswer
}: {
  step: LessonStep;
  answer?: string | string[];
  revealed: boolean;
  onAnswer: (value: string) => void;
}) {
  if (step.type === 'intro') {
    return (
      <View style={{ gap: spacing.md }}>
        <AppText>{step.body}</AppText>
        <CoachBubble text={step.coach} emoji="🦉" />
        <Card muted>
          <AppText variant="h3">How quests work</AppText>
          <AppText>Move through one tiny idea at a time, answer a quick check, get instant feedback, then retry later if needed.</AppText>
        </Card>
      </View>
    );
  }

  if (step.type === 'question') {
    const question = step.question;
    const correct = isAnswerCorrect(answer, question.correctAnswer);
    return (
      <View style={{ gap: spacing.md }}>
        <AppText>{question.prompt}</AppText>
        <View style={{ gap: spacing.sm }}>
          {question.options.map((option) => (
            <OptionCard key={option} label={option} selected={answer === option} onPress={() => onAnswer(option)} />
          ))}
        </View>
        {revealed && (
          <Card muted={!correct} playful={correct}>
            <AppText variant="h3">{correct ? 'Nice. That’s the move.' : 'Good rep. Let’s sharpen it.'}</AppText>
            <AppText style={{ color: correct ? colors.accentStrong : colors.orange }}>{question.explanation}</AppText>
          </Card>
        )}
      </View>
    );
  }

  return (
    <View style={{ gap: spacing.md }}>
      <AppText>{step.body}</AppText>
      {step.type === 'idea' && (
        <Card muted>
          <AppText variant="h3">Coach cue</AppText>
          <AppText>Pause, name the thinking move, then use it once before the next card.</AppText>
        </Card>
      )}
      {step.type === 'reflection' && (
        <Card playful>
          <AppText variant="h3">Your real-life mission</AppText>
          <AppText>Notice one place this shows up today. That transfer is where the skill becomes useful.</AppText>
        </Card>
      )}
    </View>
  );
}

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = lessons.find((candidate) => candidate.id === id);
  const lessonQuestions = questions.filter((question) => question.lessonId === id);
  const completeLesson = useAppStore((state) => state.completeLesson);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [revealedQuestionIds, setRevealedQuestionIds] = useState<string[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [score, setScore] = useState<number | null>(null);

  const steps = useMemo(() => (lesson ? buildLessonSteps(lesson, lessonQuestions) : []), [lesson, lessonQuestions]);
  const currentStep = steps[stepIndex];
  const progressValue = steps.length ? Math.round(((stepIndex + 1) / steps.length) * 100) : 0;
  const revealedCount = lessonQuestions.filter((question) => revealedQuestionIds.includes(question.id)).length;
  const correctCount = lessonQuestions.filter((question) => revealedQuestionIds.includes(question.id) && isAnswerCorrect(answers[question.id], question.correctAnswer)).length;
  const practiceHearts = Math.max(0, 3 - (revealedCount - correctCount));

  useEffect(() => {
    if (lesson) {
      track('lesson_started', { lessonId: lesson.id, mode: 'step_quest' });
    }
  }, [lesson]);

  if (!lesson || !currentStep) {
    return <Screen><AppText variant="h2">Lesson not found</AppText><Button onPress={() => router.back()}>Go back</Button></Screen>;
  }

  const setAnswer = (questionId: string, value: string) => {
    setAnswers((current) => ({ ...current, [questionId]: value }));
  };

  const finishLesson = () => {
    if (score !== null) return;
    const nextScore = completeLesson(lesson.id, answers);
    setScore(nextScore);
  };

  const goNext = () => {
    if (currentStep.type === 'question') {
      const question = currentStep.question;
      const hasAnswer = Boolean(answers[question.id]);
      const isRevealed = revealedQuestionIds.includes(question.id);
      if (!hasAnswer) return;
      if (!isRevealed) {
        setRevealedQuestionIds((current) => Array.from(new Set([...current, question.id])));
        return;
      }
    }

    if (stepIndex >= steps.length - 1) {
      finishLesson();
      return;
    }
    setStepIndex((current) => current + 1);
  };

  const goBackOneStep = () => {
    if (stepIndex === 0) {
      router.back();
      return;
    }
    setStepIndex((current) => current - 1);
  };

  if (score !== null) {
    const mastered = score >= lesson.masteryThreshold;
    return (
      <Screen>
        <FunResultHeader mastered={mastered} score={score} />
        <Card playful={mastered} muted={!mastered}>
          <AppText variant="h2">{mastered ? 'Quest complete!' : 'Practice unlocked'}</AppText>
          <AppText>{mastered ? 'You proved the thinking move and earned progress on your map.' : 'Not mastered yet. That is useful signal, not failure. Missed concepts are now review fuel.'}</AppText>
          <View style={styles.rewardRow}>
            <AppText>⚡ +{Math.max(20, Math.round(score / 2))} XP</AppText>
            <AppText>🎯 {score}% score</AppText>
          </View>
        </Card>
        <CoachBubble text={mastered ? 'Use this once today. Real-world transfer is the win.' : 'Retry the lesson or hit your review queue. Small reps compound quickly.'} emoji={mastered ? '🚀' : '🧩'} />
        <Button onPress={() => router.back()}>Back to learning map</Button>
        {!mastered && <Button variant="secondary" onPress={() => { setScore(null); setStepIndex(0); setRevealedQuestionIds([]); setAnswers({}); }}>Retry quest</Button>}
      </Screen>
    );
  }

  const questionNeedsAnswer = currentStep.type === 'question' && !answers[currentStep.question.id];
  const questionIsRevealed = currentStep.type === 'question' && revealedQuestionIds.includes(currentStep.question.id);
  const nextLabel = currentStep.type === 'question'
    ? questionIsRevealed ? (stepIndex >= steps.length - 1 ? 'Finish quest' : 'Continue') : 'Check answer'
    : stepIndex >= steps.length - 1 ? 'Finish quest' : 'Continue';

  return (
    <Screen>
      <View style={{ gap: spacing.sm }}>
        <View style={styles.metaRow}>
          <AppText variant="small">{lesson.estimatedMinutes} min quest</AppText>
          <AppText variant="small">{practiceHearts > 0 ? '💚'.repeat(practiceHearts) : '🧩'} practice hearts</AppText>
          <AppText variant="small">Pass {lesson.masteryThreshold}%</AppText>
        </View>
        <ProgressBar value={progressValue} />
      </View>

      <StepShell step={currentStep} stepNumber={stepIndex + 1} totalSteps={steps.length}>
        <LessonStepBody
          step={currentStep}
          answer={currentStep.type === 'question' ? answers[currentStep.question.id] : undefined}
          revealed={questionIsRevealed}
          onAnswer={(value) => currentStep.type === 'question' && setAnswer(currentStep.question.id, value)}
        />
      </StepShell>

      <View style={styles.navRow}>
        <Button variant="secondary" style={styles.navButton} onPress={goBackOneStep}>{stepIndex === 0 ? 'Exit' : 'Back'}</Button>
        <Button style={styles.navButton} onPress={goNext} disabled={questionNeedsAnswer}>{nextLabel}</Button>
      </View>
    </Screen>
  );
}

function FunResultHeader({ mastered, score }: { mastered: boolean; score: number }) {
  return (
    <Card playful={mastered} muted={!mastered} style={styles.resultHeader}>
      <AppText style={styles.resultEmoji}>{mastered ? '🏆' : '🧠'}</AppText>
      <AppText variant="small">LESSON RESULT</AppText>
      <AppText variant="h1">{score}%</AppText>
    </Card>
  );
}

const styles = StyleSheet.create({
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
    flexWrap: 'wrap'
  },
  stepCard: {
    minHeight: 420,
    justifyContent: 'space-between'
  },
  stepTopRow: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-start'
  },
  emojiBadge: {
    width: 62,
    height: 62,
    borderRadius: radii.xl,
    backgroundColor: colors.skySoft,
    borderColor: colors.sky,
    borderWidth: 2,
    borderBottomWidth: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emoji: { fontSize: 30 },
  biteLabel: {
    color: colors.accentStrong,
    textTransform: 'uppercase',
    letterSpacing: 0.8
  },
  stepPill: {
    borderRadius: radii.pill,
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 2,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm
  },
  navRow: {
    flexDirection: 'row',
    gap: spacing.sm
  },
  navButton: {
    flex: 1
  },
  rewardRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm
  },
  resultHeader: {
    alignItems: 'center'
  },
  resultEmoji: {
    fontSize: 54
  }
});
