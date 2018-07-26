let obs = 
  Rx
    .Observable
    .interval(1000)
    .take(10)
    .do(i => console.log(i + 1))
    .map(x => x + 10)
    .subscribe(y => console.log(y));
