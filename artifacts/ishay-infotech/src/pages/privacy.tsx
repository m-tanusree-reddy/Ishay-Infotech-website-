import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import IshaySVGLogo from "../components/ui/ishay-svg-logo";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-800 dark:text-slate-200">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-black/40 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <IshaySVGLogo className="h-10 w-auto text-slate-900 dark:text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover:scale-105 transition-transform" />
          </Link>
          <Link href="/" className="flex items-center text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 pt-40 pb-24">
        <h1 className="text-4xl md:text-5xl font-black mb-8 text-slate-900 dark:text-white tracking-tight">Privacy Policy</h1>
        <p className="text-slate-500 mb-12 font-medium">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed font-medium space-y-6">
          <p>
            Welcome to iSHAY Infotech! This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">1. Information We Collect</h2>
          <p>
            We may collect personal information such as your name, email address, phone number, and professional details when you voluntarily provide it during inquiries, consultations, or when applying for IT talent roles. Automatically collected data includes your IP address, browser type, and interaction metrics on our site to improve user experience.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">2. How We Use Your Information</h2>
          <p>
            Data collected is used to:
            <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-600 dark:text-slate-400">
              <li>Facilitate, operate, and maintain our IT consulting and software solutions.</li>
              <li>Communicate directly with you for scheduling and supporting services.</li>
              <li>Improve site functionality through analytics.</li>
              <li>Evaluate candidates and fit for IT resource acquisition.</li>
            </ul>
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">3. Data Security</h2>
          <p>
            Being rooted in Cybersecurity excellence, iSHAY Infotech implements enterprise-grade technical and organizational measures to secure your personal data from unauthorized access, use, or disclosure. However, no internet transmission is universally secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">4. Sharing Your Information</h2>
          <p>
            We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information with our business partners or trusted affiliates for the purposes outlined above.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">5. Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us at: <br/>
            <strong className="text-slate-800 dark:text-slate-200">Email:</strong> info@ishayinfotech.com <br/>
            <strong className="text-slate-800 dark:text-slate-200">Based in:</strong> Mumbai, India
          </p>
        </div>
      </main>
    </div>
  );
}