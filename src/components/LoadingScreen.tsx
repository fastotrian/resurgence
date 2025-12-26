import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import crestLogo from "@/assets/crest-logo.png";

interface LoadingScreenProps {
  onComplete: () => void;
}

const loadingMessages = [
  "INITIATING RESURGENCE PROTOCOL...",
  "SYNCING WITH INNOVATION STUDIO SERVERS...",
  "IDENTIFYING POTENTIAL RECRUITS...",
  "ACCESSING HACKATHON GAUNTLET DATABANKS...",
  "NEURAL LINK ESTABLISHED."
];

const codeSnippets = [
  "const mission = await initResurgence();",
  "if (timeline.status === 'BROKEN') { fix(); }",
  "assembleAvengers({ power: 'maximum' });",
  "hackathon.start({ duration: '24h' });",
  "await syncWithInnovationStudio();",
  "const gauntlet = new InfinityGauntlet();",
  "secureTimeline().then(victory);",
  "export const CREST = { status: 'ACTIVE' };",
];

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => {
        if (prev >= loadingMessages.length - 1) {
          clearInterval(messageInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 700);

    return () => clearInterval(messageInterval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setIsComplete(true);
        setTimeout(onComplete, 500);
      }, 500);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-50 bg-background flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Scrolling code background - left */}
          <div className="absolute left-4 top-0 bottom-0 w-64 overflow-hidden opacity-20 pointer-events-none">
            <motion.div
              className="space-y-2 font-mono text-xs text-crest-green"
              animate={{ y: [0, -500] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              {[...codeSnippets, ...codeSnippets, ...codeSnippets].map((code, i) => (
                <div key={i} className="whitespace-nowrap">{code}</div>
              ))}
            </motion.div>
          </div>

          {/* Scrolling code background - right */}
          <div className="absolute right-4 top-0 bottom-0 w-64 overflow-hidden opacity-20 pointer-events-none">
            <motion.div
              className="space-y-2 font-mono text-xs text-crest-green"
              animate={{ y: [-500, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            >
              {[...codeSnippets, ...codeSnippets, ...codeSnippets].map((code, i) => (
                <div key={i} className="whitespace-nowrap text-right">{code}</div>
              ))}
            </motion.div>
          </div>

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Biometric scanner frame */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 mb-8">
              {/* Scanner border */}
              <div className="absolute inset-0 border-2 border-tactical-blue/50 rounded-lg">
                {/* Corner accents */}
                <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-tactical-blue" />
                <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-tactical-blue" />
                <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-tactical-blue" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-tactical-blue" />
              </div>

              {/* Scanning line */}
              <motion.div
                className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-tactical-blue to-transparent"
                style={{ boxShadow: "0 0 20px hsl(var(--tactical-blue))" }}
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Logo */}
              <motion.img
                src={crestLogo}
                alt="CREST Logo"
                className="absolute inset-4 w-40 h-40 md:w-56 md:h-56 object-contain filter brightness-75 grayscale-[30%]"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-lg"
                style={{
                  background: "radial-gradient(circle, hsl(var(--tactical-blue) / 0.2) 0%, transparent 70%)"
                }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* Loading message */}
            <motion.div
              key={messageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="font-display text-sm md:text-base text-tactical-blue tracking-wider text-center mb-6 h-6"
            >
              {loadingMessages[messageIndex]}
            </motion.div>

            {/* Progress bar */}
            <div className="w-64 md:w-80 h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-tactical-blue to-tactical-green"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Progress percentage */}
            <div className="mt-3 font-mono text-xs text-muted-foreground">
              {progress}% COMPLETE
            </div>
          </div>

          {/* Flash effect on complete */}
          {progress >= 100 && (
            <motion.div
              className="absolute inset-0 bg-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.3, times: [0, 0.5, 1] }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
