import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowLeft } from "lucide-react";
import { type CaseData, type VerdictType, verdictStyleClasses } from "@/data/cases";
import EvidenceCard from "./EvidenceCard";
import VerdictSlip from "./VerdictSlip";

interface CaseScreenProps {
  caseData: CaseData;
  caseIndex: number;
  totalCases: number;
  onVerdictSubmit: (verdict: VerdictType) => void;
  onNext: () => void;
  onBack: () => void;
}

const CaseScreen = ({ caseData, caseIndex, totalCases, onVerdictSubmit, onNext, onBack }: CaseScreenProps) => {
  const [selectedVerdict, setSelectedVerdict] = useState<VerdictType | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleVerdict = (verdict: VerdictType) => {
    setSelectedVerdict(verdict);
    setSubmitted(true);
    onVerdictSubmit(verdict);
  };

  return (
    <div className="min-h-screen px-4 py-8 sm:py-12 parchment-texture">
      <div className="max-w-2xl mx-auto">
        {/* Back button */}
        <button
          onClick={onBack}
          className="mb-4 flex items-center gap-1.5 text-xs font-body text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded px-2 py-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Home
        </button>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-body text-muted-foreground uppercase tracking-widest">
              Case {caseIndex + 1} of {totalCases}
            </span>
            {caseData.isLocal && (
              <span className="text-xs font-body bg-accent/20 text-accent-foreground px-2 py-1 rounded-full flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {caseData.localTag}
              </span>
            )}
          </div>
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: `${(caseIndex / totalCases) * 100}%` }}
              animate={{ width: `${((caseIndex + 1) / totalCases) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full bg-accent rounded-full"
            />
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="case"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Case header */}
              <div className="mb-6">
                <p className="text-xs font-body text-muted-foreground uppercase tracking-widest mb-1">
                  {caseData.subtitle}
                </p>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-primary">
                  {caseData.title}
                </h2>
              </div>

              {/* Story card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card border border-border rounded-lg p-5 sm:p-6 mb-6 shadow-sm"
              >
                <p className="font-body text-foreground/90 leading-relaxed text-sm sm:text-base">
                  {caseData.story}
                </p>
              </motion.div>

              {/* Evidence cards */}
              <div className="mb-8">
                <h3 className="text-sm font-display font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  📋 Evidence: Tap to Examine
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {caseData.evidence.map((item, i) => (
                    <EvidenceCard key={i} label={item.label} content={item.content} index={i} />
                  ))}
                </div>
              </div>

              {/* Verdict buttons */}
              <div>
                <h3 className="text-sm font-display font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  🔨 Your Verdict
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {caseData.verdictOptions.map((btn) => (
                    <motion.button
                      key={btn.type}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleVerdict(btn.type)}
                      className={`p-4 border-2 rounded-lg font-display font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background ${verdictStyleClasses[btn.type]}`}
                    >
                      <span className="text-xl block mb-1">{btn.emoji}</span>
                      {btn.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="verdict"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <VerdictSlip
                caseData={caseData}
                verdict={selectedVerdict!}
                onNext={onNext}
                isLast={caseIndex === totalCases - 1}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CaseScreen;
