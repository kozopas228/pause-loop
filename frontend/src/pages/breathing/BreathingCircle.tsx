import React, { useState, useEffect, useRef } from 'react';
import {
    BREATHING_BREATH_DURATION,
    BREATHING_BREATHS_AMOUNT,
    BREATHING_HOLD_BREATH_SMALL_DURATION,
} from '@/utils/constants.ts';

const BreathingCircle = () => {
    const [isBreath, setIsBreath] = useState(false);
    const [step, setStep] = useState(1);

    const breathingIntervalRef = useRef<any>(null);
    const stepsIntervalRef = useRef<any>(null);

    if (step === BREATHING_BREATHS_AMOUNT) {
        clearInterval(breathingIntervalRef.current);
        clearInterval(stepsIntervalRef.current);

        setTimeout(
            () => {
                setIsBreath(false);
            },
            BREATHING_BREATH_DURATION * 1000 +
                BREATHING_HOLD_BREATH_SMALL_DURATION * 1000
        );
    }

    useEffect(() => {
        const breathingTimeout = setTimeout(() => {
            setIsBreath((prev) => !prev);
        }, 0);

        breathingIntervalRef.current = setInterval(
            () => {
                setIsBreath((prev) => !prev);
            },
            BREATHING_BREATH_DURATION * 1000 + 50 // додаткові мілісекунди, щоб була невелика пауза між вдохом і видохом
        );

        stepsIntervalRef.current = setInterval(
            () => {
                setStep((prev) => prev + 1);
            },
            BREATHING_BREATH_DURATION * 2 * 1000 + 100 // додаткові мілісекунди, щоб була невелика пауза між вдохом і видохом
        );

        return () => {
            clearInterval(breathingIntervalRef.current);
            clearInterval(stepsIntervalRef.current);
            clearTimeout(breathingTimeout);
        };
    }, []);

    return (
        <div className='relative mt-16 flex flex-col items-center justify-center'>
            <div
                className={`h-[512px] w-[512px] rounded-full bg-blue-300 ${isBreath ? 'scale-100' : 'scale-50'} transition-transform ${isBreath ? 'ease-out' : 'ease-in'} z-10`}
                style={{
                    transitionDuration: `${BREATHING_BREATH_DURATION * 1000}ms`,
                }}></div>
            <div
                className={`translate absolute top-0 z-0 h-[512px] w-[512px] rounded-full border-[3px] border-blue-200 bg-transparent`}
                style={{
                    transitionDuration: `${BREATHING_BREATH_DURATION * 1000}ms`,
                }}></div>
            <div
                className={`translate absolute top-0 z-20 h-[512px] w-[512px] scale-50 rounded-full border-[64px] border-blue-200 bg-transparent`}
                style={{
                    transitionDuration: `${BREATHING_BREATH_DURATION * 1000}ms`,
                }}></div>
            <p className='mt-6 text-xl font-semibold'>
                {isBreath
                    ? step === BREATHING_BREATHS_AMOUNT
                        ? 'Breathe In & Hold a little'
                        : 'Breathe In'
                    : step === BREATHING_BREATHS_AMOUNT
                      ? 'Breathe Out & Hold'
                      : 'Breathe Out'}
            </p>
            <p className='mt-2 text-sm'>
                {step}/{BREATHING_BREATHS_AMOUNT}
            </p>
        </div>
    );
};

export default BreathingCircle;
