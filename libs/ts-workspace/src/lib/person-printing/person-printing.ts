export class PersonTs {
  name: string;
  children: PersonTs[] = [];

  constructor(name: string) {
    this.name = name;
  }

  addChild(child: PersonTs) {
    this.children.push(child);
  }
}

export function printHierarchyTs(persons: PersonTs[]): string {
  let returnValue = '';

  for (const person of persons) {
    returnValue += `-${person.name}\n`;
    for (const child of person.children) {
      returnValue += printHierarchyHelperTs(child, 2);
    }
  }

  return returnValue;
}

function printHierarchyHelperTs(person: PersonTs, depth: number): string {
  let returnValue = '';

  const indentation = '-'.repeat(depth);
  returnValue += `${indentation}${person.name}\n`;

  for (const child of person.children) {
    returnValue += printHierarchyHelperTs(child, depth + 1);
  }

  return returnValue;
}

// Create Person objects
const jane = new PersonTs('Jane');
const jack = new PersonTs('Jack');
const kate = new PersonTs('Kate');
const sayid = new PersonTs('Sayid');
const sun = new PersonTs('Sun');
const aaron = new PersonTs('Aaron');
const hugo = new PersonTs('Hugo');
const sawyer = new PersonTs('Sawyer');

// Build the hierarchy
jack.addChild(kate);
kate.addChild(sayid);
kate.addChild(sun);

jack.addChild(aaron);
aaron.addChild(hugo);

jack.addChild(sawyer);

// Create an array of all Person objects
export const peopleTs = [jane, jack];
