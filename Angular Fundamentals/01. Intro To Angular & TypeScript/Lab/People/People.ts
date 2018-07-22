abstract class Employee {
    public name: string;
    public age: number;
    public salary: number = 0;
    public tasks: Array<string> = [];

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    work():void {
        let currentTask = this.tasks.shift();
        this.tasks.push(currentTask);
        console.log(currentTask);
    }

    collectSalary() :void {
        console.log(`${this.name} received ${this.salary} this month.`);
    }
 }

 class Junior extends Employee {
     constructor(name: string, age: number) {
         super(name, age);

         this.tasks.push(`${this.name} is working on a simple task.`);
     }
 }

 class Senior extends Employee {
     constructor(name: string, age: number) {
         super(name, age);

         this.tasks.push(`${this.name} is working on a complicated task.`);
         this.tasks.push(`${this.name} is taking time off work.`);
         this.tasks.push(`${this.name} is supervising junior workers.`);
     }
 }

 class Manager extends Employee {
     public dividend = 0;
     constructor(name: string, age: number) {
         super(name, age);

         this.tasks.push(`${this.name} scheduled a meeting.`);
         this.tasks.push(`${this.name} is preparing a quarterly report.`);
     }

    collectSalary() {
        console.log(`${this.name} received ${this.salary + this.dividend} this month.`);
    }
 }