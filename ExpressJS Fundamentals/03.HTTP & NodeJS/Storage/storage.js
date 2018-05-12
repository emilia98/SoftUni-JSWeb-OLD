const fs = require('fs');

let storage = (() => {
    let pairs = {};

    function put(key, value) {
        // Throw an error if the key is not a string
        if (typeof key !== "string") {
            throw new TypeError("The key is not a string!");
        }

        // Throw an error if the key already exists
        if (key in pairs) {
            throw new Error("This key already exists!");
        }

        // Add the key-value pair
        pairs[key] = value;
    }

    function get(key) {
        // Throw an error if the key is not a string
        if (typeof key !== "string") {
            throw new TypeError("The key is not a string!");
        }

        // Throw an error if the key doesn't exist
        if (!(key in pairs)) {
            throw new Error("This key doesn't exist!");
        }

        return pairs[key];
    }

    function getAll(){
        let objSize = Object.keys(pairs).length;

        if(objSize === 0){
            return "There are no items in the storage!";
        }
        return pairs;
    }

    function update(key, value) {
        // Throw an error if the key is not a string
        if (typeof key !== "string") {
            throw new TypeError("The key is not a string!");
        }

        // Throw an error if the key doesn't exist
        if (!(key in pairs)) {
            throw new Error("This key doesn't exist!");
        }

        pairs[key] = value;
    }

    function deleteKey(key) {
        // Throw an error if the key is not a string
        if (typeof key !== "string") {
            throw new TypeError("The key is not a string!");
        }

        // Throw an error if the key doesn't exist
        if (!(key in pairs)) {
            throw new Error("This key doesn't exist!");
        }

        delete pairs[key];
    }

    function clear(){
        for(let key in pairs){
           delete pairs[key];
        }
    }

    function save() {
        fs.writeFileSync("storage.json", JSON.stringify(pairs), "utf8");
    }

    function load() {
        let content = {};
        try{
            content = fs.readFileSync("./storage.json", "utf8");
            content = JSON.parse(content);
        }
        catch(err){
        }
       
        pairs = content;
    }

    return {
        put,
        get,
        getAll,
        update,
        delete: deleteKey,
        clear,
        save,
        load,
    }
})();

module.exports = storage;
