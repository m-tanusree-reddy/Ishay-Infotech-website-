import { useCallback, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Server,
  Users,
  Menu,
  X,
  Mail,
  Phone,
  Globe,
  MapPin,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Lock,
  Rocket,
  Search,
  Activity,
  Shield,
  Target,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import logoMark from "@/assets/logo-mark.png";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzz6XbF273YvLmsO2Y-gqfQfP0aE1pBwED_87TqC1O8sH9Z7yYkHhPxrG_KxNYY1wL4/exec";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  company: z.string().min(2, "Organization name is required."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

const navLinks = [
  { name: "Services", id: "services" },
  { name: "About Us", id: "about" },
  { name: "Why Us", id: "why-us" },
  { name: "FAQ", id: "faq" },
  { name: "Contact", id: "contact" },
];

const clientele = [
  "AllGoVision",
  "Aritha",
  "ITC Limited",
  "Phoenix",
  "EXA AG",
  "TATA Consulting Engineers",
  "Datatex",
];

const services = [
  {
    icon: Lock,
    title: "Information Security",
    description: "Protect your enterprise with rigorous security assessments, architecture hardening, and incident response readiness.",
    features: [
      "Vulnerability Assessment",
      "Security Architecture",
      "Incident Response",
      "SOC Support",
      "Data Leak Prevention",
      "Identity Access Management",
      "Privileged Access Management",
      "SIEM / SOAR Readiness",
    ],
    color: "from-sky-500/20 to-blue-500/20",
    border: "border-sky-500/30",
  },
  {
    icon: Search,
    title: "Digital Forensics",
    description: "Forensic investigations and evidence analysis to uncover threats, preserve integrity, and restore confidence.",
    features: [
      "Data Recovery",
      "Incident Investigation",
      "Evidence Preservation",
      "Root Cause Analysis",
      "Forensic Workstations",
      "Mobile & Cloud Forensics",
      "CDR / Cell Site Analysis",
      "Digital Evidence Kits",
    ],
    color: "from-violet-500/20 to-fuchsia-500/20",
    border: "border-violet-500/30",
  },
  {
    icon: Users,
    title: "Talent Acquisition & Staffing",
    description: "Source and onboard the right IT talent fast, from contract staffing to executive search and long-term placements.",
    features: [
      "Direct Hire / FTE",
      "Contract Staffing",
      "Project Teams",
      "IT Leadership Search",
      "Niche Skill Sourcing",
      "72-hour Profile Delivery",
      "CTH Hiring Support",
      "Resource Credibility Checks",
    ],
    color: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/30",
  },
  {
    icon: Server,
    title: "Enterprise Solutions",
    description: "Design and deliver scalable enterprise systems that align with your business goals and operational needs.",
    features: [
      "Systems Integration",
      "Cloud Architecture",
      "Application Modernization",
      "Platform Engineering",
      "ERP Implementation",
      "CRM Solutions",
      "RPA Enablement",
      "Core Banking Solutions",
    ],
    color: "from-amber-500/20 to-orange-500/20",
    border: "border-amber-500/30",
  },
  {
    icon: Cpu,
    title: "Smart Solutions",
    description: "Accelerate digital transformation with automation, AI, data intelligence, and smart operational solutions.",
    features: [
      "AI & Automation",
      "Analytics & Insights",
      "IoT Enablement",
      "Digital Operations",
      "Machine Learning",
      "Data Warehousing",
      "Cloud Enablement",
      "SaaS Development",
    ],
    color: "from-slate-500/20 to-cyan-500/20",
    border: "border-slate-500/30",
  },
];

const differentiators = [
  { icon: Rocket, title: "Speed", description: "Expedite time-to-market with ready-to-deploy frameworks and talent networks." },
  { icon: Shield, title: "Risk Mitigation", description: "Stringent vetting processes and secure-by-design development lifecycles." },
  { icon: Activity, title: "Scalability", description: "Solutions engineered to grow effortlessly from MVP to Enterprise scale." },
  { icon: Search, title: "Precision", description: "Exact matching of talent and tech to your highly specific business challenges." },
];

const aboutCards = [
  {
    label: "Vision",
    desc: "To assist our customers to embrace the latest of IT technologies into their businesses in a way that benefits the business as well as the human race at large.",
    icon: Globe,
  },
  {
    label: "Mission",
    desc: "To provide unparalleled experience to the customers seeking for realization of technological advancement in the field of Information Security, Smart Solutions, Enterprise Solutions and IT Talent Acquisition.",
    icon: Target,
  },
  {
    label: "Objective",
    desc: "To achieve our excellence through deep understanding of the customer requirements and providing them with high quality, yet economical solutions within the agreed time frame.",
    icon: Zap,
  },
];

const capabilityCards = [
  {
    label: "Information Security",
    desc: "Comprehensive cyber defense, vulnerability management, and secure operations designed for enterprise-grade protection.",
    icon: Lock,
  },
  {
    label: "Digital Forensics",
    desc: "Specialized forensic investigations and incident analysis to recover evidence and strengthen future resilience.",
    icon: Search,
  },
  {
    label: "Enterprise Solutions",
    desc: "Scalable architecture and business-aligned systems that support growth, integration, and operational agility.",
    icon: Server,
  },
];

const domainExpertiseTags = [
  "BigData", "SAP", "Data Science", "Machine Learning", "RPA", "DevOps",
  "Full Stack", "Python", "Java", ".NET", "Cybersecurity", "Cloud Architecture",
  "Finance Tech", "FinTech", "Accounting", "HR Systems", "MarTech", "Logistics",
  "Operations", "Smart Solutions", "SaaS Development", "Backend Infra", "IT Assessment",
  "AWS", "Azure", "GCP", "Agile Management", "Data Warehousing", "IoT Integration"
];

const aboutStats = [
  { value: "72h", label: "Talent Delivery" },
  { value: "100%", label: "Secure by Design" },
  { value: "24/7", label: "Strategic Support" },
];

const faqs = [
  {
    question: "What is your typical turnaround time for providing IT candidates?",
    answer: "We leverage our extensive private talent pool to typically provide initial high-quality resumes within 48 to 72 hours for standard skill sets.",
  },
  {
    question: "Do you offer project-based software development?",
    answer: "Yes. In addition to staff augmentation, we take end-to-end ownership of software development and system integration projects across various domains.",
  },
  {
    question: "How do you handle security assessments?",
    answer: "Our certified ethical hackers and forensics specialists conduct deep-dive Vulnerability Assessments and Penetration Testing (VAPT), mimicking real-world attack scenarios to secure your infrastructure.",
  },
  {
    question: "What geographies do you operate in?",
    answer: "While incorporated in India, we seamlessly run operations and support clients across the Indian Sub-continent and regions of Africa.",
  },
];

const contactInfo = [
  { icon: Mail, title: "Email", value: "info@ishayinfotech.com", link: "mailto:info@ishayinfotech.com" },
  { icon: Phone, title: "Phone", value: "+91 82172 47723", link: "tel:+918217247723" },
  { icon: Globe, title: "Operations", value: "Indian Sub-continent & Africa" },
  { icon: MapPin, title: "Location", value: "Bangalore, India & Field Locations" },
  { icon: MapPin, title: "Address", value: "1st Floor, 121/133/1, 2nd Cross, Mahantara Layout, K.G Nagar, Bangalore – 560019" },
];

const cyberSecuritySolutions = [
  "VULNERABILITY ASSESSMENT & PENETRATION TESTING (VAPT)",
  "DATA LEAK PREVENTION (DLP)",
  "IDENTITY ACCESS MANAGEMENT (IAM)",
  "PRIVILEGED ACCESS MANAGEMENT (PAM)",
  "MULTI FACTOR AUTHENTICATION (MFA)",
  "SECURITY INCIDENT & EVENT MANAGEMENT (SIEM)",
  "SECURITY OPERATIONS CENTRE (SOC)",
  "SECURITY ORCHESTRATION, AUTOMATION & RESPONSE (SOAR)",
];

const digitalForensicSolutions = [
  "FORENSIC WORKSTATION",
  "FORENSIC HARDWARE IMAGING TOOL",
  "DATA ANALYSIS TOOL",
  "DATA RECOVERY TOOLS",
  "CDR ANALYZER",
  "CELL SITE ANALYZER",
  "SOCIAL MEDIA ANALYSIS TOOL",
  "MOBILE & CLOUD FORENSIC TOOL",
  "MAC FORENSIC",
  "PASSWORD BREAKING TOOL",
  "FORENSIC VIDEO ACQUISITION TOOL",
  "FACE FORENSIC & ANALYSIS TOOL",
  "PHOTO ANALYSIS & TAMPER DETECTION",
  "DIGITAL FORENSIC FIELD KIT",
  "NETWORK EVIDENCE FINDER",
  "GPS ANALYSIS TOOL",
  "DVR EXTRACTION & ANALYZER",
  "RF ISOLATION BAG",
  "STEGNOGRAPHY ANALYSIS TOOL",
  "CD/DVD ANALYSIS",
  "BITCOIN FORENSIC",
];

const talentAcquisitionDetails = [
  "At iSHAY, the core team comes with immense experience of talent acquisition.",
  "The salient features that iSHAY offers to our customers are:",
  "Niche IT skilled relevant resources.",
  "The IT resources can be hired on Full Time or on Contract or on CTH basis.",
  "We assure to provide the best profiles that fits the customer's requirement.",
  "We assure to provide the best suitable profiles within 72hrs post receival of JD.",
  "We assure the credibility of our IT resources.",
];

const itResourceExpertise = [
  "BIGDATA",
  "SAP",
  "DATASCIENCE",
  "MACHINE LEARNING",
  "RPA",
  "DEV OPS",
  "FULL STACK",
  "PYTHON",
  "JAVA",
  "DOT NET",
  "CYBER SECURITY & many more...",
];

const functionalStaffingExpertise = [
  "FINANCE",
  "ACCOUNTING",
  "HR",
  "SALES & MARKETING",
  "LOGISTICS",
  "OPERATIONS & many more...",
];

const enterpriseSolutionDetails = [
  "Enterprise Resource Planning (ERP)",
  "Robotic Process Automation (RPA)",
  "MIS solutions",
  "Customer Relationship Management (CRM)",
  "Core Banking Solution (CBS) & many more..",
];

const aboutDetailCards = [
  { key: "cyber", title: "Cyber Security Solutions", items: cyberSecuritySolutions },
  { key: "forensics", title: "Digital Forensic Solutions", items: digitalForensicSolutions },
  { key: "staffing", title: "Talent Acquisition & Staffing", items: talentAcquisitionDetails },
  { key: "enterprise", title: "Enterprise Solutions", items: enterpriseSolutionDetails },
  { key: "itDomain", title: "Our IT Resource Domain Expertise", items: itResourceExpertise },
  { key: "functional", title: "Our Functional Domain Staffing Expertise", items: functionalStaffingExpertise },
];

const quickLinks = [
  "Services",
  "About Us",
  "Why Choose Us",
  "FAQ",
  "Contact",
];

const sectionReveal = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9 } },
};

const staggerReveal = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const itemReveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const cardSurface =
  "rounded-[24px] border border-slate-300/80 bg-white/95 shadow-[0_16px_45px_-28px_rgba(15,23,42,0.45)] transition-all duration-300 hover:border-blue-300 hover:shadow-[0_24px_60px_-28px_rgba(15,23,42,0.55)] dark:border-white/10 dark:bg-slate-950/85";

const sectionShell = "relative overflow-hidden bg-[#eef3f9]";

function ExpandableList({
  items,
  limit = 6,
  expanded,
  onToggle,
  className = "",
}: {
  items: string[];
  limit?: number;
  expanded: boolean;
  onToggle: () => void;
  className?: string;
}) {
  const visibleItems = expanded ? items : items.slice(0, limit);
  const hiddenCount = items.length - limit;

  return (
    <div className={className}>
      <ul className="space-y-2.5 text-slate-600 dark:text-slate-300 text-[13px] leading-relaxed list-disc pl-4">
        {visibleItems.map((item, idx) => (
          <li key={`${item}-${idx}`}>{item}</li>
        ))}
      </ul>
      {hiddenCount > 0 && (
        <button
          type="button"
          onClick={onToggle}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-blue-700 transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-100 dark:border-blue-400/20 dark:bg-blue-500/10 dark:text-blue-300"
        >
          {expanded ? "Show less" : `More ${hiddenCount}`}
          <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>
      )}
    </div>
  );
}

function ClientLogo({ name }: { name: string }) {
  switch (name) {
    case "AllGoVision":
      return (
        <div className="leading-none">
          <div className="text-[16px] font-black tracking-tight">
            <span className="text-orange-400">All</span>
            <span className="text-orange-300">Go</span>
            <span className="text-slate-100">Vision</span>
            <span className="ml-0.5 inline-block h-2 w-2 rounded-full bg-emerald-400 align-top" />
          </div>
          <div className="mt-1 text-[7px] font-bold tracking-[0.24em] text-slate-400">
            see . sense . secure
          </div>
        </div>
      );
    case "Aritha":
      return (
        <div className="flex items-center gap-1.5">
          <span className="text-[22px] font-black lowercase tracking-tight text-slate-100">aritha</span>
          <span className="relative h-7 w-7">
            <span className="absolute left-1 top-2 h-3.5 w-5 rotate-[-25deg] rounded-full border-t-[5px] border-cyan-300" />
            <span className="absolute right-0 top-0 h-4 w-4 rotate-45 rounded-[4px] bg-gradient-to-br from-sky-300 to-blue-600 opacity-90" />
          </span>
        </div>
      );
    case "ITC Limited":
      return (
        <div className="flex flex-col items-center leading-none">
          <div className="relative h-10 w-14">
            <div className="absolute left-1/2 top-0 h-10 w-8 -translate-x-1/2 bg-blue-950 [clip-path:polygon(50%_0,100%_100%,0_100%)]" />
            <div className="absolute bottom-0 left-2 h-4 w-10 bg-white/90 [clip-path:polygon(0_100%,50%_0,100%_100%)]" />
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[15px] font-black text-blue-950">ITC</span>
          </div>
          <span className="mt-1 text-[10px] font-serif font-bold text-slate-100">ITC Limited</span>
        </div>
      );
    case "Phoenix":
      return (
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 rotate-45 place-items-center bg-indigo-950">
            <span className="-rotate-45 text-[14px] font-black text-white">PB</span>
          </span>
          <div className="text-left leading-none">
            <div className="text-[17px] font-black uppercase tracking-[0.08em] text-indigo-200">Phoenix</div>
            <div className="mt-1 text-[6px] font-bold uppercase tracking-[0.28em] text-slate-400">Business Consulting</div>
          </div>
        </div>
      );
    case "EXA AG":
      return (
        <div className="flex items-center gap-1 leading-none">
          <span className="relative h-8 w-12">
            <span className="absolute bottom-1 left-0 h-2 w-11 -skew-x-12 rounded-r-full bg-orange-400" />
            <span className="absolute bottom-3 left-1 h-1.5 w-10 -skew-x-12 rounded-r-full bg-slate-100" />
            <span className="absolute bottom-5 left-2 h-1.5 w-9 -skew-x-12 rounded-r-full bg-slate-500" />
          </span>
          <span className="text-[24px] font-light italic tracking-tight text-slate-100">exa</span>
          <span className="self-end pb-1 text-[9px] font-bold text-slate-300">AG</span>
        </div>
      );
    case "TATA Consulting Engineers":
      return (
        <div className="flex flex-col items-center leading-none text-sky-300">
          <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-sky-300 text-[14px] font-black">T</span>
          <span className="mt-1 text-[15px] font-black">TATA</span>
          <span className="text-[7px] font-black uppercase tracking-tight">Consulting</span>
          <span className="text-[7px] font-black uppercase tracking-tight">Engineers Limited</span>
        </div>
      );
    case "Datatex":
      return (
        <div className="flex flex-col items-center leading-none">
          <div className="mb-1 flex h-9 items-end gap-0.5">
            {[14, 22, 30, 24, 18].map((height, idx) => (
              <span
                key={idx}
                className="w-1 rounded-full bg-gradient-to-t from-slate-900 to-slate-200"
                style={{ height }}
              />
            ))}
          </div>
          <span className="text-[15px] font-black lowercase text-slate-100">datatex</span>
          <span className="mt-0.5 text-[5px] font-bold text-slate-400">we make IT work for you</span>
        </div>
      );
    default:
      return <span className="text-[12px] font-extrabold uppercase tracking-wide text-slate-100">{name}</span>;
  }
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [expandedServices, setExpandedServices] = useState<Record<number, boolean>>({});
  const [expandedAboutLists, setExpandedAboutLists] = useState<Record<string, boolean>>({});

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof contactSchema>) => {
    setIsSubmitting(true);
    try {
      const data = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        data.append(key, value);
      });

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: data,
        mode: "no-cors",
      });

      setSubmitted(true);
      toast({
        title: "Success!",
        description: "Your message has been sent successfully. We will be in touch shortly.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = useCallback((id: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  }, []);

  const toggleServiceDetails = (index: number) => {
    setExpandedServices((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleAboutList = (key: string) => {
    setExpandedAboutLists((prev) => ({ ...prev, [key]: !prev[key] }));
  };


  return (
    <div className="min-h-screen bg-[#eef3f9] text-slate-900 selection:bg-blue-500/30 font-sans overflow-x-hidden">
      {/* ── NAVBAR ── */}
      <nav className="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl -translate-x-1/2 rounded-[2rem] bg-white dark:bg-slate-950/95 border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-xl transition-all duration-300">
        <div className="mx-auto px-6 h-20 flex items-center justify-between">
          <button onClick={() => scrollToSection("home")} className="flex items-center gap-3 group cursor-pointer">
            <img src="/logo.jpeg" alt="iSHAY Infotech" loading="lazy" className="h-12 md:h-14 w-auto object-contain flex-shrink-0 group-hover:scale-105 transition-transform" />
            <div className="flex flex-col text-left leading-none">
              <span className="text-[20px] md:text-[24px] font-black uppercase text-blue-900 dark:text-blue-100 tracking-tight">iSHAY INFOTECH</span>
              <span className="text-[11px] md:text-[13px] font-bold text-red-700 dark:text-red-500 uppercase tracking-widest mt-1">Excellence Assured</span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.id)}
                  className="text-[13px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all group-hover:w-full" />
                </button>
              ))}
            </div>
            <Button
              className="group rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_-5px_rgba(37,99,235,0.6)] transition-all"
              onClick={() => scrollToSection("contact")}
            >
              Get Started <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-slate-800 dark:text-slate-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.42, 0, 0.58, 1] }}
              className="md:hidden overflow-hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800"
            >
              <div className="px-6 py-6 flex flex-col gap-4">
                {navLinks.map((link, idx) => (
                  <motion.button
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    key={link.name}
                    onClick={() => scrollToSection(link.id)}
                    className="text-left text-lg font-bold text-slate-800 dark:text-slate-200 py-2 border-b border-slate-100 dark:border-white/5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </motion.button>
                ))}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                >
                  <Button
                    className="mt-4 w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold h-12"
                    onClick={() => scrollToSection("contact")}
                  >
                    Get Started
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO SECTION ── */}
      <motion.section
        id="home"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #020617 0%, #0f172a 25%, #1e293b 45%, #f8fafc 100%)",
        }}
        className="relative pt-32 pb-16 md:pt-44 md:pb-24 overflow-hidden flex items-center justify-center min-h-[92vh]"
        initial="hidden"
        animate="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={sectionReveal}
      >
        {/* Ambient Background */}
        <div className="absolute inset-0 bg-[#070b14]">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
            className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: [0.42, 0, 0.58, 1], delay: 1 }}
            className="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-50" />
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none [mask-image:radial-gradient(circle_at_center,black_0%,black_46%,transparent_74%)]"
          >
            <img
              src={logoMark}
              alt=""
              className="w-[min(620px,70vw)] object-contain opacity-[0.1] mix-blend-screen saturate-150 contrast-125 md:opacity-[0.13]"
            />
          </motion.div>
          <div className="absolute left-1/2 top-[47%] h-[420px] w-[min(960px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[90px] pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent via-[#14233a]/65 to-[#eef3f9]" />
        </div>

        <motion.div
          className="max-w-7xl mx-auto px-6 relative z-10 text-center"
          variants={staggerReveal}
        >
          <motion.div
            variants={itemReveal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 font-bold text-xs tracking-widest backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-shadow cursor-default"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6] animate-pulse" />
            Enterprise IT Excellence
          </motion.div>

          <motion.h1
            variants={itemReveal}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 tracking-tighter text-white drop-shadow-2xl"
          >
            Architecting <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 animate-gradient-x">Digital</span><br className="hidden md:block" /> Solutions
          </motion.h1>

          <motion.p
            variants={itemReveal}
            className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-medium"
          >
            iSHAY Infotech delivers top-tier <strong className="text-white font-bold tracking-wide">IT Talent</strong>, <strong className="text-white font-bold tracking-wide">Cyber Security</strong> frameworks, and scalable <strong className="text-white font-bold tracking-wide">Enterprise Systems</strong> directly to your workflow.
          </motion.p>

          <motion.div
            variants={itemReveal}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold h-14 px-8 text-base shadow-[0_0_40px_-10px_rgba(37,99,235,0.7)] hover:shadow-[0_0_60px_-10px_rgba(37,99,235,1)] transition-all border border-blue-400/20"
                onClick={() => scrollToSection("services")}
              >
                Explore Solutions <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl h-14 px-8 font-bold text-base border-slate-700 hover:bg-slate-800/50 backdrop-blur-sm text-white"
                onClick={() => scrollToSection("contact")}
              >
                Consult with Experts
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1.2, type: "spring", bounce: 0.4 }}
            className="mt-14 md:mt-16 p-5 md:p-6 border border-white/15 max-w-6xl mx-auto backdrop-blur-xl bg-white/[0.08] rounded-[24px] relative overflow-hidden shadow-[0_28px_80px_-40px_rgba(15,23,42,0.95)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[100%] animate-[shimmer_3s_infinite]" />
            <div className="relative z-10 mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-white/15" />
              <span className="text-[12px] font-extrabold uppercase tracking-[0.28em] text-blue-300">
                Clientele
              </span>
              <span className="h-px w-10 bg-white/15" />
            </div>
            <div className="relative z-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
              {clientele.map((client) => (
                <motion.div
                  key={client}
                  whileHover={{ y: -4, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="flex min-h-[92px] items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.06] px-4 py-3 text-center shadow-inner shadow-white/5 transition-colors hover:border-blue-300/40 hover:bg-white/[0.1]"
                >
                  <ClientLogo name={client} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ── SERVICES ── */}
      <motion.section
        id="services"
        className={`${sectionShell} z-20 py-16 md:py-20`}
        initial="hidden"
        animate="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={sectionReveal}
      >
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#eef3f9] via-[#eef3f9] to-transparent pointer-events-none z-0" />
        <div className="absolute left-1/2 top-10 h-72 w-[min(900px,90vw)] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-14">
            <span className="mb-4 inline-flex rounded-full border border-blue-200 bg-white/70 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-blue-700 shadow-sm">
              Services
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-5 tracking-tight text-slate-950 dark:text-white">
              Excellence Through Engineering.
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg font-medium leading-relaxed">
              We cover the full spectrum of modern digital requirements, from specialized manpower to bespoke architecture and rigorous security.
            </p>
          </div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8" variants={staggerReveal}>
            {services.map((s, i) => (
              <motion.div
                key={i}
                variants={itemReveal}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 100, damping: 18 }}
                className={`group relative p-7 md:p-8 ${cardSurface} overflow-hidden backdrop-blur-xl`}
              >
                {/* Hover gradient backdrop */}
                <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
                <motion.div
                  className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent dark:from-white/5 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                />

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className={`w-14 h-14 rounded-[20px] flex items-center justify-center mb-6 bg-white dark:bg-[#070b14] border ${s.border} shadow-lg shadow-black/5 group-hover:bg-transparent group-hover:border-white/50 dark:group-hover:border-white/20 transition-all duration-500`}
                  >
                    <s.icon className="w-8 h-8 text-slate-900 dark:text-white" />
                  </motion.div>
                  <h3 className="font-black text-2xl lg:text-3xl mb-3 text-slate-950 dark:text-white tracking-tight">{s.title}</h3>
                  <p className="text-slate-600/90 dark:text-slate-400 mb-6 leading-relaxed font-medium text-[15px]">
                    {s.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(expandedServices[i] ? s.features : s.features.slice(0, 6)).map((feature, idx) => (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + (idx * 0.1) }}
                        key={idx}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100/50 dark:hover:bg-white/5 transition-colors"
                      >
                        <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-[13px] font-bold text-slate-700 dark:text-slate-300 leading-tight">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                  {s.features.length > 6 && (
                    <button
                      type="button"
                      onClick={() => toggleServiceDetails(i)}
                      className="mt-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-blue-700 transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-100 dark:border-blue-400/20 dark:bg-blue-500/10 dark:text-blue-300"
                    >
                      {expandedServices[i] ? "Show less" : `More ${s.features.length - 6}`}
                      <ChevronDown className={`h-4 w-4 transition-transform ${expandedServices[i] ? "rotate-180" : ""}`} />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── ABOUT US (VISION/MISSION) ── */}
      <motion.section
        id="about"
        className={`${sectionShell} py-16 md:py-20`}
        initial="hidden"
        animate="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={sectionReveal}
      >
        {/* Background Gradients */}
        <motion.div
          animate={{ rotate: 180, scale: [1, 1.2, 1] }}
          transition={{ duration: 40, repeat: Infinity, ease: [0.25, 0.25, 0.75, 0.75] }}
          className="absolute -left-64 top-0 w-[800px] h-[800px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-10 lg:gap-14 items-start">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-extrabold uppercase tracking-widest mb-8 border border-blue-200 dark:border-blue-500/20 shadow-[0_0_20px_rgba(37,99,235,0.1)]"
              >
                About iSHAY Infotech
              </motion.div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-slate-950 dark:text-white leading-[1.1]">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">iSHAY Infotech</span>
              </h2>

              <div className="prose prose-slate dark:prose-invert max-w-none mb-8">
                <ul className="list-disc space-y-3 pl-5 text-base md:text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  <li>iSHAY Infotech is a unique IT service organization developed by the passionate IT experts in the domain of IT Security, Digital Forensics, Smart Solutions, Enterprise Solutions and IT Staffing.</li>
                  <li>Our core competency is to enable the customers to digitize and run a productive, profitable and hassle-free business.</li>
                </ul>
                <p className="text-[16px] text-slate-600/90 dark:text-slate-500 leading-relaxed mt-6">
                  The founder of iSHAY Infotech comes with an expertise in IT Security, Enterprise Solutions, Artificial Intelligence & Machine Learning Solutions, Marketing and Entrepreneurship.
                </p>
                <p className="text-[16px] text-slate-600/90 dark:text-slate-500 leading-relaxed mt-4">
                  With an immense experience in African territory and Indian Sub-continent, we at iSHAY Infotech intend to offer Glocalization solutions to our customers.
                </p>
                </div>

              <div className="hidden">
                {aboutDetailCards.map((card) => (
                  <div key={card.key} className={`${cardSurface} min-h-[260px] p-5`}>
                    <h3 className="mb-4 min-h-[48px] text-[16px] font-extrabold leading-snug text-slate-900 dark:text-white">
                      {card.title}
                    </h3>
                    <ExpandableList
                      items={card.items}
                      limit={5}
                      expanded={!!expandedAboutLists[card.key]}
                      onToggle={() => toggleAboutList(card.key)}
                    />
                  </div>
                ))}
              </div>

              <div className="hidden">
                <div className={`${cardSurface} p-6`}>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Cyber Security Solutions</h3>
                  <ExpandableList
                    items={cyberSecuritySolutions}
                    limit={5}
                    expanded={!!expandedAboutLists.cyber}
                    onToggle={() => toggleAboutList("cyber")}
                  />
                </div>
                <div className={`${cardSurface} p-6`}>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Digital Forensic Solutions</h3>
                  <ExpandableList
                    items={digitalForensicSolutions}
                    limit={5}
                    expanded={!!expandedAboutLists.forensics}
                    onToggle={() => toggleAboutList("forensics")}
                  />
                </div>
              </div>

              <div className="hidden">
                <div className={`${cardSurface} p-6`}>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Talent Acquisition & Staffing</h3>
                <ul className="space-y-3 text-slate-600 dark:text-slate-300 text-[15px] leading-relaxed list-disc pl-5">
                  <li>At iSHAY, the core team comes with immense experience of talent acquisition.</li>
                  <li>The salient features that iSHAY offers to our customers are:</li>
                  <li>Niche IT skilled relevant resources.</li>
                  <li>The IT resources can be hired on Full Time or on Contract or on CTH basis.</li>
                  <li>We assure to provide the best profiles that fits the customer’s requirement.</li>
                  <li>We assure to provide the best suitable profiles within 72hrs post receival of JD.</li>
                  <li>We assure the credibility of our IT resources.</li>
                </ul>
                </div>

                <div className={`${cardSurface} p-6`}>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Enterprise Solutions</h3>
                  <ul className="space-y-3 text-slate-600 dark:text-slate-300 text-[15px] leading-relaxed list-disc pl-5">
                    <li>Enterprise Resource Planning (ERP)</li>
                    <li>Robotic Process Automation (RPA)</li>
                    <li>MIS solutions</li>
                    <li>Customer Relationship Management (CRM)</li>
                    <li>Core Banking Solution (CBS) & many more..</li>
                  </ul>
                </div>
              </div>

              <div className="hidden">
                <div className={`${cardSurface} p-6`}>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Our IT Resource Domain Expertise</h3>
                  <ul className="space-y-3 text-slate-600 dark:text-slate-300 text-[15px] leading-relaxed list-disc pl-5">
                    <li>BIGDATA</li>
                    <li>SAP</li>
                    <li>DATASCIENCE</li>
                    <li>MACHINE LEARNING</li>
                    <li>RPA</li>
                    <li>DEV OPS</li>
                    <li>FULL STACK</li>
                    <li>PYTHON</li>
                    <li>JAVA</li>
                    <li>DOT NET</li>
                    <li>CYBER SECURITY & many more…</li>
                  </ul>
                </div>
                <div className={`${cardSurface} p-6`}>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Our Functional Domain Staffing Expertise</h3>
                  <ul className="space-y-3 text-slate-600 dark:text-slate-300 text-[15px] leading-relaxed list-disc pl-5">
                    <li>FINANCE</li>
                    <li>ACCOUNTING</li>
                    <li>HR</li>
                    <li>SALES & MARKETING</li>
                    <li>LOGISTICS</li>
                    <li>OPERATIONS & many more…</li>
                  </ul>
                </div>
              </div>

              {/* Stats/Highlight Row */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-slate-200/60 dark:border-white/10">
                {aboutStats.map((stat, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    key={stat.label}
                    className="flex flex-col gap-1"
                  >
                    <span className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">{stat.value}</span>
                    <span className="text-[13px] font-bold text-slate-500 uppercase tracking-wider">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Core Capability Cards */}
            <motion.div
              variants={staggerReveal}
              initial="hidden"
              animate="show"
              viewport={{ once: true, amount: 0.25 }}
              className="relative space-y-6"
            >
              {/* Highlight backdrop */}
              <motion.div
                animate={{ rotate: [12, -12, 12], scale: [1, 1.1, 1] }}
                transition={{ duration: 15, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
                className="absolute top-1/4 right-1/4 w-3/4 h-3/4 bg-blue-600/10 dark:bg-blue-400/10 rounded-[60px] blur-3xl -z-10 mix-blend-multiply dark:mix-blend-screen"
              />

              {capabilityCards.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemReveal}
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className={`p-6 md:p-7 ${cardSurface} ease-[cubic-bezier(.4,0,.2,1)] relative overflow-hidden group flex gap-5 items-start`}
                >
                  <div className="w-16 h-16 rounded-[1.5rem] bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 flex items-center justify-center shadow-inner ring-1 ring-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-xl mb-3 tracking-tight">{item.label}</h3>
                    <p className="text-[16px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {aboutDetailCards.map((card) => (
              <div key={card.key} className={`${cardSurface} min-h-[260px] p-5`}>
                <h3 className="mb-4 min-h-[48px] text-[16px] font-extrabold leading-snug text-slate-900 dark:text-white">
                  {card.title}
                </h3>
                <ExpandableList
                  items={card.items}
                  limit={5}
                  expanded={!!expandedAboutLists[card.key]}
                  onToggle={() => toggleAboutList(card.key)}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── VISION / MISSION / OBJECTIVE ── */}
      <motion.section
        id="why-us"
        className={`${sectionShell} py-16 md:py-20 border-t border-slate-300/70 dark:border-white/10`}
        initial="hidden"
        animate="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={sectionReveal}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-14">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-5 tracking-tight text-slate-950 dark:text-white">
              Vision, Mission & Objective
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg font-medium leading-relaxed">
              Our direction is built around secure transformation and dependable delivery for businesses across the Indian Subcontinent and Africa.
            </p>
          </div>

          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8" variants={staggerReveal}>
            {aboutCards.map((item, i) => (
              <motion.div
                key={i}
                variants={itemReveal}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className={`group p-7 ${cardSurface} hover:-translate-y-1 relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="w-16 h-16 rounded-[1.5rem] bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 flex items-center justify-center mb-6 shadow-inner ring-1 ring-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-2xl mb-3 tracking-tight">{item.label}</h3>
                <p className="text-[15px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── DOMAIN EXPERTISE ── */}
      <motion.section
        className={`${sectionShell} py-12 md:py-14 border-t border-slate-300/70 dark:border-white/10`}
        initial="hidden"
        animate="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={sectionReveal}
      >
        <div className="max-w-6xl mx-auto px-6 overflow-hidden relative">
          <div className="text-center mb-10 relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex mb-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest shadow-xl"
            >
              Our Coverage
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight text-slate-950 dark:text-white">IT Resource Domain Expertise</h2>
            <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg font-medium">
              Niche talent across every critical technology domain — sourced & delivered within 72 hours.
            </p>
          </div>

          <div className="relative w-[150%] left-[-25%] flex justify-center mask-image-[linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] pointer-events-none overflow-hidden">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: [0.25, 0.25, 0.75, 0.75], duration: 32 }}
              className="flex flex-wrap flex-col h-[220px] content-start gap-3 md:gap-4 w-[max-content] pb-4 pr-10"
            >
              {domainExpertiseTags.concat(domainExpertiseTags).map((tag, i) => (
                <motion.span
                  whileHover={{ scale: 1.05, backgroundColor: "#3b82f6", color: "white" }}
                  key={`${tag}-${i}`}
                  className="px-5 py-2.5 rounded-full border border-slate-300/80 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl text-[13px] font-bold text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:shadow-[0_0_30px_-5px_rgba(37,99,235,0.45)] cursor-crosshair transition-colors duration-300 w-max pointer-events-auto"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ── FAQ ── */}
      <motion.section
        id="faq"
        className={`${sectionShell} py-16 md:py-20 border-y border-slate-300/70 dark:border-white/10`}
        initial="hidden"
        animate="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={sectionReveal}
      >
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 dark:bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-5 tracking-tight text-slate-950 dark:text-white">
              Questions & Answers
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg font-medium">
              Everything you need to know about iSHAY Infotech, our engagements, and delivery.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`${cardSurface} mb-4`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left py-6 px-8 flex items-center justify-between gap-6 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                >
                  <span className="font-bold text-lg md:text-xl tracking-tight text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    className="w-10 h-10 rounded-full border-2 border-slate-200/60 dark:border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-blue-500/50 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-all scale-100 group-hover:scale-110"
                  >
                    <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.42, 0, 0.58, 1] }}
                      className="overflow-hidden px-8"
                    >
                      <p className="pb-6 pt-2 text-[16px] text-slate-600/90 dark:text-slate-400 leading-relaxed font-medium">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── CONTACT ── */}
      <motion.section
        id="contact"
        className={`${sectionShell} py-16 md:py-24`}
        initial="hidden"
        animate="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={sectionReveal}
      >
        {/* Glow */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
          className="absolute bottom-0 left-1/2 w-[800px] h-[400px] bg-blue-600/10 dark:bg-blue-600/20 rounded-[100%] blur-[100px] -translate-x-1/2 translate-y-1/2 pointer-events-none z-0"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: [0.25, 0.25, 0.75, 0.75] }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none z-0"
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex mb-6 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest shadow-xl"
            >
              CONTACT US
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-black mb-5 tracking-tight text-slate-950 dark:text-white leading-tight">
              ISHAY INFOTECH PVT LTD
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg font-medium leading-relaxed">
              Reach out to our India and Africa teams for secure, scalable, and talent-driven IT solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Contact Info container */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-5"
            >
              {[
                { icon: Mail, title: "Email", value: "info@ishayinfotech.com", link: "mailto:info@ishayinfotech.com" },
                { icon: Phone, title: "Phone", value: "+91 82172 47723", link: "tel:+918217247723" },
                { icon: Globe, title: "Operations", value: "Indian Sub-continent & Africa" },
                { icon: MapPin, title: "Locations", value: "Bangalore, India & Field Locations" },
                { icon: MapPin, title: "Address", value: "1st Floor, 121/133/1, 2nd Cross, Mahantara Layout, K.G Nagar, Bangalore - 560019" },
              ].map((item, i) => (
                <motion.div
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  key={i}
                  className={`flex gap-5 group items-center p-4 ${cardSurface} cursor-pointer`}
                >
                  <div className="w-16 h-16 rounded-[1.5rem] bg-white dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-all duration-500 shadow-lg shadow-black/5 group-hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)]">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[13px] mb-1.5 text-slate-500 uppercase tracking-widest">{item.title}</h3>
                    {item.link ? (
                        <a href={item.link} className="text-base md:text-lg font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors break-words">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-base md:text-lg font-bold text-slate-900 dark:text-white break-words">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              className={`p-7 md:p-10 ${cardSurface} backdrop-blur-2xl relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 tracking-tight text-slate-900 dark:text-white">Message Received</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">
                    Thank you. One of our specialists will reach out within 24 hours to schedule a deep-dive session.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-8 rounded-xl font-bold border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                    onClick={() => setSubmitted(false)}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} className="h-12 rounded-xl text-slate-900 dark:text-white bg-slate-50 dark:bg-black/50 border-slate-200 dark:border-white/10 focus-visible:ring-blue-500/30" />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Your business email" {...field} className="h-12 rounded-xl text-slate-900 dark:text-white bg-slate-50 dark:bg-black/50 border-slate-200 dark:border-white/10 focus-visible:ring-blue-500/30" />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">Organization</FormLabel>
                          <FormControl>
                            <Input placeholder="Company / Institution name" {...field} className="h-12 rounded-xl text-slate-900 dark:text-white bg-slate-50 dark:bg-black/50 border-slate-200 dark:border-white/10 focus-visible:ring-blue-500/30" />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">How can we help?</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Briefly describe your challenge or requirement..."
                              className="min-h-[120px] resize-y rounded-xl text-slate-900 dark:text-white bg-slate-50 dark:bg-black/50 border-slate-200 dark:border-white/10 focus-visible:ring-blue-500/30 p-4"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 mt-4 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_30px_-10px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_-10px_rgba(37,99,235,0.6)] transition-all transform hover:-translate-y-0.5"
                    >
                      {isSubmitting ? "Sending..." : "Submit Inquiry"}
                    </Button>
                  </form>
                </Form>
              )}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#e8eef6] dark:bg-[#020617] border-t border-slate-300/80 dark:border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6 opacity-90 hover:opacity-100 transition-opacity">
                <img src="/logo.jpeg" alt="iSHAY Infotech" loading="lazy" className="h-10 md:h-12 w-auto object-contain flex-shrink-0" />
                <div className="flex flex-col text-left leading-none">
                  <span className="text-[18px] md:text-[20px] font-black uppercase text-blue-900 dark:text-blue-100 tracking-tight">iSHAY INFOTECH</span>
                  <span className="text-[10px] md:text-[11px] font-bold text-red-700 dark:text-red-500 uppercase tracking-widest mt-1">Excellence Assured</span>
                </div>
              </div>
              <p className="max-w-sm mb-6 leading-relaxed font-medium text-slate-600 dark:text-slate-400">
                Pioneering innovation across the Indian Sub-continent and Africa. Delivering excellence in Cybersecurity, AI, and IT Solutions.
              </p>
            </div>

            <div>
              <h4 className="text-slate-900 dark:text-white font-bold mb-6 tracking-wide">Quick Links</h4>
              <ul className="space-y-3 font-medium text-slate-600 dark:text-slate-400">
                {quickLinks.map((l) => (
                  <li key={l}>
                    <button
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      onClick={() =>
                        scrollToSection(
                          l === "About Us" ? "about" : l === "Why Choose Us" ? "why-us" : l.toLowerCase()
                        )
                      }
                    >
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-slate-900 dark:text-white font-bold mb-6 tracking-wide">Contact</h4>
              <ul className="space-y-3 font-medium text-slate-600 dark:text-slate-400">
                <li>info@ishayinfotech.com</li>
                <li>+91 82172 47723</li>
                <li>Bangalore, India</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] font-medium text-slate-500 dark:text-slate-500">
            <p>© {new Date().getFullYear()} iSHAY Infotech Pvt Ltd. All rights reserved.</p>
            <div className="flex gap-6 text-slate-600 dark:text-slate-400">
              <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
