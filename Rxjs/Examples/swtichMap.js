const { Observable } = require('rxjs');
const { map, filter, switchMap } = require('rxjs/operators');

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

users.sort((a,b) => a - b  );

function* apiUsers(users){
        count = 0; 

        while(users.lenght > 0){
            count++;
            
            yield users[count];
        }

}