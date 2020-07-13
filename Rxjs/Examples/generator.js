function* generator(i = 0) {

    yield 1;
    yield 2;
    yield 3;
    yield generato2()
}

for(let num of generator() ) console.log(num)


// Suite de Fibonacci

function* fibonacci(){
    let [a, b] = [0, 1] ;

    while(true){
        [a, b] = [b, a + b] ;

        yield b;
    }

}

//0 1 1 2 3 5 8 13 21

// switchMap et take(100) opérateur 