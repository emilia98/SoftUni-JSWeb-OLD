abstract class Employee {
    public salary: number;
    public tasks: Array<string>;
    public dividend = 0;

    constructor(public name: string, public age: number) {
        this.name = name;
        this.age = age;
        this.salary = 0;
        this.tasks = [];
        this.dividend = 0;
    }

    work():void {
        let currentTask = this.tasks.shift();
        this.tasks.push(currentTask);
        console.log(currentTask);
    }

    collectSalary() :void {
        console.log(`${this.name} received ${this.salary + this.dividend} this month.`);
    }
 }

 class Junior extends Employee {
     constructor(name: string, age: number) {
         super(name, age);

         this.tasks = [
            `${this.name} is working on a simple task.`
         ];
     }
 }

 class Senior extends Employee {
     constructor(name: string, age: number) {
         super(name, age);

         this.tasks = [
            `${this.name} is working on a complicated task.`,
            `${this.name} is taking time off work.`,
            `${this.name} is supervising junior workers.`
         ];
     }
 }

 class Manager extends Employee {
     constructor(name: string, age: number) {
         super(name, age);

         this.tasks = [
            `${this.name} scheduled a meeting.`,
            `${this.name} is preparing a quarterly report.`
         ];
     }
 }