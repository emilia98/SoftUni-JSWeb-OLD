let obs = 
  Rx
    .Observable
    .interval(1000)
    .take(10)
    .do(i => console.log(i + 1))
    .reduce((prev, value) => prev + value)
    .subscribe(y => console.log('Reduced: ' + y));
