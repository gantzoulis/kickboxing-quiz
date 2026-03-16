import { athleticsQuestions } from "./questions/athletics";
import { nutritionQuestions} from "./questions/nutrition";
import { sociologyQuestions } from "./questions/sociology";
import { psychologyQuestions } from "./questions/psychology";
import { sportsLawQuestions } from "./questions/sports-law";
import { antiDopingQuestions } from "./questions/anti-doping";
import { trainingTheoryQuestions } from "./questions/training-theory";
import { ethicsIntegrityQuestions } from "./questions/ethics-integrity";
import { managementQuestions } from "./questions/management";
import { childProtectionQuestions } from "./questions/child-protection";
import { anatomyQuestions } from "./questions/anatomy";
import { biomechanicsQuestions } from "./questions/biomechanics";
import { specialTrainingQuestions } from "./questions/special-training";
import { exercisePhysiologyQuestions } from "./questions/exercise-physiology";
import { rulesQuestions } from "./questions/rules";
import { methodologyQuestions } from "./questions/methodology";
import { statisticsQuestions } from "./questions/statistics";
import { technicalAnalysisQuestions } from "./questions/technical_analysis";
import { computersQuestions } from "./questions/computers";
import { physiotherapyQuestions } from "./questions/physiotherapy";
import { physiologyQuestions } from "./questions/physiology";
import { researchMethodologyQuestions } from "./questions/research-methodology";
import { mentalResilienceQuestions } from "./questions/mental-resilience";

export type Lesson = {
  id: string
  title: string
  questionCount: number
}

export function getLessonTitle(lessonId: string) {
  const lesson = lessons.find(l => l.id === lessonId)
  return lesson?.title ?? lessonId
}


export const lessons: Lesson[] = [
  { id: "athletics", title: "Αθλητιατρική", questionCount: athleticsQuestions.length },
  { id: "nutrition", title: "Αθλητική Διατροφή", questionCount: nutritionQuestions.length },
  { id: "sociology", title: "Αθλητική Κοινωνιολογία", questionCount: sociologyQuestions.length },
  { id: "psychology", title: "Αθλητική Ψυχολογία", questionCount: psychologyQuestions.length },
  { id: "sports-law", title: "Αθλητικό Δίκαιο", questionCount: sportsLawQuestions.length },
  { id: "anti_doping", title: "Αντιντόπινγκ", questionCount: antiDopingQuestions.length },
  { id: "training_theory", title: "Γενική Προπονητική", questionCount: trainingTheoryQuestions.length },
  { id: "ethics_integrity", title: "Ηθική & Ακεραιότητα", questionCount: ethicsIntegrityQuestions.length },
  { id: "management", title: "Οργάνωση & Διοίκηση", questionCount: managementQuestions.length },
  { id: "child_protection", title: "Πλαίσιο Παιδικής Προστασίας", questionCount: childProtectionQuestions.length },
  { id: "anatomy", title: "Ανατομία", questionCount: anatomyQuestions.length },
  { id: "biomechanics", title: "Βιομηχανική", questionCount: biomechanicsQuestions.length },
  { id: "special_training", title: "Ειδική Προπονητική", questionCount: specialTrainingQuestions.length },
  { id: "exercise_physiology", title: "Εργοφυσιολογία", questionCount: exercisePhysiologyQuestions.length },
  { id: "rules", title: "Κανονισμοί Kickboxing", questionCount: rulesQuestions.length },
  { id: "methodology", title: "Μεθοδολογία Προπόνησης", questionCount: methodologyQuestions.length },
  { id: "statistics", title: "Στατιστική", questionCount: statisticsQuestions.length },
  { id: "technical_analysis", title: "Τεχνική Ανάλυση", questionCount: technicalAnalysisQuestions.length },
  { id: "computers", title: "Υπολογιστές", questionCount: computersQuestions.length },
  { id: "physiotherapy", title: "Φυσικοθεραπεία", questionCount: physiotherapyQuestions.length },
  { id: "physiology", title: "Φυσιoλογία", questionCount: physiologyQuestions.length },
  { id: "research_methodology", title: "Μεθοδολογία της Ερευνας", questionCount: researchMethodologyQuestions.length },
  { id: "mental_resilience", title: "Ψυχική Ανθεκτικότητα", questionCount: mentalResilienceQuestions.length },
]
