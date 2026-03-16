import type { Question } from "@/types/quiz";
import { athleticsQuestions } from "@/data/questions/athletics";
import { nutritionQuestions } from "@/data/questions/nutrition";
import { sociologyQuestions } from "@/data/questions/sociology";
import { psychologyQuestions } from "@/data/questions/psychology";
import { sportsLawQuestions } from "@/data/questions/sports-law";
import { antiDopingQuestions } from "@/data/questions/anti-doping";
import { trainingTheoryQuestions } from "@/data/questions/training-theory";
import { ethicsIntegrityQuestions } from "@/data/questions/ethics-integrity";
import { managementQuestions } from "@/data/questions/management";
import { childProtectionQuestions } from "@/data/questions/child-protection";
import { anatomyQuestions } from "@/data/questions/anatomy";
import { biomechanicsQuestions } from "@/data/questions/biomechanics";
import { specialTrainingQuestions } from "@/data/questions/special-training";
import { exercisePhysiologyQuestions } from "@/data/questions/exercise-physiology";
import { rulesQuestions } from "@/data/questions/rules";
import { methodologyQuestions } from "@/data/questions/methodology";
import { statisticsQuestions } from "@/data/questions/statistics";
import { technicalAnalysisQuestions } from "@/data/questions/technical_analysis";
import { computersQuestions } from "@/data/questions/computers";
import { physiotherapyQuestions } from "@/data/questions/physiotherapy";
import { physiologyQuestions } from "@/data/questions/physiology";
import { researchMethodologyQuestions } from "@/data/questions/research-methodology";
import { mentalResilienceQuestions } from "@/data/questions/mental-resilience";

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
    case "nutrition":
        return nutritionQuestions;
    case "sociology":
        return sociologyQuestions;
    case "psychology":
      return psychologyQuestions;
    case "sports-law":
      return sportsLawQuestions;
    case "anti_doping":
        return antiDopingQuestions;
    case "training_theory":
        return trainingTheoryQuestions;
    case "ethics_integrity":
        return ethicsIntegrityQuestions;
    case "management":
        return managementQuestions;
    case "child_protection":
        return childProtectionQuestions;
    case "anatomy":
        return anatomyQuestions;
    case "biomechanics":
        return biomechanicsQuestions; 
    case "special_training":
        return specialTrainingQuestions; 
    case "exercise_physiology":
        return exercisePhysiologyQuestions;     
    case "rules":
        return rulesQuestions;
    case "methodology":
        return methodologyQuestions;     
    case "statistics":
        return statisticsQuestions; 
    case "technical_analysis":
        return technicalAnalysisQuestions; 
    case "computers":
        return computersQuestions;
    case "physiotherapy":
        return physiotherapyQuestions;
    case "physiology":
        return physiologyQuestions;
    case "research_methodology":
        return researchMethodologyQuestions;
     case "mental_resilience":
        return mentalResilienceQuestions;

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
