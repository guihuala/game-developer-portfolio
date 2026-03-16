import { useCallback, useRef, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';

export const useSoundEffects = () => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const { audioEnabled } = useSettings();

  // Initialize audio context only on first interaction to comply with browser autoplay policies
  useEffect(() => {
    const initAudio = () => {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };
    
    window.addEventListener('click', initAudio, { once: true });
    window.addEventListener('keydown', initAudio, { once: true });
    
    return () => {
      window.removeEventListener('click', initAudio);
      window.removeEventListener('keydown', initAudio);
    };
  }, []);

  const playTone = useCallback((freq: number, type: OscillatorType, duration: number, vol: number = 0.1) => {
    if (!audioEnabled) return;
    
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gainNode.gain.setValueAtTime(vol, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  }, [audioEnabled]);

  const playHover = useCallback(() => {
    playTone(600, 'sine', 0.05, 0.02);
  }, [playTone]);

  const playClick = useCallback(() => {
    playTone(400, 'square', 0.1, 0.05);
    setTimeout(() => playTone(800, 'sine', 0.1, 0.05), 50);
  }, [playTone]);

  const playSuccess = useCallback(() => {
    playTone(523.25, 'sine', 0.1, 0.1); // C5
    setTimeout(() => playTone(659.25, 'sine', 0.1, 0.1), 100); // E5
    setTimeout(() => playTone(783.99, 'sine', 0.3, 0.1), 200); // G5
  }, [playTone]);

  return { playHover, playClick, playSuccess };
};
