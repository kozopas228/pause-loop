import React, { useState, useEffect, useRef } from 'react';
import { formatTime } from '@/utils/time.ts';
import { Pause, Play, Square } from 'lucide-react';
import {
    VISION_TIMER_DURATION,
    VISION_TIMER_REPEAT_ALARM_INTERVAL,
    VISION_TIMER_REPEAT_INTERVAL_STOP_AFTER,
    VISION_TIMER_REST_DURATION,
} from '@/utils/constants.ts';
import TimerAlarmSound from '@/assets/timer-alarm.mp3';

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
    const [isPause, setIsPause] = useState<boolean>(true);

    const currentDurationMs =
        phase === TimerPhaseEnum.WORKING
            ? VISION_TIMER_DURATION * 1000
            : VISION_TIMER_REST_DURATION * 1000;

    const [timeLeftMs, setTimeLeftMs] = useState(currentDurationMs);
    const percentage = (timeLeftMs / currentDurationMs) * 100;

    const audioRef = useRef<any>(null);
    const constantAudioIntervalRef = useRef<any>(null);

    useEffect(() => {
        let timeout: NodeJS.Timeout | null = null;

        if (!isPause) {
            if (timeLeftMs > -1) {
                timeout = setTimeout(() => {
                    setTimeLeftMs((prev) => prev - 10); // Зменшуємо час на 10 мілісекунд
                }, 10);
            } else {
                // Перемикання фази
                setPhase((prevPhase) =>
                    prevPhase === TimerPhaseEnum.WORKING
                        ? TimerPhaseEnum.RESTING
                        : TimerPhaseEnum.WORKING
                );
                setTimeLeftMs(
                    phase === TimerPhaseEnum.WORKING
                        ? VISION_TIMER_REST_DURATION * 1000
                        : VISION_TIMER_DURATION * 1000
                );
                setIsPause(true);

                if (audioRef.current) {
                    audioRef.current.play();

                    constantAudioIntervalRef.current = setInterval(() => {
                        audioRef.current.play();
                    }, VISION_TIMER_REPEAT_ALARM_INTERVAL);

                    setTimeout(() => {
                        clearInterval(constantAudioIntervalRef.current);
                    }, VISION_TIMER_REPEAT_INTERVAL_STOP_AFTER);
                }
            }
        }

        return () => clearTimeout(timeout!); // Очищаємо таймаут при перерендері
    }, [isPause, timeLeftMs, phase]);


    function handleStart() {
        // Якщо ми натискаємо "Start", перезапускаємо таймер і зменшуємо час на 1 секунду
        if (timeLeftMs === currentDurationMs) {
            setTimeLeftMs((prev) => prev - 1);
        }
        setIsPause(false);
        clearInterval(constantAudioIntervalRef.current);
    }

    function handlePause() {
        // Якщо ми натискаємо "Pause", скидаємо таймер і зупиняємо таймаут
        setIsPause(true);
    }

    function handleStop() {
        setIsPause(true);
        setPhase(TimerPhaseEnum.WORKING);
        setTimeLeftMs(VISION_TIMER_DURATION * 1000);
        clearInterval(constantAudioIntervalRef.current);
    }

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
                        className='stroke-emerald-900'
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
                <div className='absolute inset-0 flex flex-col items-center justify-center'>
                    <p className='mt-4 h-12 px-10 text-center font-semibold text-emerald-900'>
                        {phase === TimerPhaseEnum.WORKING
                            ? 'Working time'
                            : 'Look into the distance'}
                    </p>
                    <div className='mt-1 text-3xl font-extrabold tracking-tight text-emerald-900 lg:text-4xl'>
                        {formatTime(Math.floor(timeLeftMs / 1000))}
                    </div>
                    <div className='mt-8 flex w-16 justify-between'>
                        {isPause ? (
                            <>
                                <Play
                                    width={30}
                                    height={30}
                                    onClick={handleStart}
                                    className='cursor-pointer stroke-emerald-900 opacity-50 hover:opacity-100'
                                />
                                <Square
                                    width={30}
                                    height={30}
                                    onClick={handleStop}
                                    className='cursor-pointer stroke-emerald-900 opacity-50 hover:opacity-100'
                                />
                            </>
                        ) : (
                            <>
                                <Pause
                                    width={30}
                                    height={30}
                                    onClick={handlePause}
                                    className='cursor-pointer stroke-emerald-900 opacity-50 hover:opacity-100'
                                />
                                <Square
                                    width={30}
                                    height={30}
                                    onClick={handleStop}
                                    className='cursor-pointer stroke-emerald-900 opacity-50 hover:opacity-100'
                                />
                            </>
                        )}
                    </div>
                </div>
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
