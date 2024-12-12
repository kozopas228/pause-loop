import React, { useState } from 'react';
import Page from '@/components/page/Page.tsx';
import BodyBackground from '@/components/body-background/BodyBackground.tsx';
import BreathingCircle from '@/pages/breathing/BreathingCircle.tsx';

enum BreathingPhaseEnum {
    NotStarted,
    Preparation,
    Breathing,
    BreathHolding,
    InhaleHolding,
    BetweenRoundRelax,
    Finish,
}

const BreathingPage = () => {
    const [phase, setPhase] = useState(BreathingPhaseEnum.NotStarted);

    return (
        <Page>
            <BreathingCircle />
            <BodyBackground className={'bg-sky-50'} />
        </Page>
    );
};

export default BreathingPage;
