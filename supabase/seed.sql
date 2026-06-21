insert into public.modules (id, title, description, order_index, is_premium, status) values
('m1-foundations', 'Foundations of Clear Thinking', 'Claims, reasons, evidence, assumptions, confidence, correctness, and fluent nonsense.', 1, false, 'active'),
('m2-fallacies', 'Logical Fallacies', 'Spot common argument traps before they shape your judgment.', 2, true, 'active'),
('m3-biases', 'Cognitive Biases', 'Train yourself to notice predictable shortcuts that distort decisions.', 3, true, 'active'),
('m4-evidence', 'Evidence and Source Quality', 'Primary sources, base rates, incentives, correlation, and causation.', 4, true, 'premium_preview'),
('m5-ai-era', 'AI-Era Thinking', 'Hallucinations, prompt sensitivity, deepfakes, synthetic persuasion, and verification.', 5, true, 'premium_preview'),
('m6-decisions', 'Better Decisions', 'Framing, trade-offs, premortems, reversibility, second-order effects, and decision journals.', 6, true, 'premium_preview')
on conflict (id) do update set title = excluded.title, description = excluded.description, order_index = excluded.order_index, is_premium = excluded.is_premium, status = excluded.status;

insert into public.lessons (id, module_id, title, summary, content_json, order_index, mastery_threshold, estimated_minutes, is_premium) values
('l1-claims-reasons-evidence', 'm1-foundations', 'Claims, Reasons, Evidence, Assumptions', 'Separate what someone says, why they say it, what supports it, and what must be true.', '[{"heading":"The four-part thinking scan","body":"A claim is what someone wants you to accept. A reason is why they think you should accept it. Evidence is what raises or lowers confidence. An assumption is the unstated bridge between evidence and conclusion."}]', 1, 85, 6, false),
('l2-confidence-vs-correctness', 'm1-foundations', 'Confidence Is Not Correctness', 'Learn why certainty, fluency, status, and speed are weak substitutes for truth.', '[{"heading":"The fluency trap","body":"Presentation quality is not evidence quality. A clear answer can be wrong; a hesitant answer can be careful."}]', 2, 85, 5, false),
('l3-fluent-nonsense', 'm1-foundations', 'Fluent Nonsense and AI Hallucinations', 'Identify plausible wording that hides missing evidence or invented specificity.', '[{"heading":"Plausible is not proven","body":"Fluent nonsense sounds coherent but lacks reliable support. Look for invented precision, no source trail, missing caveats, and conclusions stronger than evidence allows."}]', 3, 85, 7, false),
('l4-straw-man', 'm2-fallacies', 'Straw Man', 'Spot when someone attacks a weaker version of an argument.', '[{"heading":"Attack the real claim","body":"A straw man replaces a person’s actual position with an exaggerated or distorted one."}]', 1, 85, 5, true),
('l5-false-dilemma', 'm2-fallacies', 'False Dilemma', 'Recognise when complex options are reduced to two artificial choices.', '[{"heading":"Look for hidden options","body":"False dilemmas hide hybrids, pilots, sequencing, and reversible experiments."}]', 2, 85, 5, true),
('l6-post-hoc', 'm2-fallacies', 'Post Hoc Fallacy', 'Avoid assuming that because B followed A, A caused B.', '[{"heading":"Sequence is not causation","body":"Ask about mechanisms, comparison groups, and alternative causes."}]', 3, 85, 6, true),
('l7-confirmation-bias', 'm3-biases', 'Confirmation Bias', 'Look for evidence that could change your mind.', '[{"heading":"What would change your mind?","body":"Confirmation bias makes us seek, notice, and remember evidence that supports what we already believe."}]', 1, 85, 6, true),
('l8-anchoring', 'm3-biases', 'Anchoring', 'Notice when the first number or frame pulls your judgment too strongly.', '[{"heading":"First numbers are sticky","body":"Independent benchmarks reduce anchor effects."}]', 2, 85, 5, true),
('l9-sunk-cost', 'm3-biases', 'Sunk Cost Fallacy', 'Separate past investment from the best decision from today onward.', '[{"heading":"Past cost is not future value","body":"Judge future value from today, not prior spend."}]', 3, 85, 6, true)
on conflict (id) do update set title = excluded.title, summary = excluded.summary, content_json = excluded.content_json;

insert into public.questions (id, lesson_id, type, prompt, options_json, correct_answer, explanation, skill_area, difficulty) values
('q1-claim-parts', 'l1-claims-reasons-evidence', 'multiple_choice', '“This AI tool will save money because similar companies use it.” What is the weakest hidden assumption?', '["Similar companies always choose well","Other companies’ context and benefits are comparable to ours","AI tools are never risky","Saving money is always the main goal"]', '"Other companies’ context and benefits are comparable to ours"', 'The bridge depends on comparable needs, fit, adoption, pricing, and controls.', 'evidence_evaluation', 2),
('q2-confidence', 'l2-confidence-vs-correctness', 'multiple_choice', 'A colleague gives a polished answer with exact figures but no source. What is the strongest response?', '["Trust it because precise numbers imply research","Reject it because all confident answers are wrong","Ask for the source, assumptions, and confidence range","Accept it if the colleague is senior"]', '"Ask for the source, assumptions, and confidence range"', 'Precision and seniority do not equal evidence.', 'ai_literacy', 2),
('q4-straw-man', 'l4-straw-man', 'multiple_choice', 'A says: “We need stronger controls before approving AI tools.” B replies: “You just hate innovation.” What fallacy is this?', '["Straw man","Post hoc","Circular reasoning","Appeal to authority"]', '"Straw man"', 'B attacks a distorted version of A’s view.', 'logic', 1),
('q7-confirmation', 'l7-confirmation-bias', 'multiple_choice', 'You believe a supplier is unreliable. Which action best counters confirmation bias?', '["Search only for missed deadlines","Ask what evidence would show they are improving","Ignore your concern","Ask someone who dislikes them too"]', '"Ask what evidence would show they are improving"', 'Look for evidence that could update your belief.', 'bias_detection', 2)
on conflict (id) do update set prompt = excluded.prompt, options_json = excluded.options_json, correct_answer = excluded.correct_answer, explanation = excluded.explanation;

insert into public.achievements (id, code, title, description, icon) values
('a1', 'first_diagnostic', 'First Diagnostic', 'Completed the thinking diagnostic.', 'target'),
('a2', 'fallacy_hunter', 'Fallacy Hunter', 'Mastered a logical fallacy drill.', 'search'),
('a3', 'bias_breaker', 'Bias Breaker', 'Completed a bias drill.', 'break'),
('a4', 'ai_challenger', 'AI Challenger', 'Challenged an AI answer successfully.', 'spark'),
('a5', 'evidence_inspector', 'Evidence Inspector', 'Analysed a claim with evidence discipline.', 'inspect'),
('a6', 'premortem_pro', 'Premortem Pro', 'Completed a decision premortem.', 'map'),
('a7', 'seven_day_thinker', 'Seven-Day Thinker', 'Maintained a seven-day streak.', 'flame'),
('a8', 'mastery_milestone', 'Mastery Milestone', 'Mastered a module assessment.', 'medal')
on conflict (id) do update set title = excluded.title, description = excluded.description, icon = excluded.icon;
