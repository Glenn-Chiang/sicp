function count_leaves(x) {
  return is_null(x)
      ? 0
      : ! is_pair(x)
      ? 1
      : count_leaves(head(x)) + count_leaves(tail(x));
}

// Exercise 2.25
// head(tail(head(tail(tail(list(1, 3, list(5, 7), 9))))));
// head(head(list(list(7))));
// const list_3 = list(1, list(2, list(3, list(4, list(5, list(6, 7))))));
// head(tail(head(tail(head(tail(head(tail(head(tail(head(tail(list_3))))))))))));


function reverse(items) {
function iter(input, output) {
  return is_null(input)
  ? output
  : iter(tail(input), pair(head(input), output));
}
return iter(items, null);
}

function deep_reverse(items) {
function iter(input, output) {
  return is_null(input)
  ? output
  : iter(tail(input), pair(reverse(head(input)), output));
}
return iter(items, null);
}

// Exercise 2.27
// const x = list(list(1,2), list(3,4));
// reverse(x);
// deep_reverse(x);


function fringe(node) {
  return is_null(node)
      ? null
      : is_pair(node)
      ? append(fringe(head(node)), fringe(tail(node)))
      : list(node);
}

function make_mobile(left, right) {
  return list(left, right);
}

function make_branch(length, structure) {
  return list(length, structure);
}

function left_branch(mobile) {
  return head(mobile);
}

function right_branch(mobile) {
  return head(tail(mobile));
}

function branch_length(branch) {
  return head(branch);
}

function branch_structure(branch) {
  return head(tail(branch));
}

function total_weight(mobile) {
  return is_null(mobile)
      ? 0
      : is_number(mobile)
      ? mobile
      : total_weight(branch_structure(left_branch(mobile))) + total_weight(branch_structure(right_branch(mobile)));
}

function torque(branch) {
  return branch_length(branch) * total_weight(branch_structure(branch));
}

function balanced(mobile) {
  return is_null(mobile)
      ? true
      : is_number(mobile)
      ? true
      : torque(left_branch(mobile)) === torque(right_branch(mobile))
      ? balanced(branch_structure(left_branch(mobile))) && balanced(branch_structure(right_branch(mobile)))
      : false;
}

function map(f, items) {
  return is_null(items)
      ? null
      : pair(f(head(items)), map(f, tail(items)));
}

function square(x) {
  return x * x;
}

function square_list(items) {
  return map(square, items);
}

// square_list(list(1,2,3,4));

// function square_tree(tree) {
//     return is_null(tree)
//         ? null
//         : !is_pair(tree)
//         ? square(tree)
//         : pair(square_tree(head(tree)), square_tree(tail(tree)));
// }

// function square_tree(tree) {
//     return map(subtree => is_pair(subtree)
//                           ? square_tree(subtree)
//                           : square(subtree),
//               tree);    
// }

function tree_map(f, tree) {
  return is_null(tree)
      ? null
      : !is_pair(tree)
      ? f(tree)
      : pair(tree_map(f, head(tree)), tree_map(f, tail(tree)));
}

function square_tree(tree) {
  return tree_map(square, tree);
}

square_tree(list(1, list(2, list(3, 4), 5), list(6, 7)));

function subsets(s) {
  if (is_null(s)) {
      return list(null);
  }
  const rest = subsets(tail(s));
  return append(rest, map(x => pair(head(s), x), rest));
}

subsets(list(1,2,3));