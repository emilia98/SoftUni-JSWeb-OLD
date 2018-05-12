const storage = require('./storage.js');

storage.put('first', 'firstValue')
storage.put('second', 'secondValue')
storage.put('third', 'thirdValue')
storage.put('fouth', 'fourthValue')
console.log(storage.get('first')); // firstValue
console.log(storage.getAll()) 
// storage.put('second','secondValue') -> ERROR: This key already exists!
storage.delete('second')
// storage.delete('second') -> ERROR: This key doesn't exist!
storage.update('first', 'updatedFirst')
storage.save()
    .then(() => {
        storage.put('cat', 'dog');
        console.log(storage.getAll())
        storage.save()
            .then(() => {
                storage.load()
                    .then(() => {
                        console.log(storage.get("first"));
                        console.log(storage.getAll());
                        // storage.put('cat', 'anotherDog'); //-> ERROR: This key already exists!
                        storage.clear();
                        storage.put('first', 'firstValue');
                        console.log(storage.getAll());
                        storage.clear();
                        // storage.put('first','firstValue') //-> ERROR: This key already exists!
                        storage.save()
                        .then(() => {
                            storage.load()
                            .then(() => {
                                console.log(storage.getAll());
                            })
                            .catch(err => console.log(err));
                        })
                        .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err));
            }).catch(err => console.log(err));
    }) 
    .catch (err => console.log(err));