function solve () {
  class Employee {
    constructor (name, age) {
      if (new.target === Employee) {
        throw new Error('Cannot create an instance of an abstract class!'); 
      }
      this.salary = 0;
      this.tasks = [];
      this.name = name;
      this.age = age;
    }

    work () {
      let currentTask = this.tasks.shift();
      this.tasks.push(currentTask);
      console.log(currentTask);
    }

    collectSalary () {
      console.log(`${this.name} received ${this.salary} this month.`);
    }
  }

  class Junior extends Employee {
    constructor (name, age) {
      super(name, age);
      this.tasks.push(`${this.name} is working on a simple task.`);
    }
  }

  class Senior extends Employee {
    constructor (name, age) {
      super(name, age);
      this.tasks.push(`${this.name} is working on a complicated task.`);
      this.tasks.push(`${this.name} is taking time off work.`);
      this.tasks.push(`${this.name} is supervising junior workers.`);
    }
  }

  class Manager extends Employee {
    constructor (name, age) {
      super(name, age);
      this.dividend = 0;
      this.tasks.push(`${this.name} scheduled a meeting.`);
      this.tasks.push(`${this.name} is preparing a quarterly report.`);
    }

    collectSalary () {
      console.log(`${this.name} received ${this.salary + this.dividend} this month.`);
    }
  }

  return {
    Employee,
    Junior,
    Senior,
    Manager
  };
}