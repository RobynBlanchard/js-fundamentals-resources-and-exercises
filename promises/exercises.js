// /****************
//  * Promises
//  */

// // Create a function that returns a promise, this promise will resolve after 1000 ms
// // - Function returns a resolved promise and is handled by the consuming function
// // import { setTimeout } from 'timers'; - Not required, setTimeout is global

// Standard promise, looks fine, can be done without the brackets
// const newPromise = () => {
//   return new Promise(function(resolve) {
//     setTimeout(function() {
//       return resolve("success");
//     }, 1000);
//   });
// };

// Like so
const newPromise = () =>
  new Promise(function(resolve) {
    setTimeout(function() {
      return resolve("success");
    }, 1000);
  });

newPromise().then(res => console.log(res));

// Create a function that returns a promise, this promise will either be resolved or rejected (50/50) after 1000 ms
// - Function returns a promise that may or may not resolve

const newPromise2 = () => {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      const result = Math.random(0, 2).toFixed(0);
      // if you use if/else here, you don't need to return
      if (result === "1") {
        resolve("success");
      } else {
        reject("failure");
      }

      // if it had been without the else, you would've had to stop execution with a return
      // if (result === "1") {
      //   return resolve("success");
      // }
      // reject("failure");
    }, 1000);
  });
};

newPromise2()
  .then(res => console.log(res))
  .catch(err => console.log(err));

// Create a chain of promises, a function that returns a promise, a consuming function that will invoke another function once the promise is resolved (1000ms)
// - Function returns a promise, another function consumes it, another function is invoked when promise is resolved
// - Function returns a promise, another function consumes it, another function is invoked when the promise is rejected
// - Create a chain of 5 promises, where the last handler, the catch, will handle any rejected promises
// - Create a chain of 5 promises, where the last handler is a finally block that will always(?) run

const allProducts = {
  clothes: ["shoe", "top"],
  cards: ["birthday", "anniversary"],
  tech: ["laptop-cover", "mousepad"],
  home: ["wardrobe", "chair"],
  jewellery: ["neckalce", "bracelet"]
};

const fetchProducts = category => {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      if (allProducts[category]) {
        console.log(`fetchProducts resolving with ${allProducts[category]}`);
        return resolve(allProducts[category]);
      }
      return reject("invalid category");
    }, 1000);
  });
};

// This kind of "callback hell" is the reason promises were invented, returning the promise enables the chain
// fetchProducts("cards")
//   .then(productsCards => {
//     console.log(productsCards);
//     fetchProducts("clothes")
//       .then(productsClothes => {
//         console.log(productsClothes);
//         fetchProducts("tech")
//           .then(productsTech => {
//             console.log(productsTech);
//             fetchProducts("home")
//               .then(productsHome => {
//                 console.log(productsHome);
//                 fetchProducts("jewellery")
//                   .then(productsJewellery => {
//                     console.log(productsJewellery);
//                   })
//                   .catch(err => console.log(err))
//                   .finally(() => console.log("finished fetching cards"));
//               })
//               .catch(err => console.log(err))
//               .finally(() => console.log("finished fetching clothes"));
//           })
//           .catch(err => console.log(err))
//           .finally(() => console.log("finished fetching tech"));
//       })
//       .catch(err => console.log(err))
//       .finally(() => console.log("finished fetching home"));
//   })
//   .catch(err => console.log(err))
//   .finally(() => console.log("finished fetching jewellery"));

fetchProducts("cards")
  .then(productsCards => {
    console.log(productsCards);
    return fetchProducts("clothes");
  })
  .then(productsClothes => {
    console.log(productsClothes);
    return fetchProducts("tech");
  })
  .then(productsTech => {
    console.log(productsTech);
    return fetchProducts("home");
  })
  .then(productsHome => {
    console.log(productsHome);
    return fetchProducts("jewellery");
  })
  .then(productsJewellery => {
    console.log(productsJewellery);
    return Promise.resolve();
  })
  .catch(err => console.log(err))
  .finally(() => console.log("finished fetching everything"));

// Create an array of 5 promises, pass the array to Promise.all and handle the outcome

// Looks fine, could perhaps be done slightly shorter
// Also, the result from the promise all is an array, so you've got arrays in an array, would need to flatmap
Promise.all(
  ["cards", "clothes", "tech", "home", "jewellery"].map(arg =>
    fetchProducts(arg)
  )
).then(products => console.log(products));

// Promise.all([
//   fetchProducts("cards"),
//   fetchProducts("clothes"),
//   fetchProducts("tech"),
//   fetchProducts("home"),
//   fetchProducts("jewellery")
// ])
//   .then(products => {
//     console.log(products);
//     // products.forEach(product => console.log(product));
//   })
//   .catch(err => console.log(err));

// // Create an array of 5 promises, pass the array to Promise.race and see which one finishes first

Promise.race([
  fetchProducts("cards"),
  fetchProducts("clothes"),
  fetchProducts("tech"),
  fetchProducts("home"),
  fetchProducts("jewellery")
])
  .then(products => {
    console.log(products);
  })
  .catch(err => console.log(err));
