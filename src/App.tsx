import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  FileText,
  Github,
  Linkedin,
  type LucideIcon,
  Mail,
  Network,
} from "lucide-react";

const portraitUrl =
  "/bitmoji-transparent.png";

const resumeLinks = {
  software: "/Sarthak_Singh_SDE.pdf",
  aiMl: "/Sarthak_Singh_AIML.pdf",
};

const profileLinks = {
  github: "https://github.com/SarthakSingh-96",
  linkedin: "https://www.linkedin.com/in/sarthaksingh1211/",
  email: "mailto:sarthaksingh1211@gmail.com",
};

const aboutImages = {
  moon: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png",
  object: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png",
  lego: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png",
  group: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png",
};

const services = [
  {
    number: "01",
    name: "GenAI + RAG Systems",
    description:
      "Designing retrieval-augmented generation workflows, vector search pipelines, document QA systems, and LLM-backed product experiences.",
  },
  {
    number: "02",
    name: "Machine Learning Systems",
    description:
      "Building evaluated prediction, ranking, forecasting, and classification workflows with production-minded validation and tuning.",
  },
  {
    number: "03",
    name: "Backend + Distributed Systems",
    description:
      "Creating APIs, distributed services, consensus-backed systems, data workflows, and backend-heavy products with Python, Go, FastAPI, gRPC, Redis, and SQL.",
  },
  {
    number: "04",
    name: "MLOps + Cloud Infrastructure",
    description:
      "Shipping repeatable ML workflows using Docker, Kubernetes, MLflow, Airflow, cloud platforms, tracking, and explainability tooling.",
  },
  {
    number: "05",
    name: "Developer Tools",
    description:
      "Building tools that help developers understand, navigate, visualize, and safely change complex codebases.",
  },
  {
    number: "06",
    name: "Data + Analytics Products",
    description:
      "Turning messy datasets into dashboards, prediction workflows, visual analysis tools, and decision-support products.",
  },
];

const skillMap = [
  {
    id: "genai",
    name: "GenAI + RAG",
    shortName: "GenAI",
    icon: BrainCircuit,
    accent: "#FF5D8F",
    description:
      "LLM product work across retrieval, document QA, OCR-assisted chat, and source-aware response generation.",
    tools: ["LangChain", "OpenAI", "Pinecone", "FastAPI", "Streamlit"],
    projects: ["Enterprise RAG System", "Document QA Chatbot"],
  },
  {
    id: "ml",
    name: "Machine Learning",
    shortName: "ML",
    icon: BarChart3,
    accent: "#27C4A8",
    description:
      "Modeling, evaluation, tuning, explainability, and applied prediction workflows for health, finance, audio, and 3D vision.",
    tools: ["PyTorch", "TensorFlow", "XGBoost", "Optuna", "SHAP"],
    projects: [
      "Youth Fitness Health Predictor",
      "Stock Prediction",
      "Speech Emotion Recommendation",
      "NeRF 3D Reconstruction",
    ],
  },
  {
    id: "backend",
    name: "Backend Systems",
    shortName: "Backend",
    icon: Database,
    accent: "#F8B84E",
    description:
      "API design, data workflows, distributed services, consensus protocols, caching, and backend-heavy product architecture.",
    tools: ["Python", "Go", "gRPC", "Redis", "SQL"],
    projects: ["Distributed Banking System", "CodeWeb", "EV Charging Optimization"],
  },
  {
    id: "frontend",
    name: "Product UI",
    shortName: "UI",
    icon: Code2,
    accent: "#7DD3FC",
    description:
      "Usable interfaces for technical products, dashboards, developer tools, and portfolio experiences.",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "D3.js"],
    projects: [
      "Movie Explorer",
      "Football Analysis Dashboard",
      "Personal Portfolio",
      "WeatherCast Android App",
    ],
  },
  {
    id: "mlops",
    name: "MLOps + Cloud",
    shortName: "MLOps",
    icon: Cloud,
    accent: "#B98CFF",
    description:
      "Repeatable ML workflows, experiment tracking, containerized systems, orchestration, and deployment-minded infrastructure.",
    tools: ["Docker", "Kubernetes", "MLflow", "Airflow", "AWS"],
    projects: ["Agent-Based MLOps Platform", "Enterprise RAG System"],
  },
] as const;

const projects = [
  {
    number: "01",
    category: "Developer Tooling",
    name: "CodeWeb",
    description:
      "A VS Code extension for visualizing dependencies and analyzing ripple effects before changes are made in a codebase.",
    tags: ["TypeScript", "VS Code API", "Code Analysis"],
    details: [
      "Visualizes relationships between functions, classes, variables, and imports.",
      "Helps developers understand downstream impact before editing production code.",
      "Published as a developer-facing extension with marketplace distribution.",
    ],
    link: "https://github.com/SarthakSingh-96/codeweb",
  },
  {
    number: "02",
    category: "Full-Stack",
    name: "Movie Explorer",
    description:
      "A Next.js movie discovery app with search, detail modals, favorites, ratings, notes, and server-side TMDB API proxying.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "TMDB API"],
    details: [
      "Searches TMDB by title and displays posters, release years, ratings, and summaries.",
      "Supports persistent favorites with personal star ratings and notes in local storage.",
      "Uses API routes to keep the TMDB key server-side while exposing a clean UI.",
    ],
    link: "https://github.com/SarthakSingh-96/movie-site-AL",
  },
  {
    number: "03",
    category: "Portfolio",
    name: "Personal Portfolio",
    description:
      "A personal portfolio site for showcasing projects, skills, resume work, and polished frontend interactions.",
    tags: ["React", "CSS", "Portfolio", "Frontend"],
    details: [
      "Presents project cards, animated sections, contact links, and a visual hero experience.",
      "Uses responsive layouts and curated visual assets for desktop and mobile screens.",
      "Serves as the central hub for GitHub, resume, and professional project work.",
    ],
    link: "https://github.com/SarthakSingh-96/SarthakSingh-96.github.io",
  },
  {
    number: "04",
    category: "GenAI",
    name: "Enterprise RAG System",
    description:
      "A multi-document question answering system built for retrieval over large document collections using vector indexing and LLM response generation.",
    tags: ["LangChain", "OpenAI GPT-4", "Pinecone", "FastAPI"],
    details: [
      "Processes 10K+ documents for retrieval and answer generation.",
      "Reached 92% answer accuracy in the project evaluation workflow.",
      "Built with production-focused API architecture and scalable retrieval design.",
    ],
    link: "https://github.com/SarthakSingh-96/Enterprise-RAG-System-with-Multi-Document-QA",
  },
  {
    number: "05",
    category: "Health ML",
    name: "Youth Fitness Health Predictor",
    description:
      "A machine learning project for predicting youth health outcomes from physical, fitness, body composition, and behavioral data.",
    tags: ["Jupyter Notebook", "Machine Learning", "Health Data", "Python"],
    details: [
      "Analyzes BMI, blood pressure, heart rate, FitnessGram, and behavioral assessment features.",
      "Builds predictive models for youth health and wellness outcome assessment.",
      "Uses structured health data from the Child Mind Institute problem domain.",
    ],
    link: "https://github.com/SarthakSingh-96/Youth-Fitness-Health-Predictor",
  },
  {
    number: "06",
    category: "Optimization",
    name: "EV Charging Optimization",
    description:
      "An intelligent EV charging optimizer using stochastic dynamic programming to reduce charging cost while preserving battery health.",
    tags: ["Python", "Dynamic Programming", "Reinforcement Learning", "EV"],
    details: [
      "Models charging under uncertain electricity prices and smart-grid conditions.",
      "Uses value iteration and stochastic dynamic programming for charging policy optimization.",
      "Targets 15-25% lower charging costs compared with naive charging strategies.",
    ],
    link: "https://github.com/SarthakSingh-96/EV-Charging-Optimization-using-Stochastic-Dynamic-Programming",
  },
  {
    number: "07",
    category: "Data Visualization",
    name: "Football Analysis Dashboard",
    description:
      "An interactive web dashboard for exploring football player statistics, geographic distributions, and performance trends.",
    tags: ["JavaScript", "Flask", "D3.js", "Dashboard"],
    details: [
      "Visualizes player data from 2015-2025 through interactive charts and maps.",
      "Combines performance metrics, geography, and player-level comparisons in one interface.",
      "Uses a web-based dashboard workflow for exploratory sports analytics.",
    ],
    link: "https://github.com/SarthakSingh-96/Football-Analysis-Dashboard",
  },
  {
    number: "08",
    category: "GenAI",
    name: "Document QA Chatbot",
    description:
      "A Streamlit chatbot for asking natural-language questions over PDFs and image text using LangChain and OpenAI models.",
    tags: ["Jupyter Notebook", "Streamlit", "LangChain", "OpenAI"],
    details: [
      "Supports PDF question answering with source-aware responses.",
      "Extracts and queries text from images using OCR workflows.",
      "Provides a clean UI for document upload, chat, and contextual answers.",
    ],
    link: "https://github.com/SarthakSingh-96/Chatbot",
  },
  {
    number: "09",
    category: "Finance ML",
    name: "Stock Prediction",
    description:
      "A notebook-based machine learning project for stock price prediction using time-series analysis and historical market data.",
    tags: ["Jupyter Notebook", "Machine Learning", "Time Series", "Finance"],
    details: [
      "Performs stock data analysis, visualization, and preprocessing.",
      "Builds predictive models over historical financial time-series data.",
      "Explores forecasting workflows for market-oriented machine learning.",
    ],
    link: "https://github.com/SarthakSingh-96/Stock-Prediction",
  },
  {
    number: "10",
    category: "Android",
    name: "WeatherCast Android App",
    description:
      "A Java Android weather app for real-time weather, air quality, humidity, UV index, wind, and weather news.",
    tags: ["Java", "Android", "Weather API", "Mobile"],
    details: [
      "Displays current weather conditions for searched cities.",
      "Tracks temperature, AQI, UV index, humidity, wind speed, and atmospheric details.",
      "Packages real-time weather data into a mobile-first Android experience.",
    ],
    link: "https://github.com/SarthakSingh-96/Weather-app",
  },
  {
    number: "11",
    category: "Audio ML",
    name: "Speech Emotion Recommendation",
    description:
      "A speech emotion recognition system that detects emotion from voice patterns and recommends movies based on the result.",
    tags: ["Jupyter Notebook", "LSTM", "SVM", "Audio ML"],
    details: [
      "Uses LSTM, MLP, and SVM models for robust emotion classification from speech.",
      "Combines model outputs through an ensemble voting mechanism.",
      "Connects detected emotional state to recommendation logic for personalized movies.",
    ],
    link: "https://github.com/SarthakSingh-96/Speech-Based-Emotion-Recommendation-System",
  },
  {
    number: "12",
    category: "Agentic ML",
    name: "Agent-Based MLOps Platform",
    description:
      "An autonomous ML workflow platform using multiple agents for experimentation, tuning, tracking, and explainability.",
    tags: ["Python", "Streamlit", "XGBoost", "SHAP"],
    details: [
      "Coordinates five AI agents across data preparation, modeling, tuning, evaluation, and reporting.",
      "Runs 50+ Optuna trials and reached 92% AUROC on a 200K+ sample healthcare workflow.",
      "Built to reduce manual ML pipeline overhead.",
    ],
    link: "https://github.com/SarthakSingh-96/Agent-Based-MLOps---MLOps-with-agents",
  },
  {
    number: "13",
    category: "3D Vision",
    name: "NeRF 3D Reconstruction",
    description:
      "A GPU-accelerated NeRF pipeline for 3D reconstruction and novel-view synthesis from sparse image data.",
    tags: ["PyTorch", "CUDA", "JAX"],
    details: [
      "Reached 28.5 dB PSNR and 0.92 SSIM in the reconstruction workflow.",
      "Uses modern deep learning tooling for 3D scene synthesis.",
      "Bridges research-heavy vision work with practical engineering execution.",
    ],
    link: "https://github.com/SarthakSingh-96/Neural-Radiance-Fields-NeRF-3D-Reconstruction",
  },
  {
    number: "14",
    category: "Distributed Systems",
    name: "Distributed Banking System",
    description:
      "A distributed banking application with Linear-PBFT consensus, Byzantine fault tolerance, asynchronous processing, and failover.",
    tags: ["Python", "gRPC", "Docker", "Redis"],
    details: [
      "Ensures Byzantine fault tolerance across 10+ nodes using a Linear-PBFT consensus protocol.",
      "Improves throughput by 22% and reduces transaction latency from 500ms to 320ms.",
      "Adds monitoring, logging, automatic failover, and ACID transaction guarantees.",
    ],
    link: "https://github.com/SarthakSingh-96/Distributed-Banking-System",
  },
];

const featuredProjectNames = new Set([
  "CodeWeb",
  "Enterprise RAG System",
  "Agent-Based MLOps Platform",
  "Distributed Banking System",
  "NeRF 3D Reconstruction",
  "EV Charging Optimization",
  "Movie Explorer",
]);

const featuredProjects = projects.filter((project) =>
  featuredProjectNames.has(project.name),
);
const moreProjects = projects.filter(
  (project) => !featuredProjectNames.has(project.name),
);

type FadeInProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

function FadeIn<T extends ElementType = "div">({
  as,
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  ...props
}: FadeInProps<T>) {
  const shouldReduceMotion = useReducedMotion();
  const MotionElement = useMemo(
    () => motion.create((as ?? "div") as ElementType),
    [as],
  );

  return (
    <MotionElement
      initial={shouldReduceMotion ? false : { opacity: 0, x, y }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
      transition={
        shouldReduceMotion
          ? undefined
          : { duration, delay, ease: [0.25, 0.1, 0.25, 1] }
      }
      viewport={{ once: true, margin: "50px", amount: 0 }}
      {...props}
    >
      {children}
    </MotionElement>
  );
}

type MagnetProps = {
  children: ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
};

function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
  className = "",
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      const element = ref.current;

      if (!element) {
        return;
      }

      const rect = element.getBoundingClientRect();
      const withinBounds =
        event.clientX >= rect.left - padding &&
        event.clientX <= rect.right + padding &&
        event.clientY >= rect.top - padding &&
        event.clientY <= rect.bottom + padding;

      if (!withinBounds) {
        setIsActive(false);
        setPosition({ x: 0, y: 0 });
        return;
      }

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      setIsActive(true);
      setPosition({
        x: (event.clientX - centerX) / strength,
        y: (event.clientY - centerY) / strength,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [padding, shouldReduceMotion, strength]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: shouldReduceMotion
          ? undefined
          : `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: shouldReduceMotion
          ? undefined
          : isActive
            ? activeTransition
            : inactiveTransition,
        willChange: shouldReduceMotion ? undefined : "transform",
      }}
    >
      {children}
    </div>
  );
}

function ContactButton() {
  return (
    <a
      href={profileLinks.email}
      className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white outline outline-2 outline-offset-[-3px] outline-white transition duration-200 hover:scale-[1.02] sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base"
      style={{
        background:
          "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
        boxShadow:
          "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
      }}
    >
      <span>Contact Me</span>
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

function ResourceLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
}) {
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#D7E2EA]/30 bg-[#D7E2EA]/5 px-4 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] transition duration-200 hover:border-[#D7E2EA]/70 hover:bg-[#D7E2EA]/10 sm:h-12 sm:px-5"
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span>{label}</span>
    </a>
  );
}

function LiveProjectButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition duration-200 hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-base"
    >
      <span>GitHub</span>
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

function ProjectVisual({ project }: { project: (typeof projects)[number] }) {
  const accentByCategory: Record<string, string> = {
    "Developer Tooling": "#7DD3FC",
    GenAI: "#FF5D8F",
    "Agentic ML": "#B98CFF",
    "Distributed Systems": "#F8B84E",
    "3D Vision": "#27C4A8",
    Optimization: "#F97316",
    "Full-Stack": "#60A5FA",
  };
  const accent = accentByCategory[project.category] ?? "#D7E2EA";
  const metricsByProject: Record<string, { label: string; value: number }[]> = {
    CodeWeb: [
      { label: "Code graph coverage", value: 88 },
      { label: "Impact scan depth", value: 76 },
      { label: "Extension readiness", value: 94 },
    ],
    "Movie Explorer": [
      { label: "Search workflow", value: 84 },
      { label: "Favorites UX", value: 72 },
      { label: "API boundary", value: 89 },
    ],
    "Enterprise RAG System": [
      { label: "Retrieval scale", value: 91 },
      { label: "Answer accuracy", value: 92 },
      { label: "API design", value: 86 },
    ],
    "EV Charging Optimization": [
      { label: "Cost reduction", value: 78 },
      { label: "Policy quality", value: 83 },
      { label: "Grid awareness", value: 69 },
    ],
    "Agent-Based MLOps Platform": [
      { label: "Agent coverage", value: 88 },
      { label: "Trial automation", value: 92 },
      { label: "Explainability", value: 81 },
    ],
    "NeRF 3D Reconstruction": [
      { label: "Render quality", value: 86 },
      { label: "GPU pipeline", value: 80 },
      { label: "View synthesis", value: 92 },
    ],
    "Distributed Banking System": [
      { label: "Fault tolerance", value: 90 },
      { label: "Latency reduction", value: 74 },
      { label: "Failover design", value: 87 },
    ],
  };
  const metrics =
    metricsByProject[project.name] ??
    project.tags.slice(0, 3).map((tag, index) => ({
      label: tag,
      value: [84, 73, 88][index] ?? 76,
    }));
  const architectureStepsByProject: Record<string, string[]> = {
    CodeWeb: ["Parse Code", "Map Dependencies", "Trace Impact"],
    "Movie Explorer": ["Search TMDB", "Proxy API", "Save Favorites"],
    "Enterprise RAG System": ["Ingest Docs", "Vector Search", "Generate Answer"],
    "EV Charging Optimization": ["Model Prices", "Optimize Policy", "Schedule Charge"],
    "Agent-Based MLOps Platform": ["Prepare Data", "Tune Models", "Explain Results"],
    "NeRF 3D Reconstruction": ["Load Views", "Train Radiance Field", "Render Scene"],
    "Distributed Banking System": ["Receive Transaction", "Run Consensus", "Commit State"],
  };
  const architectureSteps =
    architectureStepsByProject[project.name] ??
    project.tags.slice(0, 3).map((tag) => `Use ${tag}`);

  return (
    <div className="relative flex min-h-[280px] overflow-hidden rounded-[32px] border border-[#D7E2EA]/20 bg-[#090A0C] p-4 sm:min-h-[360px] sm:rounded-[44px] sm:p-5 md:rounded-[56px]">
      <div
        className="absolute inset-x-8 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
        aria-hidden="true"
      />
      <div className="grid w-full grid-rows-[auto_1fr] gap-4">
        <div className="flex min-w-0 items-center justify-between gap-3 rounded-[24px] border border-[#D7E2EA]/15 bg-[#D7E2EA]/5 px-4 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: accent }}
              aria-hidden="true"
            />
            <span className="min-w-0 break-words text-xs font-medium uppercase tracking-wider text-[#D7E2EA]/70 [overflow-wrap:anywhere]">
              {project.category}
            </span>
          </div>
          <span className="shrink-0 text-xs font-light uppercase tracking-wider text-[#D7E2EA]/45">
            Preview
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
          <div className="flex min-w-0 flex-col justify-between rounded-[28px] border border-[#D7E2EA]/15 bg-[#D7E2EA]/5 p-4">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#D7E2EA]/45">
                Project System
              </p>
              <p className="mt-3 min-w-0 break-words text-[clamp(1.35rem,3vw,1.85rem)] font-black uppercase leading-none text-[#D7E2EA] [overflow-wrap:anywhere]">
                {project.name}
              </p>
            </div>
            <div className="mt-8 grid gap-2">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="min-w-0 rounded-full border border-[#D7E2EA]/15 px-3 py-2 text-[0.68rem] font-medium uppercase leading-snug tracking-wider text-[#D7E2EA]/70 [overflow-wrap:anywhere]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid min-w-0 gap-3 rounded-[28px] border border-[#D7E2EA]/15 bg-[#0C0C0C] p-4">
            {metrics.map((metric, index) => (
              <div key={metric.label} className="grid gap-2">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 text-[0.68rem] uppercase tracking-wider text-[#D7E2EA]/50">
                  <span className="min-w-0 break-words leading-snug [overflow-wrap:anywhere]">
                    {metric.label}
                  </span>
                  <span className="shrink-0">{metric.value}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#D7E2EA]/10">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${metric.value}%`,
                      background: `linear-gradient(90deg, ${accent}, rgba(215,226,234,0.8))`,
                    }}
                  />
                </div>
              </div>
            ))}

            <div className="mt-auto grid gap-2 pt-4">
              <p className="text-[0.68rem] font-medium uppercase tracking-wider text-[#D7E2EA]/40">
                Architecture Flow
              </p>
              <div className="grid gap-2 sm:grid-cols-3">
                {architectureSteps.map((step, index) => (
                  <div
                    key={step}
                    className="relative min-w-0 rounded-2xl border border-[#D7E2EA]/12 bg-[#D7E2EA]/5 p-3"
                    style={{
                      boxShadow: `inset 0 0 28px ${accent}${index === 1 ? "29" : "17"}`,
                    }}
                  >
                    <span
                      className="flex h-6 w-6 items-center justify-center rounded-full text-[0.65rem] font-black text-[#0C0C0C]"
                      style={{ backgroundColor: accent }}
                    >
                      {index + 1}
                    </span>
                    <span className="mt-3 block min-w-0 break-words text-[0.68rem] font-semibold uppercase leading-snug tracking-wider text-[#D7E2EA]/75 [overflow-wrap:anywhere]">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  const navItems = [
    { label: "About", href: "#about" },
    { label: "Skill Map", href: "#skills" },
    { label: "What I Build", href: "#build" },
    { label: "Projects", href: "#projects" },
    { label: "Resume", href: resumeLinks.software },
    { label: "Contact", href: profileLinks.email },
  ];

  return (
    <section className="relative flex h-screen flex-col overflow-x-clip bg-[#0C0C0C]">
      <FadeIn
        as="nav"
        delay={0}
        y={-20}
        className="relative z-30 flex w-full flex-wrap justify-center gap-x-5 gap-y-3 px-6 pt-6 text-xs font-medium uppercase tracking-wider text-[#D7E2EA] sm:justify-between sm:text-sm md:px-10 md:pt-8 md:text-base lg:text-[1.1rem] xl:text-[1.25rem]"
        aria-label="Primary navigation"
      >
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="transition-opacity duration-200 hover:opacity-70"
          >
            {item.label}
          </a>
        ))}
      </FadeIn>

      <FadeIn
        delay={0.15}
        y={40}
        className="relative z-20 mt-16 w-full overflow-hidden sm:mt-14 md:mt-10"
      >
        <h1 className="hero-heading w-full whitespace-nowrap text-center text-[9vw] font-black uppercase leading-none tracking-tight sm:text-[9.6vw] md:text-[10.2vw] lg:text-[11.2vw]">
          Hi, Sarthak here !
        </h1>
      </FadeIn>

      <div className="absolute left-1/2 top-1/2 z-10 w-[800px] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[1080px] sm:translate-y-0 md:w-[1320px] lg:w-[1560px]">
        <FadeIn delay={0.6} y={30}>
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <img
              src={portraitUrl}
              alt="Portrait of Sarthak Singh"
              className="w-full select-none object-contain"
              draggable={false}
            />
          </Magnet>
        </FadeIn>
      </div>

      <div className="relative z-20 mt-auto flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <div className="max-w-[210px] sm:max-w-[360px] md:max-w-[520px]">
            <p className="text-[clamp(0.75rem,1.4vw,1.5rem)] font-light uppercase leading-snug tracking-wide text-[#D7E2EA]">
              AI/ML engineer building RAG systems, ML platforms, and backend-heavy products
            </p>
            <div className="mt-4 hidden flex-wrap gap-2 sm:flex">
              <ResourceLink href={resumeLinks.software} label="SDE Resume" icon={FileText} />
              <ResourceLink href={profileLinks.github} label="GitHub" icon={Github} />
              <ResourceLink href={profileLinks.linkedin} label="LinkedIn" icon={Linkedin} />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <div className="flex flex-col items-end gap-3">
            <ContactButton />
            <div className="flex gap-2 sm:hidden">
              <a
                href={resumeLinks.software}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D7E2EA]/35 bg-[#D7E2EA]/5 text-[#D7E2EA]"
                aria-label="Open software engineering resume"
              >
                <FileText className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={profileLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D7E2EA]/35 bg-[#D7E2EA]/5 text-[#D7E2EA]"
                aria-label="Open GitHub profile"
              >
                <Github className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={profileLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D7E2EA]/35 bg-[#D7E2EA]/5 text-[#D7E2EA]"
                aria-label="Open LinkedIn profile"
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function SkillMapSection() {
  const [activeSkillId, setActiveSkillId] =
    useState<(typeof skillMap)[number]["id"]>("genai");
  const activeSkill =
    skillMap.find((skill) => skill.id === activeSkillId) ?? skillMap[0];
  const ActiveSkillIcon = activeSkill.icon;
  const activeSkillProjects: readonly string[] = activeSkill.projects;
  const activeProjects = projects.filter((project) =>
    activeSkillProjects.includes(project.name),
  );

  return (
    <section
      id="skills"
      className="overflow-hidden bg-[#0C0C0C] px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32 lg:px-12 xl:px-16 2xl:px-20"
      aria-label="Interactive skill map"
    >
      <div className="mx-auto max-w-[1680px]">
        <FadeIn>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <h2 className="hero-heading text-[clamp(3rem,12vw,150px)] font-black uppercase leading-none tracking-tight">
              Skill Map
            </h2>
            <p className="max-w-2xl text-[clamp(0.95rem,1.5vw,1.2rem)] font-light leading-relaxed text-[#D7E2EA]/70">
              Select a skill area to see the tools I use and the projects where
              that skill shows up.
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)] lg:items-stretch xl:grid-cols-[minmax(0,1.15fr)_minmax(400px,0.85fr)] xl:gap-10">
          <FadeIn delay={0.1} className="hidden md:block">
            <div className="min-h-[620px] min-w-0 rounded-[32px] border border-[#D7E2EA]/15 bg-[#111316] p-5 shadow-2xl shadow-black/30 xl:p-8">
              <div className="grid h-full min-h-[568px] min-w-0 grid-cols-[minmax(150px,0.34fr)_minmax(0,1fr)] gap-5 xl:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] xl:gap-8">
                <div className="flex min-w-0 flex-col items-center justify-center rounded-[28px] border border-[#D7E2EA]/15 bg-[#0C0C0C]/70 px-4 text-center xl:px-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#D7E2EA]/25 bg-[#D7E2EA]/5 xl:h-20 xl:w-20">
                    <Network className="h-8 w-8 text-[#D7E2EA]" aria-hidden="true" />
                  </div>
                  <p className="mt-5 text-xs font-medium uppercase tracking-[0.22em] text-[#D7E2EA]/50">
                    Portfolio
                  </p>
                  <p className="mt-2 text-xl font-black uppercase leading-none text-[#D7E2EA] xl:text-2xl">
                    Skill Graph
                  </p>
                </div>

                <div className="relative grid min-w-0 content-center gap-4 xl:gap-5">
                  <div
                    className="absolute bottom-10 left-[35px] top-10 w-px bg-[#D7E2EA]/15"
                    aria-hidden="true"
                  />

                  {skillMap.map((skill) => {
                    const Icon = skill.icon;
                    const isActive = skill.id === activeSkill.id;

                    return (
                      <motion.button
                        key={skill.id}
                        type="button"
                        onClick={() => setActiveSkillId(skill.id)}
                        onMouseEnter={() => setActiveSkillId(skill.id)}
                        whileHover={{ x: 6 }}
                        whileTap={{ scale: 0.99 }}
                        className="relative z-10 grid min-h-[92px] min-w-0 grid-cols-[56px_minmax(0,1fr)] items-center gap-3 rounded-[24px] border p-3 text-left transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#D7E2EA]/70 xl:grid-cols-[72px_minmax(160px,0.7fr)_minmax(0,1fr)] xl:gap-4 xl:p-4"
                        style={{
                          borderColor: isActive
                            ? skill.accent
                            : "rgba(215,226,234,0.16)",
                          background: isActive
                            ? `linear-gradient(90deg, ${skill.accent}24, rgba(215,226,234,0.06))`
                            : "rgba(215,226,234,0.045)",
                          boxShadow: isActive
                            ? `0 18px 50px ${skill.accent}18`
                            : "none",
                        }}
                        aria-pressed={isActive}
                      >
                        <span className="flex h-14 w-14 items-center justify-center rounded-2xl border bg-[#0C0C0C] xl:h-16 xl:w-16">
                          <Icon
                            className="h-7 w-7"
                            style={{ color: skill.accent }}
                            aria-hidden="true"
                          />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-base font-semibold uppercase leading-tight tracking-wider text-[#D7E2EA] xl:text-lg">
                            {skill.name}
                          </span>
                          <span className="mt-1 block text-sm font-light leading-relaxed text-[#D7E2EA]/55">
                            {skill.projects.length} related projects
                          </span>
                        </span>
                        <span className="hidden flex-wrap justify-end gap-2 xl:flex">
                          {skill.tools.slice(0, 3).map((tool) => (
                            <span
                              key={tool}
                              className="rounded-full border border-[#D7E2EA]/15 px-3 py-1.5 text-[0.68rem] font-medium uppercase tracking-widest text-[#D7E2EA]/65"
                            >
                              {tool}
                            </span>
                          ))}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="grid gap-3 md:hidden">
            {skillMap.map((skill) => {
              const Icon = skill.icon;
              const isActive = skill.id === activeSkill.id;

              return (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() => setActiveSkillId(skill.id)}
                  className="flex min-w-0 items-center justify-between gap-4 rounded-[24px] border p-4 text-left transition duration-200"
                  style={{
                    borderColor: isActive ? skill.accent : "rgba(215,226,234,0.18)",
                    background: isActive
                      ? `${skill.accent}1F`
                      : "rgba(215,226,234,0.05)",
                  }}
                  aria-pressed={isActive}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <Icon
                      className="h-6 w-6"
                      style={{ color: skill.accent }}
                      aria-hidden="true"
                    />
                    <span className="min-w-0 text-base font-semibold uppercase tracking-wider text-[#D7E2EA]">
                      {skill.name}
                    </span>
                  </span>
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: skill.accent }}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </FadeIn>

          <FadeIn delay={0.2}>
            <motion.article
              key={activeSkill.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex min-h-full flex-col rounded-[32px] border border-[#D7E2EA]/15 bg-[#D7E2EA]/5 p-6 text-[#D7E2EA] sm:p-8 xl:p-10"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#D7E2EA]/50">
                    Active skill
                  </p>
                  <h3 className="mt-3 text-[clamp(2rem,4vw,4.4rem)] font-black uppercase leading-none tracking-tight">
                    {activeSkill.name}
                  </h3>
                </div>
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border"
                  style={{
                    borderColor: activeSkill.accent,
                    background: `${activeSkill.accent}1F`,
                  }}
                >
                  <ActiveSkillIcon
                    className="h-7 w-7"
                    style={{ color: activeSkill.accent }}
                    aria-hidden="true"
                  />
                </div>
              </div>

              <p className="mt-6 text-[clamp(1rem,1.7vw,1.35rem)] font-light leading-relaxed text-[#D7E2EA]/75">
                {activeSkill.description}
              </p>

              <div className="mt-8">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#D7E2EA]/50">
                  Tools
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {activeSkill.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-[#D7E2EA]/20 px-4 py-2 text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/80"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#D7E2EA]/50">
                  Related projects
                </p>
                <div className="mt-3 grid gap-3">
                  {activeProjects.map((project) => (
                    <a
                      key={project.name}
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 rounded-[22px] border border-[#D7E2EA]/15 bg-[#0C0C0C]/50 px-4 py-4 transition duration-200 hover:border-[#D7E2EA]/35 hover:bg-[#D7E2EA]/10"
                    >
                      <span>
                        <span className="block text-sm font-light uppercase tracking-widest text-[#D7E2EA]/45">
                          {project.category}
                        </span>
                        <span className="mt-1 block text-lg font-semibold leading-tight text-[#D7E2EA]">
                          {project.name}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="h-5 w-5 shrink-0 text-[#D7E2EA]/60 transition duration-200 group-hover:text-[#D7E2EA]"
                        aria-hidden="true"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </motion.article>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0C0C0C] px-5 py-20 sm:px-8 md:px-10"
    >
      <FadeIn
        delay={0.1}
        duration={0.9}
        x={-80}
        y={0}
        className="pointer-events-none absolute left-[1%] top-[4%] z-0 w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]"
      >
        <img src={aboutImages.moon} alt="" loading="lazy" />
      </FadeIn>
      <FadeIn
        delay={0.25}
        duration={0.9}
        x={-80}
        y={0}
        className="pointer-events-none absolute bottom-[8%] left-[3%] z-0 w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]"
      >
        <img src={aboutImages.object} alt="" loading="lazy" />
      </FadeIn>
      <FadeIn
        delay={0.15}
        duration={0.9}
        x={80}
        y={0}
        className="pointer-events-none absolute right-[1%] top-[4%] z-0 w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]"
      >
        <img src={aboutImages.lego} alt="" loading="lazy" />
      </FadeIn>
      <FadeIn
        delay={0.3}
        duration={0.9}
        x={80}
        y={0}
        className="pointer-events-none absolute bottom-[8%] right-[3%] z-0 w-[130px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]"
      >
        <img src={aboutImages.group} alt="" loading="lazy" />
      </FadeIn>

      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight">
            About me
          </h2>
        </FadeIn>

        <div className="mt-10 sm:mt-14 md:mt-16">
          <AnimatedText text="I am a Computer Science graduate student at Stony Brook University working across AI/ML, backend systems, and cloud-native software. My favorite projects sit at the intersection of research, engineering, and real-world usefulness: retrieval systems, experimental ML platforms, developer tooling, and systems that need to scale." />
        </div>

        <FadeIn delay={0.25} y={20} className="mt-16 sm:mt-20 md:mt-24">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <ContactButton />
            <ResourceLink href={resumeLinks.aiMl} label="AI/ML Resume" icon={FileText} />
            <ResourceLink href={profileLinks.email} label="Email" icon={Mail} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function AnimatedText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });
  const characters = text.split("");

  return (
    <p
      ref={ref}
      aria-label={text}
      className="mx-auto max-w-[560px] text-center text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed text-[#D7E2EA]"
    >
      {characters.map((character, index) => (
        <AnimatedCharacter
          key={`${character}-${index}`}
          character={character}
          index={index}
          total={characters.length}
          progress={scrollYProgress}
        />
      ))}
    </p>
  );
}

function AnimatedCharacter({
  character,
  index,
  total,
  progress,
}: {
  character: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const shouldReduceMotion = useReducedMotion();
  const start = index / total;
  const end = Math.min(start + 0.12, 1);
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  const displayCharacter = character === " " ? "\u00A0" : character;

  return (
    <span className="relative inline-block" aria-hidden="true">
      <span className="opacity-0">{displayCharacter}</span>
      <motion.span
        className="absolute left-0 top-0"
        style={{ opacity: shouldReduceMotion ? 1 : opacity }}
      >
        {displayCharacter}
      </motion.span>
    </span>
  );
}

function ServicesSection() {
  return (
    <section
      id="build"
      className="rounded-t-[40px] bg-white px-5 py-20 text-[#0C0C0C] sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn>
        <h2 className="mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28">
          What I Build
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-5xl">
        {services.map((service, index) => (
          <FadeIn
            key={service.number}
            as="article"
            delay={index * 0.1}
            className="flex gap-6 border-t border-[rgba(12,12,12,0.15)] py-8 last:border-b sm:gap-10 sm:py-10 md:gap-14 md:py-12"
          >
            <span className="min-w-[2.1ch] text-[clamp(3rem,10vw,140px)] font-black leading-none text-[#0C0C0C]">
              {service.number}
            </span>
            <div className="flex flex-col justify-center gap-3 pt-2">
              <h3 className="text-[clamp(1rem,2.2vw,2.1rem)] font-medium uppercase leading-tight">
                {service.name}
              </h3>
              <p className="max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] font-light leading-relaxed opacity-60">
                {service.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn>
        <h2 className="hero-heading mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28">
          Projects
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-7xl">
        {featuredProjects.map((project, index) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={index}
            totalCards={featuredProjects.length}
          />
        ))}
      </div>

      <MoreProjects />
    </section>
  );
}

function MoreProjects() {
  return (
    <FadeIn className="mx-auto mt-12 max-w-7xl sm:mt-16 md:mt-24">
      <div className="flex flex-col gap-4 border-t border-[#D7E2EA]/20 pt-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#D7E2EA]/45">
            More projects
          </p>
          <h3 className="mt-3 text-[clamp(2rem,5vw,4.8rem)] font-black uppercase leading-none text-[#D7E2EA]">
            Supporting Work
          </h3>
        </div>
        <p className="max-w-xl text-sm font-light leading-relaxed text-[#D7E2EA]/65 sm:text-base">
          Additional projects that round out the portfolio without making every
          case study compete for the same screen space.
        </p>
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {moreProjects.map((project) => (
          <a
            key={project.name}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-[180px] flex-col justify-between rounded-[28px] border border-[#D7E2EA]/15 bg-[#D7E2EA]/5 p-5 transition duration-200 hover:border-[#D7E2EA]/45 hover:bg-[#D7E2EA]/10"
          >
            <span>
              <span className="text-xs font-light uppercase tracking-widest text-[#D7E2EA]/45">
                {project.category}
              </span>
              <span className="mt-2 block text-xl font-semibold uppercase leading-tight text-[#D7E2EA]">
                {project.name}
              </span>
              <span className="mt-3 block text-sm font-light leading-relaxed text-[#D7E2EA]/65">
                {project.description}
              </span>
            </span>
            <span className="mt-5 flex flex-wrap items-center gap-2">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#D7E2EA]/15 px-3 py-1.5 text-[0.68rem] font-medium uppercase tracking-widest text-[#D7E2EA]/65"
                >
                  {tag}
                </span>
              ))}
              <ArrowUpRight
                className="ml-auto h-5 w-5 text-[#D7E2EA]/45 transition duration-200 group-hover:text-[#D7E2EA]"
                aria-hidden="true"
              />
            </span>
          </a>
        ))}
      </div>
    </FadeIn>
  );
}

function ProjectCard({
  project,
  index,
  totalCards,
}: {
  project: (typeof projects)[number];
  index: number;
  totalCards: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={ref} className="mb-6 md:mb-0 md:h-[85vh]">
      <motion.article
        className="project-sticky-card relative rounded-[32px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[44px] sm:p-6 md:sticky md:rounded-[60px] md:p-8"
        style={{
          top: `calc(var(--project-sticky-top) + ${index * 28}px)`,
          scale: shouldReduceMotion ? undefined : scale,
          zIndex: index + 1,
          transformOrigin: "top center",
        }}
      >
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-wrap items-end gap-4 sm:gap-8">
            <span className="text-[clamp(3rem,10vw,140px)] font-black leading-none text-[#D7E2EA]">
              {project.number}
            </span>
            <div className="pb-2 sm:pb-4">
              <p className="text-xs font-light uppercase tracking-widest text-[#D7E2EA]/70 sm:text-sm">
                {project.category}
              </p>
              <h3 className="text-[clamp(1.4rem,4vw,4.2rem)] font-black uppercase leading-none tracking-tight text-[#D7E2EA]">
                {project.name}
              </h3>
            </div>
          </div>
          <div className="pb-2 sm:pb-4">
            <LiveProjectButton href={project.link} />
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 md:grid-cols-[0.45fr_0.55fr]">
          <ProjectVisual project={project} />
          <div className="flex min-h-[320px] flex-col justify-between rounded-[32px] border border-[#D7E2EA]/30 bg-[#D7E2EA]/5 p-6 text-[#D7E2EA] sm:rounded-[44px] sm:p-8 md:rounded-[60px]">
            <div>
              <p className="text-[clamp(1rem,1.6vw,1.35rem)] font-light leading-relaxed text-[#D7E2EA]/80">
                {project.description}
              </p>
              <ul className="mt-6 grid gap-3 text-sm font-light leading-relaxed text-[#D7E2EA]/70 sm:text-base">
                {project.details.map((detail) => (
                  <li key={detail} className="border-t border-[#D7E2EA]/15 pt-3">
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#D7E2EA]/25 px-4 py-2 text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function App() {
  return (
    <main
      className="min-h-screen bg-[#0C0C0C] font-kanit text-[#D7E2EA]"
      style={{ overflowX: "clip" }}
    >
      <HeroSection />
      <SkillMapSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
    </main>
  );
}
