import React, {
    Dispatch,
    ReactNode,
    SetStateAction,
    useRef,
    useState,
} from 'react';
import Countdown, { CountdownRenderProps } from 'react-countdown';
import { Pause, Play, Square } from 'lucide-react';
import {
    POMODORO_FOCUS_DURATION,
    POMODORO_LONG_BREAK_DURATION,
    POMODORO_SHORT_BREAK_DURATION,
} from '@/utils/constants.ts';
import TimerAlarmSound from '@/assets/audio/vision-timer-alarm.mp3';
import { PomodoroPhaseEnum } from '@/pages/pomodoro/pomodoro-phase.enum.ts';

interface IProps {
    phase: PomodoroPhaseEnum;
    setPhase: Dispatch<SetStateAction<PomodoroPhaseEnum>>;
    pomodoroCount: number;
    setPomodoroCount: Dispatch<SetStateAction<number>>;
}

const PomodoroCountdown = ({
    phase,
    setPhase,
    pomodoroCount,
    setPomodoroCount,
}: IProps) => {
    const [startTime, setStartTime] = useState(Date.now());
    const audioRef = useRef<any>(null);

    let currentPhaseFullDurationMs;

    if (phase === PomodoroPhaseEnum.Focus) {
        currentPhaseFullDurationMs = POMODORO_FOCUS_DURATION * 1000;
    } else if (phase === PomodoroPhaseEnum.ShortBreak) {
        currentPhaseFullDurationMs = POMODORO_SHORT_BREAK_DURATION * 1000;
    } else {
        currentPhaseFullDurationMs = POMODORO_LONG_BREAK_DURATION * 1000;
    }

    function handleOnComplete() {
        if (phase === PomodoroPhaseEnum.Focus) {
            if (pomodoroCount === 4) {
                setPhase(PomodoroPhaseEnum.LongBreak);
            } else {
                setPhase(PomodoroPhaseEnum.ShortBreak);
            }
        } else if (phase === PomodoroPhaseEnum.ShortBreak) {
            setPhase(PomodoroPhaseEnum.Focus);
            setPomodoroCount((prev) => prev + 1);
        } else if (phase === PomodoroPhaseEnum.LongBreak) {
            setPhase(PomodoroPhaseEnum.Focus);
            setPomodoroCount(1);
        }

        audioRef.current?.play();

        setStartTime(Date.now());
    }

    function renderer(props: CountdownRenderProps): ReactNode {
        function handleStart() {
            props.api.start();
            if (!props.api.isPaused()) {
                setStartTime(Date.now());
            }
        }

        function handlePause() {
            props.api.pause();
        }

        function handleStop() {
            props.api.stop();
            setStartTime(Date.now());
            setPhase(PomodoroPhaseEnum.Focus);
        }

        return (
            <>
                <div className='mt-16 flex justify-center text-8xl font-extrabold text-amber-700 dark:text-amber-400'>
                    {props.formatted.minutes}:{props.formatted.seconds}
                </div>
                <div className='mx-auto mt-8 flex w-16 justify-between'>
                    {!props.api.isStarted() ? (
                        <>
                            <Play
                                width={30}
                                height={30}
                                onClick={handleStart}
                                className='cursor-pointer stroke-amber-900 dark:stroke-amber-500 opacity-15 hover:opacity-100 dark:stroke-amber-50'
                            />
                            <Square
                                width={30}
                                height={30}
                                onClick={handleStop}
                                className='cursor-pointer stroke-amber-900 dark:stroke-amber-500 opacity-15 hover:opacity-100 dark:stroke-amber-50'
                            />
                        </>
                    ) : (
                        <>
                            <Pause
                                width={30}
                                height={30}
                                onClick={handlePause}
                                className='cursor-pointer stroke-amber-900 opacity-15 hover:opacity-100 dark:stroke-amber-50'
                            />
                            <Square
                                width={30}
                                height={30}
                                onClick={handleStop}
                                className='cursor-pointer stroke-amber-900 opacity-15 hover:opacity-100 dark:stroke-amber-50'
                            />
                        </>
                    )}
                </div>
            </>
        );
    }

    return (
        <>
            <Countdown
                date={startTime + currentPhaseFullDurationMs + 10} // 10 додається через баг, тому що інколи відображається на 1 менше потрібного
                renderer={renderer}
                intervalDelay={10}
                precision={3}
                autoStart={false}
                onComplete={handleOnComplete}
            />
            <audio
                controls
                src={TimerAlarmSound}
                ref={audioRef}
                className='hidden'
            />
        </>
    );
};

export default PomodoroCountdown;
