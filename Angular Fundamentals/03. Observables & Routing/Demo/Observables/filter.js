let obs = 
  Rx
    .Observable
    .interval(1000)
    .take(10)
    .do(i => console.log(i + 1))
    .filter(x => x % 2 === 0)
    .subscribe(y => console.log('Filtered: ' + y));
