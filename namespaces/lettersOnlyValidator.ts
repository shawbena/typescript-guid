// <reference path="validation.ts">
// [ts] "reference" 指令语法无效。

namespace Validation{
    const lettersRegexp = /^[A-Za-z]+$/;
    export class LettersOnlyValidator implements StringValidator{
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }
}