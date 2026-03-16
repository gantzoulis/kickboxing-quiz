"use client";

import { useEffect, useState } from "react";

import { AppHeader } from "@/components/app-header";
import { LessonList } from "@/components/lesson-list";
import { ModeSelector } from "@/components/mode-selector";
import { QuestionCard } from "@/components/question-card";
import { ResultCard } from "@/components/result-card";
import { Button } from "@/components/ui/button";
import {
  getShuffledQuizQuestionsByLesson,
  type QuizQuestion,
} from "@/lib/quiz";
import type { LessonStats, LessonStatsMap } from "@/types/quiz";

type Screen = "home" | "lesson-select" | "quiz" | "results";

function getEmptyLessonStats(): LessonStats {
  return {
    attempts: 0,
    lastScore: 0,
    bestScore: 0,
    lastPlayedAt: null
  };
}


export default function HomePage() {
  const [screen, setScreen] = useState<Screen>("home");
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [lastScore, setLastScore] = useState<number | null>(null);
  const [lessonStats, setLessonStats] = useState<LessonStatsMap>({});


  const currentQuestion = quizQuestions[currentIndex];

  useEffect(() => {
    const savedLessonId = window.localStorage.getItem("selectedLessonId");
    const savedScore = window.localStorage.getItem("lastScore");

    if (savedLessonId) {
      setSelectedLessonId(savedLessonId);
    }

    if (savedScore) {
      setLastScore(Number(savedScore));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("lastScore", String(score));
    setLastScore(score);
  }, [score]);

  function startLessonQuiz(lessonId: string) {
    const questions = getShuffledQuizQuestionsByLesson(lessonId);

    setSelectedLessonId(lessonId);
    window.localStorage.setItem("selectedLessonId", lessonId);

    setQuizQuestions(questions);
    setCurrentIndex(0);
    setScore(0);
    setScreen("quiz");
  }

  function handleNextQuestion() {
    const isLastQuestion = currentIndex === quizQuestions.length - 1;

    if (isLastQuestion) {
      saveLessonResult(score);
      setScreen("results");
      return;
    }

    setCurrentIndex((prev) => prev + 1);
  }


  function handleRestart() {
    if (!selectedLessonId) return;
    startLessonQuiz(selectedLessonId);
  }

  function handleBackHome() {
    setScreen("home");
    setQuizQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setSelectedLessonId(null);
  }

  function handleGoBack() {
    if (screen === "lesson-select") {
      setScreen("home");
      return;
    }

    if (screen === "quiz") {
      setScreen("lesson-select");
      setQuizQuestions([]);
      setCurrentIndex(0);
      setScore(0);
      return;
    }

    if (screen === "results") {
      setScreen("lesson-select");
    }
  }

  function saveLessonResult(finalScore: number) {
  if (!selectedLessonId) return;

  setLessonStats((prev) => {
    const currentStats = prev[selectedLessonId] ?? getEmptyLessonStats();

    const updatedStats: LessonStats = {
      attempts: currentStats.attempts + 1,
      lastScore: finalScore,
      bestScore: Math.max(currentStats.bestScore, finalScore),
      lastPlayedAt: new Date().toLocaleDateString(),
    };

    return {
      ...prev,
      [selectedLessonId]: updatedStats,
    };
  });
}


  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        <AppHeader />

        {screen !== "home" && (
          <Button variant="ghost" className="w-fit" onClick={handleGoBack}>
            ← Πίσω
          </Button>
        )}

        {screen === "home" && (
          <>
            <ModeSelector onStart={() => setScreen("lesson-select")} />

            {lastScore !== null && (
              <div className="rounded-2xl border bg-white p-4 shadow-sm">
                <p className="text-sm text-slate-500">Τελευταίο σκορ</p>
                <p className="mt-1 text-xl font-bold">{lastScore}</p>
              </div>
            )}
          </>
        )}

          {screen === "lesson-select" && (
            <LessonList
              onSelectLesson={startLessonQuiz}
              lessonStats={lessonStats}
            />
          )}

        {screen === "quiz" && currentQuestion && (
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            questionNumber={currentIndex + 1}
            totalQuestions={quizQuestions.length}
            onAnswer={(isCorrect) => {
              if (isCorrect) {
                setScore((prev) => prev + 1);
              }
            }}
            onNext={handleNextQuestion}
          />
        )}

        {screen === "results" && (
          <ResultCard
            score={score}
            totalQuestions={quizQuestions.length}
            onRestart={handleRestart}
            onBackHome={handleBackHome}
          />
        )}
      </div>
    </main>
  );
}
