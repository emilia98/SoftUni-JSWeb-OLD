class Cat {
    constructor(private name: string) {   
    }

    private returnName() :string {
        return this.name;
    }

    sayHello() :string {
        return `Hello from ${this.returnName()}`
    }

    greet() :void {
        console.log(this.sayHello());
    }
}