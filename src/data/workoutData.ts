export type EquipmentType = 'dumbbell' | 'machine' | 'cable' | 'bodyweight' | 'mixed';

export interface ExerciseLink {
  label: string;
  url: string;
  icon: string;
}

export interface EquipmentVariation {
  tool: string;
  toolEn: string;
  toolAr: string;
  notes: string;
  notesEn: string;
  notesAr: string;
  gifUrl: string;
  links: ExerciseLink[];
}

export interface Exercise {
  id: string;
  exercise: string;
  exerciseAr: string;
  primary: string;
  primaryEn: string;
  primaryAr: string;
  secondary: string;
  secondaryEn: string;
  secondaryAr: string;
  sets: number | null;
  reps: string;
  repsAr: string;
  rest: string;
  restAr: string;
  duration: string;
  durationAr: string;
  notes: string;
  notesEn: string;
  notesAr: string;
  defaultGif: string;
  dumbbellVariation: EquipmentVariation;
  machineVariation: EquipmentVariation;
}

export interface DaySession {
  day: string;
  dayEn: string;
  dayAr: string;
  type: string;
  typeAr: string;
  exercises: Exercise[];
}

export interface ProgramSummary {
  key: string;
  keyEn: string;
  keyAr: string;
  value: string;
  valueEn: string;
  valueAr: string;
}

export const PROGRAM_TITLE = "Upper-Focused Muscle Building Program";
export const PROGRAM_TITLE_AR = "برنامج بناء عضلي بتركيز علوي";
export const PROGRAM_FOCUS_EN = "Focus: Chest, Shoulders, Back, Arms | Fri Upper A, Sat Lower, Mon Upper B, Wed Upper C";
export const PROGRAM_FOCUS_AR = "التركيز: الصدر والأكتاف والظهر والأذرع | الجمعة Upper A، السبت Lower، الاثنين Upper B، الأربعاء Upper C";

function ytSearch(query: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}
function bbSearch(query: string): string {
  return `https://www.bodybuilding.com/exercises/search?search=${encodeURIComponent(query)}`;
}
function msSearch(query: string): string {
  return `https://www.muscleandstrength.com/exercises/?search=${encodeURIComponent(query)}`;
}
function exrxSearch(query: string): string {
  return `https://exrx.net/Lists/Directory?Search=${encodeURIComponent(query)}`;
}
function wikiSearch(query: string): string {
  return `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(query + ' exercise')}`;
}

function makeLinks(exerciseName: string, aceUrl?: string): ExerciseLink[] {
  const links: ExerciseLink[] = [
    { label: "YouTube", url: ytSearch(exerciseName + ' proper form tutorial'), icon: "youtube" },
    { label: "Bodybuilding.com", url: bbSearch(exerciseName), icon: "external-link" },
    { label: "Muscle & Strength", url: msSearch(exerciseName), icon: "external-link" },
    { label: "ExRx.net", url: exrxSearch(exerciseName), icon: "external-link" },
    { label: "Wikipedia", url: wikiSearch(exerciseName), icon: "book-open" },
  ];
  if (aceUrl) {
    links.unshift({ label: "ACE Fitness", url: aceUrl, icon: "award" });
  }
  return links;
}

export const EXERCISES: Exercise[] = [
  // Upper A - Friday
  {
    id: "db-chest-press",
    exercise: "Dumbbell Chest Press",
    exerciseAr: "ضغط الصدر بالدمبل",
    primary: "الصدر",
    primaryEn: "Chest",
    primaryAr: "الصدر",
    secondary: "كتف أمامي + ترايسبس",
    secondaryEn: "Front delts + triceps",
    secondaryAr: "كتف أمامي + ترايسبس",
    sets: 4,
    reps: "6–10",
    repsAr: "٦–١٠",
    rest: "90–120 ث",
    restAr: "٩٠–١٢٠ ثانية",
    duration: "8–10 د",
    durationAr: "٨–١٠ د",
    notes: "نزول بطيء ودفع قوي",
    notesEn: "Slow lowering and strong press",
    notesAr: "نزول بطيء ودفع قوي",
    defaultGif: "/exercises/db-chest-press.png",
    dumbbellVariation: {
      tool: "بنش + دمبل",
      toolEn: "Bench + dumbbell",
      toolAr: "بنش + دمبل",
      notes: "نزول بطيء ودفع قوي",
      notesEn: "Slow lowering and strong press",
      notesAr: "نزول بطيء ودفع قوي",
      gifUrl: "/exercises/db-chest-press.png",
      links: makeLinks("dumbbell chest press", "https://www.acefitness.org/resources/everyone/exercise-library/19/chest-press/")
    },
    machineVariation: {
      tool: "جهاز ضغط صدر",
      toolEn: "Chest press machine",
      toolAr: "جهاز ضغط صدر",
      notes: "اضبط المقعد بحيث تكون اليدين مستوية مع الصدر",
      notesEn: "Adjust seat so handles align with mid-chest",
      notesAr: "اضبط المقعد بحيث تكون اليدين مستوية مع الصدر",
      gifUrl: "/exercises/db-chest-press.png",
      links: makeLinks("machine chest press")
    }
  },
  {
    id: "incline-db-press",
    exercise: "Incline Dumbbell Press",
    exerciseAr: "ضغط مائل بالدمبل",
    primary: "أعلى الصدر",
    primaryEn: "Upper chest",
    primaryAr: "أعلى الصدر",
    secondary: "كتف أمامي + ترايسبس",
    secondaryEn: "Front delts + triceps",
    secondaryAr: "كتف أمامي + ترايسبس",
    sets: 4,
    reps: "8–12",
    repsAr: "٨–١٢",
    rest: "90–120 ث",
    restAr: "٩٠–١٢٠ ثانية",
    duration: "8–10 د",
    durationAr: "٨–١٠ د",
    notes: "زاوية ميل متوسطة",
    notesEn: "Moderate incline angle",
    notesAr: "زاوية ميل متوسطة",
    defaultGif: "/exercises/incline-db-press.png",
    dumbbellVariation: {
      tool: "بنش مائل + دمبل",
      toolEn: "Incline bench + dumbbell",
      toolAr: "بنش مائل + دمبل",
      notes: "زاوية ميل متوسطة",
      notesEn: "Moderate incline angle",
      notesAr: "زاوية ميل متوسطة",
      gifUrl: "/exercises/incline-db-press.png",
      links: makeLinks("incline dumbbell press", "https://www.acefitness.org/resources/everyone/exercise-library/25/incline-chest-press/")
    },
    machineVariation: {
      tool: "جهاز ضغط مائل",
      toolEn: "Incline press machine",
      toolAr: "جهاز ضغط مائل",
      notes: "استهدف أعلى الصدر بزاوية ٣٠–٤٥ درجة",
      notesEn: "Target upper chest at 30-45 degree angle",
      notesAr: "استهدف أعلى الصدر بزاوية ٣٠–٤٥ درجة",
      gifUrl: "/exercises/incline-db-press.png",
      links: makeLinks("incline chest press machine")
    }
  },
  {
    id: "lat-pulldown",
    exercise: "Lat Pulldown / Pull-Up",
    exerciseAr: "سحب لات / شد الأفقي",
    primary: "الظهر العلوي",
    primaryEn: "Upper back",
    primaryAr: "الظهر العلوي",
    secondary: "بايسبس",
    secondaryEn: "Biceps",
    secondaryAr: "بايسبس",
    sets: 4,
    reps: "8–12",
    repsAr: "٨–١٢",
    rest: "90 ث",
    restAr: "٩٠ ثانية",
    duration: "8–10 د",
    durationAr: "٨–١٠ د",
    notes: "اسحب بالكوع وارفع الصدر",
    notesEn: "Pull with the elbows and lift the chest",
    notesAr: "اسحب بالكوع وارفع الصدر",
    defaultGif: "/exercises/lat-pulldown.png",
    dumbbellVariation: {
      tool: "عقلة / دمبل مستقيم",
      toolEn: "Pull-up bar",
      toolAr: "عقلة / شد أفقي",
      notes: "اسحب بالكوع وارفع الصدر",
      notesEn: "Pull with the elbows and lift the chest",
      notesAr: "اسحب بالكوع وارفع الصدر",
      gifUrl: "/exercises/lat-pulldown.png",
      links: makeLinks("lat pulldown pull up", "https://www.acefitness.org/resources/everyone/exercise-library/158/seated-lat-pulldown/")
    },
    machineVariation: {
      tool: "جهاز لات بولداون",
      toolEn: "Lat pulldown machine",
      toolAr: "جهاز لات بولداون",
      notes: "جهاز ممتاز للتحكم بالوزن",
      notesEn: "Excellent machine for controlled weight",
      notesAr: "جهاز ممتاز للتحكم بالوزن",
      gifUrl: "/exercises/lat-pulldown.png",
      links: makeLinks("lat pulldown machine")
    }
  },
  {
    id: "single-arm-row",
    exercise: "Single-Arm Dumbbell Row",
    exerciseAr: "سحب بذراع واحد",
    primary: "منتصف الظهر",
    primaryEn: "Mid back",
    primaryAr: "منتصف الظهر",
    secondary: "لاتس + بايسبس",
    secondaryEn: "Lats + biceps",
    secondaryAr: "لاتس + بايسبس",
    sets: 3,
    reps: "8–12",
    repsAr: "٨–١٢",
    rest: "75–90 ث",
    restAr: "٧٥–٩٠ ثانية",
    duration: "6–8 د",
    durationAr: "٦–٨ د",
    notes: "اسحب باتجاه الخصر",
    notesEn: "Pull toward the waist",
    notesAr: "اسحب باتجاه الخصر",
    defaultGif: "/exercises/single-arm-row.png",
    dumbbellVariation: {
      tool: "بنش + دمبل",
      toolEn: "Bench + dumbbell",
      toolAr: "بنش + دمبل",
      notes: "اسحب باتجاه الخصر",
      notesEn: "Pull toward the waist",
      notesAr: "اسحب باتجاه الخصر",
      gifUrl: "/exercises/single-arm-row.png",
      links: makeLinks("single arm dumbbell row", "https://www.acefitness.org/resources/everyone/exercise-library/126/single-arm-row/")
    },
    machineVariation: {
      tool: "جهاز سحب منخفض",
      toolEn: "Low row machine",
      toolAr: "جهاز سحب منخفض",
      notes: "حافظ على الظهر مستقيم",
      notesEn: "Keep back straight",
      notesAr: "حافظ على الظهر مستقيم",
      gifUrl: "/exercises/single-arm-row.png",
      links: makeLinks("machine row")
    }
  },
  {
    id: "seated-shoulder-press",
    exercise: "Seated Dumbbell Shoulder Press",
    exerciseAr: "ضغط كتف جالس",
    primary: "الكتف",
    primaryEn: "Shoulders",
    primaryAr: "الكتف",
    secondary: "ترايسبس",
    secondaryEn: "Triceps",
    secondaryAr: "ترايسبس",
    sets: 3,
    reps: "8–12",
    repsAr: "٨–١٢",
    rest: "90 ث",
    restAr: "٩٠ ثانية",
    duration: "6–8 د",
    durationAr: "٦–٨ د",
    notes: "لا ترفع الكتف للأعلى",
    notesEn: "Do not shrug the shoulders upward",
    notesAr: "لا ترفع الكتف للأعلى",
    defaultGif: "/exercises/shoulder-press.png",
    dumbbellVariation: {
      tool: "بنش + دمبل",
      toolEn: "Bench + dumbbell",
      toolAr: "بنش + دمبل",
      notes: "لا ترفع الكتف للأعلى",
      notesEn: "Do not shrug the shoulders upward",
      notesAr: "لا ترفع الكتف للأعلى",
      gifUrl: "/exercises/shoulder-press.png",
      links: makeLinks("seated dumbbell shoulder press", "https://www.acefitness.org/resources/everyone/exercise-library/45/seated-overhead-press/")
    },
    machineVariation: {
      tool: "جهاز ضغط كتف",
      toolEn: "Shoulder press machine",
      toolAr: "جهاز ضغط كتف",
      notes: "جهاز آمن للكتف",
      notesEn: "Shoulder-safe machine",
      notesAr: "جهاز آمن للكتف",
      gifUrl: "/exercises/shoulder-press.png",
      links: makeLinks("shoulder press machine")
    }
  },
  {
    id: "lateral-raise",
    exercise: "Lateral Raise",
    exerciseAr: "رفع جانبي",
    primary: "الكتف الجانبي",
    primaryEn: "Side delts",
    primaryAr: "الكتف الجانبي",
    secondary: "—",
    secondaryEn: "—",
    secondaryAr: "—",
    sets: 3,
    reps: "12–20",
    repsAr: "١٢–٢٠",
    rest: "45–60 ث",
    restAr: "٤٥–٦٠ ثانية",
    duration: "5–6 د",
    durationAr: "٥–٦ د",
    notes: "حركة نظيفة بدون غش",
    notesEn: "Strict clean motion with no cheating",
    notesAr: "حركة نظيفة بدون غش",
    defaultGif: "/exercises/lateral-raise.png",
    dumbbellVariation: {
      tool: "دمبل",
      toolEn: "Dumbbell",
      toolAr: "دمبل",
      notes: "حركة نظيفة بدون غش",
      notesEn: "Strict clean motion with no cheating",
      notesAr: "حركة نظيفة بدون غش",
      gifUrl: "/exercises/lateral-raise.png",
      links: makeLinks("lateral raise", "https://www.acefitness.org/resources/everyone/exercise-library/26/lateral-raise/")
    },
    machineVariation: {
      tool: "جهاز رفع جانبي",
      toolEn: "Lateral raise machine",
      toolAr: "جهاز رفع جانبي",
      notes: "ممتاز للعزل",
      notesEn: "Great for isolation",
      notesAr: "ممتاز للعزل",
      gifUrl: "/exercises/lateral-raise.png",
      links: makeLinks("lateral raise machine")
    }
  },
  {
    id: "dumbbell-curl",
    exercise: "Dumbbell Curl",
    exerciseAr: "تمرين البايسبس",
    primary: "البايسبس",
    primaryEn: "Biceps",
    primaryAr: "البايسبس",
    secondary: "ساعد",
    secondaryEn: "Forearm",
    secondaryAr: "ساعد",
    sets: 3,
    reps: "10–15",
    repsAr: "١٠–١٥",
    rest: "45–60 ث",
    restAr: "٤٥–٦٠ ثانية",
    duration: "5–6 د",
    durationAr: "٥–٦ د",
    notes: "الكوع ثابت",
    notesEn: "Keep the elbow stable",
    notesAr: "الكوع ثابت",
    defaultGif: "/exercises/bicep-curl.png",
    dumbbellVariation: {
      tool: "دمبل",
      toolEn: "Dumbbell",
      toolAr: "دمبل",
      notes: "الكوع ثابت",
      notesEn: "Keep the elbow stable",
      notesAr: "الكوع ثابت",
      gifUrl: "/exercises/bicep-curl.png",
      links: makeLinks("dumbbell bicep curl", "https://www.acefitness.org/resources/everyone/exercise-library/body-part/arms/")
    },
    machineVariation: {
      tool: "جهاز تمرين بايسبس",
      toolEn: "Bicep curl machine",
      toolAr: "جهاز تمرين بايسبس",
      notes: "جهاز مستقل لكل ذراع",
      notesEn: "Independent arm machine",
      notesAr: "جهاز مستقل لكل ذراع",
      gifUrl: "/exercises/bicep-curl.png",
      links: makeLinks("machine bicep curl")
    }
  },
  {
    id: "triceps-pushdown",
    exercise: "Triceps Pushdown",
    exerciseAr: "تمرين ترايسبس كيبل",
    primary: "الترايسبس",
    primaryEn: "Triceps",
    primaryAr: "الترايسبس",
    secondary: "—",
    secondaryEn: "—",
    secondaryAr: "—",
    sets: 3,
    reps: "10–15",
    repsAr: "١٠–١٥",
    rest: "45–60 ث",
    restAr: "٤٥–٦٠ ثانية",
    duration: "5–6 د",
    durationAr: "٥–٦ د",
    notes: "شد كامل ونزول متحكم",
    notesEn: "Full contraction and controlled lowering",
    notesAr: "شد كامل ونزول متحكم",
    defaultGif: "/exercises/triceps-pushdown.png",
    dumbbellVariation: {
      tool: "دمبل (سحب خلفي)",
      toolEn: "Dumbbell (kickback)",
      toolAr: "دمبل (سحب خلفي)",
      notes: "ثبت الكوع ومد الذراع",
      notesEn: "Lock elbow and extend arm",
      notesAr: "ثبت الكوع ومد الذراع",
      gifUrl: "/exercises/triceps-pushdown.png",
      links: makeLinks("dumbbell triceps kickback")
    },
    machineVariation: {
      tool: "كيبل",
      toolEn: "Cable",
      toolAr: "كيبل",
      notes: "شد كامل ونزول متحكم",
      notesEn: "Full contraction and controlled lowering",
      notesAr: "شد كامل ونزول متحكم",
      gifUrl: "/exercises/triceps-pushdown.png",
      links: makeLinks("triceps pushdown", "https://www.acefitness.org/resources/everyone/exercise-library/185/triceps-pushdowns/")
    }
  },
  // Lower - Saturday
  {
    id: "goblet-squat",
    exercise: "Goblet Squat",
    exerciseAr: "سكوات جوبلت",
    primary: "الفخذ الأمامي",
    primaryEn: "Quads",
    primaryAr: "الفخذ الأمامي",
    secondary: "مؤخرة + كور",
    secondaryEn: "Glutes + core",
    secondaryAr: "مؤخرة + كور",
    sets: 4,
    reps: "8–12",
    repsAr: "٨–١٢",
    rest: "90–120 ث",
    restAr: "٩٠–١٢٠ ثانية",
    duration: "8–10 د",
    durationAr: "٨–١٠ د",
    notes: "نزول بتحكم",
    notesEn: "Controlled descent",
    notesAr: "نزول بتحكم",
    defaultGif: "/exercises/goblet-squat.png",
    dumbbellVariation: {
      tool: "دمبل",
      toolEn: "Dumbbell",
      toolAr: "دمبل",
      notes: "نزول بتحكم",
      notesEn: "Controlled descent",
      notesAr: "نزول بتحكم",
      gifUrl: "/exercises/goblet-squat.png",
      links: makeLinks("goblet squat", "https://www.acefitness.org/resources/everyone/exercise-library/362/goblet-squat/")
    },
    machineVariation: {
      tool: "جهاز سكوات",
      toolEn: "Squat machine / Smith",
      toolAr: "جهاز سكوات",
      notes: "آمن للظهر",
      notesEn: "Back-safe",
      notesAr: "آمن للظهر",
      gifUrl: "/exercises/goblet-squat.png",
      links: makeLinks("squat machine")
    }
  },
  {
    id: "romanian-deadlift",
    exercise: "Romanian Deadlift",
    exerciseAr: "رفعة رومانية",
    primary: "الخلفية",
    primaryEn: "Hamstrings",
    primaryAr: "الخلفية",
    secondary: "مؤخرة",
    secondaryEn: "Glutes",
    secondaryAr: "مؤخرة",
    sets: 4,
    reps: "8–12",
    repsAr: "٨–١٢",
    rest: "90–120 ث",
    restAr: "٩٠–١٢٠ ثانية",
    duration: "8–10 د",
    durationAr: "٨–١٠ د",
    notes: "الحركة من الحوض",
    notesEn: "Hinge from the hips",
    notesAr: "الحركة من الحوض",
    defaultGif: "/exercises/romanian-deadlift.png",
    dumbbellVariation: {
      tool: "دمبل",
      toolEn: "Dumbbell",
      toolAr: "دمبل",
      notes: "الحركة من الحوض",
      notesEn: "Hinge from the hips",
      notesAr: "الحركة من الحوض",
      gifUrl: "/exercises/romanian-deadlift.png",
      links: makeLinks("romanian deadlift dumbbell", "https://www.acefitness.org/resources/everyone/exercise-library/317/romanian-deadlift/")
    },
    machineVariation: {
      tool: "جهاز رفعة أرضي",
      toolEn: "Deadlift machine / Smith",
      toolAr: "جهاز رفعة أرضي",
      notes: "الحركة من الحوض",
      notesEn: "Hinge from the hips",
      notesAr: "الحركة من الحوض",
      gifUrl: "/exercises/romanian-deadlift.png",
      links: makeLinks("romanian deadlift machine")
    }
  },
  {
    id: "leg-extension",
    exercise: "Leg Extension",
    exerciseAr: "تمديد الفخذ",
    primary: "الفخذ الأمامي",
    primaryEn: "Quads",
    primaryAr: "الفخذ الأمامي",
    secondary: "—",
    secondaryEn: "—",
    secondaryAr: "—",
    sets: 3,
    reps: "12–15",
    repsAr: "١٢–١٥",
    rest: "60 ث",
    restAr: "٦٠ ثانية",
    duration: "5–6 د",
    durationAr: "٥–٦ د",
    notes: "توقف بسيط أعلى الحركة",
    notesEn: "Brief pause at the top",
    notesAr: "توقف بسيط أعلى الحركة",
    defaultGif: "/exercises/leg-extension.png",
    dumbbellVariation: {
      tool: "سكوات بساق واحدة",
      toolEn: "Single-leg squat / step-up",
      toolAr: "سكوات بساق واحدة",
      notes: "استبدال منزلي",
      notesEn: "Home alternative",
      notesAr: "استبدال منزلي",
      gifUrl: "/exercises/leg-extension.png",
      links: makeLinks("dumbbell leg extension alternative")
    },
    machineVariation: {
      tool: "جهاز",
      toolEn: "Machine",
      toolAr: "جهاز",
      notes: "توقف بسيط أعلى الحركة",
      notesEn: "Brief pause at the top",
      notesAr: "توقف بسيط أعلى الحركة",
      gifUrl: "/exercises/leg-extension.png",
      links: makeLinks("leg extension machine")
    }
  },
  {
    id: "leg-curl",
    exercise: "Leg Curl",
    exerciseAr: "ثني الفخذ",
    primary: "الخلفية",
    primaryEn: "Hamstrings",
    primaryAr: "الخلفية",
    secondary: "—",
    secondaryEn: "—",
    secondaryAr: "—",
    sets: 3,
    reps: "12–15",
    repsAr: "١٢–١٥",
    rest: "60 ث",
    restAr: "٦٠ ثانية",
    duration: "5–6 د",
    durationAr: "٥–٦ د",
    notes: "نزول بطيء",
    notesEn: "Slow lowering",
    notesAr: "نزول بطيء",
    defaultGif: "/exercises/leg-curl.png",
    dumbbellVariation: {
      tool: "دمبل (رفعة رومانية)",
      toolEn: "Dumbbell (RDL)",
      toolAr: "دمبل (رفعة رومانية)",
      notes: "استبدال منزلي",
      notesEn: "Home alternative",
      notesAr: "استبدال منزلي",
      gifUrl: "/exercises/romanian-deadlift.png",
      links: makeLinks("dumbbell leg curl alternative")
    },
    machineVariation: {
      tool: "جهاز",
      toolEn: "Machine",
      toolAr: "جهاز",
      notes: "نزول بطيء",
      notesEn: "Slow lowering",
      notesAr: "نزول بطيء",
      gifUrl: "/exercises/leg-curl.png",
      links: makeLinks("leg curl machine")
    }
  },
  {
    id: "lunge",
    exercise: "Lunge",
    exerciseAr: "خطوة أمامية",
    primary: "الأرجل",
    primaryEn: "Legs",
    primaryAr: "الأرجل",
    secondary: "مؤخرة + كور",
      secondaryEn: "Glutes + core",
    secondaryAr: "مؤخرة + كور",
    sets: 2,
    reps: "10 لكل رجل",
    repsAr: "١٠ لكل رجل",
    rest: "60–75 ث",
    restAr: "٦٠–٧٥ ثانية",
    duration: "5–6 د",
    durationAr: "٥–٦ د",
    notes: "خطوة ثابتة",
    notesEn: "Stable step pattern",
    notesAr: "خطوة ثابتة",
    defaultGif: "/exercises/lunge.png",
    dumbbellVariation: {
      tool: "دمبل / وزن جسم",
      toolEn: "Dumbbell / bodyweight",
      toolAr: "دمبل / وزن جسم",
      notes: "خطوة ثابتة",
      notesEn: "Stable step pattern",
      notesAr: "خطوة ثابتة",
      gifUrl: "/exercises/lunge.png",
      links: makeLinks("dumbbell lunge", "https://www.acefitness.org/resources/everyone/exercise-library/363/lunge/")
    },
    machineVariation: {
      tool: "جهاز ليج بريس",
      toolEn: "Leg press machine",
      toolAr: "جهاز ليج بريس",
      notes: "بديل آمن للركبة",
      notesEn: "Knee-safe alternative",
      notesAr: "بديل آمن للركبة",
      gifUrl: "/exercises/lunge.png",
      links: makeLinks("leg press machine")
    }
  },
  {
    id: "standing-calf-raise",
    exercise: "Standing Calf Raise",
    exerciseAr: "رفع السمانة واقف",
    primary: "السمانة",
    primaryEn: "Calves",
    primaryAr: "السمانة",
    secondary: "—",
    secondaryEn: "—",
    secondaryAr: "—",
    sets: 4,
    reps: "12–20",
    repsAr: "١٢–٢٠",
    rest: "45–60 ث",
    restAr: "٤٥–٦٠ ثانية",
    duration: "5–6 د",
    durationAr: "٥–٦ د",
    notes: "طلوع كامل ونزول كامل",
    notesEn: "Full stretch and full rise",
    notesAr: "طلوع كامل ونزول كامل",
    defaultGif: "/exercises/calf-raise.png",
    dumbbellVariation: {
      tool: "وزن جسم / دمبل",
      toolEn: "Bodyweight / dumbbell",
      toolAr: "وزن جسم / دمبل",
      notes: "طلوع كامل ونزول كامل",
      notesEn: "Full stretch and full rise",
      notesAr: "طلوع كامل ونزول كامل",
      gifUrl: "/exercises/calf-raise.png",
      links: makeLinks("standing calf raise", "https://www.acefitness.org/resources/everyone/exercise-library/73/standing-calf-raises-wall/")
    },
    machineVariation: {
      tool: "جهاز رفع سمانة",
      toolEn: "Calf raise machine",
      toolAr: "جهاز رفع سمانة",
      notes: "طلوع كامل",
      notesEn: "Full stretch",
      notesAr: "طلوع كامل",
      gifUrl: "/exercises/calf-raise.png",
      links: makeLinks("machine calf raise")
    }
  },
  {
    id: "plank-crunch",
    exercise: "Plank / Crunch",
    exerciseAr: "بلانك / شد البطن",
    primary: "البطن",
    primaryEn: "Abs",
    primaryAr: "البطن",
    secondary: "كور",
    secondaryEn: "Core",
    secondaryAr: "كور",
    sets: 3,
    reps: "15–20 أو 30–45 ث",
    repsAr: "١٥–٢٠ أو ٣٠–٤٥ ث",
    rest: "30–45 ث",
    restAr: "٣٠–٤٥ ثانية",
    duration: "4–5 د",
    durationAr: "٤–٥ د",
    notes: "شد البطن",
    notesEn: "Brace the abs",
    notesAr: "شد البطن",
    defaultGif: "/exercises/plank.png",
    dumbbellVariation: {
      tool: "وزن جسم",
      toolEn: "Bodyweight",
      toolAr: "وزن جسم",
      notes: "شد البطن",
      notesEn: "Brace the abs",
      notesAr: "شد البطن",
      gifUrl: "/exercises/plank.png",
      links: makeLinks("plank exercise")
    },
    machineVariation: {
      tool: "جهاز شد البطن",
      toolEn: "Ab crunch machine",
      toolAr: "جهاز شد البطن",
      notes: "آمن للظهر",
      notesEn: "Back-safe",
      notesAr: "آمن للظهر",
      gifUrl: "/exercises/plank.png",
      links: makeLinks("ab crunch machine")
    }
  },
  // Upper B - Monday
  {
    id: "incline-db-press-b",
    exercise: "Incline Dumbbell Press",
    exerciseAr: "ضغط مائل بالدمبل",
    primary: "أعلى الصدر",
    primaryEn: "Upper chest",
    primaryAr: "أعلى الصدر",
    secondary: "كتف أمامي + ترايسبس",
    secondaryEn: "Front delts + triceps",
    secondaryAr: "كتف أمامي + ترايسبس",
    sets: 4,
    reps: "8–12",
    repsAr: "٨–١٢",
    rest: "90–120 ث",
    restAr: "٩٠–١٢٠ ثانية",
    duration: "8–10 د",
    durationAr: "٨–١٠ د",
    notes: "تحكم كامل",
    notesEn: "Full control",
    notesAr: "تحكم كامل",
    defaultGif: "/exercises/incline-db-press.png",
    dumbbellVariation: {
      tool: "بنش مائل + دمبل",
      toolEn: "Incline bench + dumbbell",
      toolAr: "بنش مائل + دمبل",
      notes: "تحكم كامل",
      notesEn: "Full control",
      notesAr: "تحكم كامل",
      gifUrl: "/exercises/incline-db-press.png",
      links: makeLinks("incline dumbbell press", "https://www.acefitness.org/resources/everyone/exercise-library/25/incline-chest-press/")
    },
    machineVariation: {
      tool: "جهاز ضغط مائل",
      toolEn: "Incline press machine",
      toolAr: "جهاز ضغط مائل",
      notes: "تحكم كامل",
      notesEn: "Full control",
      notesAr: "تحكم كامل",
      gifUrl: "/exercises/incline-db-press.png",
      links: makeLinks("incline chest press machine")
    }
  },
  {
    id: "machine-chest-press",
    exercise: "Machine / Cable Chest Press",
    exerciseAr: "ضغط صدر جهاز/كيبل",
    primary: "الصدر",
    primaryEn: "Chest",
    primaryAr: "الصدر",
    secondary: "ترايسبس",
    secondaryEn: "Triceps",
    secondaryAr: "ترايسبس",
    sets: 3,
    reps: "10–12",
    repsAr: "١٠–١٢",
    rest: "75–90 ث",
    restAr: "٧٥–٩٠ ثانية",
    duration: "6–8 د",
    durationAr: "٦–٨ د",
    notes: "ضغط كامل",
    notesEn: "Complete press",
    notesAr: "ضغط كامل",
    defaultGif: "/exercises/db-chest-press.png",
    dumbbellVariation: {
      tool: "دمبل (ضغط مستوٍ)",
      toolEn: "Dumbbell (flat press)",
      toolAr: "دمبل (ضغط مستوٍ)",
      notes: "ضغط كامل",
      notesEn: "Complete press",
      notesAr: "ضغط كامل",
      gifUrl: "/exercises/db-chest-press.png",
      links: makeLinks("dumbbell chest press", "https://www.acefitness.org/resources/everyone/exercise-library/5/chest-press/")
    },
    machineVariation: {
      tool: "جهاز",
      toolEn: "Machine",
      toolAr: "جهاز",
      notes: "ضغط كامل",
      notesEn: "Complete press",
      notesAr: "ضغط كامل",
      gifUrl: "/exercises/db-chest-press.png",
      links: makeLinks("machine chest press")
    }
  },
  {
    id: "lat-pulldown-b",
    exercise: "Lat Pulldown / Pull-Up",
    exerciseAr: "سحب لات / شد الأفقي",
    primary: "الظهر",
    primaryEn: "Back",
    primaryAr: "الظهر",
    secondary: "بايسبس",
    secondaryEn: "Biceps",
    secondaryAr: "بايسبس",
    sets: 4,
    reps: "8–12",
    repsAr: "٨–١٢",
    rest: "90 ث",
    restAr: "٩٠ ثانية",
    duration: "8–10 د",
    durationAr: "٨–١٠ د",
    notes: "لا تسحب بالذراع فقط",
    notesEn: "Do not pull only with the arms",
    notesAr: "لا تسحب بالذراع فقط",
    defaultGif: "/exercises/lat-pulldown.png",
    dumbbellVariation: {
      tool: "عقلة / دمبل",
      toolEn: "Pull-up bar",
      toolAr: "عقلة",
      notes: "لا تسحب بالذراع فقط",
      notesEn: "Do not pull only with the arms",
      notesAr: "لا تسحب بالذراع فقط",
      gifUrl: "/exercises/lat-pulldown.png",
      links: makeLinks("lat pulldown pull up", "https://www.acefitness.org/resources/everyone/exercise-library/158/seated-lat-pulldown/")
    },
    machineVariation: {
      tool: "جهاز لات بولداون",
      toolEn: "Lat pulldown machine",
      toolAr: "جهاز لات بولداون",
      notes: "لا تسحب بالذراع فقط",
      notesEn: "Do not pull only with the arms",
      notesAr: "لا تسحب بالذراع فقط",
      gifUrl: "/exercises/lat-pulldown.png",
      links: makeLinks("lat pulldown machine")
    }
  },
  {
    id: "cable-row",
    exercise: "Cable Row",
    exerciseAr: "سحب كيبل",
    primary: "منتصف الظهر",
    primaryEn: "Mid back",
    primaryAr: "منتصف الظهر",
    secondary: "بايسبس",
    secondaryEn: "Biceps",
    secondaryAr: "بايسبس",
    sets: 4,
    reps: "8–12",
    repsAr: "٨–١٢",
    rest: "75–90 ث",
    restAr: "٧٥–٩٠ ثانية",
    duration: "7–8 د",
    durationAr: "٧–٨ د",
    notes: "اسحب للبطن",
    notesEn: "Pull toward the abdomen",
    notesAr: "اسحب للبطن",
    defaultGif: "/exercises/single-arm-row.png",
    dumbbellVariation: {
      tool: "دمبل (سحب منحني)",
      toolEn: "Dumbbell (bent-over row)",
      toolAr: "دمبل (سحب منحني)",
      notes: "اسحب للبطن",
      notesEn: "Pull toward the abdomen",
      notesAr: "اسحب للبطن",
      gifUrl: "/exercises/single-arm-row.png",
      links: makeLinks("seated cable row")
    },
    machineVariation: {
      tool: "كيبل",
      toolEn: "Cable",
      toolAr: "كيبل",
      notes: "اسحب للبطن",
      notesEn: "Pull toward the abdomen",
      notesAr: "اسحب للبطن",
      gifUrl: "/exercises/single-arm-row.png",
      links: makeLinks("cable row")
    }
  },
  {
    id: "seated-shoulder-press-b",
    exercise: "Seated Dumbbell Shoulder Press",
    exerciseAr: "ضغط كتف جالس",
    primary: "الكتف",
    primaryEn: "Shoulders",
    primaryAr: "الكتف",
    secondary: "ترايسبس",
    secondaryEn: "Triceps",
    secondaryAr: "ترايسبس",
    sets: 3,
    reps: "8–12",
    repsAr: "٨–١٢",
    rest: "90 ث",
    restAr: "٩٠ ثانية",
    duration: "6–8 د",
    durationAr: "٦–٨ د",
    notes: "نزول ثابت",
    notesEn: "Steady lowering phase",
    notesAr: "نزول ثابت",
    defaultGif: "/exercises/shoulder-press.png",
    dumbbellVariation: {
      tool: "دمبل",
      toolEn: "Dumbbell",
      toolAr: "دمبل",
      notes: "نزول ثابت",
      notesEn: "Steady lowering phase",
      notesAr: "نزول ثابت",
      gifUrl: "/exercises/shoulder-press.png",
      links: makeLinks("seated dumbbell shoulder press", "https://www.acefitness.org/resources/everyone/exercise-library/45/seated-overhead-press/")
    },
    machineVariation: {
      tool: "جهاز ضغط كتف",
      toolEn: "Shoulder press machine",
      toolAr: "جهاز ضغط كتف",
      notes: "نزول ثابت",
      notesEn: "Steady lowering phase",
      notesAr: "نزول ثابت",
      gifUrl: "/exercises/shoulder-press.png",
      links: makeLinks("shoulder press machine")
    }
  },
  {
    id: "lateral-raise-b",
    exercise: "Lateral Raise",
    exerciseAr: "رفع جانبي",
    primary: "الكتف الجانبي",
    primaryEn: "Side delts",
    primaryAr: "الكتف الجانبي",
    secondary: "—",
    secondaryEn: "—",
    secondaryAr: "—",
    sets: 4,
    reps: "12–20",
    repsAr: "١٢–٢٠",
    rest: "45–60 ث",
    restAr: "٤٥–٦٠ ثانية",
    duration: "5–6 د",
    durationAr: "٥–٦ د",
    notes: "بدون تأرجح",
    notesEn: "No swinging",
    notesAr: "بدون تأرجح",
    defaultGif: "/exercises/lateral-raise.png",
    dumbbellVariation: {
      tool: "دمبل",
      toolEn: "Dumbbell",
      toolAr: "دمبل",
      notes: "بدون تأرجح",
      notesEn: "No swinging",
      notesAr: "بدون تأرجح",
      gifUrl: "/exercises/lateral-raise.png",
      links: makeLinks("lateral raise", "https://www.acefitness.org/resources/everyone/exercise-library/26/lateral-raise/")
    },
    machineVariation: {
      tool: "جهاز رفع جانبي",
      toolEn: "Lateral raise machine",
      toolAr: "جهاز رفع جانبي",
      notes: "بدون تأرجح",
      notesEn: "No swinging",
      notesAr: "بدون تأرجح",
      gifUrl: "/exercises/lateral-raise.png",
      links: makeLinks("lateral raise machine")
    }
  },
  {
    id: "hammer-curl",
    exercise: "Hammer Curl",
    exerciseAr: "تمرين هامر",
    primary: "البايسبس + الساعد",
    primaryEn: "Biceps + forearm",
    primaryAr: "البايسبس + الساعد",
    secondary: "—",
    secondaryEn: "—",
    secondaryAr: "—",
    sets: 3,
    reps: "10–15",
    repsAr: "١٠–١٥",
    rest: "45–60 ث",
    restAr: "٤٥–٦٠ ثانية",
    duration: "5–6 د",
    durationAr: "٥–٦ د",
    notes: "قبضة محايدة",
    notesEn: "Neutral grip",
    notesAr: "قبضة محايدة",
    defaultGif: "/exercises/hammer-curl.png",
    dumbbellVariation: {
      tool: "دمبل",
      toolEn: "Dumbbell",
      toolAr: "دمبل",
      notes: "قبضة محايدة",
      notesEn: "Neutral grip",
      notesAr: "قبضة محايدة",
      gifUrl: "/exercises/hammer-curl.png",
      links: makeLinks("hammer curl", "https://www.acefitness.org/resources/everyone/exercise-library/10/hammer-curl/")
    },
    machineVariation: {
      tool: "جهاز بايسبس محايد",
      toolEn: "Neutral grip curl machine",
      toolAr: "جهاز بايسبس محايد",
      notes: "قبضة محايدة",
      notesEn: "Neutral grip",
      notesAr: "قبضة محايدة",
      gifUrl: "/exercises/hammer-curl.png",
      links: makeLinks("hammer curl machine")
    }
  },
  {
    id: "overhead-triceps",
    exercise: "Overhead Triceps Extension / Pushdown",
    exerciseAr: "تمديد ترايسبس من الأعلى",
    primary: "الترايسبس",
    primaryEn: "Triceps",
    primaryAr: "الترايسبس",
    secondary: "—",
    secondaryEn: "—",
    secondaryAr: "—",
    sets: 3,
    reps: "10–15",
    repsAr: "١٠–١٥",
    rest: "45–60 ث",
    restAr: "٤٥–٦٠ ثانية",
    duration: "5–6 د",
    durationAr: "٥–٦ د",
    notes: "مدّ كامل",
    notesEn: "Full extension",
    notesAr: "مدّ كامل",
    defaultGif: "/exercises/overhead-triceps.png",
    dumbbellVariation: {
      tool: "دمبل",
      toolEn: "Dumbbell",
      toolAr: "دمبل",
      notes: "مدّ كامل",
      notesEn: "Full extension",
      notesAr: "مدّ كامل",
      gifUrl: "/exercises/overhead-triceps.png",
      links: makeLinks("overhead triceps extension dumbbell", "https://www.acefitness.org/resources/everyone/exercise-library/333/tricep-pressdown/")
    },
    machineVariation: {
      tool: "كيبل",
      toolEn: "Cable",
      toolAr: "كيبل",
      notes: "مدّ كامل",
      notesEn: "Full extension",
      notesAr: "مدّ كامل",
      gifUrl: "/exercises/overhead-triceps.png",
      links: makeLinks("overhead triceps extension cable")
    }
  },
  // Upper C - Wednesday
  {
    id: "seated-shoulder-press-c",
    exercise: "Seated Dumbbell Shoulder Press",
    exerciseAr: "ضغط كتف جالس",
    primary: "الكتف",
    primaryEn: "Shoulders",
    primaryAr: "الكتف",
    secondary: "ترايسبس",
    secondaryEn: "Triceps",
    secondaryAr: "ترايسبس",
    sets: 4,
    reps: "8–12",
    repsAr: "٨–١٢",
    rest: "90 ث",
    restAr: "٩٠ ثانية",
    duration: "8–10 د",
    durationAr: "٨–١٠ د",
    notes: "هذا اليوم أخف من A و B",
    notesEn: "This day is lighter than A and B",
    notesAr: "هذا اليوم أخف من A و B",
    defaultGif: "/exercises/shoulder-press.png",
    dumbbellVariation: {
      tool: "دمبل",
      toolEn: "Dumbbell",
      toolAr: "دمبل",
      notes: "هذا اليوم أخف من A و B",
      notesEn: "This day is lighter than A and B",
      notesAr: "هذا اليوم أخف من A و B",
      gifUrl: "/exercises/shoulder-press.png",
      links: makeLinks("seated dumbbell shoulder press", "https://www.acefitness.org/resources/everyone/exercise-library/45/seated-overhead-press/")
    },
    machineVariation: {
      tool: "جهاز ضغط كتف",
      toolEn: "Shoulder press machine",
      toolAr: "جهاز ضغط كتف",
      notes: "هذا اليوم أخف من A و B",
      notesEn: "This day is lighter than A and B",
      notesAr: "هذا اليوم أخف من A و B",
      gifUrl: "/exercises/shoulder-press.png",
      links: makeLinks("shoulder press machine")
    }
  },
  {
    id: "lateral-raise-c",
    exercise: "Lateral Raise",
    exerciseAr: "رفع جانبي",
    primary: "الكتف الجانبي",
    primaryEn: "Side delts",
    primaryAr: "الكتف الجانبي",
    secondary: "—",
    secondaryEn: "—",
    secondaryAr: "—",
    sets: 4,
    reps: "12–20",
    repsAr: "١٢–٢٠",
    rest: "45–60 ث",
    restAr: "٤٥–٦٠ ثانية",
    duration: "5–6 د",
    durationAr: "٥–٦ د",
    notes: "ارفع لحد الكتف تقريبًا",
    notesEn: "Raise to about shoulder height",
    notesAr: "ارفع لحد الكتف تقريبًا",
    defaultGif: "/exercises/lateral-raise.png",
    dumbbellVariation: {
      tool: "دمبل",
      toolEn: "Dumbbell",
      toolAr: "دمبل",
      notes: "ارفع لحد الكتف تقريبًا",
      notesEn: "Raise to about shoulder height",
      notesAr: "ارفع لحد الكتف تقريبًا",
      gifUrl: "/exercises/lateral-raise.png",
      links: makeLinks("lateral raise", "https://www.acefitness.org/resources/everyone/exercise-library/26/lateral-raise/")
    },
    machineVariation: {
      tool: "جهاز رفع جانبي",
      toolEn: "Lateral raise machine",
      toolAr: "جهاز رفع جانبي",
      notes: "ارفع لحد الكتف تقريبًا",
      notesEn: "Raise to about shoulder height",
      notesAr: "ارفع لحد الكتف تقريبًا",
      gifUrl: "/exercises/lateral-raise.png",
      links: makeLinks("lateral raise machine")
    }
  },
  {
    id: "rear-delt-facepull",
    exercise: "Rear Delt Raise / Face Pull",
    exerciseAr: "سحب وجه / رفع خلفي",
    primary: "الكتف الخلفي",
    primaryEn: "Rear delts",
    primaryAr: "الكتف الخلفي",
    secondary: "أعلى الظهر",
    secondaryEn: "Upper back",
    secondaryAr: "أعلى الظهر",
    sets: 3,
    reps: "12–20",
    repsAr: "١٢–٢٠",
    rest: "45–60 ث",
    restAr: "٤٥–٦٠ ثانية",
    duration: "5–6 د",
    durationAr: "٥–٦ د",
    notes: "ممتاز لشكل الكتف",
    notesEn: "Great for shoulder shape",
    notesAr: "ممتاز لشكل الكتف",
    defaultGif: "/exercises/lateral-raise.png",
    dumbbellVariation: {
      tool: "دمبل",
      toolEn: "Dumbbell",
      toolAr: "دمبل",
      notes: "ممتاز لشكل الكتف",
      notesEn: "Great for shoulder shape",
      notesAr: "ممتاز لشكل الكتف",
      gifUrl: "/exercises/lateral-raise.png",
      links: makeLinks("rear delt raise dumbbell")
    },
    machineVariation: {
      tool: "كيبل",
      toolEn: "Cable",
      toolAr: "كيبل",
      notes: "ممتاز لشكل الكتف",
      notesEn: "Great for shoulder shape",
      notesAr: "ممتاز لشكل الكتف",
      gifUrl: "/exercises/lateral-raise.png",
      links: makeLinks("face pull cable")
    }
  },
  {
    id: "db-chest-press-c",
    exercise: "Dumbbell Chest Press",
    exerciseAr: "ضغط الصدر بالدمبل",
    primary: "الصدر",
    primaryEn: "Chest",
    primaryAr: "الصدر",
    secondary: "ترايسبس",
    secondaryEn: "Triceps",
    secondaryAr: "ترايسبس",
    sets: 3,
    reps: "8–12",
    repsAr: "٨–١٢",
    rest: "75–90 ث",
    restAr: "٧٥–٩٠ ثانية",
    duration: "6–8 د",
    durationAr: "٦–٨ د",
    notes: "حجم متوسط فقط",
    notesEn: "Moderate volume only",
    notesAr: "حجم متوسط فقط",
    defaultGif: "/exercises/db-chest-press.png",
    dumbbellVariation: {
      tool: "بنش + دمبل",
      toolEn: "Bench + dumbbell",
      toolAr: "بنش + دمبل",
      notes: "حجم متوسط فقط",
      notesEn: "Moderate volume only",
      notesAr: "حجم متوسط فقط",
      gifUrl: "/exercises/db-chest-press.png",
      links: makeLinks("dumbbell chest press", "https://www.acefitness.org/resources/everyone/exercise-library/19/chest-press/")
    },
    machineVariation: {
      tool: "جهاز ضغط صدر",
      toolEn: "Chest press machine",
      toolAr: "جهاز ضغط صدر",
      notes: "حجم متوسط فقط",
      notesEn: "Moderate volume only",
      notesAr: "حجم متوسط فقط",
      gifUrl: "/exercises/db-chest-press.png",
      links: makeLinks("machine chest press")
    }
  },
  {
    id: "lat-pulldown-c",
    exercise: "Lat Pulldown خفيف أو Row خفيف",
    exerciseAr: "سحب لات خفيف أو سحب خفيف",
    primary: "الظهر",
    primaryEn: "Back",
    primaryAr: "الظهر",
    secondary: "بايسبس",
    secondaryEn: "Biceps",
    secondaryAr: "بايسبس",
    sets: 3,
    reps: "10–12",
    repsAr: "١٠–١٢",
    rest: "60–75 ث",
    restAr: "٦٠–٧٥ ثانية",
    duration: "5–6 د",
    durationAr: "٥–٦ د",
    notes: "حجم خفيف للحفاظ",
    notesEn: "Light maintenance volume",
    notesAr: "حجم خفيف للحفاظ",
    defaultGif: "/exercises/lat-pulldown.png",
    dumbbellVariation: {
      tool: "جهاز / كيبل",
      toolEn: "Machine / cable",
      toolAr: "جهاز / كيبل",
      notes: "حجم خفيف للحفاظ",
      notesEn: "Light maintenance volume",
      notesAr: "حجم خفيف للحفاظ",
      gifUrl: "/exercises/lat-pulldown.png",
      links: makeLinks("lat pulldown", "https://www.acefitness.org/resources/everyone/exercise-library/158/seated-lat-pulldown/")
    },
    machineVariation: {
      tool: "جهاز / كيبل",
      toolEn: "Machine / cable",
      toolAr: "جهاز / كيبل",
      notes: "حجم خفيف للحفاظ",
      notesEn: "Light maintenance volume",
      notesAr: "حجم خفيف للحفاظ",
      gifUrl: "/exercises/lat-pulldown.png",
      links: makeLinks("lat pulldown machine")
    }
  },
  {
    id: "db-curl-c",
    exercise: "Dumbbell Curl",
    exerciseAr: "تمرين البايسبس",
    primary: "البايسبس",
    primaryEn: "Biceps",
    primaryAr: "البايسبس",
    secondary: "ساعد",
    secondaryEn: "Forearm",
    secondaryAr: "ساعد",
    sets: 3,
    reps: "10–15",
    repsAr: "١٠–١٥",
    rest: "45–60 ث",
    restAr: "٤٥–٦٠ ثانية",
    duration: "5–6 د",
    durationAr: "٥–٦ د",
    notes: "تحكم كامل",
    notesEn: "Full control",
    notesAr: "تحكم كامل",
    defaultGif: "/exercises/bicep-curl.png",
    dumbbellVariation: {
      tool: "دمبل",
      toolEn: "Dumbbell",
      toolAr: "دمبل",
      notes: "تحكم كامل",
      notesEn: "Full control",
      notesAr: "تحكم كامل",
      gifUrl: "/exercises/bicep-curl.png",
      links: makeLinks("dumbbell bicep curl", "https://www.acefitness.org/resources/everyone/exercise-library/body-part/arms/")
    },
    machineVariation: {
      tool: "جهاز بايسبس",
      toolEn: "Bicep curl machine",
      toolAr: "جهاز بايسبس",
      notes: "تحكم كامل",
      notesEn: "Full control",
      notesAr: "تحكم كامل",
      gifUrl: "/exercises/bicep-curl.png",
      links: makeLinks("machine bicep curl")
    }
  },
  {
    id: "hammer-curl-c",
    exercise: "Hammer Curl / Concentration Curl",
    exerciseAr: "هامر / تمرين مركز",
    primary: "البايسبس",
    primaryEn: "Biceps",
    primaryAr: "البايسبس",
    secondary: "—",
    secondaryEn: "—",
    secondaryAr: "—",
    sets: 2,
    reps: "10–15",
    repsAr: "١٠–١٥",
    rest: "45–60 ث",
    restAr: "٤٥–٦٠ ثانية",
    duration: "4–5 د",
    durationAr: "٤–٥ د",
    notes: "خيار إضافي للذراع",
    notesEn: "Optional extra arm work",
    notesAr: "خيار إضافي للذراع",
    defaultGif: "/exercises/hammer-curl.png",
    dumbbellVariation: {
      tool: "دمبل",
      toolEn: "Dumbbell",
      toolAr: "دمبل",
      notes: "خيار إضافي للذراع",
      notesEn: "Optional extra arm work",
      notesAr: "خيار إضافي للذراع",
      gifUrl: "/exercises/hammer-curl.png",
      links: makeLinks("hammer curl", "https://www.acefitness.org/resources/everyone/exercise-library/10/hammer-curl/")
    },
    machineVariation: {
      tool: "جهاز بايسبس",
      toolEn: "Bicep machine",
      toolAr: "جهاز بايسبس",
      notes: "خيار إضافي للذراع",
      notesEn: "Optional extra arm work",
      notesAr: "خيار إضافي للذراع",
      gifUrl: "/exercises/hammer-curl.png",
      links: makeLinks("machine bicep curl")
    }
  },
  {
    id: "triceps-pushdown-c",
    exercise: "Triceps Pushdown",
    exerciseAr: "تمرين ترايسبس كيبل",
    primary: "الترايسبس",
    primaryEn: "Triceps",
    primaryAr: "الترايسبس",
    secondary: "—",
    secondaryEn: "—",
    secondaryAr: "—",
    sets: 3,
    reps: "10–15",
    repsAr: "١٠–١٥",
    rest: "45–60 ث",
    restAr: "٤٥–٦٠ ثانية",
    duration: "5–6 د",
    durationAr: "٥–٦ د",
    notes: "شد كامل",
    notesEn: "Full squeeze",
    notesAr: "شد كامل",
    defaultGif: "/exercises/triceps-pushdown.png",
    dumbbellVariation: {
      tool: "دمبل (سحب خلفي)",
      toolEn: "Dumbbell (kickback)",
      toolAr: "دمبل (سحب خلفي)",
      notes: "شد كامل",
      notesEn: "Full squeeze",
      notesAr: "شد كامل",
      gifUrl: "/exercises/triceps-pushdown.png",
      links: makeLinks("triceps kickback dumbbell")
    },
    machineVariation: {
      tool: "كيبل",
      toolEn: "Cable",
      toolAr: "كيبل",
      notes: "شد كامل",
      notesEn: "Full squeeze",
      notesAr: "شد كامل",
      gifUrl: "/exercises/triceps-pushdown.png",
      links: makeLinks("triceps pushdown", "https://www.acefitness.org/resources/everyone/exercise-library/185/triceps-pushdowns/")
    }
  },
  {
    id: "overhead-triceps-c",
    exercise: "Overhead Triceps Extension",
    exerciseAr: "تمديد ترايسبس من الأعلى",
    primary: "الترايسبس",
    primaryEn: "Triceps",
    primaryAr: "الترايسبس",
    secondary: "—",
    secondaryEn: "—",
    secondaryAr: "—",
    sets: 2,
    reps: "10–15",
    repsAr: "١٠–١٥",
    rest: "45–60 ث",
    restAr: "٤٥–٦٠ ثانية",
    duration: "4–5 د",
    durationAr: "٤–٥ د",
    notes: "استهداف الرأس الطويل",
    notesEn: "Targets the long head",
    notesAr: "استهداف الرأس الطويل",
    defaultGif: "/exercises/overhead-triceps.png",
    dumbbellVariation: {
      tool: "دمبل / كيبل",
      toolEn: "Dumbbell / cable",
      toolAr: "دمبل / كيبل",
      notes: "استهداف الرأس الطويل",
      notesEn: "Targets the long head",
      notesAr: "استهداف الرأس الطويل",
      gifUrl: "/exercises/overhead-triceps.png",
      links: makeLinks("overhead triceps extension dumbbell")
    },
    machineVariation: {
      tool: "كيبل",
      toolEn: "Cable",
      toolAr: "كيبل",
      notes: "استهداف الرأس الطويل",
      notesEn: "Targets the long head",
      notesAr: "استهداف الرأس الطويل",
      gifUrl: "/exercises/overhead-triceps.png",
      links: makeLinks("overhead triceps extension cable")
    }
  }
];

export const DAY_SESSIONS: DaySession[] = [
  {
    day: "الجمعة",
    dayEn: "Friday",
    dayAr: "الجمعة",
    type: "Upper A",
    typeAr: "أعلى الجسم A",
    exercises: EXERCISES.filter(e => [
      "db-chest-press", "incline-db-press", "lat-pulldown", "single-arm-row",
      "seated-shoulder-press", "lateral-raise", "dumbbell-curl", "triceps-pushdown"
    ].includes(e.id))
  },
  {
    day: "السبت",
    dayEn: "Saturday",
    dayAr: "السبت",
    type: "Lower",
    typeAr: "أسفل الجسم",
    exercises: EXERCISES.filter(e => [
      "goblet-squat", "romanian-deadlift", "leg-extension", "leg-curl",
      "lunge", "standing-calf-raise", "plank-crunch"
    ].includes(e.id))
  },
  {
    day: "الأحد",
    dayEn: "Sunday",
    dayAr: "الأحد",
    type: "راحة",
    typeAr: "راحة",
    exercises: []
  },
  {
    day: "الاثنين",
    dayEn: "Monday",
    dayAr: "الاثنين",
    type: "Upper B",
    typeAr: "أعلى الجسم B",
    exercises: EXERCISES.filter(e => [
      "incline-db-press-b", "machine-chest-press", "lat-pulldown-b", "cable-row",
      "seated-shoulder-press-b", "lateral-raise-b", "hammer-curl", "overhead-triceps"
    ].includes(e.id))
  },
  {
    day: "الثلاثاء",
    dayEn: "Tuesday",
    dayAr: "الثلاثاء",
    type: "راحة",
    typeAr: "راحة",
    exercises: []
  },
  {
    day: "الأربعاء",
    dayEn: "Wednesday",
    dayAr: "الأربعاء",
    type: "Upper C",
    typeAr: "أعلى الجسم C",
    exercises: EXERCISES.filter(e => [
      "seated-shoulder-press-c", "lateral-raise-c", "rear-delt-facepull", "db-chest-press-c",
      "lat-pulldown-c", "db-curl-c", "hammer-curl-c", "triceps-pushdown-c", "overhead-triceps-c"
    ].includes(e.id))
  },
  {
    day: "الخميس",
    dayEn: "Thursday",
    dayAr: "الخميس",
    type: "راحة",
    typeAr: "راحة",
    exercises: []
  }
];

export const PROGRAM_SUMMARY: ProgramSummary[] = [
  { key: "نظام التدريب", keyEn: "Training Split", keyAr: "نظام التدريب", value: "3 Upper + 1 Lower", valueEn: "3 Upper + 1 Lower", valueAr: "٣ أعلى + ١ أسفل" },
  { key: "أيام التمرين", keyEn: "Training Days", keyAr: "أيام التمرين", value: "الجمعة، السبت، الاثنين، الأربعاء", valueEn: "Friday, Saturday, Monday, Wednesday", valueAr: "الجمعة، السبت، الاثنين، الأربعاء" },
  { key: "أيام الراحة", keyEn: "Rest Days", keyAr: "أيام الراحة", value: "الأحد، الثلاثاء، الخميس", valueEn: "Sunday, Tuesday, Thursday", valueAr: "الأحد، الثلاثاء، الخميس" },
  { key: "مدة Upper", keyEn: "Upper Duration", keyAr: "مدة Upper", value: "65–75 دقيقة", valueEn: "65-75 min", valueAr: "٦٥–٧٥ دقيقة" },
  { key: "مدة Lower", keyEn: "Lower Duration", keyAr: "مدة Lower", value: "50–60 دقيقة", valueEn: "50-60 min", valueAr: "٥٠–٦٠ دقيقة" },
  { key: "الإحماء", keyEn: "Warm-up", keyAr: "الإحماء", value: "8–10 دقائق قبل كل حصة", valueEn: "8-10 min before every session", valueAr: "٨–١٠ دقائق قبل كل حصة" },
  { key: "الهدف", keyEn: "Goal", keyAr: "الهدف", value: "ضخامة مع تركيز أعلى على الصدر والأكتاف والظهر والأذرع", valueEn: "Hypertrophy with focus on chest, shoulders, back, arms", valueAr: "ضخامة مع تركيز أعلى على الصدر والأكتاف والظهر والأذرع" },
  { key: "الاستشفاء", keyEn: "Recovery", keyAr: "الاستشفاء", value: "الأربعاء أخف من الجمعة والاثنين لتحسين الاستشفاء", valueEn: "Wednesday is lighter than Friday/Monday", valueAr: "الأربعاء أخف من الجمعة والاثنين" }
];

export const RECOVERY_DAYS = [
  { day: "الأحد", dayEn: "Sunday", dayAr: "الأحد", activity: "Rest", activityAr: "راحة", note: "راحة أو مشي خفيف", noteEn: "Rest or light walking", noteAr: "راحة أو مشي خفيف", duration: "20–30 دقيقة", durationEn: "20-30 min", durationAr: "٢٠–٣٠ دقيقة" },
  { day: "الثلاثاء", dayEn: "Tuesday", dayAr: "الثلاثاء", activity: "Rest", activityAr: "راحة", note: "راحة أو مشي خفيف", noteEn: "Rest or light walking", noteAr: "راحة أو مشي خفيف", duration: "20–30 دقيقة", durationEn: "20-30 min", durationAr: "٢٠–٣٠ دقيقة" },
  { day: "الخميس", dayEn: "Thursday", dayAr: "الخميس", activity: "Rest", activityAr: "راحة", note: "راحة أو مشي خفيف", noteEn: "Rest or light walking", noteAr: "راحة أو مشي خفيف", duration: "20–30 دقيقة", durationEn: "20-30 min", durationAr: "٢٠–٣٠ دقيقة" }
];
