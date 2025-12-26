import { motion } from "framer-motion";

interface Phase {
  id: string;
  name: string;
  label: string;
}

interface PhaseNavigationProps {
  phases: Phase[];
  activePhase: string;
  onPhaseChange: (phaseId: string) => void;
}

const PhaseNavigation = ({ phases, activePhase, onPhaseChange }: PhaseNavigationProps) => {
  return (
    <motion.nav
      className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="flex flex-col gap-4">
        {phases.map((phase, index) => {
          const isActive = activePhase === phase.id;
          return (
            <button
              key={phase.id}
              onClick={() => onPhaseChange(phase.id)}
              className="group relative flex items-center gap-3"
            >
              {/* Connection line */}
              {index < phases.length - 1 && (
                <div className="absolute left-[7px] top-[18px] w-0.5 h-8 bg-muted-foreground/20" />
              )}

              {/* Dot indicator */}
              <motion.div
                className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  isActive
                    ? "border-tactical-blue bg-tactical-blue shadow-[0_0_15px_hsl(var(--tactical-blue))]"
                    : "border-muted-foreground/50 bg-transparent group-hover:border-tactical-blue/50"
                }`}
                animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
              />

              {/* Label */}
              <span
                className={`font-display text-xs tracking-wider transition-all duration-300 ${
                  isActive
                    ? "text-tactical-blue"
                    : "text-muted-foreground/50 group-hover:text-muted-foreground"
                }`}
              >
                {phase.label}
              </span>

              {/* Active glow */}
              {isActive && (
                <motion.div
                  className="absolute -inset-2 rounded-lg bg-tactical-blue/10"
                  layoutId="phase-active"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default PhaseNavigation;
