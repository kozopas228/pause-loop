/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';

interface IProps {
    isPlaying: boolean;
    volume: number;
}

const BrownNoiseGenerator = ({ isPlaying, volume }: IProps) => {
    const audioContextRef = useRef<AudioContext | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);
    const noiseBufferRef = useRef<AudioBuffer | null>(null);
    const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);

    const generateBrownNoiseBuffer = useCallback(() => {
        const audioContext = new window.AudioContext();
        audioContextRef.current = audioContext;

        // Creating a buffer for brown noise
        const bufferSize = audioContext.sampleRate * 5; // 5 seconds of noise
        const buffer = audioContext.createBuffer(
            1,
            bufferSize,
            audioContext.sampleRate
        );
        const data = buffer.getChannelData(0);
        let lastOut = 0.0;

        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1; // White noise
            data[i] = (lastOut + 0.002 * white) / 1.002;
            lastOut = data[i];
            data[i] = Math.max(-1, Math.min(1, data[i])); // Limit values to within [-1.0, 1.0]
        }

        noiseBufferRef.current = buffer;

        // Creating a GainNode to adjust volume
        gainNodeRef.current = audioContext.createGain();
        gainNodeRef.current.gain.setValueAtTime(
            volume,
            audioContext.currentTime
        );
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

        // Low pass filter
        const biquadFilter = audioContext.createBiquadFilter();
        biquadFilter.type = 'lowpass';
        biquadFilter.frequency.setValueAtTime(265, audioContext.currentTime);
        biquadFilter.Q.setValueAtTime(0.8, audioContext.currentTime);

        // Connecting nodes
        noiseSource.connect(biquadFilter);
        biquadFilter.connect(gainNodeRef.current);

        // Initial volume level 0
        gainNodeRef.current.gain.setValueAtTime(0, audioContext.currentTime);

        // Smoothly increase the volume to the specified level (volume) within 1 second
        gainNodeRef.current.gain.linearRampToValueAtTime(
            volume,
            audioContext.currentTime + 1
        );

        noiseSource.start();
        noiseSourceRef.current = noiseSource;
    };

    const stopNoise = () => {
        if (noiseSourceRef.current && gainNodeRef.current) {
            const audioContext = audioContextRef.current;
            const gainNode = gainNodeRef.current;

            // Smoothly decrease the volume to 0 in 1 second
            gainNode.gain.linearRampToValueAtTime(
                0,
                audioContext!.currentTime + 1
            );

            // Stop the sound source after the volume reduction is complete
            setTimeout(() => {
                if (noiseSourceRef.current) {
                    noiseSourceRef.current.stop();
                    noiseSourceRef.current.disconnect();
                    noiseSourceRef.current = null;
                }
            }, 1000);
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
