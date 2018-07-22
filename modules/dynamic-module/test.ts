import { ZipCodeValidator as Zip } from '../ZipCodeValidator'

let needZipValidation = false;
if(needZipValidation){
    let ZipCodeValidator: typeof Zip = require('../ZipCodeValidator')
    let validator = new ZipCodeValidator();
    if(validator.isAcceptable('...')){
        /* ... */
    }
}