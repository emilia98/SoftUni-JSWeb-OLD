let obs = 
  Rx
    .Observable
    .interval(1000)
    .take(5)
    .do(i => console.log(i + 1));

obs.subscribe(value => console.log('First: ' + value));
obs.subscribe(value => console.log('Second: ' + value));