import { Achievement, Lesson, Module, Question } from '@/types';

export const modules: Module[] = [
  {
    id: 'm1-foundations',
    title: 'Foundations of Clear Thinking',
    description: 'Claims, reasons, evidence, assumptions, confidence, correctness, and fluent nonsense.',
    orderIndex: 1,
    isPremium: false,
    status: 'active'
  },
  {
    id: 'm2-fallacies',
    title: 'Logical Fallacies',
    description: 'Spot common argument traps before they shape your judgment.',
    orderIndex: 2,
    isPremium: true,
    status: 'active'
  },
  {
    id: 'm3-biases',
    title: 'Cognitive Biases',
    description: 'Train yourself to notice the predictable shortcuts that distort decisions.',
    orderIndex: 3,
    isPremium: true,
    status: 'active'
  },
  {
    id: 'm4-evidence',
    title: 'Evidence and Source Quality',
    description: 'Primary sources, base rates, incentives, correlation, causation, and conflict checks.',
    orderIndex: 4,
    isPremium: true,
    status: 'premium_preview'
  },
  {
    id: 'm5-ai-era',
    title: 'AI-Era Thinking',
    description: 'Hallucinations, prompt sensitivity, deepfakes, synthetic persuasion, and verification.',
    orderIndex: 5,
    isPremium: true,
    status: 'premium_preview'
  },
  {
    id: 'm6-decisions',
    title: 'Better Decisions',
    description: 'Framing, trade-offs, premortems, reversibility, second-order effects, and decision journals.',
    orderIndex: 6,
    isPremium: true,
    status: 'premium_preview'
  }
];

export const lessons: Lesson[] = [
  {
    id: 'l1-claims-reasons-evidence',
    moduleId: 'm1-foundations',
    title: 'Claims, Reasons, Evidence, Assumptions',
    summary: 'Separate what someone says, why they say it, what supports it, and what must be true.',
    orderIndex: 1,
    masteryThreshold: 85,
    estimatedMinutes: 6,
    isPremium: false,
    required: true,
    content: [
      {
        heading: 'The four-part thinking scan',
        body: 'A claim is what someone wants you to accept. A reason is why they think you should accept it. Evidence is what raises or lowers confidence. An assumption is the unstated bridge between evidence and conclusion.',
        example: '“This vendor is the best because Gartner ranks them highly.” Claim: best vendor. Reason/evidence: Gartner ranking. Assumption: Gartner criteria match our needs and risk profile.',
        aiAgeWhy: 'AI answers often package claims, reasons, and evidence into fluent paragraphs. Your job is to unpack them before believing them.',
        reflectionPrompt: 'Think of one confident statement you heard today. Which part was evidence, and which part was assumption?'
      }
    ]
  },
  {
    id: 'l2-confidence-vs-correctness',
    moduleId: 'm1-foundations',
    title: 'Confidence Is Not Correctness',
    summary: 'Learn why certainty, fluency, status, and speed are weak substitutes for truth.',
    orderIndex: 2,
    masteryThreshold: 85,
    estimatedMinutes: 5,
    isPremium: false,
    required: true,
    content: [
      {
        heading: 'The fluency trap',
        body: 'People tend to trust answers that are smooth, specific, and confident. But presentation quality is not evidence quality. A clear answer can be wrong; a hesitant answer can be careful.',
        example: '“The project will definitely pay back in 12 months.” The useful question is not “does that sound confident?” but “what assumptions drive the payback?”',
        aiAgeWhy: 'Chatbots can produce polished answers even when sources are weak or facts are invented. Fluency should trigger verification, not trust.',
        reflectionPrompt: 'Where do you tend to mistake confidence for competence?'
      }
    ]
  },
  {
    id: 'l3-fluent-nonsense',
    moduleId: 'm1-foundations',
    title: 'Fluent Nonsense and AI Hallucinations',
    summary: 'Practise identifying plausible wording that hides missing evidence or invented specificity.',
    orderIndex: 3,
    masteryThreshold: 85,
    estimatedMinutes: 7,
    isPremium: false,
    required: true,
    content: [
      {
        heading: 'Plausible is not proven',
        body: 'Fluent nonsense sounds coherent but lacks reliable support. The warning signs are invented precision, no source trail, missing caveats, and conclusions stronger than the evidence allows.',
        example: '“A 2023 Oxford study proved that most executives lose 41% productivity to shallow thinking.” Before sharing it, ask: Which study? What population? What methodology? What does “proved” mean?',
        aiAgeWhy: 'AI systems can blend real concepts with fabricated details. Strong thinkers slow down when the wording becomes too neat.',
        reflectionPrompt: 'What claim would you verify before forwarding it at work?'
      }
    ]
  },
  {
    id: 'l4-straw-man',
    moduleId: 'm2-fallacies',
    title: 'Straw Man',
    summary: 'Spot when someone attacks a weaker version of an argument instead of the real argument.',
    orderIndex: 1,
    masteryThreshold: 85,
    estimatedMinutes: 5,
    isPremium: true,
    required: true,
    content: [
      {
        heading: 'Attack the real claim',
        body: 'A straw man replaces a person’s actual position with an exaggerated or distorted one, then defeats the distortion.',
        example: 'A says: “We should pilot this AI tool with controls.” B replies: “So you want to let robots run the company.”',
        aiAgeWhy: 'Online arguments and AI summaries can flatten nuance. Always ask whether the response addresses the strongest fair version of the claim.',
        reflectionPrompt: 'How would you restate an opponent’s view so they would recognise it?'
      }
    ]
  },
  {
    id: 'l5-false-dilemma',
    moduleId: 'm2-fallacies',
    title: 'False Dilemma',
    summary: 'Recognise when complex options are reduced to two artificial choices.',
    orderIndex: 2,
    masteryThreshold: 85,
    estimatedMinutes: 5,
    isPremium: true,
    required: true,
    content: [
      {
        heading: 'Look for the hidden third option',
        body: 'A false dilemma frames a decision as either/or when more options, hybrids, sequencing, or experiments exist.',
        example: '“Either we ban AI or we let everyone use anything.” Better options include controlled pilots, approved tools, data rules, and targeted training.',
        aiAgeWhy: 'AI-generated advice can over-simplify trade-offs. Mature judgment keeps the option set open long enough to choose well.',
        reflectionPrompt: 'What binary debate in your workplace may have hidden alternatives?'
      }
    ]
  },
  {
    id: 'l6-post-hoc',
    moduleId: 'm2-fallacies',
    title: 'Post Hoc Fallacy',
    summary: 'Avoid assuming that because B followed A, A caused B.',
    orderIndex: 3,
    masteryThreshold: 85,
    estimatedMinutes: 6,
    isPremium: true,
    required: true,
    content: [
      {
        heading: 'Sequence is not causation',
        body: 'The post hoc fallacy treats timing as proof of cause. Better thinkers ask about mechanisms, comparison groups, and alternative causes.',
        example: '“We changed the homepage and sales rose, so the homepage caused it.” Maybe seasonality, discounts, press, or sales activity changed too.',
        aiAgeWhy: 'AI can generate neat causal stories from sparse data. Ask what evidence would distinguish the story from alternatives.',
        reflectionPrompt: 'What recent success or failure might you be over-attributing to one cause?'
      }
    ]
  },
  {
    id: 'l7-confirmation-bias',
    moduleId: 'm3-biases',
    title: 'Confirmation Bias',
    summary: 'Practise looking for evidence that could change your mind, not only evidence that flatters your view.',
    orderIndex: 1,
    masteryThreshold: 85,
    estimatedMinutes: 6,
    isPremium: true,
    required: true,
    content: [
      {
        heading: 'What would change your mind?',
        body: 'Confirmation bias is the tendency to seek, notice, and remember information that supports what we already believe.',
        example: 'If you believe a project is doomed, every delay feels like proof while every recovery sign looks temporary.',
        aiAgeWhy: 'AI can produce excellent arguments for almost any position. Prompt it to challenge your view, not merely support it.',
        reflectionPrompt: 'Name one belief you should actively try to disconfirm this week.'
      }
    ]
  },
  {
    id: 'l8-anchoring',
    moduleId: 'm3-biases',
    title: 'Anchoring',
    summary: 'Notice when the first number, option, or frame pulls your judgment too strongly.',
    orderIndex: 2,
    masteryThreshold: 85,
    estimatedMinutes: 5,
    isPremium: true,
    required: true,
    content: [
      {
        heading: 'First numbers are sticky',
        body: 'Anchoring occurs when an initial estimate or frame shapes later judgment, even if the anchor is arbitrary or weak.',
        example: 'A vendor starts at £500k, and £420k suddenly feels reasonable even if the true benchmark is £300k.',
        aiAgeWhy: 'AI-generated estimates can become hidden anchors. Ask for ranges, assumptions, and independent benchmarks.',
        reflectionPrompt: 'Where might the first number you saw be shaping your negotiation or decision?'
      }
    ]
  },
  {
    id: 'l9-sunk-cost',
    moduleId: 'm3-biases',
    title: 'Sunk Cost Fallacy',
    summary: 'Separate past investment from the best decision from today onward.',
    orderIndex: 3,
    masteryThreshold: 85,
    estimatedMinutes: 6,
    isPremium: true,
    required: true,
    content: [
      {
        heading: 'Past cost is not future value',
        body: 'The sunk cost fallacy keeps people committed because of what they already spent, not because future returns justify continuing.',
        example: '“We have already spent £200k, so we need to keep going.” Better: “From today, is the next £1 and next hour best spent here?”',
        aiAgeWhy: 'AI business cases can rationalise continuation. Ask for a fresh go/kill decision using only future costs and benefits.',
        reflectionPrompt: 'What should be re-evaluated as if you were choosing today?'
      }
    ]
  }
];

export const questions: Question[] = [
  {
    id: 'q1-claim-parts',
    lessonId: 'l1-claims-reasons-evidence',
    type: 'multiple_choice',
    prompt: '“This AI tool will save money because similar companies use it.” What is the weakest hidden assumption?',
    options: ['Similar companies always choose well', 'Other companies’ context and benefits are comparable to ours', 'AI tools are never risky', 'Saving money is always the main goal'],
    correctAnswer: 'Other companies’ context and benefits are comparable to ours',
    explanation: 'The bridge from “others use it” to “we will save money” depends on comparable needs, process fit, adoption, pricing, and controls.',
    skillArea: 'evidence_evaluation',
    difficulty: 2,
    concept: 'assumption_detection'
  },
  {
    id: 'q2-confidence',
    lessonId: 'l2-confidence-vs-correctness',
    type: 'multiple_choice',
    prompt: 'A colleague gives a polished answer with exact figures but no source. What is the strongest response?',
    options: ['Trust it because precise numbers imply research', 'Reject it because all confident answers are wrong', 'Ask for the source, assumptions, and confidence range', 'Accept it if the colleague is senior'],
    correctAnswer: 'Ask for the source, assumptions, and confidence range',
    explanation: 'Precision and seniority do not equal evidence. Ask for the basis and uncertainty before using the information.',
    skillArea: 'ai_literacy',
    difficulty: 2,
    concept: 'confidence_vs_correctness'
  },
  {
    id: 'q3-fluent-nonsense',
    lessonId: 'l3-fluent-nonsense',
    type: 'multiple_choice',
    prompt: 'Which warning sign most suggests fluent nonsense?',
    options: ['The answer includes caveats', 'The answer states a named statistic without a verifiable source', 'The answer says uncertainty remains', 'The answer asks for context'],
    correctAnswer: 'The answer states a named statistic without a verifiable source',
    explanation: 'Invented specificity is a common signal. Named figures need a source trail before they are used.',
    skillArea: 'ai_literacy',
    difficulty: 2,
    concept: 'fluent_nonsense'
  },
  {
    id: 'q4-straw-man',
    lessonId: 'l4-straw-man',
    type: 'multiple_choice',
    prompt: 'A says: “We need stronger controls before approving AI tools.” B replies: “You just hate innovation.” What fallacy is this?',
    options: ['Straw man', 'Post hoc', 'Circular reasoning', 'Appeal to authority'],
    correctAnswer: 'Straw man',
    explanation: 'B attacks a distorted version of A’s view instead of addressing the actual claim about controls.',
    skillArea: 'logic',
    difficulty: 1,
    concept: 'straw_man'
  },
  {
    id: 'q5-false-dilemma',
    lessonId: 'l5-false-dilemma',
    type: 'multiple_choice',
    prompt: '“Either we buy the platform now or we fall behind forever.” What is the best challenge?',
    options: ['Who said it first?', 'Are there pilots, staged options, or alternatives between those extremes?', 'Can we make the sentence shorter?', 'Is the platform popular?'],
    correctAnswer: 'Are there pilots, staged options, or alternatives between those extremes?',
    explanation: 'False dilemmas hide middle paths. Look for sequencing, pilots, constraints, and reversible options.',
    skillArea: 'logic',
    difficulty: 2,
    concept: 'false_dilemma'
  },
  {
    id: 'q6-post-hoc',
    lessonId: 'l6-post-hoc',
    type: 'multiple_choice',
    prompt: 'Sales rose after a new dashboard launched. What should you ask before claiming the dashboard caused it?',
    options: ['Was the dashboard expensive?', 'What else changed, and is there a comparison group?', 'Does the dashboard look modern?', 'Did leadership like it?'],
    correctAnswer: 'What else changed, and is there a comparison group?',
    explanation: 'Timing alone is not causation. Alternative explanations and comparisons matter.',
    skillArea: 'evidence_evaluation',
    difficulty: 3,
    concept: 'causal_reasoning'
  },
  {
    id: 'q7-confirmation',
    lessonId: 'l7-confirmation-bias',
    type: 'multiple_choice',
    prompt: 'You believe a supplier is unreliable. Which action best counters confirmation bias?',
    options: ['Search only for missed deadlines', 'Ask what evidence would show they are improving', 'Ignore your concern', 'Ask someone who dislikes them too'],
    correctAnswer: 'Ask what evidence would show they are improving',
    explanation: 'Countering confirmation bias means looking for evidence that could update your belief, not just support it.',
    skillArea: 'bias_detection',
    difficulty: 2,
    concept: 'confirmation_bias'
  },
  {
    id: 'q8-anchoring',
    lessonId: 'l8-anchoring',
    type: 'multiple_choice',
    prompt: 'A vendor opens at £500k. Your team now sees £425k as cheap. What bias may be operating?',
    options: ['Anchoring', 'Halo effect', 'Groupthink', 'Availability heuristic'],
    correctAnswer: 'Anchoring',
    explanation: 'The first number can pull later judgments. Independent benchmarks reduce the effect.',
    skillArea: 'bias_detection',
    difficulty: 1,
    concept: 'anchoring'
  },
  {
    id: 'q9-sunk-cost',
    lessonId: 'l9-sunk-cost',
    type: 'multiple_choice',
    prompt: '“We cannot stop now; we already spent six months on it.” What is the best reframing question?',
    options: ['Who approved the original work?', 'From today onward, is continuing the best use of future time and money?', 'Can we make the sunk cost bigger?', 'Will stopping look bad?'],
    correctAnswer: 'From today onward, is continuing the best use of future time and money?',
    explanation: 'Sunk costs are past costs. The decision should focus on future value and opportunity cost.',
    skillArea: 'decision_quality',
    difficulty: 2,
    concept: 'sunk_cost'
  }
];

export const diagnosticQuestions: Question[] = [
  {
    id: 'd1-logical-fallacy',
    type: 'multiple_choice',
    prompt: '“My opponent wants to regulate AI, so clearly they want to stop all progress.” What is the main flaw?',
    options: ['Straw man', 'Appeal to authority', 'Post hoc', 'Base-rate neglect'],
    correctAnswer: 'Straw man',
    explanation: 'The argument distorts a moderate position into an extreme one.',
    skillArea: 'logic',
    difficulty: 2,
    concept: 'logical_fallacies'
  },
  {
    id: 'd2-bias',
    type: 'multiple_choice',
    prompt: 'A manager only remembers examples that prove remote workers are unproductive. Which bias is most likely?',
    options: ['Confirmation bias', 'Anchoring', 'Sunk cost fallacy', 'Halo effect'],
    correctAnswer: 'Confirmation bias',
    explanation: 'They are noticing evidence that supports an existing belief.',
    skillArea: 'bias_detection',
    difficulty: 2,
    concept: 'cognitive_bias'
  },
  {
    id: 'd3-evidence-quality',
    type: 'multiple_choice',
    prompt: 'Which is the strongest evidence for a workplace productivity claim?',
    options: ['A viral LinkedIn post', 'A vendor case study with no methodology', 'A controlled pilot with baseline and comparison data', 'A senior leader’s instinct'],
    correctAnswer: 'A controlled pilot with baseline and comparison data',
    explanation: 'A measured pilot with comparison data is stronger than anecdote, authority, or marketing.',
    skillArea: 'evidence_evaluation',
    difficulty: 2,
    concept: 'evidence_quality'
  },
  {
    id: 'd4-ai-hallucination',
    type: 'multiple_choice',
    prompt: 'An AI answer cites a specific report you cannot find. What should you do?',
    options: ['Use it because AI is usually right', 'Ask the AI to be more confident', 'Treat it as unverified and seek primary sources', 'Replace it with a different unsourced statistic'],
    correctAnswer: 'Treat it as unverified and seek primary sources',
    explanation: 'Unfindable citations are a hallucination risk. Verify before relying on them.',
    skillArea: 'ai_literacy',
    difficulty: 2,
    concept: 'ai_hallucination_spotting'
  },
  {
    id: 'd5-argument-structure',
    type: 'multiple_choice',
    prompt: 'In an argument, what connects evidence to the conclusion?',
    options: ['An assumption', 'A font choice', 'A deadline', 'A slogan'],
    correctAnswer: 'An assumption',
    explanation: 'Assumptions are often the hidden bridge between facts and conclusion.',
    skillArea: 'argumentation',
    difficulty: 1,
    concept: 'argument_structure'
  },
  {
    id: 'd6-causality',
    type: 'multiple_choice',
    prompt: 'A team trained with AI and revenue rose the next month. What is missing before a causal claim?',
    options: ['A stronger story', 'A comparison against other plausible causes', 'A logo', 'More enthusiasm'],
    correctAnswer: 'A comparison against other plausible causes',
    explanation: 'Causal reasoning needs alternative explanations, comparison, and mechanism.',
    skillArea: 'evidence_evaluation',
    difficulty: 3,
    concept: 'causal_reasoning'
  },
  {
    id: 'd7-statistics',
    type: 'multiple_choice',
    prompt: 'A rare scam detector is 95% accurate. What else do you need to interpret a positive result?',
    options: ['The base rate of the scam', 'The app colour', 'The detector brand name only', 'Whether the result sounds scary'],
    correctAnswer: 'The base rate of the scam',
    explanation: 'For rare events, base rates dramatically affect what a positive result means.',
    skillArea: 'evidence_evaluation',
    difficulty: 4,
    concept: 'base_rates'
  },
  {
    id: 'd8-source',
    type: 'multiple_choice',
    prompt: 'Which source check is most useful before trusting a claim?',
    options: ['Does it confirm my view?', 'Who benefits if I believe this?', 'Is it written in exciting language?', 'Is it short enough?'],
    correctAnswer: 'Who benefits if I believe this?',
    explanation: 'Incentives and conflicts of interest are essential source-quality checks.',
    skillArea: 'evidence_evaluation',
    difficulty: 2,
    concept: 'source_credibility'
  },
  {
    id: 'd9-assumptions',
    type: 'multiple_choice',
    prompt: '“This policy worked in Company A, so it will work here.” What is the key assumption?',
    options: ['Company A is famous', 'The contexts are similar enough for transfer', 'Policies never fail', 'Everyone likes policies'],
    correctAnswer: 'The contexts are similar enough for transfer',
    explanation: 'Transfer depends on whether the important conditions are similar.',
    skillArea: 'argumentation',
    difficulty: 2,
    concept: 'assumption_detection'
  },
  {
    id: 'd10-decision-framing',
    type: 'multiple_choice',
    prompt: 'Which frame best improves a high-stakes decision?',
    options: ['What would make this fail, and how can we reduce that risk?', 'How do we prove we were right?', 'How do we avoid hearing objections?', 'Which option sounds most exciting?'],
    correctAnswer: 'What would make this fail, and how can we reduce that risk?',
    explanation: 'Premortem thinking improves decisions by surfacing preventable failure modes.',
    skillArea: 'decision_quality',
    difficulty: 3,
    concept: 'decision_framing'
  }
];

export const fallacyDrills: Question[] = questions.filter((question) => question.skillArea === 'logic');
export const biasDrills: Question[] = questions.filter((question) => question.skillArea === 'bias_detection');
export const aiChallengeQuestions: Question[] = [
  {
    id: 'ai1-overconfident-answer',
    type: 'multi_select',
    prompt: 'AI answer: “Remote work definitely reduces productivity by 37%, according to multiple studies, so leaders should end it immediately.” Select the flaws.',
    options: ['Unsupported exact statistic', 'Overconfident wording', 'Missing caveats/context', 'Strong policy conclusion from unclear evidence'],
    correctAnswer: ['Unsupported exact statistic', 'Overconfident wording', 'Missing caveats/context', 'Strong policy conclusion from unclear evidence'],
    explanation: 'The answer uses invented-seeming precision, sweeping certainty, no source trail, and a policy leap stronger than the evidence provided.',
    skillArea: 'ai_literacy',
    difficulty: 3,
    concept: 'challenge_ai_output'
  }
];

export const achievements: Achievement[] = [
  { id: 'a1', code: 'first_diagnostic', title: 'First Diagnostic', description: 'Completed the thinking diagnostic.', icon: 'target' },
  { id: 'a2', code: 'fallacy_hunter', title: 'Fallacy Hunter', description: 'Mastered a logical fallacy drill.', icon: 'search' },
  { id: 'a3', code: 'bias_breaker', title: 'Bias Breaker', description: 'Completed a bias drill.', icon: 'break' },
  { id: 'a4', code: 'ai_challenger', title: 'AI Challenger', description: 'Challenged an AI answer successfully.', icon: 'spark' },
  { id: 'a5', code: 'evidence_inspector', title: 'Evidence Inspector', description: 'Analysed a claim with evidence discipline.', icon: 'inspect' },
  { id: 'a6', code: 'premortem_pro', title: 'Premortem Pro', description: 'Completed a decision premortem.', icon: 'map' },
  { id: 'a7', code: 'seven_day_thinker', title: 'Seven-Day Thinker', description: 'Maintained a seven-day streak.', icon: 'flame' },
  { id: 'a8', code: 'mastery_milestone', title: 'Mastery Milestone', description: 'Mastered a module assessment.', icon: 'medal' }
];
