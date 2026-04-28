let bunnies = ["Bugs", "Lola", "Thumper", "Lucy", "Snowball", "Daisy"];
console.log(bunnies);

bunnies.push("Mario");
console.log(bunnies);

bunnies.splice(bunnies.indexOf("Lucy"), 1);
console.log(bunnies);

bunnies.unshift("Luigi");
console.log(bunnies);
