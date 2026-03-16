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
import type { LessonStats, LessonStatsMap, QuizMode } from "@/types/quiz";
import { getLessonTitle } from "@/data/lessons"

type Screen =
  | "home"
  | "lesson-select"
  | "lesson-mode-select"
  | "quiz"
  | "results";

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
  const [lessonOrder, setLessonOrder] = useState<string[]>([]);
  const [quizMode, setQuizMode] = useState<QuizMode>("practice");




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


      function startLessonQuiz(lessonId: string, mode: QuizMode) {
      const questions = getShuffledQuizQuestionsByLesson(lessonId);
      const finalQuestions =
        mode === "exam" ? questions.slice(0, 10) : questions;

      setSelectedLessonId(lessonId);
      window.localStorage.setItem("selectedLessonId", lessonId);

      setQuizMode(mode);
      setQuizQuestions(finalQuestions);
      setCurrentIndex(0);
      setScore(0);
      setScreen("quiz");
    }


  function handleNextQuestion(wasCorrect: boolean) {
    const nextScore = wasCorrect ? score + 1 : score;
    const isLastQuestion = currentIndex === quizQuestions.length - 1;

    if (isLastQuestion) {
      setScore(nextScore);
      saveLessonResult(nextScore);
      setScreen("results");
      return;
    }

    setScore(nextScore);
    setCurrentIndex((prev) => prev + 1);
  }



  function handleRestart() {
    if (!selectedLessonId) return;
    startLessonQuiz(selectedLessonId, quizMode);
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
      setScreen("lesson-mode-select");
      setQuizQuestions([]);
      setCurrentIndex(0);
      setScore(0);
      return;
    }
   
    if (screen === "lesson-mode-select") {
     setScreen("lesson-select");
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
  <main className="h-screen overflow-hidden bg-slate-50 px-4 py-4">
    <div className="mx-auto flex h-full w-full max-w-md flex-col gap-4">
      <div className="shrink-0 space-y-3">
        <AppHeader />

        {screen !== "home" && (
          <Button variant="ghost" className="w-fit" onClick={handleGoBack}>
            ← Πίσω
          </Button>
        )}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar">

        <div className="space-y-4 pb-2">
          {screen === "home" && (
            <>
              <ModeSelector onStart={() => setScreen("lesson-select")} />

              {/*lastScore !== null && (
                <div className="rounded-2xl border bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-500">Τελευταίο σκορ</p>
                  <p className="mt-1 text-xl font-bold">{lastScore}</p>
                </div>
              )*/}
            </>
          )}

         {screen === "lesson-select" && (
          <LessonList
            onSelectLesson={(lessonId) => {
              setSelectedLessonId(lessonId);
              setScreen("lesson-mode-select");
            }}
            lessonStats={lessonStats}
          />
        )}
        {screen === "lesson-mode-select" && selectedLessonId && (
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Επιλεγμένο μάθημα</p>
            <p className="mt-1 text-lg font-bold">{getLessonTitle(selectedLessonId)}</p>

            <div className="mt-4 grid gap-3">
              <Button
                className="w-full rounded-xl"
                onClick={() => {
                  startLessonQuiz(selectedLessonId, "practice");
                }}
              >
                Εξάσκηση
              </Button>

              <Button
                variant="secondary"
                className="w-full rounded-xl"
                onClick={() => {
                  startLessonQuiz(selectedLessonId, "exam");
                }}
              >
                Εξέταση
              </Button>

            </div>
          </div>
        )}


          {screen === "quiz" && currentQuestion && (
            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
              questionNumber={currentIndex + 1}
              totalQuestions={quizQuestions.length}
              quizMode={quizMode}
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
      </div>
    </div>
  </main>
);

}
