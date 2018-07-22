/// <reference path="validator.ts" />
/// <reference path="zipcode-validation.ts" />
/// <reference path="letters-only-validation.ts" />

// Some samples to try
let strings = ["Hello", "98052", "101"];

// Validators to use
let validators: { [s: string]: SplitValidation.StringValidator; } = {};
validators["ZIP code"] = new SplitValidation.ZipCodeValidator();
validators["Letters only"] = new SplitValidation.LettersOnlyValidator();

// Show whether each string passed each validator
for (let s of strings) {
    for (let name in validators) {
        console.log(`"${ s }" - ${ validators[name].isAcceptable(s) ? "matches" : "does not match" } ${ name }`);
    }
}