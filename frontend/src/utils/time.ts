export function formatTime(time: number): string {
    const minutes = Math.floor(time / 60); // Переведення секунд в хвилини
    const seconds = time % 60; // Залишок секунд після обчислення хвилин
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
