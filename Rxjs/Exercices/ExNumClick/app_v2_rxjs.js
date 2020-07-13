const { map, filter, switchMap,debounce, buffer } = rxjs.operators;
const { fromEvent, interval, timer } = rxjs;

let button = document.querySelector('button');
let stat = document.querySelector('.stat');

const click$ = fromEvent(button, 'click');

const cBuffer$ = click$.pipe(
    debounce(() => timer(250))
);

// compter le nombre de clique 
const mClick$ = click$.pipe(
    buffer(cBuffer$),
    map(b => b.length),
    filter(num => num > 2)
).subscribe(
    total => {
        const stat = document.createElement("p");
        const t = document.createTextNode( `Total clicks : ${total}`);
        stat.appendChild(t);

        const parentButton = button.parentNode;

        parentButton.insertBefore(stat, button);
    }
);