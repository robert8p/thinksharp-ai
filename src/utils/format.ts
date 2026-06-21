import { SkillArea } from '@/types';

export const skillLabels: Record<SkillArea, string> = {
  logic: 'Logic',
  bias_detection: 'Bias Detection',
  evidence_evaluation: 'Evidence Evaluation',
  ai_literacy: 'AI Literacy',
  decision_quality: 'Decision Quality',
  argumentation: 'Argumentation'
};

export function percent(value: number): string {
  return `${Math.round(value)}%`;
}

export function todayKey(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}
