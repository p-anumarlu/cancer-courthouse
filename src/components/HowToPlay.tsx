import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";

interface HowToPlayProps {
  onContinue: () => void;
}

const HowToPlay = ({ onContinue }: HowToPlayProps) => {
  const steps = [
    { num: "1", text: "Read each case, a real LA courtroom story about cancer justice." },
    { num: "2", text: "Examine the evidence. Flip cards to understand who's harmed and why." },
    { num: "3", text: "Deliver your verdict: Guilty, Not Guilty, or Mixed." },
    { num: "4", text: "See what actually happened and whether you got it right." },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 parchment-texture">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg w-full mx-auto text-center"
      >
        <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
          <BookOpen className="w-7 h-7 text-accent" />
        </div>

        <h2 className="text-3xl font-display font-bold text-primary mb-2">How This Works</h2>
        <p className="text-muted-foreground font-body mb-8">4 cases. ~3 minutes. Your verdicts matter.</p>

        <div className="space-y-4 mb-10 text-left">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.4 }}
              className="flex items-start gap-4 p-4 bg-card rounded-lg border border-border"
            >
              <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-display font-bold text-sm flex items-center justify-center shrink-0">
                {step.num}
              </span>
              <p className="font-body text-foreground pt-1">{step.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          onClick={onContinue}
          className="px-8 py-3.5 bg-primary text-primary-foreground font-display font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background inline-flex items-center gap-2"
        >
          First Case
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default HowToPlay;
