import React, { useContext, useEffect, useRef, useState } from 'react';
import Page from '@/components/page/Page.tsx';
import BodyBackground from '@/components/body-background/BodyBackground.tsx';
import { BreathingPhaseEnum } from '@/pages/breathing/breathing-phase.enum.ts';
import PreparationCountdown from '@/pages/breathing/PreparationCountdown.tsx';
import BreathingCircle from '@/pages/breathing/BreathingCircle.tsx';
import BreathingStartButton from '@/pages/breathing/BreathingStartButton.tsx';
import BreathHoldingCountdown from '@/pages/breathing/BreathHoldingCountdown.tsx';
import InhaleHoldingCountdown from '@/pages/breathing/InhaleHoldingCountdown.tsx';
import BetweenRoundCountdown from '@/pages/breathing/BetweenRoundCountdown.tsx';
import BreathingFinish from '@/pages/breathing/BreathingFinish.tsx';
import BreatheInSound from '@/assets/audio/inhale.mp3';
import BreatheOutSound from '@/assets/audio/exhale.mp3';
import TickSound from '@/assets/audio/ticking.mp3';
import BellSound from '@/assets/audio/bell.mp3';
import TickFastSound from '@/assets/audio/ticking-fast.mp3';
import AlarmSound from '@/assets/audio/alarm-clock.mp3';
// import GongSound from '@/assets/audio/gong.mp3';
import GongSound from '@/assets/audio/singind-bowl.mp3';
import MeditationSound from '@/assets/audio/meditation.mp3';
import { BreathingContext } from '@/pages/breathing/breathing.context.ts';
import BreathingDescription from '@/pages/breathing/BreathingDescription.tsx';

const BreathingPage = () => {
    const context = useContext(BreathingContext);

    const [phase, setPhase] = useState(BreathingPhaseEnum.NotStarted);
    const [round, setRound] = useState(1);

    const breatheInAudioRef = useRef<HTMLAudioElement>(null);
    const breatheOutAudioRef = useRef<HTMLAudioElement>(null);
    const tickAudioRef = useRef<HTMLAudioElement>(null);
    const tickFastAudioRef = useRef<HTMLAudioElement>(null);
    const bellAudioRef = useRef<HTMLAudioElement>(null);
    const alarmAudioRef = useRef<HTMLAudioElement>(null);
    const gongAudioRef = useRef<HTMLAudioElement>(null);
    const meditationAudioRef = useRef<HTMLAudioElement>(null);

    return (
        <BreathingContext.Provider
            value={{
                breatheInAudioRef,
                breatheOutAudioRef,
                tickAudioRef,
                tickFastAudioRef,
                bellAudioRef,
                alarmAudioRef,
                gongAudioRef,
                meditationAudioRef,
            }}>
            <Page>
                <h1 className='text-center text-sm text-sky-900 dark:text-sky-50'>
                    Round: <b>{round}</b>
                </h1>

                {phase === BreathingPhaseEnum.NotStarted ? (
                    <BreathingStartButton setPhase={setPhase} />
                ) : phase === BreathingPhaseEnum.Preparation ? (
                    <PreparationCountdown setPhase={setPhase} />
                ) : phase === BreathingPhaseEnum.Breathing ? (
                    <BreathingCircle setPhase={setPhase} />
                ) : phase === BreathingPhaseEnum.BreathHolding ? (
                    <BreathHoldingCountdown
                        setPhase={setPhase}
                        round={round}
                    />
                ) : phase === BreathingPhaseEnum.InhaleHolding ? (
                    <InhaleHoldingCountdown
                        setPhase={setPhase}
                        round={round}
                    />
                ) : phase === BreathingPhaseEnum.BetweenRoundRelax ? (
                    <BetweenRoundCountdown
                        setPhase={setPhase}
                        setRound={setRound}
                    />
                ) : (
                    <BreathingFinish
                        setPhase={setPhase}
                        setRound={setRound}
                    />
                )}

                <BreathingDescription />

                <audio
                    controls
                    src={BreatheInSound}
                    ref={breatheInAudioRef}
                    className='hidden'
                />
                <audio
                    controls
                    src={BreatheOutSound}
                    ref={breatheOutAudioRef}
                    className='hidden'
                />
                <audio
                    controls
                    src={TickSound}
                    ref={tickAudioRef}
                    className='hidden'
                    loop={true}
                />
                <audio
                    controls
                    src={TickFastSound}
                    ref={tickFastAudioRef}
                    className='hidden'
                    loop={true}
                />
                <audio
                    controls
                    src={BellSound}
                    ref={bellAudioRef}
                    className='hidden'
                />
                <audio
                    controls
                    src={AlarmSound}
                    ref={alarmAudioRef}
                    className='hidden'
                />
                <audio
                    controls
                    src={GongSound}
                    ref={gongAudioRef}
                    className='hidden'
                />
                <audio
                    controls
                    src={MeditationSound}
                    ref={meditationAudioRef}
                    className='hidden'
                    loop={true}
                />

                <BodyBackground className={'bg-sky-50 dark:bg-sky-950'} />
            </Page>
        </BreathingContext.Provider>
    );
};

export default BreathingPage;
