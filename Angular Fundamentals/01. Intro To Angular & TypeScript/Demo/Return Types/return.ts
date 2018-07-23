function solve() :string{
    // return 5; // error
    return 'Hello, world!';
}

function another(a: number) :any {
    if(a > 5) {
        return 'Ivan';
    }
    return 5;
}

function third(b: string): boolean|string {
    if(b.length === 0) {
        return false;
    }
    //return 5; // error
    return b;
}