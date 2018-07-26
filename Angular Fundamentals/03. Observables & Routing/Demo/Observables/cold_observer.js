let obs = 
  Rx
    .Observable
    .interval(1000)
    .take(5)
    .do(i => console.log(i + 1));

// Nothing happens