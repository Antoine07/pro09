// opérateur
const { map, mergeMap, pluck } = rxjs.operators;

// observable
const { fromEvent, interval, timer } = rxjs;

// formulaire 
const input1$ = fromEvent(num1, 'input');
const input2$ = fromEvent(num2, 'input');

const pgcd = (a, b) => {

    while (b > 0) {
        r = a % b;
        a = b;
        b = r;
    }

    return a;
}

// Observable qui a mergé deux observables
// logique sur les données avant de les traités dans le code
const pgcd$ = input1$.pipe(
    pluck('target', 'value'), // event.target.value de l'objet input 
    // permet de merger deux observables 
    mergeMap(
        x => {

            x = parseInt(x);

            // on retourne le deuxième observable
            return input2$.pipe(
                pluck('target', 'value'),
                map(y => {
                    y = parseInt(y);

                    if (y < y) { [x, y] = [y, x] };

                    return y;
                }),
                map( y =>  pgcd(x, y) )
            );
        }
    )
);

const span = document.querySelector('span');
// souscription des données
pgcd$.subscribe(result => { span.textContent = result ;  console.log(result) });