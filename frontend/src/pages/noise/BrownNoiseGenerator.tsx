import React, { useEffect, useRef, useState } from 'react';

const BrownNoiseGenerator = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);

    const audioContextRef = useRef<AudioContext | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);
    const noiseBufferRef = useRef<AudioBuffer | null>(null);
    const oscillatorRef = useRef<OscillatorNode | null>(null);

    // Генерація коричневого шуму
    const generateBrownNoise = () => {
        const audioContext = new window.AudioContext();
        audioContextRef.current = audioContext;

        // Створення шумового буфера
        const bufferSize = audioContext.sampleRate * 3; // 3 секунди шуму
        const buffer = audioContext.createBuffer(
            1,
            bufferSize,
            audioContext.sampleRate
        );

        // Заповнення буфера шумом
        const data = buffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
            // Генерація шуму і низькочастотний фільтр для коричневого шуму
            const white = Math.random() * 2 - 1;
            data[i] = (lastOut + 0.02 * white) / 1.02;
            lastOut = data[i];
        }

        noiseBufferRef.current = buffer;
    };

    const startNoise = () => {
        if (audioContextRef.current && noiseBufferRef.current) {
            const audioContext = audioContextRef.current;
            const bufferSource = audioContext.createBufferSource();
            bufferSource.buffer = noiseBufferRef.current;

            const gainNode = audioContext.createGain();
            gainNode.gain.value = volume;

            bufferSource.connect(gainNode);
            gainNode.connect(audioContext.destination);

            bufferSource.loop = true; // Безперервне програвання
            bufferSource.start();

            oscillatorRef.current = bufferSource;
            gainNodeRef.current = gainNode;
        }
    };

    const stopNoise = () => {
        if (oscillatorRef.current) {
            oscillatorRef.current.stop();
            oscillatorRef.current.disconnect();
        }

        if (gainNodeRef.current) {
            gainNodeRef.current.disconnect();
        }
    };

    useEffect(() => {
        generateBrownNoise();
        if (isPlaying) {
            startNoise();
        } else {
            stopNoise();
        }

        return () => {
            if (oscillatorRef.current) {
                oscillatorRef.current.stop();
            }
            if (gainNodeRef.current) {
                gainNodeRef.current.disconnect();
            }
        };
    }, [isPlaying, startNoise, volume]);

    return (
        <div>
            <button onClick={() => setIsPlaying((prev) => !prev)}>
                {isPlaying ? 'Pause' : 'Play'} Brown Noise
            </button>
            <div>
                <label>Volume:</label>
                <input
                    type='range'
                    min='0'
                    max='1'
                    step='0.01'
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                />
            </div>
        </div>
    );
};

export default BrownNoiseGenerator;
