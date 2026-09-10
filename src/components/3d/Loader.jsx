import { useProgress } from '@react-three/drei';
import { useEffect, useState } from 'react';

export default function Loader({ onFinished }) {
  const { progress, active } = useProgress();
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setCompleted(true);
        if (onFinished) onFinished();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [progress, onFinished]);

  if (completed) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07070a] transition-opacity duration-700 ease-out ${
        progress >= 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center max-w-xs w-full px-6">
        {/* Futuristic Spinner Emblem */}
        <div className="relative w-16 h-16 mb-8 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />
          <div className="absolute inset-0 rounded-full border-2 border-accent-cyan border-t-transparent animate-spin" />
          <span className="font-mono text-xs font-bold text-accent-cyan tracking-wider">
            {Math.round(progress)}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-accent-cyan to-accent-lime transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between w-full text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
          <span>Initializing 3D Engine</span>
          <span>{Math.round(progress)} / 100</span>
        </div>
      </div>
    </div>
  );
}
