import React from 'react';
import Header from '@/components/header/Header.tsx';
import Page from '@/components/page/Page.tsx';
import BodyBackground from '@/components/body-background/BodyBackground.tsx';

const BreathingPage = () => {
    return (
        <Page>
            <h1 className={'text-8xl font-extrabold'}>Breathing</h1>
            <BodyBackground className={'bg-sky-500'} />
        </Page>
    );
};

export default BreathingPage;
