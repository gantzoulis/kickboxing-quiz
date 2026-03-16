import { lessons } from "@/data/lessons"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { LessonStatsMap } from "@/types/quiz";
import { Badge } from "@/components/ui/badge";


type Props = {
  onSelectLesson: (lessonId: string) => void;
  lessonStats: LessonStatsMap;
};

export function LessonList({ onSelectLesson, lessonStats }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {lessons.map((lesson) => {
        const stats = lessonStats[lesson.id];
        const attempts = stats?.attempts ?? 0;
        const bestScore = stats?.bestScore ?? 0;
        const lastPlayedAt = stats?.lastPlayedAt ?? null;

        return  (
        <Card key={lesson.id} className="rounded-xl">
          <CardContent className="flex items-center justify-between gap-3 p-4">
            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                <Badge variant={attempts > 0 ? "default" : "secondary"}>
                    {attempts > 0 ? `${attempts}x` : "Νέο"}
                </Badge>


                <div className="truncate font-medium">{lesson.title}</div>
                </div>

                <div className="mt-2 text-xs text-slate-500">
                <div>{lesson.questionCount} ερωτήσεις</div>

                    {attempts > 0 && (
                        <>
                        <div>
                            Best score: {bestScore}/{lesson.questionCount}
                        </div>

                        {lastPlayedAt && (
                            <div>Τελευταία προσπάθεια: {lastPlayedAt}</div>
                        )}
                        </>
                    )}
                </div>
            </div>

            <Button
                size="sm"
                onClick={() => onSelectLesson(lesson.id)}
            >
                Επιλογή
            </Button>
            </CardContent>

        </Card>
        );
    })}
    </div>
  )
}
