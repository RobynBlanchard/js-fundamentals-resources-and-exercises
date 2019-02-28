/****************
 * Promises
 */

// Create a function that returns a promise, this promise will resolve after 1000 ms
// - Function returns a resolved promise and is handled by the consuming function

const myFunction = () =>
  new Promise(resolve => {
    setTimeout(() => {
      return resolve('Resolved!');
    }, 1000);
  });

myFunction().then(res => console.log(res));

// Create a function that returns a promise, this promise will either be resolved or rejected (50/50) after 1000 ms
// - Function returns a promise that may or may not resolve

const myFunction2 = () => {
  const trueOrFalse = Math.round(Math.random()) === 1;

  return new Promise((resolve, reject) => {
    setTimeout(() => (trueOrFalse ? resolve('True!') : reject('False!')), 1000);
  });
};

myFunction2()
  .then(res => console.log(res))
  .catch(err => console.log(err));

// Create a chain of promises, a function that returns a promise, a consuming function that will invoke another function once the promise is resolved (1000ms)
// - Function returns a promise, another function consumes it, another function is invoked when promise is resolved
// - Function returns a promise, another function consumes it, another function is invoked when the promise is rejected
// - Create a chain of 5 promises, where the last handler, the catch, will handle any rejected promises
// - Create a chain of 5 promises, where the last handler is a finally block that will always(?) run

const myFunc3 = greeting => {
  const allowedGreetings = ['hello', 'hola', 'bonjour', 'ciao', 'hej'];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (allowedGreetings.indexOf(greeting) !== -1) {
        return resolve(`${greeting}, nice to meet you`);
      }
      reject("Sorry I don't know what one");
    }, 1000);
  });
};

myFunc3('hello')
  .then(res => {
    console.log(res);
    return myFunc3('hola');
  })
  .then(res => {
    console.log(res);
    return myFunc3('bonjour');
  })
  .then(res => {
    console.log(res);
    return myFunc3('ciao');
  })
  .then(res => {
    console.log(res);
    return myFunc3('hej');
  })
  .then(res => {
    console.log(res);
  })
  .catch(err => console.log(err))
  .finally(() => console.log('we are done here'));

// Create an array of 5 promises, pass the array to Promise.all and handle the outcome

Promise.all(
  ['hello', 'hola', 'bonjour', 'ciao', 'hej'].map(greeting => myFunc3(greeting))
).then(res => console.log(res));

// Create an array of 5 promises, pass the array to Promise.race and see which one finishes first

Promise.race(
  ['hello', 'hola', 'bonjour', 'ciao', 'hej'].map(greeting => myFunc3(greeting))
)
  .then(res => {
    console.log(res);
  })
  .catch(err => console.log(err));
