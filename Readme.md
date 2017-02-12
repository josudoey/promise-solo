# promise4solo

[![Build Status](https://travis-ci.org/josudoey/promise4solo.svg?branch=master)](https://travis-ci.org/josudoey/promise4solo)
[![Code Climate](https://codeclimate.com/github/josudoey/promise4solo/badges/gpa.svg)](https://codeclimate.com/github/josudoey/promise4solo)

## Installation

```bash
$ npm install --save promise4solo
```

## Example

```js
var solo = require('promise4solo')();
var delay = function (ms) {
  var self = this;
  var now = Date.now();
  return new Promise(function (resolve) {
    console.log(now + self.name + ' begin song ' + ms);
    setTimeout(function () {
      console.log(now + self.name + ' end song at ' + Date.now());
      resolve();
    }, ms)
  });
}

var who = {
  name: ' foo'
}

var delay = solo(delay, who);

var say = solo(function (msg) {
  console.log(Date.now() + this.name + ' say ' + msg);
}, who)

delay(1000);
say('hi');
delay(1000);
delay(1000);

// Output:
// 1486742125167 foo begin song 1000
// 1486742125167 foo end song at 1486742126188
// 1486742126191 foo say hi
// 1486742126191 foo begin song 1000
// 1486742126191 foo end song at 1486742127193
// 1486742127193 foo begin song 1000
// 1486742127193 foo end song at 1486742128194
```
