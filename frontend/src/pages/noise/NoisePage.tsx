import React, { useEffect, useRef, useState } from 'react';
import Page from '@/components/page/Page.tsx';
import BodyBackground from '@/components/body-background/BodyBackground.tsx';
import BrownNoiseBackgroundImage from '@/assets/images/brown-noise-background.jpg';
import CustomPlayIcon from '@/assets/vectors/custom-play.svg?react';
import CustomPauseIcon from '@/assets/vectors/custom-pause.svg?react';
import BrownNoise from '@/assets/audio/brown-noise-fast.wav';
// import BrownNoise from '@/assets/audio/brown-noise-fast.mp3';
import { Slider } from '@/shadcn/components/ui/slider.tsx';
import BrownNoiseGenerator from '@/pages/noise/BrownNoiseGenerator.tsx';

const NoisePage = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(10); // Початкове значення гучності

    function handlePlayPauseClick() {
        setIsPlaying((prev) => !prev);
    }

    return (
        <Page
            style={{
                backgroundImage: `url(${BrownNoiseBackgroundImage}), radial-gradient(circle, transparent 60%, rgba(0, 0, 0, 0.5) 100%)`,
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                backgroundBlendMode: 'overlay',
            }}>
            {isPlaying ? (
                <CustomPauseIcon
                    onClick={handlePlayPauseClick}
                    className='absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 transform cursor-pointer opacity-90 hover:opacity-100'
                />
            ) : (
                <CustomPlayIcon
                    onClick={handlePlayPauseClick}
                    className='absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 transform cursor-pointer opacity-90 hover:opacity-100'
                />
            )}

            <div className='absolute left-1/2 top-[60%] w-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 md:w-1/4'>
                <Slider
                    min={0}
                    max={20}
                    step={0.01}
                    onValueChange={(val) => {
                        setVolume(val[0]);
                    }}
                    value={[volume]}
                />
            </div>
            <BrownNoiseGenerator
                isPlaying={isPlaying}
                volume={volume}
            />

            <BodyBackground className={'bg-orange-950'} />
        </Page>
    );
};

export default NoisePage;
