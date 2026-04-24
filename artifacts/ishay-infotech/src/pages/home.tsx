import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Search,
  Server,
  Brain,
  Users,
  Lightbulb,
  CheckCircle2,
  Clock,
  Lock,
  HeartHandshake,
  Menu,
  X,
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  Globe,
  Sun,
  Moon,
  ChevronDown,
  ChevronUp,
  Star,
  Zap,
  Target,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const CONTACT_SCRIPT_URL =
  "https://script.google.com/macros/s/PLACEHOLDER_SCRIPT_URL/exec";

const services = [
  {
    icon: Shield,
    title: "Information Security",
    description:
      "End-to-end cybersecurity: VAPT, DLP, IAM, PAM, MFA, SIEM, SOC, and SOAR — protecting your enterprise at every layer.",
    color: "from-blue-500 to-blue-700",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    iconBg: "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400",
  },
  {
    icon: Search,
    title: "Digital Forensics",
    description:
      "Comprehensive forensic capabilities: mobile, cloud, video, social media, bitcoin, GPS analysis, and professional forensic workstations.",
    color: "from-indigo-500 to-indigo-700",
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
    iconBg:
      "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400",
  },
  {
    icon: Server,
    title: "Enterprise Solutions",
    description:
      "Scalable ERP, RPA, MIS, CRM, and Core Banking Solutions tailored to digitize and optimize your core business processes.",
    color: "from-violet-500 to-violet-700",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    iconBg:
      "bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400",
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description:
      "Smart, data-driven solutions powered by advanced AI/ML to automate decisions, boost efficiency, and unlock business growth.",
    color: "from-cyan-500 to-cyan-700",
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
    iconBg: "bg-cyan-100 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-400",
  },
  {
    icon: Users,
    title: "IT Staffing",
    description:
      "Niche IT talent — BigData, SAP, DataScience, ML, DevOps, Full Stack — delivered within 72 hours. Full-time, contract, or CTH.",
    color: "from-emerald-500 to-emerald-700",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    iconBg:
      "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: Lightbulb,
    title: "Smart Solutions",
    description:
      "Innovative, customized technology solutions that enable businesses to digitize operations and stay competitive in the modern landscape.",
    color: "from-amber-500 to-amber-700",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    iconBg:
      "bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400",
  },
];

const differentiators = [
  {
    icon: Zap,
    title: "72-Hour Talent Delivery",
    description:
      "We commit to delivering the most suitable candidate profiles within 72 hours of receiving your job description — no delays, no excuses.",
  },
  {
    icon: Target,
    title: "Glocalization Strategy",
    description:
      "With deep roots in the Indian Sub-continent and Africa, we bring global expertise with local understanding to every engagement.",
  },
  {
    icon: Award,
    title: "Domain Depth",
    description:
      "Our team comes with hands-on expertise across cybersecurity, AI/ML, enterprise solutions, and digital forensics — not generalists.",
  },
  {
    icon: Star,
    title: "End-to-End Ownership",
    description:
      "From discovery to deployment, we own the outcome. No hand-offs, no finger-pointing — just reliable delivery within agreed timelines.",
  },
  {
    icon: Lock,
    title: "Security-First Mindset",
    description:
      "Security isn't a feature we add — it's embedded into every solution we build, every resource we place, every recommendation we make.",
  },
  {
    icon: CheckCircle2,
    title: "Proven Credibility",
    description:
      "Every IT resource we provide is thoroughly vetted. We stand behind the credibility and competence of every professional we place.",
  },
];

const faqs = [
  {
    question: "What industries does iSHAY Infotech serve?",
    answer:
      "iSHAY Infotech serves enterprises across Banking & Finance, Government, Healthcare, Manufacturing, Retail, and Technology sectors — both in the Indian Sub-continent and African territories.",
  },
  {
    question: "How quickly can iSHAY provide IT staffing resources?",
    answer:
      "We guarantee delivery of the best-fit candidate profiles within 72 hours of receiving a job description. Our extensive talent network and rigorous pre-vetting process enables this rapid turnaround.",
  },
  {
    question: "What does your cybersecurity service cover?",
    answer:
      "Our cybersecurity services cover the full spectrum: Vulnerability Assessment & Penetration Testing (VAPT), Data Leak Prevention (DLP), Identity & Access Management (IAM), Privileged Access Management (PAM), Multi-Factor Authentication (MFA), SIEM, Security Operations Centre (SOC), and SOAR.",
  },
  {
    question: "Can IT resources be hired on different engagement models?",
    answer:
      "Yes. Our IT resources can be engaged on a Full-Time, Contract, or Contract-to-Hire (CTH) basis, providing you with the flexibility to match your project needs and budget.",
  },
  {
    question: "What enterprise solutions does iSHAY implement?",
    answer:
      "We implement Enterprise Resource Planning (ERP), Robotic Process Automation (RPA), MIS solutions, Customer Relationship Management (CRM), and Core Banking Solutions (CBS), customized to your business requirements.",
  },
  {
    question: "How do I get started with iSHAY Infotech?",
    answer:
      "Simply fill out our contact form or reach us at info@ishayinfotech.com. Our team will schedule a discovery call within 24 hours to understand your requirements and propose the right solution.",
  },
];

const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(1, "Company is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

function IshaySVGLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Shield icon */}
      <path
        d="M14 4L6 7.5V16C6 20.97 9.42 25.62 14 27C18.58 25.62 22 20.97 22 16V7.5L14 4Z"
        fill="url(#logoGrad)"
      />
      <path
        d="M11 16L13 18L17 14"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* "iSHAY" text */}
      <text
        x="28"
        y="23"
        fontFamily="Inter, sans-serif"
        fontSize="14"
        fontWeight="700"
        fill="currentColor"
        letterSpacing="-0.3"
      >
        iSHAY
      </text>
      <defs>
        <linearGradient id="logoGrad" x1="6" y1="4" x2="22" y2="27" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2563eb" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isDark, setIsDark] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem("ishay-theme");
    if (saved === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("ishay-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("ishay-theme", "light");
    }
  };

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", company: "", message: "" },
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      if (CONTACT_SCRIPT_URL.includes("PLACEHOLDER")) {
        await new Promise((r) => setTimeout(r, 1500));
        setSubmitted(true);
        form.reset();
      } else {
        const res = await fetch(CONTACT_SCRIPT_URL, {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
          setSubmitted(true);
          form.reset();
        } else throw new Error("Network error");
      }
    } catch {
      toast({
        title: "Error sending message",
        description: "Please try again or email us at info@ishayinfotech.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut", delay: i * 0.1 },
    }),
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">

      {/* ── NAV ── */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2"
          >
            <IshaySVGLogo className="h-8 w-auto text-foreground" />
            <span className="text-[11px] font-medium text-muted-foreground hidden sm:block tracking-wide uppercase">
              Pvt Ltd
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {[
              ["Services", "services"],
              ["About", "about"],
              ["Why Us", "why-us"],
              ["FAQ", "faq"],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <Button
              onClick={() => scrollToSection("contact")}
              size="sm"
              className="hidden md:flex rounded-lg px-5 h-9 text-sm"
            >
              Contact Us
            </Button>

            {/* Mobile menu */}
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background border-b border-border overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-2">
                {[
                  ["Services", "services"],
                  ["About", "about"],
                  ["Why Us", "why-us"],
                  ["FAQ", "faq"],
                  ["Contact", "contact"],
                ].map(([label, id]) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className="text-left py-2 px-3 rounded-md text-sm font-medium hover:bg-muted transition-colors"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ── */}
      <section className="relative pt-28 pb-0 overflow-hidden">
        {/* Blue gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f2a6e] via-[#1d4ed8] to-[#2563eb] dark:from-[#050d1f] dark:via-[#0d2260] dark:to-[#1d4ed8]" />
        {/* Subtle mesh overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 40%),
                            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 text-white">
          <motion.div
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              custom={0}
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-8 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              Trusted IT Partner — India & Africa
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6"
            >
              Secure & Scale Your
              <br />
              Business with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-white">
                Smart IT Solutions
              </span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              iSHAY Infotech empowers organizations to digitize, secure, and scale — with expert teams in cybersecurity, AI/ML, digital forensics, and IT staffing across two continents.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                onClick={() => scrollToSection("services")}
                size="lg"
                className="h-12 px-8 text-base rounded-lg bg-white text-[#1d4ed8] hover:bg-blue-50 font-semibold shadow-lg"
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                variant="outline"
                size="lg"
                className="h-12 px-8 text-base rounded-lg border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm font-medium"
              >
                Contact Us
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats bar at bottom of hero */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/20 border border-white/20 rounded-2xl bg-white/10 backdrop-blur-sm overflow-hidden"
          >
            {[
              { val: "500+", label: "Projects Delivered" },
              { val: "72hr", label: "Talent Placement" },
              { val: "15+", label: "Years Expertise" },
              { val: "2", label: "Continents Served" },
            ].map((s) => (
              <div key={s.label} className="text-center py-6 px-4">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {s.val}
                </div>
                <div className="text-xs text-blue-200 uppercase tracking-wider font-medium">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Wave bottom */}
        <div className="relative">
          <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none" style={{ height: 64 }}>
            <path d="M0 64L480 0L960 40L1440 0V64H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* ── PAIN POINTS STRIP ── */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Challenges Holding Businesses Back
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We solve the real problems organizations face when digitizing and securing their operations.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "🔓", title: "Security Gaps", desc: "Unpatched vulnerabilities and weak access controls leaving critical data exposed." },
              { icon: "🔍", title: "Talent Shortage", desc: "Weeks wasted finding niche IT talent — while projects sit idle and deadlines slip." },
              { icon: "🧩", title: "Siloed Systems", desc: "Disconnected legacy applications creating inefficiency, errors, and missed insights." },
              { icon: "🤖", title: "Manual Processes", desc: "Time-consuming manual workflows that drain productivity and invite human error." },
              { icon: "🌍", title: "Scaling Across Markets", desc: "Expanding across geographies without a trusted technology partner that understands local nuances." },
              { icon: "📊", title: "Lack of Intelligence", desc: "No AI/ML framework to turn raw data into actionable business decisions at scale." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="flex gap-4 items-start p-5 rounded-xl border border-border hover:border-primary/40 hover:shadow-sm transition-all"
              >
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-20 bg-muted/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              What We Offer
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Core Services
            </h2>
            <p className="text-muted-foreground">
              A complete IT services portfolio — from cybersecurity and forensics to enterprise solutions, AI/ML, and talent acquisition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`group p-7 rounded-2xl border border-border bg-background hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${s.iconBg}`}>
                  <s.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                <div className="mt-5 flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / A DIFFERENT APPROACH ── */}
      <section id="about" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
                About iSHAY
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                A Different Approach to IT Services
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                iSHAY Infotech is built by passionate IT experts who believe technology should unlock business potential — not complicate it. Our founder brings deep expertise in IT Security, Enterprise Solutions, AI & Machine Learning, and Entrepreneurship across the Indian Sub-continent and Africa.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                We offer <strong className="text-foreground">Glocalization solutions</strong> — global technology know-how, applied with genuine local understanding. Our objective is simple: high quality, economical solutions delivered within agreed timelines.
              </p>

              <div className="space-y-4">
                {[
                  { label: "Vision", text: "To assist customers to embrace the latest IT technologies in a way that benefits both business and humanity at large." },
                  { label: "Mission", text: "Provide unparalleled experience in Information Security, Smart Solutions, Enterprise Solutions, and IT Talent Acquisition." },
                  { label: "Objective", text: "Excellence through deep customer understanding — delivering high quality, economical solutions on time, every time." },
                ].map((item) => (
                  <div key={item.label} className="flex gap-3">
                    <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                    <div>
                      <span className="font-semibold text-sm">{item.label}: </span>
                      <span className="text-sm text-muted-foreground">{item.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Feature grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {differentiators.map((d, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl border border-border bg-muted/30 hover:bg-muted/60 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                    <d.icon className="w-4.5 h-4.5 w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1.5">{d.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{d.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section id="why-us" className="py-20 bg-muted/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              Why iSHAY
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for Trust, Delivered with Speed
            </h2>
            <p className="text-muted-foreground">
              We achieve excellence through deep understanding of your requirements — providing high quality, economical solutions within agreed timelines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: CheckCircle2, title: "Expert Team", desc: "Passionate IT specialists with deep domain expertise across security, AI, enterprise, and forensics.", color: "text-blue-500" },
              { icon: Clock, title: "Fast Delivery", desc: "High-quality solutions within agreed timelines. Talent profiles within 72 hours of JD receival.", color: "text-emerald-500" },
              { icon: Lock, title: "Reliable & Secure", desc: "Security is our DNA — not a layer we add. Every solution is built with enterprise-grade protection.", color: "text-violet-500" },
              { icon: HeartHandshake, title: "Customer-Focused", desc: "We understand your requirements deeply before proposing solutions. No generic templates.", color: "text-amber-500" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center p-7 rounded-2xl bg-background border border-border hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className={`w-14 h-14 mx-auto rounded-full bg-muted flex items-center justify-center mb-5 ${item.color}`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOMAIN EXPERTISE ── */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">IT Resource Domain Expertise</h2>
            <p className="text-muted-foreground">
              Niche talent across every critical technology domain — delivered within 72 hours.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "BigData", "SAP", "Data Science", "Machine Learning", "RPA", "DevOps",
              "Full Stack", "Python", "Java", ".NET", "Cybersecurity", "Cloud", "Finance",
              "Accounting", "HR", "Sales & Marketing", "Logistics", "Operations",
            ].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full border border-border text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 bg-muted/40">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              FAQ
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Everything you need to know about iSHAY Infotech and our services.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-border bg-background overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-semibold text-sm hover:bg-muted/50 transition-colors"
                >
                  <span>{faq.question}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              Contact Us
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground">
              Tell us about your requirements and our team will get back to you within 24 hours.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Info sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 rounded-2xl bg-muted/50 border border-border">
                <h3 className="font-bold text-lg mb-5">Get In Touch</h3>
                <div className="space-y-5">
                  {[
                    {
                      icon: MapPin,
                      label: "Address",
                      value: "1st Floor, 121/133/1, 2nd Cross, Mahantara Layout, K.G. Nagar, Bangalore - 560019",
                    },
                    { icon: Phone, label: "Phone", value: "+91 82172 47723" },
                    { icon: Mail, label: "Email", value: "info@ishayinfotech.com" },
                    { icon: Globe, label: "Website", value: "www.ishayinfotech.com" },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-3 items-start">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-0.5">
                          {item.label}
                        </div>
                        <div className="text-sm">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-primary text-primary-foreground">
                <div className="text-2xl font-bold mb-2">72 Hours</div>
                <p className="text-sm text-primary-foreground/80">
                  Guaranteed response time for IT staffing requests after receiving your job description.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3 p-8 rounded-2xl border border-border bg-background shadow-sm">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center mb-5">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Message Sent Successfully!</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Thank you for reaching out. Our team will contact you within 24 hours.
                  </p>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm">Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm">Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="john@company.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Company Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Company" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your IT requirements..."
                              className="min-h-[130px] resize-y"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full h-11 text-sm font-semibold rounded-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                      {!isSubmitting && <ArrowRight className="ml-2 w-4 h-4" />}
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── DARK CTA SECTION ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#0f2460] to-[#1d4ed8] dark:from-[#030812] dark:via-[#081840] dark:to-[#1d4ed8]">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.15) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 40%)`
        }} />
        <div className="relative max-w-7xl mx-auto px-6 py-20 text-white">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-5xl font-bold mb-5">Ready To Start?</h2>
            <p className="text-blue-200 text-lg">
              Join the growing list of businesses that trust iSHAY Infotech to secure, scale, and digitize their operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Shield, title: "Free Consultation", desc: "Get a complimentary security assessment or IT staffing consultation with our experts." },
              { icon: Clock, title: "72 Minutes", desc: "Book a discovery call and receive a tailored proposal within 72 hours of your first conversation." },
              { icon: CheckCircle2, title: "Trusted by Clients", desc: "Join enterprises across India and Africa who rely on iSHAY for their critical IT needs." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-sky-300" />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-blue-200">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => scrollToSection("contact")}
              size="lg"
              className="h-12 px-10 rounded-lg bg-white text-[#1d4ed8] hover:bg-blue-50 font-semibold shadow-xl text-base"
            >
              Get Started Today
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <a href="mailto:info@ishayinfotech.com">
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-10 rounded-lg border-white/30 text-white bg-white/10 hover:bg-white/20 font-medium text-base w-full sm:w-auto"
              >
                <Mail className="mr-2 w-4 h-4" />
                info@ishayinfotech.com
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#080f1e] text-gray-400 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <IshaySVGLogo className="h-8 w-auto text-white" />
              </div>
              <p className="text-sm leading-relaxed text-gray-500 max-w-xs">
                A unique IT service organization built by passionate experts in IT Security, Digital Forensics, AI/ML, Enterprise Solutions, and IT Staffing.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                {["Information Security", "Digital Forensics", "Enterprise Solutions", "AI & Machine Learning", "IT Staffing", "Smart Solutions"].map((s) => (
                  <li key={s}>
                    <button
                      onClick={() => scrollToSection("services")}
                      className="hover:text-white transition-colors"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-500" />
                  <span>1st Floor, 121/133/1, 2nd Cross, Mahantara Layout, K.G. Nagar, Bangalore - 560019</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-500" />
                  <a href="tel:+918217247723" className="hover:text-white transition-colors">+91 82172 47723</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-500" />
                  <a href="mailto:info@ishayinfotech.com" className="hover:text-white transition-colors">info@ishayinfotech.com</a>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-500" />
                  <a href="https://www.ishayinfotech.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">www.ishayinfotech.com</a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
            <span>&copy; {new Date().getFullYear()} iSHAY Infotech Pvt Ltd. All rights reserved.</span>
            <span>Bangalore, India</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
