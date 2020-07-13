const { Observable } = require('rxjs');
const { filter, max, map } = require('rxjs/operators');

// définition de l'Observable 
const Users$ = Observable.create( observer => {
    let users = [
        { id: 1, name: 'alan', score: 50 },
        { id: 2, name: 'albert', score: 150 },
        { id: 3, name: 'xavier', score: 0 },
        { id: 4, name: 'benoit', score: 5 },
        { id: 5, name: 'phil', score: 17 },
        { id: 6, name: 'sophie', score: 45 },
        { id: 7, name: 'stephan', score: 900 },
        { id: 8, name: 'elie', score: 178 },
        { id: 9, name: 'tony', score: 15 },
        { id: 10, name: 'robert', score: 11 },
        { id: 11, name: 'gerard', score: 8 },
        { id: 12, name: 'sandra', score: 6 },
        { id: 13, name: 'caroline', score: 23 }
    ];

    let count = 0;
    // on ordonne les les résultats par ordre de score décroissant
    users.sort((a, b) => { return a < b ? -1 : 1 })

    const interval = setInterval(() => {

        // on arrête le flux si on atteint la limite des données du tableau users
        // déclenche la méthode de désinscription
        if (count > users.length) observer.complete();

        else {
            let user = users[count];
            observer.next(user); // Observer push les données en sortie
        }

        count++;

    }, 1000);

    // Lors de la description on nettoie la variable setInterval
    return () => { 
        console.log('exécution de la méthode unsubscribe');
        clearInterval(interval);
    }

});

// pipe : permet de filtrer les données, la logique ne sera appliquée sur les données 
// qu'au moment où les données sont envoyées (souscription)
const pipeRecives$ = Users$.pipe(
    filter(user => user && user.score > 100), // filter score > 100 
    map(user => `Name : ${user.name.slice(0,1).toUpperCase() + user.name.slice(1).toLowerCase()} score : ${user.score}`)
);

// souscription à l'Observable
pipeRecives$.subscribe( user => console.log(user));