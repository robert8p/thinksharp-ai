import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { CoachBubble } from '@/components/CoachBubble';
import { OptionCard } from '@/components/OptionCard';
import { ProgressBar } from '@/components/ProgressBar';
import { Screen } from '@/components/Screen';
import { lessons, questions, useAppStore } from '@/features/app/store';
import { isAnswerCorrect } from '@/features/progress/mastery';
import { track } from '@/lib/analytics';
import { colors } from '@/theme/theme';

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = lessons.find((candidate) => candidate.id === id);
  const lessonQuestions = questions.filter((question) => question.lessonId === id);
  const completeLesson = useAppStore((state) => state.completeLesson);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [score, setScore] = useState<number | null>(null);

  if (!lesson) {
    return <Screen><AppText variant="h2">Lesson not found</AppText><Button onPress={() => router.back()}>Go back</Button></Screen>;
  }

  const submit = () => {
    const nextScore = completeLesson(lesson.id, answers);
    setScore(nextScore);
  };

  return (
    <Screen>
      <View style={{ gap: 8 }}>
        <AppText variant="small">{lesson.estimatedMinutes} min · pass mark {lesson.masteryThreshold}%</AppText>
        <ProgressBar value={score ?? 0} />
      </View>
      <AppText variant="h2">{lesson.title}</AppText>
      <AppText variant="muted">{lesson.summary}</AppText>
      <CoachBubble text="Read the short idea, then prove it with practice. No passive scrolling." emoji="🌱" />
      {lesson.content.map((block) => (
        <Card key={block.heading}>
          <AppText variant="h3">{block.heading}</AppText>
          <AppText>{block.body}</AppText>
          {block.example && <AppText variant="muted">Example: {block.example}</AppText>}
          {block.aiAgeWhy && <AppText style={{ color: colors.accentStrong }}>AI-age lens: {block.aiAgeWhy}</AppText>}
          {block.reflectionPrompt && <AppText variant="small">Reflection: {block.reflectionPrompt}</AppText>}
        </Card>
      ))}
      <AppText variant="h3">Practice round</AppText>
      {lessonQuestions.map((question) => (
        <Card key={question.id} playful={score !== null && isAnswerCorrect(answers[question.id], question.correctAnswer)}>
          <AppText>{question.prompt}</AppText>
          {question.options.map((option) => (
            <OptionCard key={option} label={option} selected={answers[question.id] === option} onPress={() => setAnswers({ ...answers, [question.id]: option })} />
          ))}
          {score !== null && (
            <AppText variant="small" style={{ color: isAnswerCorrect(answers[question.id], question.correctAnswer) ? colors.accentStrong : colors.orange }}>
              {isAnswerCorrect(answers[question.id], question.correctAnswer) ? 'Correct. ' : 'Not yet. '}{question.explanation}
            </AppText>
          )}
        </Card>
      ))}
      {score === null ? (
        <Button onPress={() => { track('lesson_started', { lessonId: lesson.id }); submit(); }} disabled={lessonQuestions.some((question) => !answers[question.id])}>Submit mastery check</Button>
      ) : (
        <Card playful={score >= lesson.masteryThreshold}>
          <AppText variant="h2">{score}%</AppText>
          <AppText>{score >= lesson.masteryThreshold ? 'Mastery achieved. Quest complete.' : 'Not mastered yet. Good miss — this is now review fuel.'}</AppText>
          <Button onPress={() => router.back()}>Back to map</Button>
        </Card>
      )}
    </Screen>
  );
}
