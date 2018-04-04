import a = require('./a.png');
import b from '../../asserts/images/corpse_bride_by_singularwish-d5qod9g.jpg';

let imgA = document.createElement('img');
let imagB = document.createElement('img');

imgA.src = a;
imagB.src = b;

document.body.appendChild(imgA);
document.body.appendChild(imagB);

/*
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var a = require("./a.png");
var corpse_bride_by_singularwish_d5qod9g_jpg_1 = require("../../asserts/images/corpse_bride_by_singularwish-d5qod9g.jpg");
var imgA = document.createElement('img');
var imagB = document.createElement('img');
imgA.src = a;
imagB.src = corpse_bride_by_singularwish_d5qod9g_jpg_1.default;
document.appendChild(imgA);
document.appendChild(imagB);
*/

/*
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var a = __webpack_require__(6);
var corpse_bride_by_singularwish_d5qod9g_jpg_1 = __webpack_require__(7);
var imgA = document.createElement('img');
var imagB = document.createElement('img');
imgA.src = a;
imagB.src = corpse_bride_by_singularwish_d5qod9g_jpg_1.default;
document.body.appendChild(imgA);
document.body.appendChild(imagB);
*/
