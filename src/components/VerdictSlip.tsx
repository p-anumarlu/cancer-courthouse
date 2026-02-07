import { motion } from "framer-motion";
import { type CaseData, type VerdictType, verdictColorClasses, verdictBgClasses } from "@/data/cases";
import { Check, ExternalLink, CheckCircle, XCircle } from "lucide-react";

interface VerdictSlipProps {
  caseData: CaseData;
  verdict: VerdictType;
  onNext: () => void;
  isLast: boolean;
}

const VerdictSlip = ({ caseData, verdict, onNext, isLast }: VerdictSlipProps) => {
  const isCorrect = verdict === caseData.correctVerdict;
  const correctLabel = caseData.verdictOptions.find(v => v.type === caseData.correctVerdict)?.label ?? "";
  const yourLabel = caseData.verdictOptions.find(v => v.type === verdict)?.label ?? "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto w-full"
    >
      <div className="relative bg-parchment border-2 border-border rounded-lg p-6 sm:p-8 shadow-lg">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />

        <div className="text-center mb-6">
          <p className="text-xs font-body text-muted-foreground uppercase tracking-widest mb-1">
            Verdict Slip: {caseData.subtitle}
          </p>
          <h3 className="font-display font-bold text-xl text-primary mb-3">{caseData.title}</h3>

          {/* Your verdict stamp */}
          <div className={`inline-block px-6 py-2 border-2 rounded font-display font-bold text-lg uppercase tracking-wide animate-stamp ${verdictColorClasses[verdict]}`}>
            {yourLabel}
          </div>

          {/* Correct/incorrect indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4"
          >
            {isCorrect ? (
              <div className="inline-flex items-center gap-2 text-verdict-legal font-display font-semibold text-sm">
                <CheckCircle className="w-5 h-5" />
                Correct! This matches the actual legal outcome.
              </div>
            ) : (
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-verdict-illegal font-display font-semibold text-sm">
                  <XCircle className="w-5 h-5" />
                  Not quite. See what actually happened below.
                </div>
                <p className="text-xs font-body text-muted-foreground">
                  Actual outcome: <strong className="text-foreground">{correctLabel}</strong>
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Explanation */}
        <div className="space-y-4 mb-6">
          <div className={`p-4 rounded-lg ${verdictBgClasses[verdict]}`}>
            <p className="font-body text-sm">
              <strong className="font-semibold text-foreground">What happened:</strong>{" "}
              <span className="text-foreground/80">{caseData.whatHappened}</span>
            </p>
          </div>

          {/* Negative impact */}
          <div className="p-4 bg-card rounded-lg border border-border">
            <p className="font-body text-sm font-semibold text-foreground mb-2">Community impact:</p>
            <ul className="space-y-2">
              {caseData.negativeImpact.map((impact, i) => (
                <li key={i} className="font-body text-sm text-foreground/80 flex items-start gap-2">
                  <span className="text-verdict-illegal shrink-0 mt-0.5">•</span>
                  {impact}
                </li>
              ))}
            </ul>
          </div>

          {/* Policy levers */}
          <div className="p-4 bg-card rounded-lg border border-border">
            <p className="font-body text-sm font-semibold text-foreground mb-2">Policy / system lever:</p>
            <ul className="space-y-2">
              {caseData.policyLevers.map((lever, i) => (
                <li key={i} className="flex items-start gap-2 font-body text-sm text-foreground/80">
                  <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>{lever.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What you can do */}
          <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
            <p className="font-body text-sm">
              <strong className="font-semibold text-accent-foreground">🗳️ What you can do:</strong>{" "}
              <span className="text-foreground/80">{caseData.whatYouCanDo}</span>
            </p>
          </div>
        </div>

        {/* Sources */}
        <div className="border-t border-border pt-4">
          <p className="text-xs font-body text-muted-foreground uppercase tracking-wider mb-2">Sources</p>
          <div className="flex flex-wrap gap-2">
            {caseData.sources.map((source, i) => (
              <a
                key={i}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-body text-accent hover:text-accent/80 underline underline-offset-2 transition-colors"
              >
                {source.label}
                <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Next button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-center"
      >
        <button
          onClick={onNext}
          className="px-8 py-3 bg-primary text-primary-foreground font-display font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
        >
          {isLast ? "See Jury Summary" : "Next Case"}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default VerdictSlip;
