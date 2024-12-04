import React, { useState, useRef } from 'react';
import { Pause, Play, Square } from 'lucide-react';
import {
    VISION_TIMER_DURATION,
    VISION_TIMER_REPEAT_ALARM_INTERVAL,
    VISION_TIMER_REPEAT_INTERVAL_STOP_AFTER,
    VISION_TIMER_REST_DURATION,
} from '@/utils/constants.ts';
import TimerAlarmSound from '@/assets/timer-alarm.mp3';
import Countdown, {
    CountdownRenderProps,
    CountdownTimeDelta,
} from 'react-countdown';

enum TimerPhaseEnum {
    WORKING = 'Working',
    RESTING = 'Resting',
}

const size = 300;
const radius = 18; // Радіус основного кола
const strokeWidth = 1; // Товщина лінії

/*  Це скоригований радіус кола, який враховує товщину обводки (strokeWidth).
Він потрібен для правильного розташування обводки в межах видимого кола.
У SVG, коли ви додаєте обводку (strokeWidth), її частина виходить за межі визначеного радіуса.
Щоб малювати обводку всередині видимої області, потрібно зменшити радіус на половину товщини обводки. */
const normalizedRadius = radius - strokeWidth / 2;

/* Це довжина кола, яка використовується для розрахунку, наскільки частину кола потрібно зафарбувати,
щоб показати прогрес. */
const circumference = 2 * Math.PI * normalizedRadius;

const VisionTimer = () => {
    const [phase, setPhase] = useState<TimerPhaseEnum>(TimerPhaseEnum.WORKING);

    const currentPhaseFullDurationMs =
        phase === TimerPhaseEnum.WORKING
            ? VISION_TIMER_DURATION * 1000
            : VISION_TIMER_REST_DURATION * 1000;

    const [timeLeftMs, setTimeLeftMs] = useState(currentPhaseFullDurationMs);
    const percentage = (timeLeftMs / currentPhaseFullDurationMs) * 100;

    const audioRef = useRef<any>(null);
    const constantAudioIntervalRef = useRef<any>(null);
    const constantAudioTimeoutRef = useRef<any>(null);

    const [startTime, setStartTime] = useState(Date.now());

    function handleOnTick(props: CountdownTimeDelta) {
        setTimeLeftMs(props.total);
    }

    function handleOnComplete() {
        setPhase((prevPhase) =>
            prevPhase === TimerPhaseEnum.WORKING
                ? TimerPhaseEnum.RESTING
                : TimerPhaseEnum.WORKING
        );

        setStartTime(Date.now());

        setTimeLeftMs(
            phase === TimerPhaseEnum.WORKING
                ? VISION_TIMER_REST_DURATION * 1000
                : VISION_TIMER_DURATION * 1000
        );

        audioRef.current?.play();

        constantAudioIntervalRef.current = setInterval(() => {
            audioRef.current.play();
        }, VISION_TIMER_REPEAT_ALARM_INTERVAL);

        constantAudioTimeoutRef.current = setTimeout(() => {
            clearInterval(constantAudioIntervalRef.current);
        }, VISION_TIMER_REPEAT_INTERVAL_STOP_AFTER);
    }

    const renderer = (props: CountdownRenderProps): any => {
        function handleStart() {
            props.api.start();
            clearInterval(constantAudioIntervalRef.current);
            if (!props.api.isPaused()) {
                setStartTime(Date.now());
            }

            clearInterval(constantAudioIntervalRef.current);
            clearTimeout(constantAudioTimeoutRef.current);
        }

        function handlePause() {
            props.api.pause();
        }

        function handleStop() {
            props.api.stop();
            setTimeLeftMs(VISION_TIMER_DURATION * 1000);
            setStartTime(Date.now());
            setPhase(TimerPhaseEnum.WORKING);
            clearInterval(constantAudioIntervalRef.current);
            clearTimeout(constantAudioTimeoutRef.current);
        }

        return (
            <div className='absolute inset-0 flex flex-col items-center justify-center'>
                <p className='mt-4 h-12 px-10 text-center font-semibold text-emerald-900 dark:text-emerald-50'>
                    {phase === TimerPhaseEnum.WORKING
                        ? 'Working time'
                        : 'Look into the distance'}
                </p>
                <div className='mt-1 text-3xl font-extrabold tracking-tight text-emerald-900 dark:text-emerald-50 lg:text-4xl'>
                    {props.formatted.minutes}:{props.formatted.seconds}
                </div>
                <div className='mt-8 flex w-16 justify-between'>
                    {!props.api.isStarted() ? (
                        <>
                            <Play
                                width={30}
                                height={30}
                                onClick={handleStart}
                                className='cursor-pointer stroke-emerald-900 opacity-50 hover:opacity-100 dark:stroke-emerald-50'
                            />
                            <Square
                                width={30}
                                height={30}
                                onClick={handleStop}
                                className='cursor-pointer stroke-emerald-900 opacity-50 hover:opacity-100 dark:stroke-emerald-50'
                            />
                        </>
                    ) : (
                        <>
                            <Pause
                                width={30}
                                height={30}
                                onClick={handlePause}
                                className='cursor-pointer stroke-emerald-900 opacity-50 hover:opacity-100 dark:stroke-emerald-50'
                            />
                            <Square
                                width={30}
                                height={30}
                                onClick={handleStop}
                                className='cursor-pointer stroke-emerald-900 opacity-50 hover:opacity-100 dark:stroke-emerald-50'
                            />
                        </>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className='mt-4 flex flex-col items-center'>
            <div
                className='relative'
                style={{ width: size, height: size }}>
                <svg
                    className='h-full w-full -rotate-90 transform'
                    viewBox={`0 0 ${radius * 2} ${radius * 2}`} // Масштабне вікно
                >
                    {/* Фонова лінія */}
                    <circle
                        cx={radius}
                        cy={radius}
                        r={normalizedRadius}
                        strokeWidth={strokeWidth}
                        fill='none'
                        className='stroke-emerald-900 dark:stroke-emerald-50'
                    />
                    {/* Прогрес */}
                    <circle
                        cx={radius}
                        cy={radius}
                        r={normalizedRadius}
                        strokeWidth={strokeWidth}
                        fill='none'
                        strokeDasharray={circumference}
                        strokeDashoffset={
                            (circumference * (100 - percentage)) / 100
                        }
                        className={`${
                            phase === TimerPhaseEnum.WORKING
                                ? 'stroke-emerald-500'
                                : 'stroke-blue-500'
                        }`}
                    />
                </svg>
                <Countdown
                    date={startTime + currentPhaseFullDurationMs + 10} // 10 додається через баг, тому що інколи відображається на 1 менше потрібного
                    renderer={renderer}
                    intervalDelay={10}
                    precision={3}
                    autoStart={false}
                    onTick={handleOnTick}
                    onComplete={handleOnComplete}
                />
            </div>
            <audio
                controls
                src={TimerAlarmSound}
                ref={audioRef}
                className='hidden'
            />
        </div>
    );
};

export default VisionTimer;
