import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
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
  ChevronUp,
  ArrowRight,
  Code2,
  Lock,
  Database,
  Cloud,
  Rocket,
  Search,
  Activity,
  HeartHandshake,
  Clock,
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
import IshaySVGLogo from "@/components/ui/ishay-svg-logo";
import logoImg from "@/assets/logo.jpg";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzz6XbF273YvLmsO2Y-gqfQfP0aE1pBwED_87TqC1O8sH9Z7yYkHhPxrG_KxNYY1wL4/exec";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  company: z.string().min(2, "Organization name is required."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Services", id: "services" },
    { name: "About Us", id: "about" },
    { name: "Why Us", id: "why-us" },
    { name: "FAQ", id: "faq" },
    { name: "Contact", id: "contact" },
  ];

  const services = [
    {
      icon: Users,
      title: "IT Talent Supply",
      description: "Fast, reliable sourcing of prime IT resources across domains (SAP, BigData, App Dev, Testing, Cloud, CyberSecurity).",
      features: ["Contract Staffing", "Direct Hire / FTE", "C-Level Executive Search", "Project-Based Teams"],
      color: "from-blue-500/20 to-cyan-500/20",
      border: "border-blue-500/30",
    },
    {
      icon: ShieldCheck,
      title: "Cyber Security & Forensics",
      description: "Comprehensive posture assessment, pentesting, compliance, and forensics from deep-domain experts.",
      features: ["Vulnerability Assessment", "Cyber Forensics", "Identity & Access (IAM)", "Security Ops Center (SOC)"],
      color: "from-violet-500/20 to-fuchsia-500/20",
      border: "border-violet-500/30",
    },
    {
      icon: Server,
      title: "Enterprise Architecture",
      description: "Scalable infrastructure and architectural framework planning aligning your IT seamlessly with business goals.",
      features: ["Cloud Migration", "Infrastructure Design", "System Integration", "Performance Tuning"],
      color: "from-amber-500/20 to-orange-500/20",
      border: "border-amber-500/30",
    },
    {
      icon: Cpu,
      title: "Smart Solutions & AI",
      description: "Embrace the future with robust ML/AI systems, RPAs, Big Data analytics, and embedded systems.",
      features: ["Machine Learning Models", "RPA Automation", "Big Data Analytics", "IoT & Embedded"],
      color: "from-emerald-500/20 to-teal-500/20",
      border: "border-emerald-500/30",
    },
  ];

  const differentiators = [
    { icon: Rocket, title: "Speed", description: "Expedite time-to-market with ready-to-deploy frameworks and talent networks." },
    { icon: Shield, title: "Risk Mitigation", description: "Stringent vetting processes and secure-by-design development lifecycles." },
    { icon: Activity, title: "Scalability", description: "Solutions engineered to grow effortlessly from MVP to Enterprise scale." },
    { icon: Search, title: "Precision", description: "Exact matching of talent and tech to your highly specific business challenges." },
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

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 selection:bg-blue-500/30 font-sans overflow-x-hidden">
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-black/40 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button onClick={() => scrollToSection("home")} className="flex items-center gap-2 group cursor-pointer">
            <img src={logoImg} alt="iSHAY Infotech" className="h-12 w-auto object-contain flex-shrink-0 group-hover:scale-105 transition-transform" />
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
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_-5px_rgba(37,99,235,0.6)] transition-all"
              onClick={() => scrollToSection("contact")}
            >
              Get Started <ArrowRight className="w-4 h-4 ml-2" />
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
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-white dark:bg-[#070b14] border-b border-slate-200 dark:border-white/10"
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
      <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex items-center justify-center min-h-[90vh]">
        {/* Ambient Background */}
        <div className="absolute inset-0 bg-[#070b14]">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-50" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 font-bold text-xs uppercase tracking-widest backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-shadow cursor-default"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6] animate-pulse" />
            Enterprise IT Excellence
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 50 }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 tracking-tighter text-white drop-shadow-2xl"
          >
            Architecting <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 animate-gradient-x">Digital</span><br className="hidden md:block" /> Solutions
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 50 }}
            className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-medium"
          >
            iSHAY Infotech delivers top-tier <strong className="text-white font-bold tracking-wide">IT Talent</strong>, <strong className="text-white font-bold tracking-wide">Cyber Security</strong> frameworks, and scalable <strong className="text-white font-bold tracking-wide">Enterprise Systems</strong> directly to your workflow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 50 }}
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
            className="mt-20 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto backdrop-blur-sm bg-slate-900/40 rounded-3xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[100%] animate-[shimmer_3s_infinite]" />
            {[
              { label: "Talent Recruited", value: "2,500+" },
              { label: "Client Retention", value: "98%" },
              { label: "Uptime Delivered", value: "99.99%" },
              { label: "Threats Mitigated", value: "10M+" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center p-4 relative z-10"
                whileHover={{ scale: 1.1, color: "#60a5fa" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl md:text-5xl font-extrabold text-white mb-2 tracking-tighter drop-shadow-lg">{stat.value}</div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 bg-white dark:bg-[#030712] relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-slate-900 dark:text-white">
              Excellence Through Engineering.
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-medium">
              We cover the full spectrum of modern digital requirements, from specialized manpower to bespoke architecture and rigorous security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15, type: "spring", stiffness: 100 }}
                whileHover={{ y: -10 }}
                className="group relative p-8 md:p-10 rounded-[2.5rem] bg-white/60 dark:bg-black/20 border border-slate-200/60 dark:border-white/5 hover:border-transparent hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] transition-all duration-500 overflow-hidden backdrop-blur-xl"
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
                    className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-8 bg-white dark:bg-[#070b14] border ${s.border} shadow-lg shadow-black/5 group-hover:bg-transparent group-hover:border-white/50 dark:group-hover:border-white/20 transition-all duration-500`}
                  >
                    <s.icon className="w-8 h-8 text-slate-900 dark:text-white" />
                  </motion.div>
                  <h3 className="font-black text-2xl lg:text-3xl mb-4 text-slate-900 dark:text-white tracking-tight">{s.title}</h3>
                  <p className="text-slate-600/90 dark:text-slate-400 mb-10 leading-relaxed font-medium text-[16px]">
                    {s.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {s.features.map((feature, idx) => (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
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
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT US (VISION/MISSION) ── */}
      <section id="about" className="py-32 bg-white dark:bg-[#070b14] relative overflow-hidden">
        {/* Background Gradients */}
        <motion.div
          animate={{ rotate: 180, scale: [1, 1.2, 1] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -left-64 top-0 w-[800px] h-[800px] bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-extrabold uppercase tracking-widest mb-8 border border-blue-200 dark:border-blue-500/20 shadow-[0_0_20px_rgba(37,99,235,0.1)]"
              >
                About iSHAY Infotech
              </motion.div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                Pioneering <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Digital Innovation</span> & Security.
              </h2>

              <div className="prose prose-slate dark:prose-invert max-w-none mb-10">
                <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  Founded by a team of visionary IT professionals, <strong className="text-slate-900 dark:text-white">iSHAY Infotech</strong> is built on the foundation of delivering uncompromising quality in the digital landscape. We bridge the gap between complex technological challenges and elegant, scalable solutions.
                </p>
                <p className="text-[16px] text-slate-600/90 dark:text-slate-500 leading-relaxed mt-4">
                  Whether building resilient enterprise architectures, securing infrastructure against emerging cyber threats, or sourcing elite tech talent, our approach remains fiercely client-first. We don't just write code or fill seats; we engineer growth.
                </p>
              </div>

              {/* Stats/Highlight Row */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-slate-200/60 dark:border-white/10">
                {[
                  { value: "72h", label: "Talent Delivery" },
                  { value: "100%", label: "Secure by Design" },
                  { value: "24/7", label: "Strategic Support" },
                ].map((stat, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
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

            {/* Right: Core Philosophy Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut", staggerChildren: 0.2 }}
              className="relative space-y-6"
            >
              {/* Highlight backdrop */}
              <motion.div
                animate={{ rotate: [12, -12, 12], scale: [1, 1.1, 1] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 right-1/4 w-3/4 h-3/4 bg-blue-600/10 dark:bg-blue-400/10 rounded-[60px] blur-3xl -z-10 mix-blend-multiply dark:mix-blend-screen"
              />

              {[
                { label: "Our Vision", desc: "To assist customers in embracing the latest IT technologies in a way that benefits both business outcomes and humanity at large.", icon: Globe },
                { label: "Our Mission", desc: "Provide an unparalleled experience in Information Security, Smart Solutions, Enterprise Architectures, and elite IT Talent Acquisition.", icon: Target },
                { label: "Our Objective", desc: "Deliver excellence through deep customer understanding—providing high-quality, economical solutions on time, every time.", icon: Zap },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ x: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="p-6 md:p-8 rounded-[2rem] border border-slate-200/50 dark:border-white/5 bg-white/80 dark:bg-white/[0.02] backdrop-blur-xl shadow-lg shadow-blue-900/5 hover:shadow-[0_30px_60px_-15px_rgba(37,99,235,0.2)] dark:hover:shadow-[0_30px_60px_-15px_rgba(37,99,235,0.15)] hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden group flex gap-6 items-start"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="w-14 h-14 rounded-[1.25rem] bg-blue-50/80 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 shadow-inner ring-1 ring-blue-500/20 group-hover:bg-blue-600 group-hover:text-white group-hover:ring-blue-500/50 transition-all duration-500">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-xl md:text-2xl mb-2 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.label}</h3>
                    <p className="text-[15px] md:text-[16px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section id="why-us" className="py-24 bg-slate-50 dark:bg-slate-900/50 relative border-t border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-slate-900 dark:text-white">
              Built for <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-cyan-400">Trust</span>, Delivered with <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-500">Speed</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg sm:text-xl font-medium">
              We achieve excellence through deep understanding of your requirements — providing high quality, robust solutions within agreed timelines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { icon: CheckCircle2, title: "Expert Team", desc: "Passionate IT specialists with deep domain expertise across security, AI, enterprise, and forensics.", color: "from-blue-500 to-blue-700", shadow: "shadow-blue-500/20" },
              { icon: Clock, title: "Fast Delivery", desc: "High-quality solutions engineered on time. Talent profiles within 72 hours of JD receival.", color: "from-emerald-400 to-emerald-600", shadow: "shadow-emerald-500/20" },
              { icon: Lock, title: "Secure DNA", desc: "Security is our core — not an afterthought. Every solution features enterprise-grade protection.", color: "from-indigo-500 to-violet-600", shadow: "shadow-indigo-500/20" },
              { icon: HeartHandshake, title: "Client-First", desc: "We understand your requirements deeply before proposing anything. No generic templates.", color: "from-amber-400 to-orange-500", shadow: "shadow-amber-500/20" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                className="group p-8 rounded-[2rem] bg-white dark:bg-black/30 border border-slate-200 dark:border-white/5 hover:border-transparent hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.05)] hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
              >
                {/* Glowing hover backdrop */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-lg ${item.shadow} text-white transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-xl mb-3 tracking-tight">{item.title}</h3>
                <p className="text-[15px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOMAIN EXPERTISE ── */}
      <section className="py-24 bg-white dark:bg-[#01030a]">
        <div className="max-w-5xl mx-auto px-6 overflow-hidden relative pb-10">
          <div className="text-center mb-16 relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex mb-6 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest shadow-xl"
            >
              Our Coverage
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-slate-900 dark:text-white">IT Resource Domain Expertise</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
              Niche talent across every critical technology domain — sourced & delivered within 72 hours.
            </p>
          </div>

          <div className="relative w-[150%] left-[-25%] flex justify-center mask-image-[linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] pointer-events-none">
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
              className="flex flex-wrap flex-col h-[280px] content-start gap-4 md:gap-5 w-[max-content] pb-8 pr-10"
            >
              {[
                "BigData", "SAP", "Data Science", "Machine Learning", "RPA", "DevOps",
                "Full Stack", "Python", "Java", ".NET", "Cybersecurity", "Cloud Architecture", "Finance Tech",
                "FinTech", "Accounting", "HR Systems", "MarTech", "Logistics", "Operations",
                "Smart Solutions", "SaaS Development", "Backend Infra", "IT Assessment", "AWS", "Azure",
                "GCP", "Agile Management", "Data Warehousing", "IoT Integration"
              ].map((tag, i) => (
                <motion.span
                  whileHover={{ scale: 1.1, backgroundColor: "#3b82f6", color: "white" }}
                  key={`${tag}-${i}`}
                  className="px-6 py-3 rounded-full border-2 border-slate-200/60 dark:border-white/10 bg-white/40 dark:bg-white/[0.03] backdrop-blur-xl text-[14px] font-bold text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:shadow-[0_0_30px_-5px_rgba(37,99,235,0.6)] cursor-crosshair transition-colors duration-300 w-max pointer-events-auto"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 bg-slate-50 dark:bg-[#030712] border-y border-slate-200 dark:border-white/5 relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 dark:bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-slate-900 dark:text-white">
              Questions & Answers
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
              Everything you need to know about iSHAY Infotech, our engagements, and delivery.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white/60 dark:bg-black/20 border border-slate-200/50 dark:border-white/5 rounded-3xl mb-4 hover:border-blue-500/30 dark:hover:border-blue-400/30 transition-all duration-300"
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
                      transition={{ duration: 0.3, ease: "easeInOut" }}
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
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-32 bg-white dark:bg-[#02050f] relative overflow-hidden">
        {/* Glow */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/2 w-[800px] h-[400px] bg-blue-600/10 dark:bg-blue-600/20 rounded-[100%] blur-[100px] -translate-x-1/2 translate-y-1/2 pointer-events-none z-0"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none z-0"
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex mb-6 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest shadow-xl"
            >
              Get in Touch
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-slate-900 dark:text-white leading-tight">
              Ready to Accelerate?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
              We'll architect the exact IT staffing, cybersecurity, or software solution for your enterprise. Let's talk.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Contact Info container */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {[
                { icon: Mail, title: "Email", value: "info@ishayinfotech.com", link: "mailto:info@ishayinfotech.com" },
                { icon: Phone, title: "Phone", value: "+91 (987) 654-3210", link: "tel:+919876543210" },
                { icon: Globe, title: "Operations", value: "Indian Sub-continent & Africa" },
                { icon: MapPin, title: "Locations", value: "Mumbai, India & Field Locations" },
              ].map((item, i) => (
                <motion.div
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  key={i}
                  className="flex gap-6 group items-center p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-[1.25rem] bg-white dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-all duration-500 shadow-lg shadow-black/5 group-hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)]">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[13px] mb-1.5 text-slate-500 uppercase tracking-widest">{item.title}</h3>
                    {item.link ? (
                      <a href={item.link} className="text-xl font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-xl font-bold text-slate-900 dark:text-white">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              className="p-8 md:p-12 rounded-[2.5rem] bg-white/80 border border-slate-200/60 dark:bg-black/20 dark:border-white/5 backdrop-blur-2xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] dark:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] relative overflow-hidden"
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
                              <Input placeholder="Jane Doe" {...field} className="h-12 rounded-xl text-slate-900 dark:text-white bg-slate-50 dark:bg-black/50 border-slate-200 dark:border-white/10 focus-visible:ring-blue-500/30" />
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
                              <Input placeholder="jane@company.com" {...field} className="h-12 rounded-xl text-slate-900 dark:text-white bg-slate-50 dark:bg-black/50 border-slate-200 dark:border-white/10 focus-visible:ring-blue-500/30" />
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
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-50 dark:bg-[#01040a] border-t border-slate-200 dark:border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6 opacity-90 hover:opacity-100 transition-opacity">
                <img src={logoImg} alt="iSHAY Infotech" className="h-12 md:h-14 w-auto object-contain flex-shrink-0" />
                <span className="text-[11px] font-bold text-slate-500 tracking-[0.2em] uppercase mt-1">
                  Pvt Ltd
                </span>
              </div>
              <p className="max-w-sm mb-6 leading-relaxed font-medium text-slate-600 dark:text-slate-400">
                Pioneering innovation across the Indian Sub-continent and Africa. Delivering excellence in Cybersecurity, AI, and IT Solutions.
              </p>
            </div>

            <div>
              <h4 className="text-slate-900 dark:text-white font-bold mb-6 tracking-wide">Quick Links</h4>
              <ul className="space-y-3 font-medium text-slate-600 dark:text-slate-400">
                {["Services", "About Us", "Why Choose Us", "FAQ", "Contact"].map((l) => (
                  <li key={l}>
                    <button className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={() => scrollToSection(l.toLowerCase().replace(" ", "-"))}>
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
                <li>+91 (987) 654-3210</li>
                <li>Bengaluru, India</li>
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