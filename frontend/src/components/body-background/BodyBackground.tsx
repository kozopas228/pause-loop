import React, { useEffect } from 'react';

interface IProps {
    className: string;
}

const BodyBackground = ({ className }: IProps) => {
    useEffect(() => {
        document.body.className = className;
    }, [className]);

    return null;
};

export default BodyBackground;
