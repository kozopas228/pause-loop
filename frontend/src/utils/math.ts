/* Це функція, яка перетворює полярні координати (радіус і кут) у декартові координати (x, y).

Чому це потрібно?
SVG працює з декартовою системою координат, де всі елементи (наприклад, коло, дуга)
позиціонуються за допомогою значень x і y. Але для створення дуг (наприклад, у випадку сектора кола або "Pacman")
ми використовуємо полярні координати, що зручніше, коли маємо справу з кутами та радіусами.

Функція polarToCartesian обчислює кінцеві точки дуги на основі центральної точки, радіусу і кута.
 */

export function polarToCartesian(
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
) {
    const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180.0);

    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
    };
}

/* Ця функція генерує шлях (d) для SVG-елемента <path>, який створює дугу (сектор) у
вигляді "пирога" або "Pacman". Вона використовує функцію polarToCartesian для обчислення координат
початкової та кінцевої точок дуги, а також будує шлях на основі цих точок.

Як це працює:
SVG дозволяє створювати дуги за допомогою команди A (arc) у шляху d. Для цього потрібно:

Знати координати початкової та кінцевої точок дуги.
Вказати радіус дуги.
Задати кут і напрямок (великі/малі дуги та напрямок обертання).

 */
export function describeArc(
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number
) {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    const d = [
        'M',
        x,
        y,
        'L',
        start.x,
        start.y,
        'A',
        radius,
        radius,
        0,
        largeArcFlag,
        0,
        end.x,
        end.y,
        'L',
        x,
        y,
    ].join(' ');

    return d;
}
