function member(item, items) {
  return is_null(items)
      ? null
      : item === head(items)
      ? items
      : member(item, tail(items));
}

function equal(a, b) {
  return (is_pair(a) && !is_pair(b)) || (is_pair(b) && !is_pair(a))
      ? false
      : !is_pair(a) && !is_pair(b) && a === b
      ? true
      : !is_pair(a) && !is_pair(b) && a !== b
      ? false
      : equal(head(a), head(b)) && equal(tail(a), tail(b));
}

function equal(xs, ys) {
  return is_pair(xs)
         ? (is_pair(ys) &&
            equal(head(xs), head(ys)) && 
            equal(tail(xs), tail(ys)))
         : xs === ys;
} 

equal(list(1,2,3), list(1,2,4));