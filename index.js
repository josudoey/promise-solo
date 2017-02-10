module.exports = function () {
  var last = Promise.resolve();
  var wrap = function (func, self) {
    if (typeof func !== 'function') {
      throw new TypeError('"func" argument must be a function');
    }
    return function () {
      var args = Array.prototype.slice.call(arguments);
      var sing = new Promise(function (resolve, reject) {
        var called = false;
        var next = function (err) {
          try {
            var r = func.apply(self, args)
            if (!r || !r.then) {
              return resolve(r);
            }
            r.then(resolve).catch(reject);
          } catch (e) {
            reject(err);
          }
        }
        last.then(next).catch(next);
      });
      last = sing;
      return sing;
    }
  }
  return wrap;
}

