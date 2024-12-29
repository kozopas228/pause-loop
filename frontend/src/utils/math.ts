/* This is a function that converts polar coordinates (radius and angle) to Cartesian coordinates (x, y).

Why is this needed?
SVG works with a Cartesian coordinate system, where all elements (e.g. circle, arc)
are positioned using x and y values. But to create an arc (e.g. in the case of a sector of a circle or "Pacman")
we use polar coordinates, which is more convenient when dealing with angles and radii.

The polarToCartesian function calculates the endpoints of an arc based on the center point, radius, and angle.
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

/* This function generates a path (d) for an SVG <path> element that creates an arc (sector) in the shape of a "pie" or "Pacman".
It uses the polarToCartesian function to calculate the coordinates of the arc's start and end points,
and builds the path based on those points.

How it works:
SVG allows you to create arcs using the A (arc) command in a path d. To do this, you need to:

Know the coordinates of the start and end points of the arc.
Specify the radius of the arc.
Specify the angle and direction (major/minor arcs and direction of rotation).
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
