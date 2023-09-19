class Person {
  name;
  children = [];

  constructor(name) {
    this.name = name;
  }

  addChild(child) {
    this.children.push(child);
  }
}

function printHierarchy(persons) {
  for (const person of persons) {
    console.log(`-${person.name}`);
    for (const child of person.children) {
      printHierarchyHelper(child, 2);
    }
  }
}

function printHierarchyHelper(person, depth) {
  console.log(`${'-'.repeat(depth)}${person.name}`);

  for (const child of person.children) {
    printHierarchyHelper(child, depth + 1);
  }
}

// Create Person objects
const jane = new Person('Jane');
const jack = new Person('Jack');
const kate = new Person('Kate');
const sayid = new Person('Sayid');
const sun = new Person('Sun');
const aaron = new Person('Aaron');
const hugo = new Person('Hugo');
const sawyer = new Person('Sawyer');

// Build the hierarchy
jack.addChild(kate);
kate.addChild(sayid);
kate.addChild(sun);

jack.addChild(aaron);
aaron.addChild(hugo);

jack.addChild(sawyer);

// Create an array of all Person objects
const people = [jane, jack];

printHierarchy(people);
