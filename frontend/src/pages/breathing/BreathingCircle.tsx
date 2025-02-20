import React, {
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import {
    BREATHING_BREATH_DURATION,
    BREATHING_BREATHS_AMOUNT,
    BREATHING_HOLD_BREATH_SMALL_DURATION,
} from '@/utils/constants.ts';
import { BreathingPhaseEnum } from '@/pages/breathing/breathing-phase.enum.ts';
import { motion } from 'framer-motion';
import { BreathingContext } from '@/pages/breathing/breathing.context.ts';

interface IProps {
    setPhase: Dispatch<SetStateAction<BreathingPhaseEnum>>;
}

const BreathingCircle = ({ setPhase }: IProps) => {
    const context = useContext(BreathingContext);

    const [isBreath, setIsBreath] = useState(false);
    const [step, setStep] = useState(0);

    const breathingIntervalRef = useRef<any>(null);
    const stepsIntervalRef = useRef<any>(null);

    useEffect(() => {
        if (step > 0) {
            if (isBreath) {
                context?.breatheInAudioRef.current?.play();
            } else {
                context?.breatheOutAudioRef.current?.play();
            }
        }

        if (BREATHING_BREATHS_AMOUNT - step === 1) {
            context?.bellAudioRef.current?.play();
        }

        // take a short pause on one's last breath
        if (step === BREATHING_BREATHS_AMOUNT && isBreath) {
            clearInterval(breathingIntervalRef.current);
            clearInterval(stepsIntervalRef.current);

            new Promise<void>((resolve) => {
                setTimeout(
                    () => {
                        setIsBreath(false);
                        resolve();
                    },
                    BREATHING_BREATH_DURATION * 1000 +
                        BREATHING_HOLD_BREATH_SMALL_DURATION * 1000
                );
            }).then(() => {
                setTimeout(
                    () => {
                        setPhase(BreathingPhaseEnum.BreathHolding);
                    },
                    BREATHING_BREATH_DURATION * 1000 + 500
                );
            });
        }
    }, [
        context?.bellAudioRef,
        context?.breatheInAudioRef,
        context?.breatheOutAudioRef,
        isBreath,
        setPhase,
        step,
    ]);

    useEffect(() => {
        const breathingTimeout = setTimeout(() => {
            setIsBreath((prev) => !prev);
            setStep((prev) => prev + 1);
        }, 0);

        breathingIntervalRef.current = setInterval(
            () => {
                setIsBreath((prev) => !prev);
            },
            BREATHING_BREATH_DURATION * 1000 + 50 // extra milliseconds to allow for a slight pause between inhalation and exhalation
        );

        stepsIntervalRef.current = setInterval(
            () => {
                setStep((prev) => prev + 1);
            },
            BREATHING_BREATH_DURATION * 2 * 1000 + 100 // extra milliseconds to allow for a slight pause between inhalation and exhalation
        );

        return () => {
            clearInterval(breathingIntervalRef.current);
            clearInterval(stepsIntervalRef.current);
            clearTimeout(breathingTimeout);
        };
    }, []);

    return (
        <motion.div
            className='relative mt-8 flex flex-col items-center justify-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            <div
                className={`h-[256px] w-[256px] rounded-full bg-blue-300 dark:bg-sky-700 md:h-[384px] md:w-[384px] ${isBreath ? 'scale-100' : 'scale-50'} transition-transform ${isBreath ? 'ease-out' : 'ease-in'} z-10`}
                style={{
                    transitionDuration: `${BREATHING_BREATH_DURATION * 1000}ms`,
                }}></div>
            <div
                className={`translate absolute top-0 z-0 h-[256px] w-[256px] rounded-full border-[3px] border-blue-200 bg-transparent dark:border-blue-300 md:h-[384px] md:w-[384px]`}
                style={{
                    transitionDuration: `${BREATHING_BREATH_DURATION * 1000}ms`,
                }}></div>
            <div
                className={`translate absolute top-0 z-20 h-[256px] w-[256px] scale-50 rounded-full border-[64px] border-blue-200 bg-transparent md:h-[384px] md:w-[384px]`}
                style={{
                    transitionDuration: `${BREATHING_BREATH_DURATION * 1000}ms`,
                }}></div>
            <p className='mt-6 text-xl font-semibold text-sky-950 dark:text-sky-50'>
                {isBreath
                    ? step === BREATHING_BREATHS_AMOUNT
                        ? 'Breathe In & Hold a little'
                        : 'Breathe In'
                    : step === BREATHING_BREATHS_AMOUNT
                      ? 'Breathe Out & Hold'
                      : 'Breathe Out'}
            </p>
            <p className='mt-2 text-sm text-sky-900 dark:text-sky-50'>
                {step}/{BREATHING_BREATHS_AMOUNT}
            </p>
        </motion.div>
    );
};

export default BreathingCircle;
