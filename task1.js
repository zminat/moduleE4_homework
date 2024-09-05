const person = {
   city: "Moscow"
}

const student = Object.create(person);

student.ownCity = "Cambridge";
student.name = "Isaac";
student.surname = "Newton";


function getKeysOfOwnProperties(){
    for (let key in student) {
        if (student.hasOwnProperty(key)) {
            console.log(key);
        }
    }
};

getKeysOfOwnProperties();