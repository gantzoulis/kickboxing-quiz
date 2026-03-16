export type Lesson = {
  id: string;
  title: string;
  questionCount: number;
};

export type Question = {
  id: string;
  lessonId: string;
  lessonTitle: string;
  text: string;
  answers: string[];
  correctAnswer: number;
};

export type LessonStats = {
  attempts: number;
  lastScore: number;
  bestScore: number;
  lastPlayedAt: string | null;
};

export type LessonStatsMap = Record<string, LessonStats>;


