/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useRef, useState} from 'react';

interface IProps {
    isPlaying: boolean;
    volume: number;
}

const BrownNoiseGenerator = ({ isPlaying, volume }: IProps) => {
    const audioContextRef = useRef<AudioContext | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);
    const noiseBufferRef = useRef<AudioBuffer | null>(null);
    const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);

    // Генерація коричневого шуму
    const generateBrownNoiseBuffer = useCallback(() => {
        const audioContext = new window.AudioContext();
        audioContextRef.current = audioContext;

        // Створення буфера для коричневого шуму
        const bufferSize = audioContext.sampleRate * 5; // 5 секунд шуму
        const buffer = audioContext.createBuffer(
            1,
            bufferSize,
            audioContext.sampleRate
        );
        const data = buffer.getChannelData(0);
        let lastOut = 0.0;

        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1; // Білий шум
            data[i] = (lastOut + 0.002 * white) / 1.002;
            lastOut = data[i];
            data[i] = Math.max(-1, Math.min(1, data[i])); // Обмеження значень у межах [-1.0, 1.0]
        }

        noiseBufferRef.current = buffer;

        // Створення GainNode для регулювання гучності
        gainNodeRef.current = audioContext.createGain();
        gainNodeRef.current.gain.setValueAtTime(
            volume,
            audioContext.currentTime
        ); // Початкова гучність
        gainNodeRef.current.connect(audioContext.destination);
    }, []);

    const startNoise = () => {
        if (
            !audioContextRef.current ||
            !noiseBufferRef.current ||
            !gainNodeRef.current
        ) {
            return;
        }

        const audioContext = audioContextRef.current;
        const noiseSource = audioContext.createBufferSource();
        noiseSource.buffer = noiseBufferRef.current;
        noiseSource.loop = true;

        // Фільтр низьких частот
        const biquadFilter = audioContext.createBiquadFilter();
        biquadFilter.type = 'lowpass';
        biquadFilter.frequency.setValueAtTime(265, audioContext.currentTime);
        biquadFilter.Q.setValueAtTime(0.8, audioContext.currentTime);

        // З'єднання вузлів
        noiseSource.connect(biquadFilter);
        biquadFilter.connect(gainNodeRef.current);

        noiseSource.start();
        noiseSourceRef.current = noiseSource;
    };

    const stopNoise = () => {
        if (noiseSourceRef.current) {
            noiseSourceRef.current.stop();
            noiseSourceRef.current.disconnect();
            noiseSourceRef.current = null;
        }
    };

    useEffect(() => {
        generateBrownNoiseBuffer();

        return () => {
            stopNoise();
            if (gainNodeRef.current) {
                gainNodeRef.current.disconnect();
            }
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, [generateBrownNoiseBuffer]);

    useEffect(() => {
        if (isPlaying) {
            startNoise();
        } else {
            stopNoise();
        }
    }, [isPlaying]);

    useEffect(() => {
        if (gainNodeRef.current) {
            gainNodeRef.current.gain.setValueAtTime(
                volume,
                audioContextRef.current!.currentTime
            );
        }
    }, [volume]);

    return <div></div>;
};

export default BrownNoiseGenerator;
