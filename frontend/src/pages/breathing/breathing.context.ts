import React, { createContext } from 'react';

interface BreathingContextType {
    breatheInAudioRef: React.RefObject<HTMLAudioElement>;
    breatheOutAudioRef: React.RefObject<HTMLAudioElement>;
    tickAudioRef: React.RefObject<HTMLAudioElement>;
    tickFastAudioRef: React.RefObject<HTMLAudioElement>;
    bellAudioRef: React.RefObject<HTMLAudioElement>;
    alarmAudioRef: React.RefObject<HTMLAudioElement>;
    gongAudioRef: React.RefObject<HTMLAudioElement>;
    meditationAudioRef: React.RefObject<HTMLAudioElement>;
}

export const BreathingContext = createContext<BreathingContextType | null>(
    null
);
