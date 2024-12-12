import React, { useRef, useState } from 'react';
import Page from '@/components/page/Page.tsx';
import BodyBackground from '@/components/body-background/BodyBackground.tsx';
import { BreathingPhaseEnum } from '@/pages/breathing/breathing-phase.enum.ts';
import { Play } from 'lucide-react';
import PreparationCountdown from '@/pages/breathing/PreparationCountdown.tsx';
import BreathingCircle from '@/pages/breathing/BreathingCircle.tsx';
import BreathingStartButton from '@/pages/breathing/BreathingStartButton.tsx';
import BreathHoldingCountdown from '@/pages/breathing/BreathHoldingCountdown.tsx';
import InhaleHoldingCountdown from '@/pages/breathing/InhaleHoldingCountdown.tsx';
import BetweenRoundCountdown from '@/pages/breathing/BetweenRoundCountdown.tsx';
import BreathingFinish from '@/pages/breathing/BreathingFinish.tsx';
import BreatheInSound from '@/assets/inhale.mp3';
import BreatheOutSound from '@/assets/exhale.mp3';
import TickSound from '@/assets/tick.mp3';
import BellSound from '@/assets/bell.mp3';
import TickFastSound from '@/assets/tick-fast.mp3';
import AlarmSound from '@/assets/alarm-clock.mp3';
import GongSound from '@/assets/gong.mp3';

const BreathingPage = () => {
    const [phase, setPhase] = useState(BreathingPhaseEnum.NotStarted);
    const [round, setRound] = useState(1);

    const breatheInAudioRef = useRef<any>(null);
    const breatheOutAudioRef = useRef<any>(null);
    const tickAudioRef = useRef<any>(null);
    const tickFastAudioRef = useRef<any>(null);
    const bellAudioRef = useRef<any>(null);
    const alarmAudioRef = useRef<any>(null);
    const gongAudioRef = useRef<any>(null);

    return (
        <Page>
            <h1 className='text-center text-sm text-sky-900 dark:text-sky-50'>
                Round: <b>{round}</b>
            </h1>

            {phase === BreathingPhaseEnum.NotStarted ? (
                <BreathingStartButton setPhase={setPhase} />
            ) : phase === BreathingPhaseEnum.Preparation ? (
                <PreparationCountdown
                    setPhase={setPhase}
                    gongAudioRef={gongAudioRef}
                />
            ) : phase === BreathingPhaseEnum.Breathing ? (
                <BreathingCircle
                    setPhase={setPhase}
                    breatheInAudioRef={breatheInAudioRef}
                    breatheOutAudioRef={breatheOutAudioRef}
                    bellAudioRef={bellAudioRef}
                />
            ) : phase === BreathingPhaseEnum.BreathHolding ? (
                <BreathHoldingCountdown
                    setPhase={setPhase}
                    round={round}
                    breatheInAudioRef={breatheInAudioRef}
                    tickAudioRef={tickAudioRef}
                    tickFastAudioRef={tickFastAudioRef}
                    alarmAudioRef={alarmAudioRef}
                    bellAudioRef={bellAudioRef}
                />
            ) : phase === BreathingPhaseEnum.InhaleHolding ? (
                <InhaleHoldingCountdown
                    setPhase={setPhase}
                    round={round}
                    breatheOutAudioRef={breatheOutAudioRef}
                />
            ) : phase === BreathingPhaseEnum.BetweenRoundRelax ? (
                <BetweenRoundCountdown
                    setPhase={setPhase}
                    setRound={setRound}
                    gongAudioRef={gongAudioRef}
                />
            ) : (
                <BreathingFinish
                    setPhase={setPhase}
                    setRound={setRound}
                />
            )}

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
            />
            <audio
                controls
                src={TickFastSound}
                ref={tickFastAudioRef}
                className='hidden'
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

            <BodyBackground className={'bg-sky-50 dark:bg-sky-950'} />
        </Page>
    );
};

export default BreathingPage;
