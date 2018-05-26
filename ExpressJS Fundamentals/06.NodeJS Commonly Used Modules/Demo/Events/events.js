const { EventEmitter } = require('events');

let eventEmmiter = new EventEmitter();

function emitEvent () {
    let counter = 0;
    let timer = setInterval(() => {
        counter++;
        if(counter > 10) {
            clearInterval(timer);
            eventEmmiter.emit('end');
        } else {
            eventEmmiter.emit('tick', counter);
        }
        
    }, 1000);
}

eventEmmiter.on('tick', (counter) => {
    console.log(`Event received ${counter}`);
});

eventEmmiter.on('end', () => {
    console.log('Timer finished...');
});

emitEvent();