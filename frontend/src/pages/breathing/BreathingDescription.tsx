import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const BreathingDescription = () => {
    const [isShowDescription, setIsShowDescription] = useState(false);
    const handleDescriptionClick = () => {
        setIsShowDescription((prev) => !prev);
    };

    return (
        <>
            <div className='mx-auto my-8 cursor-pointer opacity-50 hover:opacity-100'>
                <p
                    className='flex items-center justify-center text-sm font-medium text-sky-900 dark:text-sky-50'
                    onClick={handleDescriptionClick}>
                    What is this?
                    {isShowDescription ? (
                        <ChevronUp
                            width={25}
                            height={25}
                            className='ml-1 inline-block stroke-sky-900 dark:stroke-sky-50'
                        />
                    ) : (
                        <ChevronDown
                            width={25}
                            height={25}
                            className='ml-1 inline-block stroke-sky-900 dark:stroke-sky-50'
                        />
                    )}
                </p>
            </div>
            {isShowDescription && (
                <div className='mt-4 flex justify-center text-center'>
                    <p className='w-3/4 text-sky-900 dark:text-sky-50'>
                        This breathing method is a technique developed by Wim
                        Hof, also known as "The Iceman," to increase energy,
                        reduce stress, and improve focus. It involves cycles of
                        deep inhalations and exhalations followed by a breath
                        hold. This method helps activate the autonomic nervous
                        system, enhances mental clarity, and strengthens the
                        immune system.
                    </p>
                </div>
            )}
        </>
    );
};

export default BreathingDescription;
