const {pair, head, tail} = require('../pair')

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b)
}

function make_rat(n, d) {
  const g = gcd(n, d)
  return (n > 0 && d > 0) || (n < 0 && d < 0)
    ? pair(Math.abs(n / g), Math.abs(d / g))
    : pair(-Math.abs(n/g), Math.abs(d/g))
}

function numer(x) {
  return head(x);
}

function denom(x) {
  return tail(x);
}

function print_rat(x) {
  console.log(numer(x).toString() + "/" + denom(x).toString())
}

const x = make_rat(-3,-5)
print_rat(x)
