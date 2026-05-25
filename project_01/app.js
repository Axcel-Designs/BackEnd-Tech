// const bunny = { name: "Bunny", age: 5, isHappy: true };
// console.log(bunny.name); // Output: Bunny
// console.log(bunny.age); // Output: 5
// console.log(bunny.isHappy); // Output: true

let bunnies = ["Bugs", "Lola", "Thumper", "Lucy", "Snowball", "Daisy"];
console.log(bunnies);

bunnies.push("Mario");
console.log(bunnies);

bunnies.splice(bunnies.indexOf("Lucy"), 1);
console.log(bunnies);

bunnies.unshift("Luigi");
console.log(bunnies);