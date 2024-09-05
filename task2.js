const person = {
   city: "Moscow"
}

function hasProperty(propertyName, obj) {
  return propertyName in obj;
}

console.log(hasProperty("foreignCity", person));
console.log(hasProperty("city", person));