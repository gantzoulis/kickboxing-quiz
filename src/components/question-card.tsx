"use client";

import { useMemo, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { QuizQuestion } from "@/lib/quiz";
import type { QuizMode } from "@/types/quiz";

type Props = {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  quizMode: QuizMode;
  onNext: (wasCorrect: boolean) => void;
};

const answerLabels = ["A", "B", "Γ", "Δ"];

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  quizMode,
  onNext,
}: Props) {
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);

  const selectedAnswer = useMemo(() => {
    return question.answers.find((answer) => answer.id === selectedAnswerId) ?? null;
  }, [question.answers, selectedAnswerId]);

  const hasAnswered = selectedAnswerId !== null;
  const isCorrect = selectedAnswer?.isCorrect ?? false;
  const isPracticeMode = quizMode === "practice";
  const isExamMode = quizMode === "exam";

  return (
    <Card className="rounded-2xl border bg-white shadow-sm">
      <CardHeader className="space-y-3">
        <div className="text-sm text-slate-500">
          Ερώτηση {questionNumber} από {totalQuestions}
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-slate-900 transition-all"
            style={{
              width: `${(questionNumber / totalQuestions) * 100}%`,
            }}
          />
        </div>

        <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
          {question.lessonTitle}
        </div>

        <CardTitle className="text-base leading-7 sm:text-lg">
          {question.text}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {question.answers.map((answer, index) => {
          const isSelected = selectedAnswerId === answer.id;

          let buttonClassName =
            "h-auto min-h-14 w-full justify-start whitespace-normal rounded-xl px-4 py-3 text-left transition-colors duration-300";

          if (hasAnswered && isPracticeMode) {
            if (answer.isCorrect) {
              buttonClassName +=
                " bg-green-500 text-white border-green-600 hover:bg-green-500";
            } else if (isSelected) {
              buttonClassName +=
                " bg-red-500 text-white border-red-600 hover:bg-red-500";
            }
          }

          return (
            <Button
              key={answer.id}
              variant="outline"
              className={buttonClassName}
              disabled={hasAnswered}
              onClick={() => {
                setSelectedAnswerId(answer.id);
                }}
            >
              <span className="mr-3 font-semibold">
                {answerLabels[index] ?? `${index + 1}`}
              </span>

              <span className="whitespace-normal text-left leading-6">
                {answer.text}
              </span>
            </Button>
          );
        })}

        {hasAnswered && isPracticeMode && (
            <div className="rounded-xl border bg-slate-50 p-4">
                <p className="font-medium">
                {isCorrect ? "Σωστή απάντηση!" : "Λάθος απάντηση."}
                </p>

                {!isCorrect && selectedAnswer && (
                <p className="mt-2 text-sm text-slate-600">
                    Επέλεξες: {selectedAnswer.text}
                </p>
                )}

                <p className="mt-2 text-sm text-slate-600">
                Σωστή απάντηση:{" "}
                {question.answers.find((answer) => answer.isCorrect)?.text}
                </p>

                <Button
                className="mt-4 w-full rounded-xl"
                onClick={() => onNext(isCorrect)}
                >
                {questionNumber === totalQuestions
                    ? "Ολοκλήρωση"
                    : "Επόμενη ερώτηση"}
                </Button>
            </div>
            )}

            {hasAnswered && isExamMode && (
            <div className="rounded-xl border bg-slate-50 p-4">
                <p className="text-sm text-slate-600">
                Η απάντησή σου καταχωρήθηκε.
                </p>

                <Button
                className="mt-4 w-full rounded-xl"
                onClick={() => onNext(isCorrect)}
                >
                {questionNumber === totalQuestions
                    ? "Ολοκλήρωση εξέτασης"
                    : "Επόμενη ερώτηση"}
                </Button>
            </div>
            )}

      </CardContent>
    </Card>
  );
}
