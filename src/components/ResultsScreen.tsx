import { motion } from "framer-motion";
import { cases, type VerdictType, verdictResultClasses } from "@/data/cases";
import { Gavel, RotateCcw, Copy, Check, ExternalLink, ShieldAlert, CheckCircle, XCircle } from "lucide-react";
import { useState, useMemo } from "react";

interface ResultsScreenProps {
  verdicts: Record<number, VerdictType>;
  onReset: () => void;
}

const ResultsScreen = ({ verdicts, onReset }: ResultsScreenProps) => {
  const [copied, setCopied] = useState(false);

  const score = useMemo(() => {
    return cases.filter(c => verdicts[c.id] === c.correctVerdict).length;
  }, [verdicts]);

  const topReforms = useMemo(() => {
    const reforms: { text: string; caseTitle: string; priority: number }[] = [];
    cases.forEach((c) => {
      const v = verdicts[c.id];
      const priority = v === "guilty" ? 3 : v === "mixed" ? 2 : 1;
      c.policyLevers.forEach((lever) => {
        reforms.push({ text: lever.text, caseTitle: c.title, priority });
      });
    });
    return reforms.sort((a, b) => b.priority - a.priority).slice(0, 3);
  }, [verdicts]);

  const shareText = useMemo(() => {
    const lines = [
      `🔨 My Jury Summary: Cancer? Illegal! (${score}/${cases.length} correct)\n`,
      ...cases.map((c) => {
        const v = verdicts[c.id];
        const yourLabel = c.verdictOptions.find(o => o.type === v)?.label ?? v;
        const correct = v === c.correctVerdict ? "✅" : "❌";
        return `${correct} Case: "${c.title}" → ${yourLabel}`;
      }),
      "\nTop reforms I support:",
      ...topReforms.map((r, i) => `${i + 1}. ${r.text}`),
      "\nPlayed at: Cancer? Illegal! An interactive courtroom simulation about cancer justice in LA.",
    ];
    return lines.join("\n");
  }, [verdicts, topReforms, score]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = shareText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 sm:py-12 parchment-texture">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ rotate: -30 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="inline-block mb-4"
            >
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto shadow-lg">
                <Gavel className="w-8 h-8 text-accent" />
              </div>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary mb-2">
              Jury Summary
            </h2>
            <p className="text-muted-foreground font-body mb-1">Your verdicts across all 4 cases</p>
            <p className="text-lg font-display font-bold text-accent">
              Score: {score} / {cases.length} correct
            </p>
          </div>

          {/* Verdict summary cards */}
          <div className="space-y-3 mb-8">
            {cases.map((c, i) => {
              const v = verdicts[c.id];
              const isCorrect = v === c.correctVerdict;
              const yourLabel = c.verdictOptions.find(o => o.type === v)?.label ?? v;
              const correctLabel = c.verdictOptions.find(o => o.type === c.correctVerdict)?.label ?? "";
              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                  className={`p-4 rounded-lg border ${verdictResultClasses[v]}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <p className="text-xs font-body text-muted-foreground">{c.subtitle}</p>
                      <p className="font-display font-semibold text-foreground">{c.title}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {isCorrect ? (
                        <CheckCircle className="w-4 h-4 text-verdict-legal" />
                      ) : (
                        <XCircle className="w-4 h-4 text-verdict-illegal" />
                      )}
                      <span className="font-display font-bold text-sm uppercase tracking-wide">
                        {yourLabel}
                      </span>
                    </div>
                  </div>
                  {!isCorrect && (
                    <p className="text-xs font-body text-muted-foreground mt-1">
                      Actual outcome: {correctLabel}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Top 3 reforms */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-card border border-border rounded-lg p-6 mb-8 shadow-sm"
          >
            <h3 className="font-display font-bold text-lg text-primary mb-4">
              ⚖️ Top 3 Reforms (Based on Your Verdicts)
            </h3>
            <ol className="space-y-3">
              {topReforms.map((reform, i) => (
                <li key={i} className="flex items-start gap-3 font-body text-sm text-foreground/80">
                  <span className="w-6 h-6 rounded-full bg-accent text-accent-foreground font-display font-bold text-xs flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span>{reform.text}</span>
                </li>
              ))}
            </ol>
          </motion.div>

          {/* Shareable paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-primary/5 border border-border rounded-lg p-5 mb-8"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-semibold text-sm text-primary">📋 Share Your Results</h3>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs font-body text-accent hover:text-accent/80 transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded px-2 py-1"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <pre className="font-body text-xs text-foreground/70 whitespace-pre-wrap leading-relaxed bg-card p-3 rounded border border-border overflow-x-auto">
              {shareText}
            </pre>
          </motion.div>

          {/* Sources & Disclaimer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="bg-card border border-border rounded-lg p-5 mb-8"
          >
            <h3 className="font-display font-semibold text-sm text-primary mb-3 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" />
              Sources & Disclaimer
            </h3>
            <p className="font-body text-xs text-muted-foreground mb-3">
              <strong>Medical Disclaimer:</strong> This is an educational and advocacy tool. It is not medical advice.
              For personal medical questions, consult a qualified healthcare provider.
            </p>
            <p className="font-body text-xs text-muted-foreground mb-3">
              <strong>External Links:</strong> Links are provided for convenience and informational purposes.
              Their inclusion does not imply endorsement.
            </p>
            <div className="flex flex-wrap gap-2">
              {cases.flatMap(c => c.sources).map((source, i) => (
                <a key={i} href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-body text-accent hover:text-accent/80 underline underline-offset-2">
                  {source.label} <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center"
          >
            <button
              onClick={onReset}
              className="px-6 py-3 bg-secondary text-secondary-foreground font-display font-semibold rounded-lg hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background inline-flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset & Play Again
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsScreen;
