import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, ShieldAlert, BookOpen } from "lucide-react";

interface AboutScreenProps {
  onBack: () => void;
}

const AboutScreen = ({ onBack }: AboutScreenProps) => {
  return (
    <div className="min-h-screen px-4 py-8 sm:py-12 parchment-texture">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={onBack}
            className="mb-6 flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded px-2 py-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to start
          </button>

          <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-6">
            <BookOpen className="w-6 h-6 text-accent" />
          </div>

          <h2 className="text-3xl font-display font-bold text-primary mb-4">About This Project</h2>

          <div className="prose prose-sm max-w-none">
            <div className="bg-card border border-border rounded-lg p-6 mb-6 space-y-4 font-body text-foreground/80 text-sm leading-relaxed">
              <p>
                <strong className="text-foreground font-display">Cancer? Illegal! The People vs. Barriers</strong> is 
                a drop-in courtroom simulation that makes cancer justice understandable and actionable in under four minutes.
              </p>
              <p>
                Cancer justice isn't just about legislation. It's about consent, timely care, workplace protections, 
                and the systems that shape who gets treated fairly. This simulation makes those systems visible.
              </p>
              <p>
                You act as the jury across four real Los Angeles cases: patient consent violations at UCLA, 
                delayed MRI authorizations, workplace discrimination after diagnosis, and retaliation for 
                taking treatment time.
              </p>
              <p>
                After each verdict, you receive a "Verdict Slip" with what actually happened in court, 
                the community impact, concrete reforms, and a "what you can do" action step.
              </p>
              <p>
                Our hope is that after playing, you can explain one barrier clearly and feel empowered 
                to support a specific change, because if these preventable barriers were illegal, 
                we'd redesign the system.
              </p>
            </div>

            {/* Disclaimer */}
            <div className="bg-muted border border-border rounded-lg p-5 mb-6">
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                <div className="font-body text-sm text-muted-foreground space-y-2">
                  <p>
                    <strong className="text-foreground">Medical Disclaimer:</strong> This is an educational and advocacy tool. 
                    It is not medical advice. For personal medical questions, consult a qualified healthcare provider.
                  </p>
                  <p>
                    <strong className="text-foreground">External Links:</strong> Links to external websites are provided 
                    for convenience and informational purposes only. Their inclusion does not imply endorsement.
                  </p>
                </div>
              </div>
            </div>

            {/* Key sources */}
            <div className="bg-card border border-border rounded-lg p-5">
              <h3 className="font-display font-semibold text-primary text-sm mb-3">Key Sources</h3>
              <ul className="space-y-2">
                {[
                  { label: "Justia: Moore v. Regents", url: "https://law.justia.com/cases/california/supreme-court/3d/51/120.html" },
                  { label: "LA Times: Rahm v. Kaiser", url: "https://www.latimes.com/business/la-fi-jury-awards-kaiser-cancer-patient-20150326-story.html" },
                  { label: "LA Times: Beck v. Sybase", url: "https://www.latimes.com/archives/la-xpm-1999-mar-20-mn-19161-story.html" },
                  { label: "Justia: Rubio v. CIA Wheel Group", url: "https://law.justia.com/cases/california/court-of-appeal/2021/b300021.html" },
                ].map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-body text-accent hover:text-accent/80 underline underline-offset-2 transition-colors"
                    >
                      {source.label}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutScreen;
