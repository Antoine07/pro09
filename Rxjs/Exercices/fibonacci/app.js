const { fromEvent, interval } = rxjs;
const { map, switchMap, take } = rxjs.operators;

const click$ = fromEvent(generate, 'click');
const interval$ = interval(1000); // counter toutes les secondes 1000 ms = 1 secondes
const Max = 10000;

// yield attention les fonctions générateurs se définissent avec une étoiles function*
function* fibonacci(){
    let [a, b] = [0, 1] ;

    while(true){
        [a, b] = [b, a + b] ;

        yield b;
    }
}

const start$ = click$.pipe(
    switchMap(
        event => {
            // console.log(event)

            // instance du générateur pour pouvoir l'utiliser dans le code
            const fib = fibonacci();

            // On lance alors un observable
            return interval$.pipe(
                map( count => { return  { number : fib.next().value, count : count + 1 } }),
                take(Max)
            )
        }
    )
);


const showNumber = (num, count, ulDocument)  => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    
    li.appendChild(document.createTextNode(num));
    span.appendChild(document.createTextNode(count));
    li.appendChild(span);

    ulDocument.appendChild(li);
}

start$.subscribe(fibo => showNumber(fibo.number, fibo.count, document.querySelector('ul')) );