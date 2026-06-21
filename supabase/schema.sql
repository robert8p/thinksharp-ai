create extension if not exists pgcrypto;

create type subscription_tier as enum ('free', 'premium', 'lifetime');
create type module_status as enum ('active', 'locked', 'coming_soon', 'premium_preview');
create type skill_area as enum ('logic', 'bias_detection', 'evidence_evaluation', 'ai_literacy', 'decision_quality', 'argumentation');

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  display_name text,
  created_at timestamptz not null default now(),
  onboarding_completed boolean not null default false,
  subscription_tier subscription_tier not null default 'free',
  current_level text not null default 'Novice',
  total_xp integer not null default 0,
  streak_count integer not null default 0,
  last_active_at timestamptz
);

create table if not exists public.modules (
  id text primary key,
  title text not null,
  description text not null,
  order_index integer not null,
  is_premium boolean not null default false,
  status module_status not null default 'active'
);

create table if not exists public.lessons (
  id text primary key,
  module_id text not null references public.modules(id) on delete cascade,
  title text not null,
  summary text not null,
  content_json jsonb not null default '[]'::jsonb,
  order_index integer not null,
  mastery_threshold integer not null default 85,
  estimated_minutes integer not null default 6,
  is_premium boolean not null default false
);

create table if not exists public.questions (
  id text primary key,
  lesson_id text references public.lessons(id) on delete cascade,
  type text not null,
  prompt text not null,
  options_json jsonb not null default '[]'::jsonb,
  correct_answer jsonb not null,
  explanation text not null,
  skill_area skill_area not null,
  difficulty integer not null check (difficulty between 1 and 5)
);

create table if not exists public.lesson_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null references public.lessons(id) on delete cascade,
  score integer not null check (score between 0 and 100),
  completed_at timestamptz not null default now(),
  answers_json jsonb not null default '{}'::jsonb
);

create table if not exists public.skill_scores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  skill_area skill_area not null,
  score integer not null check (score between 0 and 100),
  updated_at timestamptz not null default now(),
  unique (user_id, skill_area)
);

create table if not exists public.review_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id text not null references public.questions(id) on delete cascade,
  due_at timestamptz not null,
  interval_days integer not null default 0,
  last_result text not null check (last_result in ('correct', 'incorrect'))
);

create table if not exists public.achievements (
  id text primary key,
  code text not null unique,
  title text not null,
  description text not null,
  icon text not null
);

create table if not exists public.user_achievements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  achievement_id text not null references public.achievements(id) on delete cascade,
  earned_at timestamptz not null default now(),
  unique (user_id, achievement_id)
);

create table if not exists public.ai_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null,
  input_text text not null,
  output_json jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.diagnostic_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  total_score integer not null check (total_score between 0 and 100),
  profile_level text not null,
  skill_breakdown_json jsonb not null,
  recommended_path_json jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.daily_training_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  date date not null,
  skill_focus skill_area not null,
  score integer not null check (score between 0 and 100),
  xp_earned integer not null default 0,
  completed_at timestamptz not null default now(),
  unique (user_id, date)
);

alter table public.profiles enable row level security;
alter table public.lesson_attempts enable row level security;
alter table public.skill_scores enable row level security;
alter table public.review_items enable row level security;
alter table public.user_achievements enable row level security;
alter table public.ai_sessions enable row level security;
alter table public.diagnostic_results enable row level security;
alter table public.daily_training_sessions enable row level security;
alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.questions enable row level security;
alter table public.achievements enable row level security;

create policy "profiles own select" on public.profiles for select using (auth.uid() = id);
create policy "profiles own update" on public.profiles for update using (auth.uid() = id);
create policy "profiles own insert" on public.profiles for insert with check (auth.uid() = id);

create policy "attempts own all" on public.lesson_attempts for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "skill scores own all" on public.skill_scores for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "review items own all" on public.review_items for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "user achievements own all" on public.user_achievements for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "ai sessions own all" on public.ai_sessions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "diagnostic results own all" on public.diagnostic_results for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "daily training own all" on public.daily_training_sessions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "authenticated can read modules" on public.modules for select to authenticated using (true);
create policy "authenticated can read lessons" on public.lessons for select to authenticated using (true);
create policy "authenticated can read questions" on public.questions for select to authenticated using (true);
create policy "authenticated can read achievements" on public.achievements for select to authenticated using (true);

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, display_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
