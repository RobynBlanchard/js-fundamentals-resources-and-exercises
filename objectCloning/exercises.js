/****************
 * Object Cloning
 *
 * Object cloning is difficult in JavaScript
    Because nested objects only copy references
    Because Stringifying and Parsing won't copy functions
    Because object references point to the same object

  * Start out with an object that has
    A string property
    A function property
    A nested object property
    A get function property

  * Deep copy the object
 */

const person = {
  name: 'Bob',
  birthYear: 1990,
  ageNow: function() {
    const age = new Date().getFullYear() - this.birthYear;
    return age;
  },
  nestedChild: {
    name: 'Bobby Jnr'
  },
  get greeting() {
    return `hey my name is ${this.name}`;
  }
};

// using jQuery extend
const jQueryDeepCopy = jQuery.extend(true, {}, person);

// note pre ES25015 - use object assign insted of spread operator
// usin ES6+ feature - nested spread operator
const spreadPersonCopy = { ...person, nestedChild: { ...person.nestedChild } };

// using a recursive function that takes an object, checks each property, copies or calls itself to dig deeper
const copy = obj => {
  let clone = {};
  for (let property in obj) {
    if (obj[property] != null && typeof obj[property] === 'object') {
      clone[property] = copy(obj[property]);
    } else {
      clone[property] = obj[property];
    }
  }
  return clone;
};

// example using lodash clone
import { cloneDeep } from lodash;
const newObj = cloneDeep(person);

// use Immutable js to clone an object and manipulate the properties
const { Map } = require('immutable');
const map = Map(person);
const copyPerson = map.toJS();
copyPerson.name = 'jimbob';
copyPerson.nestedChild.name = 'jimboby jnr';