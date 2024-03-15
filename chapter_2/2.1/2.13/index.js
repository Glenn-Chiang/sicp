// Exercise 2.4
// function pair(x, y) {
//   return m => m(x, y)
// }

// function head(z) {
//   return z((p,q) => p)
// }

// function tail(z) {
//   return z((p, q) => q)
// }

// Exercise 2.5
function exp(base, n) {
  return n === 0 ? 1 : base * exp(base, n - 1)
}

function pair(a, b) {
  return exp(2, a) * exp(3, b)
}

function head(p) {
  return p % 2 === 0
    ? head(p / 2) + 1
    : 0
}

function tail(p) {
  return p % 3 === 0
    ? tail(p / 3) + 1
    : 0
}

function add_1(n) {
  return f => x => f(n(f)(x))
}

const zero = f => x => x
const one = f => x => f(x)
const two = f => x => f(f(x))

function plus(a, b) {
  return f => x => a(f)(b(f)(x))
}