class RegExp1 extends RegExp {
    [Symbol.match](str) {
      var result = RegExp.prototype[Symbol.match].call(this, str);
      if (result) {
        return 'VALID';
      }
      return 'INVALID';
    }
  }
  
let reg = new RegExp1('^abc');
reg[Symbol.match] = false;
  console.log('abcde'.startsWith(reg));
  // expected output: "VALID"