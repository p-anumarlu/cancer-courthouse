import { motion } from "framer-motion";
import { Gavel, Scale, Info, ShieldAlert } from "lucide-react";
import { useState } from "react";

interface LandingScreenProps {
  onStart: () => void;
  onAbout: () => void;
}

const LandingScreen = ({ onStart, onAbout }: LandingScreenProps) => {
  const [showSafety, setShowSafety] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 parchment-texture relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-wood-dark via-accent to-wood-dark" />
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-wood-dark via-accent to-wood-dark" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl mx-auto"
      >
        {/* Gavel icon */}
        <motion.div
          initial={{ rotate: -30 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 120 }}
          className="mb-6 inline-block"
        >
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto shadow-lg">
            <Gavel className="w-10 h-10 text-accent" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-primary leading-tight mb-3"
        >
          Cancer <span className="text-accent italic">Courthouse</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="font-display text-lg sm:text-xl text-wood-medium italic mb-2"
        >
          The People vs. Barriers
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="w-24 h-0.5 bg-accent mx-auto mb-6"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="text-lg text-muted-foreground mb-10 font-body max-w-lg mx-auto"
        >
          Put cancer barriers on trial. You're the jury.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <button
            onClick={onStart}
            className="px-8 py-3.5 bg-primary text-primary-foreground font-display font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background flex items-center gap-2"
          >
            <Scale className="w-5 h-5" />
            Begin Trial
          </button>

          <button
            onClick={onAbout}
            className="px-6 py-3 bg-secondary text-secondary-foreground font-body font-medium rounded-lg hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background flex items-center gap-2"
          >
            <Info className="w-4 h-4" />
            About
          </button>

          <button
            onClick={() => setShowSafety(!showSafety)}
            className="px-6 py-3 text-muted-foreground font-body text-sm rounded-lg hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background flex items-center gap-2"
          >
            <ShieldAlert className="w-4 h-4" />
            Safety Note
          </button>
        </motion.div>

        {showSafety && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 p-4 bg-card rounded-lg border border-border text-sm text-muted-foreground max-w-md mx-auto"
          >
            <p className="font-body">
              <strong className="text-foreground">Safety Note:</strong> This is an educational and advocacy tool only. 
              It is not medical advice. For personal medical questions, please consult a qualified healthcare provider. 
              Content discusses cancer-related topics in a policy context.
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Footer attribution */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 text-center"
      >
        <p className="text-xs text-muted-foreground font-body">
          An interactive simulation for education & advocacy
        </p>
        <p className="text-xs text-muted-foreground/60 font-body mt-1">
          Created by Pranav A. & Suryaa R.
        </p>
      </motion.div>
    </div>
  );
};

export default LandingScreen;
