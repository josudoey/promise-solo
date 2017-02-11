module.exports = () => {
  let last = Promise.resolve();
  const wrap = (func, self) => {
    if (typeof func !== 'function') {
      throw new TypeError('"func" argument must be a function');
    }
    return () => {
      let args = Array.prototype.slice.call(arguments);
      let sing = new Promise(function (resolve, reject) {
        let next = function (err) {
          try {
            var r = func.apply(self, args);
            if (!r || !r.then) {
              return resolve(r);
            }
            r.then(resolve).catch(reject);
          } catch (e) {
            reject(err);
          }
        };
        last.then(next).catch(next);
      });
      last = sing;
      return sing;
    };
  };
  return wrap;
};

