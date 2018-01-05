export default () => {}

function buildName(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}
// correctly now, returns "Bob Smith"
let result1 = buildName("Bob");

// still works, also returns "Bob Smith"
let result2 = buildName("Bob", undefined);       
// let result3 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters

// ah, just right
let result4 = buildName("Bob", "Adams");