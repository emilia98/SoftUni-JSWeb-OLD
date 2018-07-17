class Requester {
    constructor(method, uri, version, message) {
        this.response = undefined;
        this.fulfilled = false;
        this.method = method;
        this.uri = uri;
        this.version = version;
        this.message = message;
    }
}
let myData = new Requester('GET', 'http://google.com', 'HTTP/1.1', '');
