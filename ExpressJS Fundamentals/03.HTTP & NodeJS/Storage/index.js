const storage = require('./storage.js');

storage.load()
storage.put('first','firstValue')
storage.put('second','secondValue')
storage.put('third','thirdValue')
storage.put('fouth','fourthValue')
console.log(storage.get('first'))
console.log(storage.getAll())
// storage.put('second','secondValue') -> ERROR: This key already exists!
storage.delete('second')
// storage.delete('second') -> ERROR: This key doesn't exist!
storage.update('first','updatedFirst')
storage.save()
storage.clear()
console.log(storage.getAll())
storage.load()
console.log(storage.getAll());
// storage.put(2,'someValue'); -> ERROR: The key is not a string!
// storage.put('first','firstValue') -> ERROR: This key already exists!
storage.put('cat','dog');
console.log(storage.getAll());
// storage.put('cat','anotherDog'); -> ERROR: This key already exists!