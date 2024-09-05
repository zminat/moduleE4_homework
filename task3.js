function emptyObjectCreation() {
  return Object.create(null);
}

console.log(emptyObjectCreation().prototype)