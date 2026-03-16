import { athleticsQuestions } from "./questions/athletics"

export type Lesson = {
  id: string
  title: string
  questionCount: number
}

export const lessons: Lesson[] = [
  { id: "athletics", title: "Αθλητιατρική", questionCount: athleticsQuestions.length },
  { id: "nutrition", title: "Αθλητική Διατροφή", questionCount: 0 },
  { id: "sociology", title: "Αθλητική Κοινωνιολογία", questionCount: 0 },
  { id: "psychology", title: "Αθλητική Ψυχολογία", questionCount: 0 },
  { id: "ethics", title: "Αθλητικό Δίκαιο", questionCount: 0 },
  { id: "anti_doping", title: "Αντιντόπινγκ", questionCount: 0 },
  { id: "training_theory", title: "Γενική Προπονητική", questionCount: 0 },
  { id: "ethics_questions", title: "Ηθική & Ακεραιότητα", questionCount: 0 },
  { id: "management", title: "Οργάνωση & Διοίκηση", questionCount: 0 },
  { id: "child_protection", title: "Παιδική Προστασία", questionCount: 0 },
  { id: "anatomy", title: "Ανατομία", questionCount: 0 },
  { id: "biomechanics", title: "Βιομηχανική", questionCount: 0 },
  { id: "special_training", title: "Ειδική Προπονητική", questionCount: 0 },
  { id: "exercise_physiology", title: "Εργοφυσιολογία", questionCount: 0 },
  { id: "regulations", title: "Κανονισμοί Kickboxing", questionCount: 0 },
  { id: "methodology", title: "Μεθοδολογία Προπόνησης", questionCount: 0 },
  { id: "statistics", title: "Στατιστική", questionCount: 0 },
  { id: "technical_analysis", title: "Τεχνική Ανάλυση", questionCount: 0 },
  { id: "first_aid", title: "Πρώτες Βοήθειες", questionCount: 0 },
  { id: "physiotherapy", title: "Φυσικοθεραπεία", questionCount: 0 },
]
