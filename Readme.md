# promise4solo

[![Build Status](https://travis-ci.org/josudoey/promise4solo.svg?branch=master)](https://travis-ci.org/josudoey/promise4solo)
[![Test Coverage](https://codeclimate.com/github/josudoey/promise4solo/badges/coverage.svg)](https://codeclimate.com/github/josudoey/promise4solo/coverage)
[![Code Climate](https://codeclimate.com/github/josudoey/promise4solo/badges/gpa.svg)](https://codeclimate.com/github/josudoey/promise4solo)
[![Issue Count](https://codeclimate.com/github/josudoey/promise4solo/badges/issue_count.svg)](https://codeclimate.com/github/josudoey/promise4solo)

## Installation

```bash
$ npm install --save promise4solo
```

## Example

```js
var solo = require('promise4solo')();
var now = function () {
  this.start = this.start || Date.now();
  return Date.now() - this.start;
};

var singAsync = function (ms) {
  var self = this;
  var ts = now();
  if (!ms) {
    throw new Error(ts + self.name + ' oops');
  }
  console.log(ts + self.name + ' begin sing ' + ms);
  return new Promise(function (resolve) {
    setTimeout(function () {
      var end = now();
      console.log(end + self.name + ' end sing ' + ms);
      resolve(end);
    }, ms);
  });
};

var who = {
  name: ' joey'
};

var singSolo = solo(singAsync, who);
var saySolo = solo(function (msg) {
  console.log(now() + this.name + ' say ' + msg);
}, who);

singSolo(1000);
saySolo('hi');
singSolo().catch(function (err) {
  console.log(err.message);
});
singSolo(100).then(function (end) {
  console.log(end + ' done');
});
console.log(now() + ' start');

// Output:
// 0 start
// 3 joey begin sing 1000
// 1011 joey end sing 1000
// 1011 joey say hi
// 1011 joey oops
// 1012 joey begin sing 100
// 1118 joey end sing 100
// 1118 done
```

## API

Return a solo wrap function, and the wrap function will return promise and guarantee one async function be run for order async flow.

### solo(func[, thisArg])
```js
var funcAsync = function(val){
  return new Promise(function(resolve){
    //...
    resolve(val);
  });
}

var funcSolo = solo(funcAsync);
funcSolo(true).then(function (val) {

});
```
