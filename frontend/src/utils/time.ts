export function formatTime(time: number): string {
    const minutes = Math.floor(time / 60); // Converting seconds to minutes
    const seconds = time % 60; // Remaining seconds after calculating minutes
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
