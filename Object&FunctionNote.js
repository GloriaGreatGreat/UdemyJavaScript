/*
Objects in JavaScript: Almost everything is an object.
Primitives:
    numbers, strings, booleans, undefined, null
Everthing else:
    arrays, functions, objects, dates, wrappers for numbers/strings/booleans

Constructor (class in other languages like JAVA)
can create as many instances as we like

Inheritance in JavaScript: prototype and prototype chains

Summary:
    1. every JavaScript object has a prototype proeprty, which makes interitance possible in JavaScript
    2. the prototype property of an object is where we put methods and properties that we want other objects to inherit
    3. the constructor's prototype property is NOT the prototype of the Constructor itself, it is the prototype of ALL instances that are created through it
    4. when a certain method (or property) is called, the search starts in the object itself, and if it cannot be found, the search moves on to the object's prototype, this continues until the method is found: prototype chain
*/

// Function constructor

var john = {
    name: 'John',
    yearOfBirth: 1990,
    job: 'teacher'
};

var Person = function(name, yearOfBirth, job){
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person.prototype.calculateAge = function(){
    console.log(2016 - this.yearOfBirth);
}

Person.prototype.lastName = 'Smith';

var john = new Person('John', 1990, 'teacher');
john.calculateAge();

var jane = new Person('Jane', 1969, 'designer');
var mark = new Person('Mark', 1948, 'retired');

john.__proto__ === Person.prototype
// return true

john.hasOwnProperty('job')
// return true
john.hasOwnProperty('lastName')
// return false
john instanceof Person
// return true

var x = [2, 4, 6]
console.info(x)

// Object.create
var personProto = {
    calculateAge: function(){
        console.log(2016 - this.yearOfBirth);
    }
}

var john = Object.create(personProto,{
    name: { value: 'Jane' },
    yearOfBirth: { value: 1990 },
    job: { value: 'teacher' }
});

// Primitives vs Objects
var a = 23;
var b = a;
a = 46;
console.log(a); // 46
console.log(b); // 23

var obj1 = {
    name: 'John',
    age: 26
};

var obj2 = obj1;
obj1.age = 30;
console.log(obj1.age); // 30
console.log(obj2.age); // 30

/*
Functions are also objects in JavaScript:
    A function is an instance of the Object type;
    A function behaves like any other object;
    We can store functions in a variable;
    We can pass a function as an argument to another function;
    We can return a function from a function;
*/

// Passing functions as arguments
var years = [1990, 1965, 1937, 2005, 1998];
function arrayCalc(arr, fn){
    var arrRes = [];
    for (var i = 0; i < arr.length; i++){
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calculateAge(el) {
    return 2016 - el;
}

function isFullAge(el){
    return el >= 18;
}

function maxHeartRate(el){
    return Math.round(206.9 - (0.67 * el));
}

var ages = arrayCalc(years, calculateAge);
var fullAges = arrayCalc(ages, isFullAge);
var rates = arrayCalc(ages, maxHeartRate);

// Functions returning functions
function interviewQuestion (job){
    if (job === 'designer') {
        return function(name) {
            console.log(name + ', can you please explain what UX design is?');
        }
    }
    else if (job === 'teacher'){
        return function(name){
            console.log('What subject do you teach, ' + name + '?');
        }
    }
    else{
        return function(name) {
            console.log('Hello ' + name + ', what do you do?');
        }
    }     
}

var TeatherQuestion = interviewQuestion('teacher');
teacherQuestion('John');
var designerQuestion = interviewQuestion('designer');
designerQuestion('John');

interviewQuestion('teacher')('Mark');