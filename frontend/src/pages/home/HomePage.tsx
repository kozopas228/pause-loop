import React from 'react';
import Header from '@/components/header/Header.tsx';
import Page from '@/components/page/Page.tsx';
import BodyBackground from '@/components/body-background/BodyBackground.tsx';

const HomePage = () => {
    return (
        <Page>
            <h1 className={'text-8xl font-extrabold'}>Home</h1>
            <BodyBackground className={'bg-background'} />
        </Page>
    );
};

export default HomePage;
