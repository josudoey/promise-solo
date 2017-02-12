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

var songAsync = function (ms) {
  var self = this;
  var ts = now();
  if (!ms) {
    throw new Error(ts + self.name + ' oops');
  }
  console.log(ts + self.name + ' begin song ' + ms);
  return new Promise(function (resolve) {
    setTimeout(function () {
      var end = now();
      console.log(end + self.name + ' end song ' + ms);
      resolve(end);
    }, ms);
  });
};

var who = {
  name: ' joey'
};

var songSolo = solo(songAsync, who);
var saySolo = solo(function (msg) {
  console.log(now() + this.name + ' say ' + msg);
}, who);

songSolo(1000);
saySolo('hi');
songSolo().catch(function (err) {
  console.log(err.message);
});
songSolo(100).then(function (end) {
  console.log(end + ' done');
});
console.log(now() + ' start');

// Output:
// 0 start
// 3 joey begin song 1000
// 1011 joey end song 1000
// 1011 joey say hi
// 1011 joey oops
// 1012 joey begin song 100
// 1118 joey end song 100
// 1118 done
```

## API

### solo(func, self)
```js
var func = solo(function(val) {
  return Promise.resolve(val);
});

func(true).then(function (val) {

});
```
