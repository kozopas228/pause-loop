import React from 'react';
import Header from '@/components/header/Header.tsx';
import Page from '@/components/page/Page.tsx';
import BodyBackground from '@/components/body-background/BodyBackground.tsx';

const NoisePage = () => {
    return (
        <Page>
            <h1 className={'text-8xl font-extrabold'}>Brown Noise</h1>
            <BodyBackground className={'bg-fuchsia-900'} />
        </Page>
    );
};

export default NoisePage;
