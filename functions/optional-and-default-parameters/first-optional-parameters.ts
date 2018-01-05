export default () => {}

// [ts] 必选参数不能位于可选参数后。
function buildName(firstName?: string, lastName: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}

let result1 = buildName("Bob");                  // works correctly now
// let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters 
let result3 = buildName("Bob", "Adams");         // ah, just right