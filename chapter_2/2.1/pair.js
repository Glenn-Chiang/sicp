function pair(a, b) {
  return {head: a, tail: b}
}

function head(pair) {
  return pair.head
}

function tail(pair) {
  return pair.tail
}

module.exports = {pair, head, tail}