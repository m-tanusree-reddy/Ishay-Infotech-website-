import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import IshaySVGLogo from "../components/ui/ishay-svg-logo";

export default function TermsOfService() {
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
        <h1 className="text-4xl md:text-5xl font-black mb-8 text-slate-900 dark:text-white tracking-tight">Terms of Service</h1>
        <p className="text-slate-500 mb-12 font-medium">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed font-medium space-y-6">
          <p>
            Welcome to iSHAY Infotech! These Terms of Service outline the rules and regulations for the use of our Website and consultation services.
            By accessing this website, we assume you accept these terms in full.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">1. Intellectual Property</h2>
          <p>
            Unless otherwise stated, iSHAY Infotech and/or its licensors own the intellectual property rights for all material on our Website, inclusive of text, graphics, logos, images, and software. Your access does not grant rights to republish, sell, reproduce, or modify this content without express permission.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">2. Service Usage & Constraints</h2>
          <p>
            While using our website, you agree not to:
            <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-600 dark:text-slate-400">
              <li>Use the website in any way that is or may be damaging to the website or its security.</li>
              <li>Engage in any data mining, data harvesting, or data extracting relative to this website.</li>
              <li>Provide false, misleading, or fraudulent information on inquiries and contact forms.</li>
            </ul>
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">3. IT Consulting & Contractual Engagements</h2>
          <p>
            The information provided on this site represents our capabilities but does not form a legally binding contract for service. Any service deliverables, including talent acquisition timelines, cybersecurity tasks, or software completions, require a separate Statement of Work (SOW) or Master Services Agreement (MSA) signed by both parties.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">4. Limitation of Liability</h2>
          <p>
            In no event shall iSHAY Infotech, nor any of its officers, directors, and employees, be held liable for any damages arising out of or in any way connected with your use of this Website. We shall not be liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this material.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">5. Revisions and Errata</h2>
          <p>
            The materials appearing on this website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are entirely accurate, complete, or current. We may make changes to the materials contained on the site at any time without notice.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">6. Contact Information</h2>
          <p>
            If you have any queries regarding any of our terms, please drop us an email via <strong className="text-slate-800 dark:text-slate-200">info@ishayinfotech.com</strong>.
          </p>
        </div>
      </main>
    </div>
  );
}