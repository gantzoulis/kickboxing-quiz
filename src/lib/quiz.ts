import type { Question } from "@/types/quiz";
import { athleticsQuestions } from "@/data/questions/athletics";

export type QuizAnswer = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export type QuizQuestion = {
  id: string;
  lessonId: string;
  lessonTitle: string;
  text: string;
  answers: QuizAnswer[];
};

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function mapQuestionToQuizQuestion(question: Question): QuizQuestion {
  const answers: QuizAnswer[] = question.answers.map((answerText, index) => ({
    id: `${question.id}-answer-${index}`,
    text: answerText,
    isCorrect: index === question.correctAnswer,
  }));

  return {
    id: question.id,
    lessonId: question.lessonId,
    lessonTitle: question.lessonTitle,
    text: question.text,
    answers: shuffleArray(answers),
  };
}

export function getQuestionsByLesson(lessonId: string): Question[] {
  switch (lessonId) {
    case "athletics":
      return athleticsQuestions;
    default:
      return [];
  }
}

export function getShuffledQuizQuestionsByLesson(
  lessonId: string
): QuizQuestion[] {
  const questions = getQuestionsByLesson(lessonId);
  return shuffleArray(questions).map(mapQuestionToQuizQuestion);
}
