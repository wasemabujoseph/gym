import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Dumbbell,
  Calendar,
  CheckCircle2,
  Timer,
  Trophy,
  Droplets,
  Weight,
  Flame,
  Play,
  Pause,
  RotateCcw,
  ExternalLink,
  Youtube,
  BookOpen,
  Award,
  Sun,
  Moon,
  Languages,
  Activity,
  TrendingUp,
  Info,
  BarChart3,
  ClipboardList,
  Save,
  Trash2,
} from "lucide-react";
import {
  DAY_SESSIONS,
  EXERCISES,
  PROGRAM_SUMMARY,
  RECOVERY_DAYS,
  PROGRAM_TITLE,
  PROGRAM_TITLE_AR,
  PROGRAM_FOCUS_EN,
  PROGRAM_FOCUS_AR,
  type Exercise,
  type DaySession,
  type EquipmentVariation,
} from "./data/workoutData";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface WeightLogEntry {
  exerciseId: string;
  date: string;
  weight: number;
  reps: number;
}

interface DayProgress {
  [exerciseId: string]: boolean[]; // completed sets
}

interface AppStateStored {
  lang: "en" | "ar";
  theme: "dark" | "light";
  weightLogs: WeightLogEntry[];
  progress: Record<string, DayProgress>;
  waterIntake: number;
  streak: number;
  lastWorkoutDate: string;
  personalRecords: Record<string, number>;
  xp: number; // Experience points based on sets completed
  level: number;
  trainingNotes: Record<string, string>; // exerciseId -> note
}

/* ------------------------------------------------------------------ */
/*  Utilities                                                          */
/* ------------------------------------------------------------------ */
function getTodayDay(): string {
  const d = new Date().getDay();
  const map = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
  return map[d];
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function loadState(): AppStateStored {
  const raw = localStorage.getItem("abu_fowzan_fitness");
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch { /* empty */ }
  }
  return {
    lang: "ar",
    theme: "dark",
    weightLogs: [],
    progress: {},
    waterIntake: 0,
    streak: 0,
    lastWorkoutDate: "",
    personalRecords: {},
    xp: 0,
    level: 1,
    trainingNotes: {},
  };
}

function saveState(state: AppStateStored) {
  localStorage.setItem("abu_fowzan_fitness", JSON.stringify(state));
}

/* ------------------------------------------------------------------ */
/*  UI Text Dictionary                                                 */
/* ------------------------------------------------------------------ */
const UI = {
  en: {
    brand: "Abu Fowzan | Elite Training",
    welcome: "Welcome back, Abu Fowzan!",
    ready: "Ready to crush today's session?",
    todayWorkout: "Today's Workout",
    selectDay: "Select Day",
    restDay: "Rest Day",
    restDayMsg: "Recovery is where growth happens. Light walk or stretch.",
    exercises: "Exercises",
    sets: "Sets",
    reps: "Reps",
    rest: "Rest",
    duration: "Duration",
    notes: "Notes",
    primary: "Primary",
    secondary: "Secondary",
    tool: "Tool",
    dumbbellVersion: "Dumbbells",
    machineVersion: "Machine / Cable",
    links: "Resources",
    markComplete: "Mark Set Complete",
    completed: "Completed",
    restTimer: "Rest Timer",
    startTimer: "Start",
    pauseTimer: "Pause",
    resetTimer: "Reset",
    weightLog: "Weight Log",
    logWeight: "Log",
    pr: "Personal Record",
    waterTracker: "Water Intake",
    glasses: "glasses",
    streak: "Streak",
    days: "days",
    sessionTimer: "Workout Timer",
    startSession: "Start Workout",
    stopSession: "End Workout",
    overview: "Overview",
    schedule: "Schedule",
    exerciseLibrary: "Exercise Library",
    tools: "Tools",
    bmiCalc: "BMI Calculator",
    height: "Height (cm)",
    weight: "Weight (kg)",
    calculate: "Calculate",
    bmiResult: "Your BMI",
    underweight: "Underweight",
    normal: "Normal",
    overweight: "Overweight",
    obese: "Obese",
    oneRMCalc: "1RM Calculator",
    lifted: "Lifted Weight (kg)",
    repsDone: "Reps Done",
    rmResult: "Estimated 1RM",
    weeklyPlan: "Weekly Plan",
    summary: "Program Summary",
    goal: "Goal",
    trainingDays: "Training Days",
    restDays: "Rest Days",
    upperDuration: "Upper Duration",
    lowerDuration: "Lower Duration",
    warmup: "Warm-up",
    recovery: "Recovery Strategy",
    totalExercises: "Total Exercises",
    exerciseSearch: "Search exercises...",
    allExercises: "All Exercises",
    noResults: "No exercises found.",
    themeToggle: "Toggle theme",
    langToggle: "Toggle language",
    close: "Close",
    copyPlan: "Copy Plan",
    delete: "Delete",
    savedPlans: "Saved Plans",
    planSaved: "Plan saved!",
    noSavedPlans: "No saved plans yet.",
    generatePlan: "Generate",
    aiPlanner: "AI Planner",
    saved: "Saved",
    progress: "Progress",
    totalSets: "Total Sets",
    completedSets: "Completed",
    weeklyStats: "Weekly Stats",
    motivation: "Stay consistent. The results will follow.",
    level: "Level",
    xp: "XP",
    nextLevel: "Next Level",
    trainingNotes: "Training Notes",
    saveNote: "Save Note",
    autoRest: "Auto Rest",
    dashboard: "Dashboard",
    recentPrs: "Recent PRs",
    muscleGroups: "Muscle Groups",
    all: "All",
    chest: "Chest",
    back: "Back",
    shoulders: "Shoulders",
    legs: "Legs",
    arms: "Arms",
    core: "Core",
  },
  ar: {
    brand: "أبو فوزان | تدريب النخبة",
    welcome: "أهلاً بك أبو فوزان!",
    ready: "جاهز لتحدي اليوم؟",
    todayWorkout: "تمرين اليوم",
    selectDay: "اختر اليوم",
    restDay: "يوم راحة",
    restDayMsg: "الاستشفاء هو مكان النمو. مشي خفيف أو تمدد.",
    exercises: "تمارين",
    sets: "مجموعات",
    reps: "تكرارات",
    rest: "راحة",
    duration: "المدة",
    notes: "ملاحظات",
    primary: "أساسي",
    secondary: "مساعد",
    tool: "الأداة",
    dumbbellVersion: "دمبل",
    machineVersion: "جهاز / كيبل",
    links: "مصادر",
    markComplete: "أكمل المجموعة",
    completed: "مكتمل",
    restTimer: "مؤقت الراحة",
    startTimer: "ابدأ",
    pauseTimer: "إيقاف",
    resetTimer: "إعادة",
    weightLog: "سجل الأوزان",
    logWeight: "سجل",
    pr: "الرقم الشخصي",
    waterTracker: "تتبع الماء",
    glasses: "كوب",
    streak: "السلسلة",
    days: "أيام",
    sessionTimer: "مؤقت التمرين",
    startSession: "ابدأ التمرين",
    stopSession: "أنهِ التمرين",
    overview: "نظرة عامة",
    schedule: "الجدول",
    exerciseLibrary: "مكتبة التمارين",
    tools: "أدوات",
    bmiCalc: "حاسبة BMI",
    height: "الطول (سم)",
    weight: "الوزن (كغ)",
    calculate: "احسب",
    bmiResult: "BMI الخاص بك",
    underweight: "نقص وزن",
    normal: "طبيعي",
    overweight: "زيادة وزن",
    obese: "سمنة",
    oneRMCalc: "حاسبة 1RM",
    lifted: "الوزن المرفوع (كغ)",
    repsDone: "التكرارات",
    rmResult: "1RM التقديري",
    weeklyPlan: "الخطة الأسبوعية",
    summary: "ملخص البرنامج",
    goal: "الهدف",
    trainingDays: "أيام التمرين",
    restDays: "أيام الراحة",
    upperDuration: "مدة Upper",
    lowerDuration: "مدة Lower",
    warmup: "الإحماء",
    recovery: "استراتيجية الاستشفاء",
    totalExercises: "مجموع التمارين",
    exerciseSearch: "ابحث في التمارين...",
    allExercises: "كل التمارين",
    noResults: "لا توجد تمارين.",
    themeToggle: "تبديل الوضع",
    langToggle: "تبديل اللغة",
    close: "إغلاق",
    copyPlan: "نسخ الخطة",
    delete: "حذف",
    savedPlans: "الخطط المحفوظة",
    planSaved: "تم حفظ الخطة!",
    noSavedPlans: "لا توجد خطط محفوظة.",
    generatePlan: "توليد",
    aiPlanner: "الخطة الذكية",
    saved: "المحفوظات",
    progress: "التقدم",
    totalSets: "المجموعات الكلية",
    completedSets: "المكتملة",
    weeklyStats: "إحصائيات الأسبوع",
    motivation: "استمرارية. النتائج ستأتي.",
    level: "المستوى",
    xp: "خبرة",
    nextLevel: "المستوى القادم",
    trainingNotes: "ملاحظات التدريب",
    saveNote: "حفظ الملاحظة",
    autoRest: "راحة تلقائية",
    dashboard: "لوحة التحكم",
    recentPrs: "أرقام قياسية أخيرة",
    muscleGroups: "العضلات",
    all: "الكل",
    chest: "الصدر",
    back: "الظهر",
    shoulders: "الأكتاف",
    legs: "الأرجل",
    arms: "الأذرع",
    core: "البطن/الجذع",
  },
};

/* ------------------------------------------------------------------ */
/*  Main App Component                                                 */
/* ------------------------------------------------------------------ */
export default function App() {
  const [state, setState] = useState<AppStateStored>(loadState);
  const [selectedDay, setSelectedDay] = useState<string>(getTodayDay());
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [selectedMuscle, setSelectedMuscle] = useState<string>("All");
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [sessionRunning, setSessionRunning] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [savedPlans, setSavedPlans] = useState<string[]>([]);

  const sessionInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const t = state.lang === "en" ? UI.en : UI.ar;
  const isRTL = state.lang === "ar";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", state.theme === "dark");
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = state.lang;
  }, [state.theme, isRTL, state.lang]);

  useEffect(() => {
    saveState(state);
  }, [state]);

  useEffect(() => {
    const saved = localStorage.getItem("abu_fowzan_plans");
    if (saved) {
      try {
        setSavedPlans(JSON.parse(saved));
      } catch { /* empty */ }
    }
  }, []);

  const toggleLang = () => {
    setState((s) => ({ ...s, lang: s.lang === "en" ? "ar" : "en" }));
  };

  const toggleTheme = () => {
    setState((s) => ({ ...s, theme: s.theme === "dark" ? "light" : "dark" }));
  };

  /* Session Timer */
  const startSession = () => {
    if (sessionRunning) return;
    setSessionRunning(true);
    sessionInterval.current = setInterval(() => {
      setSessionSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopSession = () => {
    if (!sessionRunning) return;
    setSessionRunning(false);
    if (sessionInterval.current) clearInterval(sessionInterval.current);
  };

  const resetSession = () => {
    stopSession();
    setSessionSeconds(0);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  /* Progress helpers */
  const getDayProgress = (day: string): DayProgress => {
    return state.progress[day] || {};
  };

  const toggleSetComplete = (day: string, exerciseId: string, setIndex: number, totalSets: number) => {
    setState((s) => {
      const dayProg = { ...(s.progress[day] || {}) };
      const exProg = [...(dayProg[exerciseId] || Array(totalSets).fill(false))];
      exProg[setIndex] = !exProg[setIndex];
      dayProg[exerciseId] = exProg;
      const newProgress = { ...s.progress, [day]: dayProg };
      
      // XP Logic
      let xp = s.xp + 10;
      let level = s.level;
      const nextLevelXp = level * 100 * (1 + (level * 0.1)); // Scaling difficulty
      if (xp >= nextLevelXp) {
        level += 1;
        // Optional: play sound or alert
      }

      // streak logic
      const today = formatDate(new Date());
      const anyComplete = Object.values(dayProg).some((arr) => arr.some(Boolean));
      let streak = s.streak;
      let lastWorkoutDate = s.lastWorkoutDate;
      if (anyComplete && lastWorkoutDate !== today) {
        const last = new Date(lastWorkoutDate || "1970-01-01");
        const now = new Date(today);
        const diff = Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
        if (diff <= 1) {
          streak = streak + 1;
        } else {
          streak = 1;
        }
        lastWorkoutDate = today;
      }
      return { ...s, progress: newProgress, streak, lastWorkoutDate, xp, level };
    });
  };

  const getCompletedCount = (day: string) => {
    const dp = state.progress[day] || {};
    return Object.values(dp).reduce((sum, arr) => sum + arr.filter(Boolean).length, 0);
  };

  const getTotalSetsForDay = (daySession: DaySession) => {
    return daySession.exercises.reduce((sum, ex) => sum + (ex.sets || 0), 0);
  };

  /* Water */
  const addWater = () => setState((s) => ({ ...s, waterIntake: s.waterIntake + 1 }));

  /* Weight Log */
  const [logWeightVal, setLogWeightVal] = useState("");
  const [logRepsVal, setLogRepsVal] = useState("");
  const [selectedExerciseForLog, setSelectedExerciseForLog] = useState("");

  const addWeightLog = () => {
    if (!selectedExerciseForLog || !logWeightVal) return;
    const entry: WeightLogEntry = {
      exerciseId: selectedExerciseForLog,
      date: formatDate(new Date()),
      weight: parseFloat(logWeightVal),
      reps: parseInt(logRepsVal) || 0,
    };
    setState((s) => {
      const logs = [entry, ...s.weightLogs];
      const prs = { ...s.personalRecords };
      const currentPR = prs[entry.exerciseId] || 0;
      if (entry.weight > currentPR) {
        prs[entry.exerciseId] = entry.weight;
      }
      return { ...s, weightLogs: logs, personalRecords: prs };
    });
    setLogRepsVal("");
  };

  const saveNote = (exerciseId: string, note: string) => {
    setState(s => ({
      ...s,
      trainingNotes: { ...s.trainingNotes, [exerciseId]: note }
    }));
  };

  /* BMI */
  const [bmiHeight, setBmiHeight] = useState("");
  const [bmiWeight, setBmiWeight] = useState("");
  const [bmiResult, setBmiResult] = useState<number | null>(null);

  const calcBMI = () => {
    const h = parseFloat(bmiHeight) / 100;
    const w = parseFloat(bmiWeight);
    if (h > 0 && w > 0) setBmiResult(parseFloat((w / (h * h)).toFixed(1)));
  };

  /* 1RM */
  const [rmWeight, setRmWeight] = useState("");
  const [rmReps, setRmReps] = useState("");
  const [rmResult, setRmResult] = useState<number | null>(null);

  const calcRM = () => {
    const w = parseFloat(rmWeight);
    const r = parseFloat(rmReps);
    if (w > 0 && r > 0) {
      // Epley formula
      setRmResult(parseFloat((w * (1 + r / 30)).toFixed(1)));
    }
  };

  /* Save Plan */
  const saveCurrentPlan = () => {
    const daySession = DAY_SESSIONS.find((d) => d.day === selectedDay);
    if (!daySession || daySession.exercises.length === 0) return;
    const planText = `${daySession.day} - ${daySession.type}\n${daySession.exercises
      .map((e) => `- ${e.exercise}: ${e.sets} × ${e.reps}`)
      .join("\n")}`;
    const newPlans = [planText, ...savedPlans];
    setSavedPlans(newPlans);
    localStorage.setItem("abu_fowzan_plans", JSON.stringify(newPlans));
  };

  const deletePlan = (idx: number) => {
    const newPlans = savedPlans.filter((_, i) => i !== idx);
    setSavedPlans(newPlans);
    localStorage.setItem("abu_fowzan_plans", JSON.stringify(newPlans));
  };

  /* Derived data */
  const selectedSession = DAY_SESSIONS.find((d) => d.day === selectedDay);
  const totalSetsToday = selectedSession ? getTotalSetsForDay(selectedSession) : 0;
  const completedSetsToday = getCompletedCount(selectedDay);

  const filteredExercises = EXERCISES.filter((e) => {
    const q = searchQuery.toLowerCase();
    const muscleMatch = selectedMuscle === "All" || 
      e.primaryEn === selectedMuscle || 
      (selectedMuscle === "Core" && e.primaryEn === "Abs");
    
    return muscleMatch && (
      e.exercise.toLowerCase().includes(q) ||
      e.exerciseAr.toLowerCase().includes(q) ||
      e.primary.toLowerCase().includes(q) ||
      e.primaryEn.toLowerCase().includes(q) ||
      e.secondary.toLowerCase().includes(q) ||
      e.secondaryEn.toLowerCase().includes(q) ||
      e.dumbbellVariation.toolEn.toLowerCase().includes(q) ||
      e.machineVariation.toolEn.toLowerCase().includes(q)
    );
  });

  const muscleGroups = ["All", "Chest", "Back", "Shoulders", "Legs", "Arms", "Core"];

  const weeklyProgress = DAY_SESSIONS.map((d) => {
    const total = getTotalSetsForDay(d);
    const done = getCompletedCount(d.day);
    return { day: isRTL ? d.dayAr : d.dayEn, total, done, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
  });

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-lg">
              <Dumbbell className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">{t.brand}</h1>
              <p className="text-xs text-muted-foreground">
                {state.lang === "en" ? PROGRAM_FOCUS_EN : PROGRAM_FOCUS_AR}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleLang} title={t.langToggle}>
              <Languages className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme} title={t.themeToggle}>
              {state.theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">
        {/* ===== HERO ===== */}
        <section className="mb-8">
          <Card className="overflow-hidden border-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <Badge variant="outline" className="mb-2 border-cyan-400/30 text-cyan-500">
                    <Flame className="mr-1 h-3 w-3" /> {state.lang === "en" ? PROGRAM_TITLE : PROGRAM_TITLE_AR}
                  </Badge>
                  <h2 className="text-2xl font-extrabold">{t.welcome}</h2>
                  <p className="text-muted-foreground">{t.ready}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Card className="flex items-center gap-3 px-4 py-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <div>
                      <div className="text-xs text-muted-foreground">{t.streak}</div>
                      <div className="text-lg font-bold">{state.streak} <span className="text-xs font-normal text-muted-foreground">{t.days}</span></div>
                    </div>
                  </Card>
                  <Card className="flex items-center gap-3 px-4 py-2">
                    <Droplets className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="text-xs text-muted-foreground">{t.waterTracker}</div>
                      <div className="text-lg font-bold">{state.waterIntake} <span className="text-xs font-normal text-muted-foreground">{t.glasses}</span></div>
                    </div>
                  </Card>
                  <Card className="flex items-center gap-3 px-4 py-2">
                    <Timer className="h-5 w-5 text-emerald-500" />
                    <div>
                      <div className="text-xs text-muted-foreground">{t.sessionTimer}</div>
                      <div className="text-lg font-bold font-mono">{formatTime(sessionSeconds)}</div>
                    </div>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ===== TABS ===== */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
            <TabsTrigger value="dashboard" className="gap-2">
              <BarChart3 className="h-4 w-4" /> {t.dashboard}
            </TabsTrigger>
            <TabsTrigger value="schedule" className="gap-2">
              <Calendar className="h-4 w-4" /> {t.weeklyPlan}
            </TabsTrigger>
            <TabsTrigger value="workout" className="gap-2">
              <Activity className="h-4 w-4" /> {t.todayWorkout}
            </TabsTrigger>
            <TabsTrigger value="library" className="gap-2">
              <ClipboardList className="h-4 w-4" /> {t.exerciseLibrary}
            </TabsTrigger>
            <TabsTrigger value="progress" className="gap-2">
              <TrendingUp className="h-4 w-4" /> {t.progress}
            </TabsTrigger>
            <TabsTrigger value="tools" className="gap-2">
              <Info className="h-4 w-4" /> {t.tools}
            </TabsTrigger>
            <TabsTrigger value="saved" className="gap-2">
              <Save className="h-4 w-4" /> {t.saved}
            </TabsTrigger>
          </TabsList>

          {/* ===== DASHBOARD TAB ===== */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Level & XP Card */}
              <Card className="bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                      {t.level} {state.level}
                    </span>
                    <span className="text-sm font-normal text-muted-foreground">
                      {Math.floor(state.xp)} / {Math.floor(state.level * 100 * (1 + (state.level * 0.1)))} {t.xp}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress 
                    value={(state.xp / (state.level * 100 * (1 + (state.level * 0.1)))) * 100} 
                    className="h-3"
                  />
                  <p className="mt-2 text-xs text-muted-foreground text-center">
                    {t.nextLevel}: {Math.floor(state.level * 100 * (1 + (state.level * 0.1)) - state.xp)} {t.xp} to go
                  </p>
                </CardContent>
              </Card>

              {/* Weekly Activity Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-cyan-500" />
                    {t.weeklyStats}
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyProgress}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground) / 0.1)" />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        cursor={{ fill: 'hsl(var(--muted) / 0.5)' }}
                      />
                      <Bar dataKey="done" radius={[4, 4, 0, 0]} barSize={30}>
                        {weeklyProgress.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.pct > 80 ? '#10b981' : entry.pct > 40 ? '#0ea5e9' : '#94a3b8'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
               {/* Recent PRs */}
               <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-purple-500" />
                    {t.recentPrs}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(state.personalRecords).slice(0, 3).map(([exId, weight]) => {
                      const ex = EXERCISES.find((e) => e.id === exId);
                      return (
                        <div key={exId} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                          <div className="text-sm font-medium">{ex ? (state.lang === "en" ? ex.exercise : ex.exerciseAr) : exId}</div>
                          <div className="flex items-center gap-2">
                            <Weight className="h-3 w-3 text-muted-foreground" />
                            <span className="font-mono font-bold text-cyan-500">{weight} kg</span>
                          </div>
                        </div>
                      );
                    })}
                    {Object.keys(state.personalRecords).length === 0 && (
                      <p className="text-sm text-muted-foreground py-4 text-center">{t.noResults}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Next Workout Card */}
              <Card className="cursor-pointer hover:border-cyan-500/50 transition-colors" onClick={() => setActiveTab("workout")}>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Play className="h-4 w-4 text-emerald-500" />
                    {t.todayWorkout}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xl font-bold">{isRTL ? selectedSession?.dayAr : selectedSession?.dayEn}</div>
                      <div className="text-sm text-muted-foreground">{isRTL ? selectedSession?.typeAr : selectedSession?.type}</div>
                    </div>
                    <Badge className="bg-emerald-500 hover:bg-emerald-600">
                      {selectedSession?.exercises.length} {t.exercises}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ===== SCHEDULE TAB ===== */}
          <TabsContent value="schedule" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {DAY_SESSIONS.map((ds) => {
                const isRest = ds.type === "راحة";
                const isSelected = ds.day === selectedDay;
                const total = getTotalSetsForDay(ds);
                const done = getCompletedCount(ds.day);
                const pct = total > 0 ? Math.round((done / total) * 100) : 0;
                return (
                  <Card
                    key={ds.day}
                    onClick={() => { setSelectedDay(ds.day); setActiveTab("workout"); }}
                    className={`cursor-pointer transition-all hover:shadow-md ${isSelected ? "ring-2 ring-cyan-500" : ""} ${isRest ? "opacity-80" : ""}`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{isRTL ? ds.dayAr : ds.dayEn}</CardTitle>
                        <Badge variant={isRest ? "secondary" : "default"}>{isRTL ? ds.typeAr : ds.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {isRest ? (
                        <p className="text-sm text-muted-foreground">{t.restDayMsg}</p>
                      ) : (
                        <>
                          <p className="mb-2 text-sm text-muted-foreground">
                            {ds.exercises.length} {t.exercises} • {total} {t.sets}
                          </p>
                          <Progress value={pct} className="h-2" />
                          <p className="mt-1 text-xs text-muted-foreground">{done}/{total} {t.completed}</p>
                        </>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Info className="h-5 w-5 text-cyan-500" /> {t.summary}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {PROGRAM_SUMMARY.map((s) => (
                    <div key={s.key} className="rounded-lg bg-muted/50 p-3">
                      <div className="text-xs text-muted-foreground">{isRTL ? s.keyAr : s.keyEn}</div>
                      <div className="text-sm font-semibold">{isRTL ? s.valueAr : s.valueEn}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="h-5 w-5 text-emerald-500" /> {t.weeklyStats}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weeklyProgress.map((wp) => (
                    <div key={wp.day} className="flex items-center gap-3">
                      <div className="w-20 text-sm font-medium">{wp.day}</div>
                      <Progress value={wp.pct} className="flex-1 h-2" />
                      <div className="w-12 text-right text-xs text-muted-foreground">{wp.pct}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ===== WORKOUT TAB ===== */}
          <TabsContent value="workout" className="space-y-6">
            {/* Day selector + session controls */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <Select value={selectedDay} onValueChange={setSelectedDay}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DAY_SESSIONS.map((ds) => (
                      <SelectItem key={ds.day} value={ds.day}>
                        {isRTL ? ds.dayAr : ds.dayEn} {isRTL ? `(${ds.typeAr})` : `(${ds.type})`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="text-sm text-muted-foreground">
                  {completedSetsToday}/{totalSetsToday} {t.completed}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant={sessionRunning ? "destructive" : "default"} onClick={sessionRunning ? stopSession : startSession}>
                  {sessionRunning ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                  {sessionRunning ? t.stopSession : t.startSession}
                </Button>
                <Button variant="outline" size="icon" onClick={resetSession}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={saveCurrentPlan}>
                  <Save className="mr-2 h-4 w-4" /> {t.copyPlan}
                </Button>
              </div>
            </div>

            {selectedSession?.type === "راحة" ? (
              <Card className="border-dashed border-2">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Sun className="mb-4 h-12 w-12 text-yellow-500" />
                  <h3 className="text-xl font-bold">{t.restDay}</h3>
                  <p className="text-muted-foreground">{t.restDayMsg}</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {selectedSession?.exercises.map((ex) => (
                  <ExerciseCard
                    key={ex.id}
                    exercise={ex}
                    lang={state.lang}
                    day={selectedDay}
                    progress={getDayProgress(selectedDay)}
                    onToggleSet={(exId, idx, total) => toggleSetComplete(selectedDay, exId, idx, total)}
                    waterIntake={state.waterIntake}
                    onAddWater={addWater}
                    savedNote={state.trainingNotes[ex.id] || ""}
                    onSaveNote={(note) => saveNote(ex.id, note)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {/* ===== LIBRARY TAB ===== */}
          <TabsContent value="library" className="space-y-6">
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <Input
                  placeholder={t.exerciseSearch}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-md"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {muscleGroups.map((m) => (
                  <Button 
                    key={m} 
                    variant={selectedMuscle === m ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedMuscle(m)}
                    className="rounded-full px-4"
                  >
                    {m === "All" ? t.all : 
                     m === "Chest" ? t.chest :
                     m === "Back" ? t.back :
                     m === "Shoulders" ? t.shoulders :
                     m === "Legs" ? t.legs :
                     m === "Arms" ? t.arms :
                     m === "Core" ? t.core : m}
                  </Button>
                ))}
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredExercises.length === 0 ? (
                <p className="col-span-full text-muted-foreground">{t.noResults}</p>
              ) : (
                filteredExercises.map((ex) => (
                  <ExerciseCard
                    key={ex.id}
                    exercise={ex}
                    lang={state.lang}
                    day=""
                    progress={{}}
                    onToggleSet={() => {}}
                    compact
                    waterIntake={state.waterIntake}
                    onAddWater={addWater}
                    savedNote={state.trainingNotes[ex.id] || ""}
                    onSaveNote={(note) => saveNote(ex.id, note)}
                  />
                ))
              )}
            </div>
          </TabsContent>

          {/* ===== PROGRESS TAB ===== */}
          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Weight className="h-5 w-5 text-cyan-500" /> {t.weightLog}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Select value={selectedExerciseForLog} onValueChange={setSelectedExerciseForLog}>
                    <SelectTrigger className="w-56">
                      <SelectValue placeholder={t.allExercises} />
                    </SelectTrigger>
                    <SelectContent>
                      {EXERCISES.map((e) => (
                        <SelectItem key={e.id} value={e.id}>
                          {state.lang === "en" ? e.exercise : e.exerciseAr}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    placeholder={t.lifted}
                    value={logWeightVal}
                    onChange={(e) => setLogWeightVal(e.target.value)}
                    className="w-32"
                  />
                  <Input
                    type="number"
                    placeholder={t.repsDone}
                    value={logRepsVal}
                    onChange={(e) => setLogRepsVal(e.target.value)}
                    className="w-28"
                  />
                  <Button onClick={addWeightLog}>{t.logWeight}</Button>
                </div>
                <div className="rounded-md border">
                  <div className="grid grid-cols-4 gap-2 border-b bg-muted/50 p-3 text-xs font-semibold text-muted-foreground">
                    <div>{state.lang === "en" ? "Exercise" : "التمرين"}</div>
                    <div>{t.weight}</div>
                    <div>{t.reps}</div>
                    <div>{state.lang === "en" ? "Date" : "التاريخ"}</div>
                  </div>
                  <ScrollArea className="h-64">
                    {state.weightLogs.length === 0 ? (
                      <div className="p-4 text-sm text-muted-foreground">{t.noResults}</div>
                    ) : (
                      state.weightLogs.map((log, i) => {
                        const ex = EXERCISES.find((e) => e.id === log.exerciseId);
                        return (
                          <div key={i} className="grid grid-cols-4 gap-2 border-b p-3 text-sm last:border-0">
                            <div>{ex ? (state.lang === "en" ? ex.exercise : ex.exerciseAr) : log.exerciseId}</div>
                            <div className="font-mono font-semibold">{log.weight} kg</div>
                            <div>{log.reps}</div>
                            <div className="text-muted-foreground">{log.date}</div>
                          </div>
                        );
                      })
                    )}
                  </ScrollArea>
                </div>
                {/* PRs */}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {Object.entries(state.personalRecords).map(([exId, weight]) => {
                    const ex = EXERCISES.find((e) => e.id === exId);
                    return (
                      <Card key={exId} className="border-cyan-500/20">
                        <CardContent className="flex items-center gap-3 p-4">
                          <Trophy className="h-5 w-5 text-yellow-500" />
                          <div>
                            <div className="text-xs text-muted-foreground">{t.pr}</div>
                            <div className="font-bold">{ex ? (state.lang === "en" ? ex.exercise : ex.exerciseAr) : exId}</div>
                            <div className="text-sm font-mono text-cyan-500">{weight} kg</div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ===== TOOLS TAB ===== */}
          <TabsContent value="tools" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              {/* BMI Calculator */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-emerald-500" /> {t.bmiCalc}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <Label>{t.height}</Label>
                      <Input type="number" value={bmiHeight} onChange={(e) => setBmiHeight(e.target.value)} />
                    </div>
                    <div className="flex-1">
                      <Label>{t.weight}</Label>
                      <Input type="number" value={bmiWeight} onChange={(e) => setBmiWeight(e.target.value)} />
                    </div>
                  </div>
                  <Button onClick={calcBMI} className="w-full">{t.calculate}</Button>
                  {bmiResult !== null && (
                    <div className="rounded-lg bg-muted p-4 text-center">
                      <div className="text-sm text-muted-foreground">{t.bmiResult}</div>
                      <div className="text-3xl font-extrabold">{bmiResult}</div>
                      <Badge className="mt-2">
                        {bmiResult < 18.5 ? t.underweight : bmiResult < 25 ? t.normal : bmiResult < 30 ? t.overweight : t.obese}
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* 1RM Calculator */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-purple-500" /> {t.oneRMCalc}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <Label>{t.lifted}</Label>
                      <Input type="number" value={rmWeight} onChange={(e) => setRmWeight(e.target.value)} />
                    </div>
                    <div className="flex-1">
                      <Label>{t.repsDone}</Label>
                      <Input type="number" value={rmReps} onChange={(e) => setRmReps(e.target.value)} />
                    </div>
                  </div>
                  <Button onClick={calcRM} className="w-full">{t.calculate}</Button>
                  {rmResult !== null && (
                    <div className="rounded-lg bg-muted p-4 text-center">
                      <div className="text-sm text-muted-foreground">{t.rmResult}</div>
                      <div className="text-3xl font-extrabold">{rmResult} <span className="text-lg font-normal">kg</span></div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Recovery days */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sun className="h-5 w-5 text-yellow-500" /> {isRTL ? "أيام الاستشفاء" : "Recovery Days"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-3">
                  {RECOVERY_DAYS.map((r) => (
                    <div key={r.day} className="rounded-lg border border-dashed border-border p-4 text-center">
                      <div className="mb-1 font-semibold">{isRTL ? r.dayAr : r.dayEn}</div>
                      <div className="text-sm text-muted-foreground">{isRTL ? r.noteAr : r.noteEn}</div>
                      <div className="mt-2 text-xs text-muted-foreground">{isRTL ? r.durationAr : r.durationEn}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ===== SAVED PLANS TAB ===== */}
          <TabsContent value="saved" className="space-y-6">
            {savedPlans.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="py-12 text-center text-muted-foreground">
                  {t.noSavedPlans}
                </CardContent>
              </Card>
            ) : (
              savedPlans.map((plan, idx) => (
                <Card key={idx}>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-base">{t.savedPlans} #{idx + 1}</CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => deletePlan(idx)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <pre className="whitespace-pre-wrap text-sm">{plan}</pre>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="mt-12 border-t border-border/50 py-8 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Abu Fowzan Training Dashboard</p>
        <p className="mt-1">{t.motivation}</p>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Exercise Card Component                                            */
/* ------------------------------------------------------------------ */
function ExerciseCard({
  exercise,
  lang,
  day,
  progress,
  onToggleSet,
  savedNote,
  onSaveNote,
}: {
  exercise: Exercise;
  lang: "en" | "ar";
  day: string;
  progress: DayProgress;
  onToggleSet: (exId: string, idx: number, total: number) => void;
  compact?: boolean;
  waterIntake: number;
  onAddWater: () => void;
  savedNote: string;
  onSaveNote: (note: string) => void;
}) {
  const [eqMode, setEqMode] = useState<"dumbbell" | "machine">("dumbbell");
  const [timerSec, setTimerSec] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [note, setNote] = useState(savedNote);
  const [isAutoRest, setIsAutoRest] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const t = lang === "en" ? UI.en : UI.ar;
  const isRTL = lang === "ar";

  const variation: EquipmentVariation = eqMode === "dumbbell" ? exercise.dumbbellVariation : exercise.machineVariation;
  const completedArr = progress[exercise.id] || [];
  const totalSets = exercise.sets || 0;

  const startTimer = (seconds: number) => {
    if (timerRunning) {
      clearInterval(timerRef.current!);
      setTimerRunning(false);
      return;
    }
    setTimerSec(seconds);
    setTimerRunning(true);
    timerRef.current = setInterval(() => {
      setTimerSec((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // Parse rest time to seconds for timer presets
  const getRestSeconds = () => {
    const match = exercise.rest?.match(/\d+/);
    return match ? parseInt(match[0]) : 60;
  };

  const handleToggleSet = (idx: number) => {
    const isNowComplete = !completedArr[idx];
    onToggleSet(exercise.id, idx, totalSets);
    if (isNowComplete && isAutoRest && !compact) {
      startTimer(getRestSeconds());
    }
  };

  const links = variation.links;

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <CardContent className="p-0">
        <div className={`flex flex-col ${compact ? "" : "md:flex-row"}`}>
          {/* GIF */}
          <div className={`relative bg-muted/30 ${compact ? "h-40 w-full" : "h-48 w-full md:h-auto md:w-56 lg:w-64"}`}>
            <img
              key={`${exercise.id}-${eqMode}`} // Force re-render on mode change
              src={variation.gifUrl || exercise.defaultGif}
              alt={exercise.exercise}
              className="h-full w-full object-contain transition-opacity duration-300"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <div className="absolute bottom-2 left-2">
              <Badge variant="secondary" className="text-xs">
                GIF
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4">
            <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold">{isRTL ? exercise.exerciseAr : exercise.exercise}</h3>
                <div className="mt-1 flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    {isRTL ? exercise.primaryAr : exercise.primaryEn}
                  </Badge>
                  {exercise.secondary !== "—" && (
                    <Badge variant="outline" className="text-xs text-muted-foreground">
                      {isRTL ? exercise.secondaryAr : exercise.secondaryEn}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={eqMode === "machine"}
                  onCheckedChange={(c) => setEqMode(c ? "machine" : "dumbbell")}
                />
                <span className="text-xs text-muted-foreground">
                  {eqMode === "dumbbell" ? t.dumbbellVersion : t.machineVersion}
                </span>
              </div>
            </div>

            <div className="mb-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
              <div className="rounded-md bg-muted/50 p-2">
                <div className="text-xs text-muted-foreground">{t.sets}</div>
                <div className="font-semibold">{exercise.sets} × {exercise.reps}</div>
              </div>
              <div className="rounded-md bg-muted/50 p-2">
                <div className="text-xs text-muted-foreground">{t.rest}</div>
                <div className="font-semibold">{exercise.rest}</div>
              </div>
              <div className="rounded-md bg-muted/50 p-2">
                <div className="text-xs text-muted-foreground">{t.duration}</div>
                <div className="font-semibold">{exercise.duration}</div>
              </div>
              <div className="rounded-md bg-muted/50 p-2">
                <div className="text-xs text-muted-foreground">{t.tool}</div>
                <div className="font-semibold">{isRTL ? variation.toolAr : variation.toolEn}</div>
              </div>
            </div>

            <div className="mb-3 rounded-md border border-cyan-500/20 bg-cyan-500/5 p-2 text-sm">
              <span className="font-semibold text-cyan-600">{t.notes}:</span>{" "}
              {isRTL ? variation.notesAr : variation.notesEn}
            </div>

            {/* Set completion */}
            {!compact && day && totalSets > 0 && (
              <div className="mb-3">
                <div className="mb-1 text-xs font-semibold text-muted-foreground">{t.sets}</div>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: totalSets }).map((_, i) => {
                    const done = !!completedArr[i];
                    return (
                      <button
                        key={i}
                        onClick={() => handleToggleSet(i)}
                        className={`flex h-10 w-10 items-center justify-center rounded-lg border-2 text-sm font-bold transition-all ${
                          done
                            ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 shadow-sm"
                            : "border-border bg-background text-muted-foreground hover:border-cyan-400"
                        }`}
                        title={`Set ${i + 1}`}
                      >
                        {done ? <CheckCircle2 className="h-5 w-5 animate-in zoom-in duration-300" /> : i + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Note input */}
            {!compact && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Input 
                    placeholder={t.trainingNotes} 
                    value={note} 
                    onChange={(e) => setNote(e.target.value)}
                    className="h-8 text-xs"
                  />
                  <Button size="sm" variant="ghost" className="h-8 px-2" onClick={() => onSaveNote(note)}>
                    <Save className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}

            {/* Rest timer */}
            {!compact && (
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 rounded-md bg-muted p-2">
                  <Timer className="h-4 w-4 text-muted-foreground" />
                  <span className="font-mono text-sm font-bold">{formatTimer(timerSec)}</span>
                </div>
                <Button variant="outline" size="sm" onClick={() => startTimer(getRestSeconds())}>
                  {timerRunning ? <Pause className="mr-1 h-3 w-3" /> : <Play className="mr-1 h-3 w-3" />}
                  {timerRunning ? t.pauseTimer : `${t.startTimer} (${getRestSeconds()}s)`}
                </Button>
                <div className="flex items-center gap-2 ml-2">
                  <Switch checked={isAutoRest} onCheckedChange={setIsAutoRest} id={`auto-rest-${exercise.id}`} />
                  <Label htmlFor={`auto-rest-${exercise.id}`} className="text-xs cursor-pointer">{t.autoRest}</Label>
                </div>
                <div className="flex-1" />
                <Button variant="ghost" size="sm" onClick={onAddWater}>
                  <Droplets className="mr-1 h-3 w-3 text-blue-500" /> +1
                </Button>
              </div>
            )}

            {/* Links */}
            <div className="flex flex-wrap gap-2">
              {links.slice(0, 6).map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-xs font-medium transition-colors hover:bg-muted hover:text-cyan-600"
                >
                  {link.icon === "youtube" ? <Youtube className="h-3 w-3 text-red-500" /> :
                   link.icon === "award" ? <Award className="h-3 w-3 text-amber-500" /> :
                   link.icon === "book-open" ? <BookOpen className="h-3 w-3 text-blue-500" /> :
                   <ExternalLink className="h-3 w-3 text-muted-foreground" />}
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
