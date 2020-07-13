const { of } = require('rxjs');
const { max } = require('rxjs/operators');

// liste de points
const source = of(
    { x: 10.5, y: -10.6 },
    { x: 5.5, y: 8.3 },
    { x: -7.3, y: 3.3 },
    { x: 8.9, y: -2.6 }
);

// mapping data 
const maxPoint = source.pipe(
    max(
        (pA, pB) => Math.sqrt(pA.x ** 2 + pA.y ** 2) < Math.sqrt(pB.x ** 2 + pB.y ** 2) ? -1 : 1)
)

// s'inscrire
const subscribeOne = maxPoint.subscribe(point => console.log(`point x : ${ point.x}, y : ${point.y}`));
