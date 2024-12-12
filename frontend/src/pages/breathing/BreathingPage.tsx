import React, { useState } from 'react';
import Page from '@/components/page/Page.tsx';
import BodyBackground from '@/components/body-background/BodyBackground.tsx';
import { BreathingPhaseEnum } from '@/pages/breathing/breathing-phase.enum.ts';
import { Play } from 'lucide-react';
import PreparationCountdown from '@/pages/breathing/PreparationCountdown.tsx';
import BreathingCircle from '@/pages/breathing/BreathingCircle.tsx';
import BreathingStartButton from '@/pages/breathing/BreathingStartButton.tsx';
import BreathHoldingCountdown from '@/pages/breathing/BreathHoldingCountdown.tsx';

const BreathingPage = () => {
    const [phase, setPhase] = useState(BreathingPhaseEnum.NotStarted);
    const [round, setRound] = useState(1);

    return (
        <Page>
            <h1 className='mt-8 text-center text-sm text-sky-900'>
                Round: {round}
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
            ) : (
                <div>None</div>
            )}

            <BodyBackground className={'bg-sky-50'} />
        </Page>
    );
};

export default BreathingPage;
