class Ticket {
    constructor(
        public destination: string,
        public price: number,
        public status: string
    ) { 
    }
}

function solve(arg: Array<string>, sortCriteria: string) {
    let inputData = arg.slice(0, arg.length);
    let tickets = Array<Ticket>();

    for(let entry of inputData) {
        let tokens = entry.split('|');
        let ticket = new Ticket(
            tokens[0], 
            Number(tokens[1]),
            tokens[2]);
        tickets.push(ticket);    
    }

    return tickets.sort( (a, b) => sortFunc (a, b, sortCriteria));

    function sortFunc(a: Ticket, b: Ticket, criteria: string) {
        if (a[criteria] > b[criteria]) return 1;
        if (a[criteria] < b[criteria]) return -1;
        return 0;
    }
}