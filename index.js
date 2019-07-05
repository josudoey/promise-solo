module.exports = function () {
  let live = Promise.resolve()
  const wrap = function (func, self) {
    if (typeof func !== 'function') {
      throw new TypeError('"func" argument must be a function')
    }
    return function () {
      const args = Array.prototype.slice.call(arguments)
      const song = new Promise(function (resolve, reject) {
        const next = function () {
          try {
            const r = func.apply(self, args)
            if (!r || !r.then) {
              return resolve(r)
            }
            r.then(resolve).catch(reject)
          } catch (e) {
            reject(e)
          }
        }
        live.then(next).catch(next)
      })
      live = song
      return song
    }
  }

  wrap.spy = function (self, method) {
    const func = self[method]
    self[method] = wrap(func, self)
  }
  return wrap
}