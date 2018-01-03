import fileContent from './xyz.txt!text';
import data from 'json!http://example.com/data.json';

console.log(data, fileContent);

let data1 = data; // any
let data2 = fileContent; // string