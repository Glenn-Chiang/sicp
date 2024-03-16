function list_ref(items, n) {
  return n === 0
      ? head(items)
      : list_ref(tail(items), n - 1);
}

function length(items) {
  return is_null(items)
      ? 0
      : 1 + length(tail(items));
}

function length_iter(items) {
  function iter(items, count) {
      return is_null(items)
          ? count
          : iter(tail(items), count + 1);
  }
  return iter(items, 0);
}

function append(list1, list2) {
  return is_null(list1)
      ? list2
      : pair(head(list1), append(tail(list1), list2));
}

function last_pair(items) {
  return is_null(tail(items)) 
      ? items
      : last_pair(tail(items));
}

function reverse(items) {
  return is_null(items)
      ? null
      : append(reverse(tail(items)), pair(head(items), null));
}

function reverse_iter(items) {
  function iter(input, output) {
      return is_null(input)
          ? output
          : iter(tail(input), pair(head(input), output));
  }
  return iter(items, null);
}

// reverse_iter(list(1,4,9,16,25));

function cc(amount, coin_values) {
  return amount === 0
      ? 1
      : amount < 0 || no_more(coin_values)
      ? 0
      : cc(amount, except_first_denomination(coin_values)) +
        cc(amount - first_denomination(coin_values), coin_values);
}

function first_denomination(values) {
  return head(values);
}

function except_first_denomination(values) {
  return tail(values);
}

function no_more(values) {
  return is_null(values);
}


function plus_curried(x) {
  return y => x + y;
}

function brooks(f, args) {
  return is_null(tail(args))
      ? f(head(args))
      : brooks(f(head(args)), tail(args));
}

function brooks_curried(args) {
  return brooks(head(args), tail(args));
}

// brooks_curried(list(brooks_curried, list(plus_curried, 3, 4)));
// brooks_curried(list(brooks_curried,
//                     list(brooks_curried, 
//                          list(plus_curried, 3, 4))));

function map(f, items) {
  return is_null(items)
      ? null
      : pair(f(head(items)), map(f, tail(items)));
}

function for_each(f, items) {
  if (is_null(items)) {
      return undefined;
  }
  f(head(items));
  for_each(f, tail(items));
}

for_each(x => display(x), list(57,321,88));

function square(x) {
  return x * x;
}

function square_list(items) {
  return is_null(items)
      ? null
      : pair(square(head(items)), square_list(tail(items)));
}

function square_list_map(items) {
  return map(square, items);
}
















