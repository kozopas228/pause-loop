import React, { useState } from 'react';
import Page from '@/components/page/Page.tsx';
import BodyBackground from '@/components/body-background/BodyBackground.tsx';
import BrownNoiseBackgroundImage from '@/assets/images/brown-noise-background.jpg';
import BrownNoiseBackgroundImageLight from '@/assets/images/brown-noise-background-light.jpg';
import CustomPlayIcon from '@/assets/vectors/custom-play.svg?react';
import CustomPauseIcon from '@/assets/vectors/custom-pause.svg?react';
import { Slider } from '@/shadcn/components/ui/slider.tsx';
import BrownNoiseGenerator from '@/pages/noise/BrownNoiseGenerator.tsx';
import { ChevronDown, ChevronUp, Volume2 } from 'lucide-react';
import { useTheme } from '@/shadcn/components/theme-provider.tsx';

const NoisePage = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(10); // Початкове значення гучності
    const [isShowDescription, setIsShowDescription] = useState(false);

    function handlePlayPauseClick() {
        setIsPlaying((prev) => !prev);
    }

    const handleDescriptionClick = () => {
        setIsShowDescription((prev) => !prev);
    };

    const theme = useTheme();

    return (
        <Page
            isBlurredHeader={false}
            style={{
                backgroundImage: `${theme.resolvedTheme === 'light' ? `url(${BrownNoiseBackgroundImageLight})` : `url(${BrownNoiseBackgroundImage}), radial-gradient(circle, transparent 60%, rgba(0, 0, 0, 0.5) 100%)`} `,
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                backgroundBlendMode: 'overlay',
            }}>
            <div className='mt-32 flex flex-col items-center md:mt-40'>
                {isPlaying ? (
                    <CustomPauseIcon
                        onClick={handlePlayPauseClick}
                        className='scale-75 transform cursor-pointer fill-black opacity-80 hover:opacity-100 md:scale-100'
                    />
                ) : (
                    <CustomPlayIcon
                        onClick={handlePlayPauseClick}
                        className='scale-75 transform cursor-pointer fill-black opacity-80 hover:opacity-100 md:scale-100'
                    />
                )}

                <div className='mt-2 flex w-1/2 opacity-50 hover:opacity-100 md:mt-6 md:w-1/4'>
                    <Volume2 className='mr-4 h-12 w-12 stroke-foreground md:h-16 md:w-16' />
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

                <div className='w-3/4'>
                    <div className='my-8 cursor-pointer opacity-50 hover:opacity-100'>
                        <p
                            className='flex items-center justify-center text-sm font-medium text-orange-950 dark:text-orange-50'
                            onClick={handleDescriptionClick}>
                            What is this?
                            {isShowDescription ? (
                                <ChevronUp
                                    width={25}
                                    height={25}
                                    className='ml-1 inline-block stroke-orange-950 dark:stroke-orange-50'
                                />
                            ) : (
                                <ChevronDown
                                    width={25}
                                    height={25}
                                    className='ml-1 inline-block stroke-orange-950 dark:stroke-orange-50'
                                />
                            )}
                        </p>
                    </div>
                    {isShowDescription && (
                        <div className='mb-12 mt-4 flex justify-center text-center'>
                            <p className='text-orange-950 dark:text-orange-50'>
                                Brown noise is a type of sound that has low
                                frequencies and a deep, rumbling quality. It
                                sounds like distant thunder or a heavy
                                waterfall. It's often used for relaxation,
                                improving sleep, or as background noise to mask
                                other sounds.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <BrownNoiseGenerator
                isPlaying={isPlaying}
                volume={volume}
            />

            <BodyBackground className={'bg-orange-50 dark:bg-orange-950'} />
        </Page>
    );
};

export default NoisePage;
