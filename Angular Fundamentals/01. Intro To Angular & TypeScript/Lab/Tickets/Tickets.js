function solve (arg, sortCriteria) {
  class Ticket {
    constructor (destination, price, status) {
      this.destination = destination;
      this.price = price;
      this.status = status;
    }
  }

  let inputData = arg.slice(0, arg.length);
  let tickets = Array();
  for (let entry of inputData) {
    let tokens = entry.split('|');
    let ticket = new Ticket(tokens[0], Number(tokens[1]), tokens[2]);
    tickets.push(ticket);
  }

  return tickets.sort((a, b) => sortFunc(a, b, sortCriteria));

  function sortFunc (a, b, criteria) {
    if (a[criteria] > b[criteria]) return 1;
    if (a[criteria] < b[criteria]) return -1;
    return 0;
  }
}

console.log(solve(
  [
    'Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'
  ],
  'destination'
));
