// function is_element_of_set(x, set) {
//     return is_null(set)
//         ? false
//         : equal(x, head(set))
//         ? true
//         : is_element_of_set(x, tail(set));
// }

// function adjoin_set(x, set) {
//     return is_element_of_set(x, set)
//         ? set
//         : pair(x, set);
// }

// function intersection_set(set1, set2) {
//     return is_null(set1) || is_null(set2)
//         ? null
//         : is_element_of_set(head(set1), set2)
//         ? pair(head(set1), intersection_set(tail(set1), set2))
//         : intersection_set(tail(set1), set2);
// }

// function union_set(set1, set2) {
//     return is_null(set1) && is_null(set2)
//         ? null
//         : is_null(set1)
//         ? set2
//         : is_null(set2)
//         ? set1
//         : is_element_of_set(head(set1), set2)
//         ? union_set(tail(set1), set2)
//         : pair(head(set1), union_set(tail(set1), set2));
// }

// function union_set(set1, set2) {
//     return is_null(set1)
//         ? set2
//         : adjoin_set(head(set1), union_set(tail(set1), set2));
// }


// Exercise 2.60: Sets with duplicates
// is_element_of_set and intersection_set remain unchanged
// adjoin_set is faster as we do not need to check if x is_element_of_set
function adjoin_set_duplicates(x, set) {
  return pair(x, set);
}

function union_set_duplicates(set1, set2) {
  return append(set1, set2);
}


// Ordered sets
function is_element_of_set(x, set) {
  return is_null(set)
      ? false
      : x === head(set)
      ? true
      : x < head(set)
      ? false
      : is_element_of_set(x, tail(set));
}

function adjoin_set(x, set) {
  return is_null(set)
      ? list(x)
      : x === head(set)
      ? set
      : x < head(set)
      ? pair(x, set)
      : pair(head(set), adjoin_set(x, tail(set)));
}

function intersection_set(set1, set2) {
  if (is_null(set1) || is_null(set2)) {
      return null;        
  } else {
      const x1 = head(set1);
      const x2 = head(set2);
      return x1 === x2
          ? pair(x1, intersection_set(tail(set1), tail(set2)))
          : x1 < x2 
          ? intersection_set(tail(set1), set2)            
          : intersection_set(set1, tail(set2));
  }
}

function union_set(set1, set2) {
  if (is_null(set1)) {
      return set2;
  } else if (is_null(set2)) {
      return set1;
  }
  const x1 = head(set1);
  const x2 = head(set2);
  return x1 === x2
      ? union_set(tail(set1), set2)
      : x1 < x2
      ? pair(x1, union_set(tail(set1), set2))
      : pair(x2, union_set(set1, tail(set2)));
}

const set1 = adjoin_set(10, adjoin_set(20, adjoin_set(30, null)));
const set2 = adjoin_set(10, adjoin_set(15, adjoin_set(20, null)));
union_set(set1, set2);


// Sets as trees
function entry(tree) { return head(tree); }

function left_branch(tree) { return head(tail(tree)); }

function right_branch(tree) { return head(tail(tail(tree))); }

function make_tree(entry, left, right) {
  return list(entry, left, right);
}

function is_element_of_set(x, set) {
  return is_null(set)
      ? false
      : x === entry(set)
      ? true
      : x < entry(set)
      ? is_element_of_set(x, left_branch(set))
      : is_element_of_set(x, right_branch(set));
}

function adjoin_set(x, set) {
  return is_null(set)
      ? make_tree(x, null, null)
      : x === entry(set)
      ? set
      : x < entry(set)
      ? make_tree(entry(set), 
                  adjoin_set(x, left_branch(set)),
                  right_branch(set))
      : make_tree(entry(set),
                  left_branch(set),
                  adjoin_set(x, right_branch(set)));
}

function tree_to_list(tree) {
  return is_null(tree)
      ? null
      : append(tree_to_list(left_branch(tree),
               pair(entry(tree), tree_to_list(right_branch(tree)))));
}

function tree_to_list_2(tree) {
  function copy_to_list(tree, result_list) {
      return is_null(tree)
             ? result_list
             : copy_to_list(left_branch(tree),
                            pair(entry(tree),
                                 copy_to_list(right_branch(tree),
                                              result_list)));
  }
  return copy_to_list(tree, null);
} 

// Sets as balanced binary trees
function union_set_as_tree(set1, set2) {
  const list1 = tree_to_list(set1);
  const list2 = tree_to_list(set2);
  return list_to_tree(union_set(list1, list2));
}

function intersection_set(set1, set2) {
  const list1 = tree_to_list(set1)
  const list2 = tree_to_list(set2)
  return list_to_tree(intersection_set(list1, list2));
}


// Sets and information retrieval
function lookup(given_key, set_of_records) {
  return is_null(set_of_records)
      ? false
      : equal(given_key, key(head(set_of_records)))
      ? head(set_of_records)
      : lookup(given_key, tail(set_of_records));
}

function lookup_tree(given_key, records) {
  return is_null(records)
      ? null
      : given_key === key(entry(records))
      ? entry(records)
      : given_key < key(entry(records))
      ? lookup_tree(given_key, left_branch(records))
      : lookup_tree(given_key, right_branch(records))
}
