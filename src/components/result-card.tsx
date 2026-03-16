import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  onBackHome: () => void;
};

export function ResultCard({
  score,
  totalQuestions,
  onRestart,
  onBackHome,
}: Props) {
  const percentage =
    totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  return (
    <Card className="rounded-2xl border bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Αποτελέσματα</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="rounded-xl bg-slate-50 p-4 text-center">
          <p className="text-sm text-slate-500">Τελικό σκορ</p>
          <p className="mt-2 text-3xl font-bold">
            {score} / {totalQuestions}
          </p>
          <p className="mt-2 text-sm text-slate-600">{percentage}% επιτυχία</p>
        </div>

        <div className="grid gap-3">
          <Button className="w-full rounded-xl" onClick={onRestart}>
            Ξανά το ίδιο μάθημα
          </Button>

          <Button
            variant="secondary"
            className="w-full rounded-xl"
            onClick={onBackHome}
          >
            Επιστροφή στην αρχική
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
