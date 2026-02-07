import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cases, type VerdictType } from "@/data/cases";
import LandingScreen from "@/components/LandingScreen";
import HowToPlay from "@/components/HowToPlay";
import CaseScreen from "@/components/CaseScreen";
import ResultsScreen from "@/components/ResultsScreen";
import AboutScreen from "@/components/AboutScreen";

type Screen = "landing" | "about" | "howto" | "case" | "results";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("landing");
  const [caseIndex, setCaseIndex] = useState(0);
  const [verdicts, setVerdicts] = useState<Record<number, VerdictType>>({});

  const handleStart = useCallback(() => {
    setScreen("howto");
  }, []);

  const handleAbout = useCallback(() => {
    setScreen("about");
  }, []);

  const handleBackToLanding = useCallback(() => {
    setScreen("landing");
  }, []);

  const handleBeginCases = useCallback(() => {
    setCaseIndex(0);
    setScreen("case");
  }, []);

  const handleVerdictSubmit = useCallback((verdict: VerdictType) => {
    setVerdicts((prev) => ({
      ...prev,
      [cases[caseIndex].id]: verdict,
    }));
  }, [caseIndex]);

  const handleNextCase = useCallback(() => {
    if (caseIndex < cases.length - 1) {
      setCaseIndex((prev) => prev + 1);
    } else {
      setScreen("results");
    }
  }, [caseIndex]);

  const handleReset = useCallback(() => {
    setVerdicts({});
    setCaseIndex(0);
    setScreen("landing");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {screen === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LandingScreen onStart={handleStart} onAbout={handleAbout} />
          </motion.div>
        )}

        {screen === "about" && (
          <motion.div
            key="about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AboutScreen onBack={handleBackToLanding} />
          </motion.div>
        )}

        {screen === "howto" && (
          <motion.div
            key="howto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <HowToPlay onContinue={handleBeginCases} />
          </motion.div>
        )}

        {screen === "case" && (
          <motion.div
            key={`case-${caseIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CaseScreen
              caseData={cases[caseIndex]}
              caseIndex={caseIndex}
              totalCases={cases.length}
              onVerdictSubmit={handleVerdictSubmit}
              onNext={handleNextCase}
              onBack={handleReset}
            />
          </motion.div>
        )}

        {screen === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ResultsScreen verdicts={verdicts} onReset={handleReset} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
