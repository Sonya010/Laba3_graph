export function calculatePos (n, canvasWidth, canvasHeight) {
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    const radius = Math.min(canvasWidth, canvasHeight) * 0.45
    const positions = [];

    const triangleVertices = [
        {x : centerX, y : centerY - radius}, //A
        {x : centerX - radius * Math.cos(Math.PI / 6), y : centerY + radius * 0.5}, //B
        {x : centerX + radius * Math.cos(Math.PI / 6), y : centerY + radius * 0.5}, //C
    ]

    const verticesSide = (n - 3) / 3;
    const remainder = (n - 3) % 3;
    const placeVertices = (start, end, count) => {
        const points = [];
        for (let i = 1; i <= count; i++) {
            const t = i / (count + 1);
            const x = start.x + t * (end.x - start.x);
            const y = start.y + t * (end.y - start.y);
            points.push({ x, y });
        }
        return points;
    }

    let sideCounts = [
        verticesSide + (remainder > 0 ? 1 : 0), //AB
        verticesSide + (remainder > 1 ? 1 : 0), //BC
        verticesSide //CA
    ];
    const abPoints = placeVertices(triangleVertices[0], triangleVertices[1], sideCounts[0]);
    const bcPoints = placeVertices(triangleVertices[1], triangleVertices[2], sideCounts[1]);
    const caPoints = placeVertices(triangleVertices[2], triangleVertices[0], sideCounts[2]);

    positions.push(triangleVertices[0]); 
    positions.push(...abPoints);
    positions.push(triangleVertices[1]); 
    positions.push(...bcPoints);
    positions.push(triangleVertices[2]); 
    positions.push(...caPoints);

    return positions.slice(0, n);

}