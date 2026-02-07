import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EvidenceCardProps {
  label: string;
  content: string;
  index: number;
}

const EvidenceCard = ({ label, content, index }: EvidenceCardProps) => {
  const [flipped, setFlipped] = useState(false);

  const icons = ["🔍", "📍", "⚖️"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.15, duration: 0.4 }}
      className="perspective-1000"
    >
      <button
        onClick={() => setFlipped(!flipped)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setFlipped(!flipped);
          }
        }}
        className="w-full text-left focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background rounded-lg"
        aria-label={`Evidence: ${label}. ${flipped ? "Click to hide" : "Click to reveal"}`}
      >
        <div className="relative h-40 sm:h-44" style={{ perspective: "1000px" }}>
          <div
            className={`evidence-card-inner absolute inset-0 ${flipped ? "flipped" : ""}`}
          >
            {/* Front */}
            <div className="evidence-card-front absolute inset-0 bg-evidence border-2 border-accent/30 rounded-lg p-4 flex flex-col items-center justify-center gap-3 hover:border-accent/60 transition-colors cursor-pointer shadow-md">
              <span className="text-2xl">{icons[index]}</span>
              <span className="font-display font-semibold text-primary text-center text-sm sm:text-base">
                {label}
              </span>
              <span className="text-xs text-muted-foreground font-body">Tap to reveal</span>
            </div>

            {/* Back */}
            <div className="evidence-card-back absolute inset-0 bg-primary rounded-lg p-3 flex items-center justify-center cursor-pointer shadow-md overflow-hidden">
              <p className="text-primary-foreground font-body text-xs leading-snug text-center">
                {content}
              </p>
            </div>
          </div>
        </div>
      </button>
    </motion.div>
  );
};

export default EvidenceCard;
