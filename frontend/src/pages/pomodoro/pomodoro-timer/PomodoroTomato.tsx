import React from 'react';
import TomatoIcon from '@/assets/tomato-icon.svg?react';

interface IProps {
    isFilled: boolean;
}

const PomodoroTomato = ({ isFilled }: IProps) => {
    return (
        <TomatoIcon
            className={`fill-amber-700 stroke-amber-700 stroke-[4px] ${isFilled ? 'opacity-100' : 'opacity-15'}`}
            width={30}
            height={30}
        />
    );
};

export default PomodoroTomato;
