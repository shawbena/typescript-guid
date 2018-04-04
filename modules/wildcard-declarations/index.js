"use strict";
exports.__esModule = true;
var xyz_txt_text_1 = require("./xyz.txt!text");
var data_json_1 = require("json!http://example.com/data.json");
console.log(data_json_1["default"], xyz_txt_text_1["default"]);
var data1 = data_json_1["default"]; // any
var data2 = xyz_txt_text_1["default"]; // string
